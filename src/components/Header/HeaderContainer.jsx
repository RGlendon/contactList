import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/authReducer";


class HeaderAPI extends React.Component {
    render() {
        return <Header {...this.props}/>
    }
}

function mapStateToProps(state) {
    return {
        isLogin: state.auth.isLogin,
        login: state.auth.login
    };
}

const mapDispatchToProps = {
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAPI);
