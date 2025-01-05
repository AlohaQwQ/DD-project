import React, { useState, useEffect } from 'react';
import { Image,  Carousel } from 'antd';
const usersList = [
    {
        id: '1',
        avatar: '/resources/images/homev2/Group 19.png',
        position: '社区创始人',
        email: '小威 @wangtuai888',
        link: 'https://x.com/wangtuai888',
        introduction: `10年前，在这个行业摸爬滚打，了解比特币的时候2000元人民币一个，参与过
        维卡币，赚了一波肥的，中间归零过好多次，也做过盘圈，社区最多的时候
        2000多人，做过销售，保险，抖音tiktok直播带货，专业影视后期剪辑，在深
        圳的圈子转了很久，很偶然的机会了解到铭文，开启了我的web3生涯，后来接
        触到丹NFT这个项目开始做了推特，3个月时间，终于有了一块落脚之地，认识
        了不少kol好朋友，社区也逐步成型！`,
    },
    {
        id: '2',
        avatar: '/resources/images/homev2/Group 32.png',
        position: '社区主理人',
        email: '小鱼Daisy @vvxiaoyu8888',
        link: 'https://x.com/vvxiaoyu8888',
        introduction: `Hi~ 我是小鱼~
        一个社牛的长期主义价值投资者
        擅长现货/土狗/一级项目，
        铭文进圈，拿过10倍项目/ 链上金狗也抓过不少，
        喜欢研究，更看重项目基本面 / 偶尔波段，盘感看线还不错，
        Web2隐藏身份：互联网不知名主播 / 也欢迎大家来web2找我玩~`,
    },
    {
        id: '3',
        avatar: '/resources/images/homev2/Group 29.png',
        position: '社区代言人',
        email: '观心 @8x8x8_x',
        link: 'https://x.com/8x8x8_x',
        introduction: `17年入圈，早期多以二级市场和合约为主。合约曾经1夜几十万浮盈，
        也体验过3天资产归零。至此不在碰合约。
        基本圈内所有投资方式和板块都多少参与过，熊市的阶段也在不停学习工具和知识技能。
        目前更喜欢做一级市场及投研，听数据基本面说话。深耕btc生态的各种板块赛道。
        明显带来收益的标的：ordi sats dog runestone bome
        个人投资风格慢，低风险慢回报，基本持仓不会低于半年。核心仓位一年只吃2个
        左右的标的收益，小资金仓位跟市场热点板块感受市场风险。`,
    },
    {
        id: '4',
        avatar: '/resources/images/homev2/Group 33.png',
        position: '社区代言人',
        email: '政哥 @0xzheng888',
        link: 'https://x.com/0xzheng888',
        introduction: `0x政—空投猎人。
        入圈前在web2送外卖 误打误撞接触到撸毛 多个空投拿到单币A6，
        特别喜欢挖掘冷门项目 早期alpha 主打零撸白嫖 小成本撸毛，
        盘感垃圾 会撸不会卖 撸毛最主要还是坚持 知行合一`,
    },
    {
        id: '5',
        avatar: '/resources/images/homev2/Group 28.png',
        position: '社区代言人',
        email: '乌啦啦 @nn74550587975',
        link: 'https://x.com/nn74550587975',
        introduction: `乌啦啦，擅长打新，常居链上，
        每一个早期项目一定会有我的身影，性格内向的阿尔法新手！`,
    },
    {
        id: '6',
        avatar: '/resources/images/homev2/Group 30.png',
        position: '社区代言人',
        email: '阿米GO @nininanaeth',
        link: 'https://x.com/nininanaeth',
        introduction: `我是阿米Go，从撸毛实战到现货交易，全职crypto，AI爱好者，
        持续性抽象，间歇性认真的思考的enfp~`,
    },
    {
        id: '7',
        avatar: '/resources/images/homev2/Group 31.png',
        position: '社区代言人',
        email: '猫猫 @web3maomao',
        link: 'https://x.com/web3maomao',
        introduction: `大家好，我是小猫又饿了~
        进入币圈已经四年 第一桶金是Doge，
        先后接触了流动性挖矿（黄油，樱桃），土狗（狗王），现货，合约，铭文，撸毛，
        夹子音｜喜欢二次元｜纯爱战神｜发呆｜最爱撸猫｜
        一路上跟着身边的朋友研究了不少东西，
        也是早期的狗王建设者，还有宝贝狗王。
        期间因为感情问题退圈了一年，
        参与过一些项目的运营（主要是土狗跟炼油），
        总之 刚开始推特请 眼熟我 ♥️关注我 关注DD社区。`,
    },
    {
        id: '8',
        avatar: '/resources/images/homev2/Group 34.png',
        position: '社区代言人',
        email: '甜K @LanceYNchan',
        link: 'https://x.com/LanceYNchan',
        introduction: `在职老师，币圈老韭菜。
        主二级现货/合约/，宏观链上研究，
        周期信仰者，钻石手，缘分赚钱人士`,
    },
    {
        id: '9',
        avatar: '/resources/images/homev2/Group 35.png',
        position: '社区代言人',
        email: '妮可 @nekoweb3',
        link: 'https://x.com/nekoweb3',
        introduction: `入圈五年，擅长现货/合约/DeFi/撸毛。
        参与过一些项目DAO组织，社区早期建设者与运营，
        有一套属于自己的交易系统的微六边形女战士。`,
    }
]

const CarouselComp = () => {
  return (
    <>
        <div className="carousel">
            <Carousel arrows autoplay infinite={true} dots={false} >
                {usersList.map(item => (
                    <div className="carousel-item" key={item.id}>
                        <div className="item-avatar">
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                                <Image 
                                    src={item.avatar} 
                                    preview={false} 
                                    style={{ cursor: 'pointer', width: '100%', height: '100%' }} 
                                />
                            </a>
                        </div>
                        <div className="item-position">{item.position}</div>
                        <a href={item.link} className="item-email" target="_blank" rel="noopener noreferrer">{item.email}</a>
                        <div className="item-introduction">{item.introduction}</div>
                    </div>
                ))}
            </Carousel>
        </div>
    </>
  );
};

export default CarouselComp;