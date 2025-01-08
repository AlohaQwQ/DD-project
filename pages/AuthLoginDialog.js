import React, { useState, useEffect } from "react";
import { Layout, Spin, Image, Button, Carousel } from 'antd';
const AuthLoginDialog = () => {
    const onClickClose = (e) =>{
        let AuthLoginDialogDom = document.getElementById('AuthLoginDialog')
        AuthLoginDialogDom.style.display = 'none'
    }
	return (
		<div className="AuthLoginDialog" id="AuthLoginDialog" 
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.70)', margin: 0, padding: 0, overflow: 'hidden auto' }}
        onClick={onClickClose}>
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
                <span className="login-tips">凭证铸造中…</span>
            </div>
		</div>
	);
};

export default AuthLoginDialog;