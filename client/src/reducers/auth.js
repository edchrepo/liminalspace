// import { googleLogout } from '@react-oauth/google';
import { AUTH, AUTH2, LOGOUT, UPDATE_USER } from '../constants/actionTypes'


const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action?.data };
        case AUTH2:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action?.data };
        case UPDATE_USER:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            alert("Profile changed successfully. Please re-log in to see changes.")
            return { ...state, authData: action?.data };
        case LOGOUT:
            // googleLogout();
            localStorage.clear();
            return { ...state, authData: null };
        default:
            return state;
    }
}

export default authReducer;