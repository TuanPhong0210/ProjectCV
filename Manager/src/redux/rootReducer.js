import { combineReducers } from 'redux';

// slices
import snackbarReducer from './slices/snackbar';
import architectReducer from './slices/architect';
import newsReducer from './slices/news';
import projectReducer from './slices/project';

const rootReducer = combineReducers({
    snackbar: snackbarReducer,
    architect: architectReducer,
    news: newsReducer,
    project: projectReducer
});

export { rootReducer };
