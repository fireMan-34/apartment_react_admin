import { configureStore } from '@reduxjs/toolkit';

import adminReducer from './adminSlice';
import commonReducer from './commonSlice';

//keep alive
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
}

const persistedAdminReducer = persistReducer(persistConfig, adminReducer);
const persistedCommonReducer = persistReducer(persistConfig, commonReducer);

const store = configureStore({
    reducer: {
        admin: persistedAdminReducer,
        common: persistedCommonReducer,
    },
    devTools: true,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    }),
});
export default store;
export const persistor = persistStore(store);