import React, { useState, useEffect } from "react";
import { useMemo } from "react";
import { Layout, Spin, Image, Button, Modal, Flex, Progress } from 'antd';
import Link from 'next/link';
// =========== 钱包组件 相关引入 ===========
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
// =========== 钱包组件 相关引入 ===========
// ========== mint按钮 相关引入 ==========
import { ButtonList } from "./components/mintButton";
import { publicKey as umiPublicKey} from "@metaplex-foundation/umi";
import { fetchCandyMachine, safeFetchCandyGuard, AccountVersion } from "@metaplex-foundation/mpl-candy-machine";
import { useUmi } from "./utils/useUmi";
import { useSolanaTime } from "./utils/SolanaTimeContext";
import { guardChecker } from "./utils/checkAllowed";
// ========== mint按钮 相关引入 ==========
import InventoryComp from './InventoryComp';
import AuthLoginDialog from './AuthLoginDialog';
import AuthLoginDialogSuccess from './AuthLoginDialogSuccess';

// import { ShowNft } from "./components/showNft";
// =========== mint 相关参数 ======================
const useCandyMachine = (
    umi,
    candyMachineId,
    checkEligibility,
    setCheckEligibility,
    firstRun,
    setFirstRun
) => {
    const [candyMachine, setCandyMachine] = useState();
    const [candyGuard, setCandyGuard] = useState();

    useEffect(
        () => {
            (async () => {
                if (checkEligibility) {
                    if (!candyMachineId) {
                        console.error("No candy machine in .env!");
                        return;
                    }

                    let candyMachine;
                    try {
                        candyMachine = await fetchCandyMachine(umi, umiPublicKey(candyMachineId));
                        // Verify CM Version
                        if (candyMachine.version !== AccountVersion.V2) {
                        console.error("Wrong candy machine account version!");
                        return;
                        }
                    } catch (e) {
                        console.error(e);
                        return;
                    }
                    setCandyMachine(candyMachine);
                    if (!candyMachine) {
                        return;
                    }
                    let candyGuard;
                    try {
                        candyGuard = await safeFetchCandyGuard(umi, candyMachine.mintAuthority);
                    } catch (e) {
                        console.error(e);
                    }
                    if (!candyGuard) {
                        return;
                    }
                    setCandyGuard(candyGuard);
                    if (firstRun) {
                        setFirstRun(false);
                    }
                }
            })();
        }, 
        [umi, checkEligibility]
    );

    return { candyMachine, candyGuard };
};

