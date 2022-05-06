import { Alert } from '@mui/material';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// apis
import newsApi from '../../apis/newsApi';
// slices
import { initSnackbar } from '../../redux/slices/snackbar';

const initialState = {
    news: null
};

export const getNews = createAsyncThunk('news/getNews', async () => {
    const news = await newsApi.findAll();
    return news;
});

const slice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        insertSuccess: (state, action) => {
            state.news = [...state.news, action.payload];
        },
        editSuccess: (state, action) => {
            const { _id, ...newBody } = action.payload;
            state.news = state.news.map(_news => _news._id === _id ? { ..._news, ...newBody } : _news);
        },
        deleteOneSuccess: (state, action) => {
            state.news = state.news.filter(_news => _news._id !== action.payload);
        },
        deleteMultipleSuccess: (state, action) => {
            state.news = state.news.filter(_news => !action.payload.includes(_news._id));
        },
        restoreSuccess: (state, action) => {
            state.news = [...state.news, action.payload];
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getNews.fulfilled, (state, action) => {
                state.news = action.payload;
            })
            .addDefaultCase(state => state)
    }
});

export default slice.reducer;

export const insertNews = params => async dispatch => {
    try {
        const { resetForm, confirm, formData } = params;
        const res = await newsApi.insert(formData);
        let { statusText, message, news } = res;
        if (statusText === 'info') {
            await confirm({
                title: message,
                content: <Alert severity={statusText}>Bạn có muốn khôi phục không?</Alert>
            });
            const restore = await newsApi.restoreById(news._id);
            statusText = restore.statusText;
            message = restore.message;
            dispatch(slice.actions.restoreSuccess(news));
        }
        if (statusText === 'success') {
            dispatch(slice.actions.insertSuccess(news));
        }
        dispatch(initSnackbar({
            isOpen: true,
            type: statusText,
            message: message,
            anchor: 'bottom-center'
        }));
        resetForm();
    } catch (error) {
        console.log(error);
    }
};

export const editNews = params => async dispatch => {
    try {
        const { navigate, path, confirm, newsId, formData } = params;
        const res = await newsApi.edit(newsId, formData);
        let { statusText, message, news } = res;
        if (statusText === 'info') {
            await confirm({
                title: message,
                content: <Alert severity={statusText}>Đổi một tiêu đề mới hoặc khôi phục ngay</Alert>
            });
            const restore = await newsApi.restoreById(news._id);
            statusText = restore.statusText;
            message = restore.message;
            dispatch(slice.actions.restoreSuccess(news));
        }
        if (statusText === 'success') {
            dispatch(slice.actions.editSuccess(news));
        }
        dispatch(initSnackbar({
            isOpen: true,
            type: statusText,
            message: message,
            anchor: 'bottom-center'
        }));
        navigate(path);
    } catch (error) {
        console.log(error);
    }
};

export const deleteNews = params => async dispatch => {
    try {
        const res = await newsApi.deleteById(params);
        const { statusText, message, newsId } = res;
        if (statusText === 'success') {
            dispatch(slice.actions.deleteOneSuccess(newsId));
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

export const deleteMultipleNews = params => async dispatch => {
    try {
        const res = await newsApi.deleteAll(params);
        const { statusText, message, newsIds } = res;
        if (statusText === 'success') {
            dispatch(slice.actions.deleteMultipleSuccess(newsIds));
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
