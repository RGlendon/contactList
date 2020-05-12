import React, {useState} from "react";
import styles from "./Card.module.css";


const Card = (props) => {
    let {name, phoneNumber, email, avatar, _id} = props.data;

    let [editMode, setEditMode] = useState(false);
    let [urlFieldCondition, setUrlFieldCondition] = useState(false);

    let [localName, setLocalName] = useState(name);
    let [localPhoneNumber, setLocalPhoneNumber] = useState(phoneNumber);
    let [localEmail, setLocalEmail] = useState(email);
    let [localUrl, setLocalUrl] = useState(avatar);


    const activateEditMode = () => {
        setEditMode(true);
    };
    const deactivateEditMode = () => {
        setEditMode(false);
        setUrlFieldCondition(false);

        props.updateContactInfo({
            name: localName,
            phoneNumber: localPhoneNumber,
            email: localEmail,
            avatar: localUrl,
            _id
        });
    };

    const updateName = (event) => {
        setLocalName(event.currentTarget.value);
    };
    const updatePhoneNumber = (event) => {
        setLocalPhoneNumber(event.currentTarget.value);
    };
    const updateEmail = (event) => {
        setLocalEmail(event.currentTarget.value);
    };
    const updateUrl = (event) => {
        setLocalUrl(event.currentTarget.value);
    };

    const toggleUrlField = () => {
        setUrlFieldCondition(!urlFieldCondition);
    };

    return (
        <div className={styles.general}>
            <div className={styles.container}>
                <div className={`${styles.avatarWrapper} ${editMode ? styles.avatarEdit : null}`}>
                    <img
                        src={avatar ? avatar : 'https://cdn.pricearchive.org/images/aliexpress.com/32675545831/Francoise-Nielly-Hand-painted-Marilyn-Monroe-Oil-painting-Modern-Abstract-oil-painting-on-canvas-paintings-for.jpg'}
                        alt={'картинка'}
                        className={`${styles.avatar} ${editMode ? styles.avatarEdit : null}`}
                        onClick={editMode ? () => {
                            toggleUrlField()
                        } : null}/>
                </div>
                {urlFieldCondition &&
                <input type="text" onChange={updateUrl} className={styles.editUrl} value={localUrl}/>}

                {!editMode && <h3 className={styles.name}>{name}</h3>}
                {editMode && <input type="text" onChange={updateName} className={styles.editItem} value={localName}/>}

                {!editMode && <p>{phoneNumber}</p>}
                {editMode &&
                <input type="text" onChange={updatePhoneNumber} className={styles.editItem} value={localPhoneNumber}/>}

                {!editMode && <p>{email}</p>}
                {editMode && <input type="text" onChange={updateEmail} className={styles.editItem} value={localEmail}/>}

                <div className={`${styles.control} ${editMode ? styles.controlEdit : null}`}>
                    {!editMode && <div className={styles.edit} onClick={activateEditMode}/>}
                    {editMode && <div className={styles.approve} onClick={deactivateEditMode}/>}

                    <div className={styles.delete} onClick={() => {
                        props.deleteContact(_id)
                    }}/>
                </div>
            </div>
        </div>
    );
};

export default Card;
