import React, { useState, useEffect } from "react";
import { Layout, Spin, Image, Button, Carousel } from 'antd';

const AuthLoginDialogSuccess = ({ transactionAddress }) => {
    const onClickClose = (e) =>{
        let AuthLoginSuccessDialogDom = document.getElementById('AuthLoginDialogSuccess');
        AuthLoginSuccessDialogDom.style.display = 'none'; // 隐藏弹框
    }
	return (
		<div className="AuthLoginDialog" id="AuthLoginDialogSuccess" 
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.70)', margin: 0, padding: 0, overflow: 'hidden auto', position: 'relative' }} 
                onClick={onClickClose}
            >
             <Image 
                    src='/resources/images/close.png' 
                    preview={false} 
                    onClick={onClickClose}
                    style={{ cursor: 'pointer', width: '10%', height: 'auto', position: 'absolute', top: '10px', right: '10px' }} // 设置为百分比样式
            />
            <div className="content">
                <Image 
                    src='/resources/images/homev2/Group 11.png' 
                    preview={false} 
                    style={{ cursor: 'pointer', width: '498px', height: '455px' }} 
                />
                <span className="login-tips">凭证铸造成功</span>
                {transactionAddress && ( // 仅在 transactionAddress 存在时显示
                    <div className="transaction-address" style={{ marginTop: '10px', color: '#fff' }}>
                        链上地址: 
                        <a 
                            href={`${transactionAddress}`} // 替换为适当的区块链浏览器链接
                            style={{ color: '#fff', textDecoration: 'underline' }} // 设置为白色和下划线
                            target="_blank" // 在新标签页中打开链接
                            rel="noopener noreferrer" // 安全性
                        >
                            {transactionAddress}
                        </a>
                    </div>
                )}
            </div>
		</div>
	);
};

export default AuthLoginDialogSuccess;