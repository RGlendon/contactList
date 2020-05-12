import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

export const withAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isLogin) return <><Redirect to='/login' /><Component {...this.props}/></>;
            return <Component {...this.props}/>
        }
    }

    let mapStateToProps = (state) => ({
        isLogin: state.auth.isLogin,
    });

    return connect(mapStateToProps)(RedirectComponent);
};
