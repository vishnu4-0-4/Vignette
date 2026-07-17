import {createSlice} from '@reduxjs/toolkit';

const intialstate={
    userData:null,
    status:false,
}

const authslice=createSlice({
    name:'auth',
    initialState:intialstate,
    reducers:{
        login:(state,action)=>{
            state.userData=action.payload.userData;
            state.status=true;
        },
        logout:(state)=>{
            state.userData=null;
            state.status=false;
        }
    }
})
export const {login,logout}=authslice.actions
export default authslice.reducer;