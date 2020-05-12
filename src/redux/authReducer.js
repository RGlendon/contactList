import {stopSubmit} from "redux-form";

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const initialState = {
    id: null,
    login: 'Oleg',
    email: 'youarethebest@yandex.ru',
    password: '12345',
    // isLogin: true
    isLogin: false
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            if (action.data.email === state.email && action.data.password === state.password) {
                return {
                    ...state,
                    isLogin: true
                }
            }
            sendError();
            return {
                ...state,
                isLogin: false,
            };
        case
        LOGOUT:
            return {
                ...state,
                isLogin: false,
            };
        default:
            return state;
    }
}

export default authReducer;


export const login = (data) => ({type: LOGIN, data});
export const logout = () => ({type: LOGOUT});


export const sendError = () => (dispatch) => {
    let message = 'неправильный логин или пароль';
    dispatch(stopSubmit('loginForm', {_error: message}));
};

