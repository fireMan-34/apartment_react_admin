import { createSlice } from '@reduxjs/toolkit';
import { setCurMenu } from '../../../hoteladmin/src/store/commonSlice';

import menu from './menu';

const initialState = {
    menu,
    curMenu: '首页',
};

export const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        setMenu(state, action) {
            state.menu = action.payload;
        },
        setCurMenu(state, action) {
            state.curMenu = action.payload;
        }
    }
});

export const { setMenu, setCurMenu } = commonSlice.actions;

export default commonSlice.reducer;