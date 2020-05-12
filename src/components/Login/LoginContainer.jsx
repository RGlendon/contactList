import Login from "./Login";
import {connect} from "react-redux";
import {login, sendError} from "../../redux/authReducer";

const mapStateToProps = (state) => {
    return {
        isLogin: state.auth.isLogin,
    }
}

const mapDispatchToProps = {
    login,
    //thunkCreators
    sendError,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
