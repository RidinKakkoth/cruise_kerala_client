import { messageAxiosInstance } from "./axios";


export async function  getMessage (id){
    try{
        const {data}=await messageAxiosInstance.get(`${id}`)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function  sendNewMessage (senderId,chatId,text){
    try{
        const {data}=await messageAxiosInstance.post({senderId,chatId,text})
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}