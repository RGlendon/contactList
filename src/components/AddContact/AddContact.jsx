import React from "react";
import {Field, reduxForm} from "redux-form";
import {validate, validators, optional, combine} from 'validate-redux-form';

import styles from "./AddContact.module.css";

import {renderInput} from "../common/ValidatorForms/ValidatorForms";
import {isCorrectEmail, isCorrectPhoneNumber, isCorrectUrl} from "../common/ValidatorForms/validators";



let ContactForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={styles.form}>
            <div className={styles.columns}>
                <div className={styles.column}>
                    <div className={styles.inputPlace}>
                        <Field component={renderInput} type="text" name="name" placeholder={'Введите ФИО*'}/>
                    </div>
                    <div className={styles.inputPlace}>
                        <Field component={renderInput} type="tel" name="phoneNumber" placeholder={'Введите телефон*'}/>
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.inputPlace}>
                        <Field component={renderInput} type="email" name="email" placeholder={'Введите почту'}/>
                    </div>
                    <div className={styles.inputPlace}>
                        <Field component={renderInput} type="url" name="avatar" placeholder={'Добавьте аватар'}/>
                    </div>
                </div>
            </div>
            <div className={styles.commonError}>
                {props.error}
            </div>
            <button className={styles.button} disabled={props.invalid}>Добавить</button>
        </form>
    );
};

ContactForm = reduxForm({
    form: 'contactForm',
    validate: (data) => {
        return validate(data, {
            name: combine(
                validators.exists()('это поле обязательно для заполнения'),
                validators.length({min: 3})('должно содержать min 3 буквы')
            ),
            phoneNumber: combine(
                validators.exists()('это поле обязательно для заполнения'),
                isCorrectPhoneNumber()('введите номер телефона в формате: (+7/8)9167773232')
            ),
            email: optional(isCorrectEmail()('введите email в формате: hello.everybody@yandex.ru')),
            avatar: optional(isCorrectUrl()('введите URL в формате: http://my-site.ru/...')),
        })
    }
})(ContactForm);


const AddContact = (props) => {
    let formRef = React.createRef();
    let accordionRef = React.createRef();
    let i = 5

    const onSubmit= (formData) => {
        if (Object.keys(formData).length !== 0) {
            props.addContact({...formData, _id: i});
            i++;
            openPanel();
        }

    };

    function openPanel(e) {
        let eTarget = (e) ? e.target : accordionRef.current;
        if (eTarget.matches(`.${styles.accordion}`)) {
            eTarget.classList.toggle(`${styles.active}`);

            let panel = eTarget.nextElementSibling;

            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                formRef.current.reset('contactForm');
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        }
    }

    return (
        <div className={styles.general}>
            <div className={styles.wrapper} onClick={openPanel}>
                <button className={styles.accordion} ref={accordionRef}>Добавить контакт</button>
                <div className={styles.panel}>
                    <ContactForm onSubmit={onSubmit} ref={formRef}/>
                </div>
            </div>
        </div>
    );
};


export default AddContact;
