import React from 'react';
import './App.css';
import './assets/vendor/normalize.css';
import './assets/vendor/common.css';
import {Route} from "react-router-dom";


import LoginContainer from "./components/Login/LoginContainer";

import Contacts from "./components/Pages/Contacts";


function App(props) {
    return (
        <div>
            <Route path='/login' render={() => <LoginContainer/>}/>
            <Route path='/' render={() => <Contacts/>}/>
        </div>
    );
}


export default App;