const MintContainer = () => {
    // ================== 钱包相关代码 ==================
    const [visible, setVisible] = useState(false);
    const { connected, disconnect, connect, publicKey } = useWallet(); // 获取连接状态和方法
    const { setVisible: setModalVisible } = useWalletModal(); // 获取打开钱包选择对话框的方法
    const [walletIcon, setWalletIcon] = useState('/resources/images/wallet2.png'); // 默认图标路径
    const [walletAddress, setWalletAddress] = useState('连接钱包'); // 新增状态存储钱包地址
    const [mintingStatus, setMintingStatus] = useState(false); // 管理 mint 状态
    const [isShowNftOpen, setShowNftOpen] = useState(false);//铸造完成状态

    // 监控 mintingStatus 的变化
    useEffect(() => {
        if (mintingStatus) {
            // 当 mintingStatus 为 true 时，调用弹框方法
            onClickAuth();
        } else {
            // 当 mintingStatus 为 false 时，调用关闭弹框方法
            onCloseAuth();
        }
    }, [mintingStatus]); // 依赖于 mintingStatus

    // 监控 isShowNftOpen 的变化
    useEffect(() => {
        if (isShowNftOpen) {
            // 当 isShowNftOpen 为 true 时，调用弹框方法
            console.log("弹框已打开");
            onClickSuccessAuth();
        } else {
            // 当 isShowNftOpen 为 false 时，调用关闭弹框方法
            console.log("弹框已关闭");
            onCloseSuccessAuth();
        }
    }, [isShowNftOpen]); // 依赖于 isShowNftOpen

    useEffect(
        () => {
            // 根据连接状态更新钱包图标
            if (connected) {
                setWalletIcon('/resources/images/wallet3.png'); // 已连接状态的图标路径
                setWalletAddress(`${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}`);// 更新钱包地址
            } else {
                setWalletIcon('/resources/images/wallet2.png'); // 未连接状态的图标路径
                setWalletAddress('连接钱包'); // 清空钱包地址
            }
        }, 
        [connected, publicKey]
    ); // 监听 connected 状态变化

    const onWalletClick = () => {
        if (connected) {
            disconnect(); // 如果已连接，则断开连接
        } else {
            setModalVisible(true); // 如果未连接，则连接钱包
        }
    };
    // ================== 钱包相关代码 ==================

    // ================== MINT按钮 相关代码 ==================
    const umi = useUmi();
    const solanaTime = useSolanaTime();
    const [mintsCreated, setMintsCreated] = useState([""]);
    const [isAllowed, setIsAllowed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ownedTokens, setOwnedTokens] = useState();
    const [guards, setGuards] = useState([
        { label: "startDefault", allowed: false, maxAmount: 0 },
    ]);
    const [firstRun, setFirstRun] = useState(true);
    const [checkEligibility, setCheckEligibility] = useState(true);
    const [isInitializerOpen, setInitializerOpen] = useState(false);

    if (!process.env.NEXT_PUBLIC_CANDY_MACHINE_ID) {
        console.error("No candy machine in .env!");
    }

    const candyMachineId = useMemo(() => {
        if (process.env.NEXT_PUBLIC_CANDY_MACHINE_ID) {
            return umiPublicKey(process.env.NEXT_PUBLIC_CANDY_MACHINE_ID);
        } else {
        console.error(`NO CANDY MACHINE IN .env FILE DEFINED!`);
            return umiPublicKey("11111111111111111111111111111111");
        }
    }, []);

    const { candyMachine, candyGuard } = useCandyMachine(umi, candyMachineId, checkEligibility, setCheckEligibility, firstRun, setFirstRun);

    useEffect(
        () => {
            const checkEligibilityFunc = async () => {
                if (!candyMachine || !candyGuard || !checkEligibility || isShowNftOpen) {
                    return;
                }
                setFirstRun(false);

                const { guardReturn, ownedTokens } = await guardChecker(
                    umi, candyGuard, candyMachine, solanaTime
                );

                setOwnedTokens(ownedTokens);
                setGuards(guardReturn);
                setIsAllowed(false);

                let allowed = false;
                for (const guard of guardReturn) {
                    if (guard.allowed) {
                    allowed = true;
                    break;
                    }
                }
                setIsAllowed(allowed);
                setLoading(false);
            };
            checkEligibilityFunc();
        },
        [umi, checkEligibility, firstRun]
    );
    // ================== MINT按钮 相关代码 ==================

    // mint中弹框
    const onClickAuth = (e) => {
        let AuthLoginDialogDom = document.getElementById('AuthLoginDialog');
        AuthLoginDialogDom.style.display = 'flex';// 显示弹框
    };
    const onCloseAuth = (e) => {
        let AuthLoginDialogDom = document.getElementById('AuthLoginDialog');
        AuthLoginDialogDom.style.display = 'none'; // 隐藏弹框
    };

    // mint成功弹框
    const onClickSuccessAuth = (e) => {
        let AuthLoginSuccessDialogDom = document.getElementById('AuthLoginDialogSuccess');
        AuthLoginSuccessDialogDom.style.display = 'flex';// 显示弹框
    };
    const onCloseSuccessAuth = (e) => {
        let AuthLoginSuccessDialogDom = document.getElementById('AuthLoginDialogSuccess');
        AuthLoginSuccessDialogDom.style.display = 'none'; // 隐藏弹框
    };

	return (
		<div className="MintContainer" style={{ width: '100%', backgroundColor: '#1e1e1e', margin: 0, padding: 0 }}>
            <div className="wallet-connect" onClick={onWalletClick}>
                <Image
                  src={walletIcon} // 替换为你的钱包图标路径
                  alt="Wallet"
                  preview={false}
                />
                <div className="aWallet-label">{walletAddress}</div>
            </div>
            
            <div className="main">
                <div className="header-logo">
                    <Image 
                        src='/resources/images/homev2/Group 38.png' 
                        preview={false} 
                    />
                </div>
                <div className="header">DD社区凭证 + 独特PFP</div>
                <div className="inventory-wrap">
                    <div className="inventory-logo">
                        <Image 
                            src='/resources/images/homev2/Group 8.png' 
                            preview={false} 
                        />
                    </div>
                    <div className="inventory-num">{Number(candyMachine?.itemsRedeemed)}/{Number(candyMachine?.data.itemsAvailable)}</div>
                    <Flex className="custom-flex" gap="small" vertical>
                    {/* size={[1300, auto]} */}
                        <Progress 
                            percent={((Number(candyMachine?.itemsRedeemed))/Number(candyMachine?.data.itemsAvailable)) * 100} 
                            strokeColor="#ff0000" 
                            showInfo={false}
                            className="custom-progress" 
                        />
                    </Flex>
                </div>
                <div className="MINT-wrap">
                    <div className="MINT-btn">
                        {/* <div className="MINT-NF">MINT</div> */}
                            <ButtonList
                                guardList={guards}
                                candyMachine={candyMachine}
                                candyGuard={candyGuard}
                                umi={umi}
                                ownedTokens={ownedTokens}
                                setGuardList={setGuards}
                                mintsCreated={mintsCreated}
                                setMintsCreated={setMintsCreated}
                                onOpen={() => setShowNftOpen(true)}
                                setCheckEligibility={setCheckEligibility}
                                setMintingStatus={setMintingStatus} // 传递更新函数
                            />
                    </div>
                    <div className="MINT-version">0.1 SOL / NFT</div>
                    <div className="arrow-bottom"></div>
                    <div className="bgimg-left-01"></div>
                    <div className="bgimg-left-02"></div>
                    <div className="bgimg-left-03"></div>
                    <div className="bgimg-right-01"></div>
                    <div className="bgimg-right-02"></div>
                    <div className="bgimg-right-03"></div>
                </div>
                <div className="auth">
                    <div className="auth-wrap">
                        <div className="title">获得凭证后…</div>
                        <div className="content">
                            <div className="item">可以进入DD社区内部群</div>
                            <div className="item small">-多频道支持：内设阿尔法/NFT/符文/铭文/土狗/合约/现货/撸毛等各种频道，满足您的多样化需求。</div>
                            <div className="item small">-全方位覆盖：无论是最新的市场动态，还是独家投资策略，涵盖</div>
                            <div className="item big">获得社区合作的空投、白名单</div>
                            <div className="item small">-特别空投：社区合作的空投，如早期的杰瑞、汉堡等，都会特别安排给NFT持有者</div>
                            <div className="item small">-优先白名单：社区合作的白名单优先安排，让您在热门项目中占得先机。</div>
                        </div>
                        <Link href="https://t.me/ddscyyd" className="join-community" target="_blank">加入社区并验证</Link>
                    </div>
                </div>
                <div className="search">
                    <div className="search-wrap">
                        <div className="title">探索</div>
                        <div className="content">
                            <div className="item">在无尽的宇宙之中，存在着一个被称为“Dimensia”的纪元，它由无数相互交织的次元构成，<br/>每个次元都是一个独立而又奇特的宇宙。在这些宇宙中，五大主宰种族——人类、兽人、未来、古神族和修罗，同编织着这个多元世界的传奇。</div>
                            <div className="item">人类，以其智慧和适应力在多元纪元中占据了一席之地。他们建立了庞大的帝国，科技与魔法并存，创造了一个繁荣的文明。</div>
                            <div className="item">兽人，拥有强大的体魄和原始的力量，他们的部落散布在各个荒野之中，以自然为信仰，与环境和谐共存。</div>
                            <div className="item">未来，是由先进文明创造出的生命形式，他们是遥远的未来人穿越而来，通过时间的隧道回溯到纪元，是D元纪元中的时空编制者。</div>
                            <div className="item">古神族，则是天生拥有控制元素力量的存在，他们居住在高耸入云的神殿之中，俯视着世界，引导着世界的秩序。</div>
                            <div className="item">修罗族，是D纪元中的禁忌之种，他们拥有强大的破坏力和变幻莫测的能力，常常被误解和恐惧。</div>
                            <div className="item">在多元纪元的历史长河中，无数的英雄和传说诞生。他们为了自己的种族，为了信仰，为了荣耀，展开了一场又一场的史诗般的战斗。</div>
                            <div className="item">随着时间的推移，一个名为“星界裂痕”的事件震撼了D纪元。在这个新的时代，一个又一个的故事正在被创造</div>
                            <div className="item">而你无论是作为人类的智者、兽人的战士、未来的思考者、修罗的启示者、神族的守护者，都将成为这个多元宇宙传奇的一部分。</div>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <div className="footer-logo"></div>
                    <div className="footer-info">
                        <a href="https://x.com/DD__BlockChain" className="img" target="_blank" rel="noopener noreferrer"/> 
                        <Link href="https://x.com/DD__BlockChain" className="email" target="_blank">@DD__BlockChain</Link>
                    </div>
                </div>
            </div>
            
            <AuthLoginDialog />
            <AuthLoginDialogSuccess 
                transactionAddress={mintsCreated.length > 0 ? mintsCreated[mintsCreated.length - 1]: ""} 
            />
		</div>
	);
};

export default MintContainer;