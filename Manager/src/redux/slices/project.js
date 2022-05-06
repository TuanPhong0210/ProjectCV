import { Alert } from '@mui/material';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// apis
import projectApi from '../../apis/projectApi';
// slices
import { initSnackbar } from '../../redux/slices/snackbar';

const initialState = {
    projects: null
};

export const getProjects = createAsyncThunk('project/getProjects', async () => {
    const projects = await projectApi.findAll();
    return projects;
});

const slice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        insertSuccess: (state, action) => {
            state.projects = [...state.projects, action.payload];
        },
        editSuccess: (state, action) => {
            const { _id, ...newBody } = action.payload;
            state.projects = state.projects.map(project => project._id === _id ? { ...project, ...newBody } : project);
        },
        deleteOneSuccess: (state, action) => {
            state.projects = state.projects.filter(project => project._id !== action.payload);
        },
        deleteMultipleSuccess: (state, action) => {
            state.projects = state.projects.filter(project => !action.payload.includes(project._id));
        },
        restoreSuccess: (state, action) => {
            state.projects = [...state.projects, action.payload];
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getProjects.fulfilled, (state, action) => {
                state.projects = action.payload;
            })
            .addDefaultCase(state => state)
    }
});

export default slice.reducer;

export const insertProject = params => async dispatch => {
    try {
        const { confirm, resetForm, formData } = params;
        const res = await projectApi.insert(formData);
        let { statusText, message, project } = res;
        if (statusText === 'info') {
            await confirm({
                title: message,
                content: <Alert severity={statusText}>Bạn có muốn khôi phục không?</Alert>
            });
            const restore = await projectApi.restoreById(project._id);
            statusText = restore.statusText;
            message = restore.message;
            dispatch(slice.actions.restoreSuccess(project));
        }
        if (statusText === 'success') {
            dispatch(slice.actions.insertSuccess(project));
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

export const editProject = params => async dispatch => {
    try {
        const { confirm, navigate, path, projectId, formData } = params;
        const res = await projectApi.edit(projectId, formData);
        let { statusText, message, project } = res;
        if (statusText === 'info') {
            await confirm({
                title: message,
                content: <Alert severity={statusText}>Đổi một tiêu đề mới hoặc khôi phục ngay</Alert>
            });
            const restore = await projectApi.restoreById(project._id);
            statusText = restore.statusText;
            message = restore.message;
            dispatch(slice.actions.restoreSuccess(project));
        }
        if (statusText === 'success') {
            dispatch(slice.actions.editSuccess(project));
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

export const deleteProject = params => async dispatch => {
    try {
        const res = await projectApi.deleteById(params);
        const { statusText, message, projectId } = res;
        if (statusText === 'success') {
            dispatch(slice.actions.deleteOneSuccess(projectId));
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

export const deleteProjects = params => async dispatch => {
    try {
        const res = await projectApi.deleteAll(params);
        const { statusText, message, projectIds } = res;
        if (statusText === 'success') {
            dispatch(slice.actions.deleteMultipleSuccess(projectIds));
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
