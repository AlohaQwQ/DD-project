import React, { useState, useEffect } from "react";
import { Layout, Spin, Image, Button, Carousel } from 'antd';
const AuthLoginDialog = () => {
    const onClickClose = (e) =>{
        let AuthLoginDialogDom = document.getElementById('AuthLoginDialog')
        AuthLoginDialogDom.style.display = 'none'
    }
	return (
		<div className="AuthLoginDialog" id="AuthLoginDialog" style={{ 'background-color': 'rgba(0, 0, 0, 0.70)', 'margin': 0, 'padding': 0, 'overflow': 'hidden auto' }} onClick={onClickClose}>
            <div className="content">
                <Image 
                    src='/resources/images/homev2/Group 11.png' 
                    preview={false} 
                    style={{ cursor: 'pointer', width: '498px', height: '455px' }} 
                />
                <span className="login-tips">凭证铸造中…</span>
            </div>
		</div>
	);
};

export default AuthLoginDialog;