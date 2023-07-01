import { createSlice } from "@reduxjs/toolkit";


const partnerAuth=createSlice({

    name:"partner",
    initialState:{
        partnerToken:null
    },
    reducers:{
        partnerAdd(state,action){
            const newItem=action.payload

            state.partnerToken=newItem.token
            console.log(newItem,"nwwwwwww");
        },
        partnerLogout(state,action){
            state.partnerToken=""
        }
    }
})

export const{partnerAdd,partnerLogout}=partnerAuth.actions

export default partnerAuth