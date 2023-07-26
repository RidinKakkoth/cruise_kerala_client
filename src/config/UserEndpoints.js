import { async } from "react-input-emoji";
import { userAxiosInstance } from "./axios";

export async function  userSignUp (email,password,phone,name,company){
    try{
        const {data}=await userAxiosInstance.post(`userSignUp`,{email,password,phone,name})
        return data;
    }catch(error){
    
        return {status:'failed',message:error.response.data.error}
    }
}
export async function  userSignin (email,password){
    try{
        const {data}=await userAxiosInstance.post(`userSignin`,{email,password})
        return data;
    }catch(error){
 
        return {status:'failed',message:error.response.data.error}
    }
}

export async function  cruiseData (){
    try{
        const {data}=await userAxiosInstance.get(`cruise-data`)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function  bookedDatesData (id){
    try{
        const {data}=await userAxiosInstance.get(`booked-dates?id=${id}`)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function  verifyPayment (response){
    try{
        const {data}=await userAxiosInstance.post(`verify`,response)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function  orders (totalAmount,guest,checkOutDate,checkInDate,cruiseId){
    try{
        const {data}=await userAxiosInstance.post(`orders`,{totalAmount,guest,checkOutDate,checkInDate,cruiseId})
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function sendOTP(email){
    try {
        const {data} = await userAxiosInstance.post("sendOTP", { email });
        return data;
    } catch (error) {
        return {error:error.message}
    }
}
export async function verifyOTP(email,otp){
    try {
        const {data} = await userAxiosInstance.post("verifyOTP", { email,otp });
        return data;
    } catch (error) {
        return {error:error.message}
    }
}



