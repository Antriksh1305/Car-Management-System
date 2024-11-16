import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userToken: null,
};

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        logOut: state => {
            state.userToken = null;
        },
        updateUser: (state, action) => {
            state.userToken = action.payload.userToken;
        }
    },
});

export default userSlice.reducer;

export const { logOut, updateUser } = userSlice.actions;