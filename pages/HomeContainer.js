import React, { useState, useEffect } from "react";
import { Layout, Spin, Image, Button, Carousel } from 'antd';
import Link from 'next/link'; // 如果你使用的是 Next.js
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import CarouselComp from './CarouselComp';
const HomeContainer = () => {
    const [visible, setVisible] = useState(false);
    const { connected, disconnect, connect, publicKey  } = useWallet(); // 获取连接状态和方法
    const { setVisible: setModalVisible } = useWalletModal(); // 获取打开钱包选择对话框的方法
    const [walletIcon, setWalletIcon] = useState('/resources/images/wallet2.png'); // 默认图标路径
    const [walletAddress, setWalletAddress] = useState('连接钱包'); // 新增状态存储钱包地址

    useEffect(() => {
        // 根据连接状态更新钱包图标
        if (connected) {
            setWalletIcon('/resources/images/wallet3.png'); // 已连接状态的图标路径
            setWalletAddress(`${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}`);// 更新钱包地址
        } else {
            setWalletIcon('/resources/images/wallet2.png'); // 未连接状态的图标路径
            setWalletAddress('连接钱包'); // 清空钱包地址
        }
    }, [connected, publicKey]); // 监听 connected 状态变化

    const onWalletClick = () => {
        if (connected) {
            disconnect(); // 如果已连接，则断开连接
        } else {
            setModalVisible(true); // 如果未连接，则连接钱包
        }
    };
	return (
		<div className="HomeContainer" style={{ 'width': '100%', backgroundColor: '#1e1e1e', 'margin': 0, 'padding': 0 }}>
            <div className="wallet-connect" onClick={onWalletClick}>
                <Image
                    src={walletIcon} // 替换为你的钱包图标路径
                    alt="Wallet"
                    preview={false}
                />
                <div className="aWallet-label">{walletAddress}</div>
            </div>
            <div className="logo-wrap">
                <div className="logo"></div>
                <Link href="/MintV2" className="mint-btn" />
                <div className="arrow-bottom"></div>
            </div>
			<div className="main">
				<div className="carousel-wrap">
                    <div className="carousel-title"></div>
                    <CarouselComp />
                </div>
				<div className="footer">
                    <Link href="https://t.me/a08784" className="join-community" target="_blank">加入社区</Link>
                    <div className="operations">
                        <div className="operations-link">
                            <a href="https://x.com/DD__BlockChain" className="btn1" target="_blank" rel="noopener noreferrer"/>
                            <div className="text1">
                                <span>官推</span> {/* 在 Link 内部添加文字 */}
                            </div>
                        </div>
                        <div className="operations-link">
                            <a href="https://t.me/ddshequ888" className="btn2" target="_blank" rel="noopener noreferrer"/>
                            <div className="text2">
                                <span>TG禁言群</span> {/* 在 Link 内部添加文字 */}
                            </div>
                        </div>
                        <div className="operations-link">
                            <a href="https://t.me/kuaiche888" className="btn3" target="_blank" rel="noopener noreferrer"/>
                            <div className="text3">
                                <span>TG交流群</span> {/* 在 Link 内部添加文字 */}
                            </div>
                        </div>
                    </div>
                </div>
			</div>
		</div>
	);
};

export default HomeContainer;