import React, { useState, useEffect } from "react";
import { Layout, Spin, Image, Button, Carousel } from 'antd';

const AuthLoginDialogSuccess = ({ transactionAddress }) => {
    const onClickClose = (e) =>{
        let AuthLoginSuccessDialogDom = document.getElementById('AuthLoginDialogSuccess');
        AuthLoginSuccessDialogDom.style.display = 'none'; // 隐藏弹框
    }
	return (
		<div className="AuthLoginDialog" id="AuthLoginDialogSuccess" 
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.70)', margin: 0, padding: 0, overflow: 'hidden auto' }} 
                onClick={onClickClose}
            >
            <div className="content">
                <div className="dialog-close-icon">
                    <Image 
                        src='/resources/images/close.png' 
                        preview={false} 
                        onClick={onClickClose}
                    />
                </div>
                <div className="dialog-bgimg">
                    <Image 
                        src='/resources/images/homev2/Group 11.png' 
                        preview={false}
                    />
                </div>
                <span className="login-tips">凭证铸造成功</span>
                {transactionAddress && ( // 仅在 transactionAddress 存在时显示
                    <div className="address" style={{ color: '#fff' }}>
                        查看交易: 
                        <a 
                            href={`${transactionAddress}`} // 替换为适当的区块链浏览器链接
                            style={{ color: '#fff', textDecoration: 'underline' }} // 设置为白色和下划线
                            target="_blank" // 在新标签页中打开链接
                            rel="noopener noreferrer" // 安全性
                        >
                            {transactionAddress.length > 30 
                                ? `${transactionAddress.slice(0, 30)}...` // 超过30个字符则截断并添加省略号
                                : transactionAddress // 否则显示完整地址
                            }
                        </a>
                    </div>
                )}
            </div>
		</div>
	);
};

export default AuthLoginDialogSuccess;