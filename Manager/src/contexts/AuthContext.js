import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';

// apis
import accountApi from '../apis/accountApi';
// slices
import { getArchitects } from '../redux/slices/architect';
import { getNews } from '../redux/slices/news';
import { getProjects } from '../redux/slices/project';
// utils
import { getToken, setToken, isValidToken } from '../utils/jwt';

const initialState = {
    isInitialized: false,
    isAuthenticated: false
};

const handlers = {
    INITIALIZE: (state, action) => {
        const isAuthenticated = action.payload;
        return {
            ...state,
            isInitialized: true,
            isAuthenticated
        }
    },
    LOGIN: (state) => {
        return {
            ...state,
            isAuthenticated: true
        }
    },
    LOGOUT: (state) => {
        return {
            ...state,
            isAuthenticated: false
        }
    }
};

const reducer = (state, action) => handlers[action.type] ? handlers[action.type](state, action) : state;

const propTypes = {
    children: PropTypes.node
};

const AuthContext = createContext({
    ...initialState,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    resetPassword: () => Promise.resolve(),
    editAccount: () => Promise.resolve()
});

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const dispatchSlice = useDispatch();
    useEffect(() => {
        const initialize = async () => {
            try {
                const tokens = getToken();
                setToken(tokens);
                const isAuthenticated = await isValidToken(tokens);
                if (isAuthenticated) {
                    await dispatchSlice(getArchitects());
                    await dispatchSlice(getNews());
                    await dispatchSlice(getProjects());
                }
                dispatch({
                    type: 'INITIALIZE',
                    payload: isAuthenticated
                });
            } catch (error) {
                console.log(error);
            }
        };
        initialize();
    }, [dispatchSlice]);
    const login = async (email, password) => {
        const res = await accountApi.login(email, password);
        if (res.status === 'error') {
            return res;
        }
        setToken(res);
        await dispatchSlice(getArchitects());
        await dispatchSlice(getNews());
        await dispatchSlice(getProjects());
        dispatch({
            type: 'LOGIN'
        });
    };
    const resetPassword = async (email, securityCode, newPassword, newPasswordConfirm) => {
        const res = await accountApi.resetPassword(email, securityCode, newPassword, newPasswordConfirm);
        if (res.status === 'error') {
            return res;
        }
        setToken(null);
        dispatch({
            type: 'LOGOUT'
        });
    };
    const editAccount = async (email, newEmail, oldPassword, newPassword, newPasswordConfirm) => {
        const res = await accountApi.editAccount(email, newEmail, oldPassword, newPassword, newPasswordConfirm);
        if (res.status === 'error') {
            return res;
        }
        setToken(null);
        dispatch({
            type: 'LOGOUT'
        });
    };
    const logout = async () => {
        setToken(null);
        dispatch({
            type: 'LOGOUT'
        });
    };
    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                logout,
                resetPassword,
                editAccount
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = propTypes;

export { AuthProvider, AuthContext };
