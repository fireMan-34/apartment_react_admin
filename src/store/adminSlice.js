import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    adminInfo: null,
};

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdminInfo(state, action) {
            state.adminInfo = action.payload;
        }
    }
});
export const { setAdminInfo } = adminSlice.actions;

export default adminSlice.reducer;