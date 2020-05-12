import React from "react";
import s from "./Contacts.module.css";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import HeaderContainer from "../Header/HeaderContainer";
import SearchAndSort from "../SearchAndSort/SearchAndSort";
import ContactList from "../ContactList/ContactList";
import AddContactContainer from "../AddContact/AddContactContainer";

const Contacts = (props) => {
    return (
        <div className={s.general}>
            <HeaderContainer/>
            <AddContactContainer/>
            <SearchAndSort/>
            <ContactList/>
        </div>
    );
};

export default compose(
    withAuthRedirect,
)(Contacts);
