import { createSlice } from "@reduxjs/toolkit";


const userAuth=createSlice({

        name:"User",
        initialState:{
            userToken:null,
            userName:null
        },
        reducers:{
            userAdd(state,action){
                const newItem=action.payload
        
                state.userToken=newItem.token
                state.userName=newItem.userName
            },
            userLogout(state,action){
                state.userToken=""
                state.userName=""
            }
        }
})

// export const adminActions=adminAuth.action
export const { userAdd, userLogout } = userAuth.actions;
export default userAuth