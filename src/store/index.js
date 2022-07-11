import { configureStore } from '@reduxjs/toolkit';

//keep alive
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
}

const store = configureStore({
    reducer: [

    ],
    devTools: true,
    middleware: getComputedStyle => getComputedStyle({
        serializableCheck: true,
    }),
});
export default store;
export const persistor = persistStore(store);