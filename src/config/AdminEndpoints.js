import { adminAxiosInstance } from "./axios";


export async function  adminSignin (email,password){
    try{
        const {data}=await adminAxiosInstance.post(`adminSignin`,{email,password})
        return data;
    }catch(error){
      
        return {status:'failed',message:error.response.data.message}
    }
}
export async function  getNotification (){
    try{
        const {data}=await adminAxiosInstance.get('get-notification')
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function  getBookings (){
    try{
        const {data}=await adminAxiosInstance.get('get-bookings')
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function  getPartnerProfileData (id){
    try{
        const {data}=await adminAxiosInstance.get(`getPartnerProfileData?id=${id}`)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function  cruiseApproval (status,id){
    try{
        const {data}=await adminAxiosInstance.patch(`cruise-approval?result=${status}&id=${id}`,{})
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function  blockCruise (id){
    try{
        const {data}=await adminAxiosInstance.patch(`blockCruise?id=${id}`,{})
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function  cruiseData (){
    try{
        const {data}=await adminAxiosInstance.get(`cruise-data`)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function  deleteNotifications (id){
    try{
        const {data}=await adminAxiosInstance.delete(`delete-notification/${id}`)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function  addCategory (datas){
    try{
        const {data}=await adminAxiosInstance.post(`add-category`,datas)
        return data;
    }catch(error){
        
        return {status:'failed',message:error.response.data.error}
    }
}
export async function  getCategories (){
    try{
        const {data}=await adminAxiosInstance.get(`get-categories`)
        return data;
    }catch(error){
        
        return {status:'failed',message:error?.response?.data?.error}
    }
}
export async function  partnerApproval (status,id){
    try{
        const {data}=await adminAxiosInstance.patch(`partner-approval?result=${status}&id=${id}`,{})
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function  blockPartner (id){
    try{
        const {data}=await adminAxiosInstance.patch(`blockPartner?id=${id}`,{})
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}

export async function  getPartnerData (){
    try{
        const {data}=await adminAxiosInstance.get('getPartnerData')
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function  getUserData (){
    try{
        const {data}=await adminAxiosInstance.get('get-userData')
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}

export async function  blockUser (id){
    try{
        const {data}=await adminAxiosInstance.patch(`blockUser?id=${id}`,{})
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}

export async function  getCouponData (){
    try{
        const {data}=await adminAxiosInstance.get('get-coupon-data')
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function  blockCoupon (id){
    try{
        const {data}=await adminAxiosInstance.patch(`blockCoupon?id=${id}`,{})
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function  addCoupon (datas){
    try{
        const {data}=await adminAxiosInstance.post(`add-coupon`,datas)
        return data;
    }catch(error){
        
        return {status:false,message:error.response.data.error}
    }
}
export async function  deleteCoupon (id){
    try{
        const {data}=await adminAxiosInstance.patch(`delete-coupon?id=${id}`,{})
        return data;
    }catch(error){
        
        return {status:false,message:error.response.data.error}
    }
}
export async function  getPartnerCruiseData (id){
    try{
        const {data}=await adminAxiosInstance.get(`partner-cruise-data?id=${id}`)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}

export async function  getAdminChat (){
    try{
        const {data}=await adminAxiosInstance.get(`adminChat`)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}