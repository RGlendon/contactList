import React from "react";
import {Field, reduxForm} from "redux-form";
import {required} from "../common/ValidatorForms/validators";
import {renderInput} from "../common/ValidatorForms/ValidatorForms";
import styles from "./Login.module.css";
import {Redirect} from "react-router-dom";


let LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={styles.form}>
            <div className={styles.inputPlace}>
                <Field component={renderInput} type="text" name="email" placeholder={'Ваша почта'}
                       validate={[required]}/>
            </div>
            <div className={styles.inputPlace}>
                <Field component={renderInput} type="password" name="password" placeholder={'введите пароль'}
                       validate={[required]}/>
            </div>
            <div className={styles.errorPosition}>
                <div className={styles.commonError}>
                    {props.error}
                </div>
            </div>
            <button className={styles.button} disabled={props.invalid}>Вход</button>
        </form>
    );
};

LoginForm = reduxForm({form: 'loginForm'})(LoginForm);


const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData);
        props.sendError();
    };

    if (props.isLogin) return <Redirect to="/contacts"/>;

    return (
        <div className={styles.general}>
            <div className={styles.content}>
                <div className={styles.information} title={"email: youarethebest@yandex.ru\npassword: 12345"}/>
                <h1 className={styles.title}>Авторизация</h1>
                <LoginForm onSubmit={onSubmit}/>
            </div>
        </div>
    );
};

export default Login;
