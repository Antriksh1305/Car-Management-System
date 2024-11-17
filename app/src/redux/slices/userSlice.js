import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userToken: null,
    userData: null,
};

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        logOut: state => {
            state.userToken = null;
            state.userData = null;
        },
        updateUser: (state, action) => {
            state.userToken = action.payload.userToken;
            state.userData = action.payload.userData;
        }
    },
});

export default userSlice.reducer;

export const { logOut, updateUser } = userSlice.actions;