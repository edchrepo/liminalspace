import { AUTH2 } from '../constants/actionTypes';
import * as api from '../api';

//async (dispatch) syntax for redux thunk
export const signin = (formData, history) => async (dispatch) => {
    try {
        // log in the user ..
        const { data } = await api.signIn(formData);
        
        dispatch({ type: AUTH2, data });

        history.push('/')
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        // sign up the user ..
        const { data } = await api.signUp(formData);
        
        dispatch({ type: AUTH2, data });

        history.push('/')
    } catch (error) {
        console.log(error);
    }
}


