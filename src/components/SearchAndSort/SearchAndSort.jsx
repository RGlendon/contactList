import React from "react";
import s from "./SearchAndSort.module.css";
import {connect} from "react-redux";

import {rewritingInitialState, searchContact} from "../../redux/contactsReducer";


const SearchAndSort = (props) => {

    const updateSearchValue = (event) => {
        props.searchContact(event.currentTarget.value);
    };

    return (
        <div className={s.general}>
            {/*здесь могут быть различные настройки, например, сортировка*/}
            <div></div>
            <input className={s.search} type="text" placeholder="Поиск" onFocus={props.rewritingInitialState} onChange={updateSearchValue}/>
        </div>
    );
};


const mapDispatchToProps = {
    searchContact,
    rewritingInitialState,
}

export default connect(null, mapDispatchToProps)(SearchAndSort);
