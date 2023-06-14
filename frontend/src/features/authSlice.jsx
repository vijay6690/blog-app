import {createSlice , createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import { useEffect } from "react"


const initialState = {
    currentUser :JSON.parse(localStorage.getItem("user") )
}

export const registerAsynce = createAsyncThunk(
    "users/registeruser",
    async (inputs) => {
        const res = await axios.post("/auth/register",inputs)
        return res.data
    }
)

export const loginAsynce = createAsyncThunk(
    "users/loginuser",
    async (inputs) => {
        const res = await axios.post("/auth/login",inputs)
        return res.data
    }
)

export const authSlice = createSlice({
    name :"users",
    initialState,
    reducers:{},

    extraReducers : (builder) => {
        builder.addCase(registerAsynce.fulfilled,(state,action) => {
            state.status = "idle";
            state.currentUser = action.payload
        })
        .addCase(loginAsynce.fulfilled,(state,action) => {
            state.status = "idle";
            state.currentUser = action.payload
        })

    }
})

export default authSlice.reducer;
