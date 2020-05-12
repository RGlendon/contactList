import React from "react";
import s from './Validators.module.css';


export const renderInput = (fieldData) => {
    // console.log(fieldData);
    // console.log(fieldData.meta);
    // {input, label, type, meta: {touched, error, warning}}
    const {input, meta, ...restProps} = fieldData;
    const hasError = meta.touched && meta.error;

    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            <input {...input}{...restProps} className={s.input}/>
            <div>
                {hasError && <span className={s.spanError}>{meta.error}</span> }
            </div>
        </div>
    );
};


export const renderTextarea = (fieldData) => {
    const {input, meta, ...restProps} = fieldData;
    const hasError = meta.touched && meta.error;

    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            <textarea {...input}{...restProps}/>
            <div>
                {hasError && <span>{meta.error}</span> }
            </div>
        </div>
    );
}
