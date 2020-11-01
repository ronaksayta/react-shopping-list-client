import axios from 'axios';
import { returnErrors } from './errorActions';

import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADING
} from './types';

export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    axios.get('/auth/user', tokenConfig(getState))
    .then((response) => dispatch({
        type: USER_LOADED,
        payload: response.data
    })).catch((error) => {
        dispatch(returnErrors(error.response.data, error.response.status));
        dispatch({
            type: AUTH_ERROR
        });
    });
};

export const register = ({name, email, password}) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({name, email, password});

    axios.post('/users', body, config)
    .then((response) => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data
        })
    })
    .catch(error => {
        dispatch(
            returnErrors(error.response.data, error.response.status, 'REGISTER_FAIL')
        );
        dispatch({
            type: REGISTER_FAIL
        })
    })
}

export const tokenConfig = (getState) => {
    const token = getState().auth.token;

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}

export const login = ({email, password}) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({email, password});

    axios.post('/auth', body, config)
    .then((response) => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        })
    })
    .catch(error => {
        dispatch(
            returnErrors(error.response.data, error.response.status, 'LOGIN_FAIL')
        );
        dispatch({
            type: LOGIN_FAIL
        })
    })
}
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT_SUCCESS
    });
}