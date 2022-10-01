import { AUTH2, UPDATE_USER } from '../constants/actionTypes';
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

export const updateUser = (imageData) => async (dispatch) => {
    try {
        const imgData = JSON.stringify(imageData);
        const { data } = await api.updateUser({ data: imgData });
        dispatch({ type: UPDATE_USER, data });

        // history.push(`/profile/${data?.result?.given_name.replace(/\s/g, '')}`);
    } catch (error) {
        console.log(error);
    }
}


