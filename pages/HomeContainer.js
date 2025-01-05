import React, { useState, useEffect } from "react";
import { Layout, Spin, Image, Button, Carousel } from 'antd';
import Link from 'next/link'; // 如果你使用的是 Next.js
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import CarouselComp from './CarouselComp';
const HomeContainer = () => {
    const [visible, setVisible] = useState(false);
    const { connected, disconnect, connect } = useWallet(); // 获取连接状态和方法
    const { setVisible: setModalVisible } = useWalletModal(); // 获取打开钱包选择对话框的方法
    const [walletIcon, setWalletIcon] = useState('/resources/images/wallet2.png'); // 默认图标路径
    useEffect(() => {
        // 根据连接状态更新钱包图标
        if (connected) {
            setWalletIcon('/resources/images/wallet3.png'); // 已连接状态的图标路径
        } else {
            setWalletIcon('/resources/images/wallet2.png'); // 未连接状态的图标路径
        }
    }, [connected]); // 监听 connected 状态变化

    const onWalletClick = () => {
        if (connected) {
            disconnect(); // 如果已连接，则断开连接
        } else {
            setModalVisible(true); // 如果未连接，则连接钱包
        }
    };
	return (
		<div className="HomeContainer" style={{ 'width': '100%', 'background-color': '#1e1e1e', 'margin': 0, 'padding': 0 }}>
            <div className="wallet-connect" onClick={onWalletClick}>
                <Image
                    src={walletIcon} // 替换为你的钱包图标路径
                    alt="Wallet"
                    preview={false}
                    style={{ cursor: 'pointer', width: '50px', height: '50px' }}
                />
                <div className="aWallet-label">CONNECT</div>
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
                        <Link href="https://x.com/DD__BlockChain" className="btn1" target="_blank"/>
                        <Link href="https://t.me/kuaiche888" className="btn2" target="_blank"/>
                    </div>
                </div>
			</div>
		</div>
	);
};

export default HomeContainer;