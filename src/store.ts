import { StoreEnhancer } from 'redux';
import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { serializeStore } from './utils/redux';

import activityReducer from './redux/activity';
import inventoryReducer from './redux/inventory';
import experienceReducer from './redux/experience';

export const store = configureStore({
    reducer: {
        activity: activityReducer,
        inventory: inventoryReducer,
        experience: experienceReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(serializeStore),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
