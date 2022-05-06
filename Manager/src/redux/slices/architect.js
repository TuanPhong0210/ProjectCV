import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// apis
import architectApi from '../../apis/architectApi';
// slices
import { initSnackbar } from '../../redux/slices/snackbar';

const initialState = {
    architects: null
};

export const getArchitects = createAsyncThunk('architect/getArchitects', async () => {
    const architects = await architectApi.findAll();
    return architects;
});

const slice = createSlice({
    name: 'architect',
    initialState,
    reducers: {
        insertSuccess: (state, action) => {
            state.architects = [...state.architects, action.payload];
        },
        editSuccess: (state, action) => {
            const { _id, ...newBody } = action.payload;
            state.architects = state.architects.map(architect => architect._id === _id ? { ...architect, ...newBody } : architect);
        },
        deleteOneSuccess: (state, action) => {
            state.architects = state.architects.filter(architect => architect._id !== action.payload);
        },
        deleteMultipleSuccess: (state, action) => {
            state.architects = state.architects.filter(architect => !action.payload.includes(architect._id));
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getArchitects.fulfilled, (state, action) => {
                state.architects = action.payload;
            })
            .addDefaultCase(state => state)
    }
});

export default slice.reducer;

export const insertArchitect = params => async dispatch => {
    try {
        const res = await architectApi.insert(params);
        const { statusText, message, architect } = res;
        if (statusText === 'success') {
            dispatch(slice.actions.insertSuccess(architect));
        }
        dispatch(initSnackbar({
            isOpen: true,
            type: statusText,
            message: message,
            anchor: 'bottom-center'
        }));
    } catch (error) {
        console.log(error);
    }
};

export const editArchitect = params => async dispatch => {
    try {
        const { architectId, formData } = params;
        const res = await architectApi.edit(architectId, formData);
        const { statusText, message, architect } = res;
        if (statusText === 'success') {
            dispatch(slice.actions.editSuccess(architect));
        }
        dispatch(initSnackbar({
            isOpen: true,
            type: statusText,
            message: message,
            anchor: 'bottom-center'
        }));
    } catch (error) {
        console.log(error);
    }
};

export const deleteArchitect = params => async dispatch => {
    try {
        const res = await architectApi.deleteById(params);
        const { statusText, message, architectId } = res;
        if (statusText === 'success') {
            dispatch(slice.actions.deleteOneSuccess(architectId));
        }
        dispatch(initSnackbar({
            isOpen: true,
            type: statusText,
            message: message,
            anchor: 'bottom-center'
        }));
    } catch (error) {
        console.log(error);
    }
};

export const deleteArchitects = params => async dispatch => {
    try {
        const res = await architectApi.deleteAll(params);
        const { statusText, message, architectIds } = res;
        if (statusText === 'success') {
            dispatch(slice.actions.deleteMultipleSuccess(architectIds));
        }
        dispatch(initSnackbar({
            isOpen: true,
            type: statusText,
            message: message,
            anchor: 'bottom-center'
        }));
    } catch (error) {
        console.log(error);
    }
};
