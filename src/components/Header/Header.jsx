import React from 'react';
import s from './Header.module.css';


function Header(props) {
    return (
        <header className={s.header}>
            <h1 className={s.title}>Список контактов</h1>
            <div className={s.container}>
                {props.isLogin
                    ? <>
                        <div className={s.avatar}/>
                        <h2 className={s.auth}>{props.login}</h2>
                        <div className={s.button} onClick={props.logout}/>
                    </>
                    : <>
                        <div className={s.avatar} style={{backgroundImage: `url('https://i.livelib.ru/auface/471251/o/ab9f/Yurij_Belous.jpg')`}}/>
                        <h2 className={s.auth}>имя</h2>
                        <div className={s.button} onClick={props.logout}/>
                    </>
                }
            </div>

        </header>
    );
}

export default Header;
