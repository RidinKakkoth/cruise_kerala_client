import { partnerAxiosInstance } from "./axios";

export async function  partnerSignin (email,password){
    try{
        const {data}=await partnerAxiosInstance.post(`partnerSignin`,{email,password})
        return data;
    }catch(error){
 
        return {status:'failed',message:error.response.data.error}
    }
}

export async function  getPartnerProfileData (){
    try{
        const {data}=await partnerAxiosInstance.get(`getPartnerProfile`)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function  updateProfileData (updatedProfileData){
    try{
        const {data}=await partnerAxiosInstance.patch(`update-profile`,{updatedProfileData})
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function updateProfilePic(formData) {
    try {
      const { data } = await partnerAxiosInstance.post(
        "partner-dp",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    } catch (error) {
      return { status: "failed", message: "Network error" };
    }
  }
export async function  getBookings (){
    try{
        const {data}=await partnerAxiosInstance.get(`get-bookings`)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function  partnerSignUp (email,password,phone,name,company){
    try{
        const {data}=await partnerAxiosInstance.post(`partnerSignUp`,{email,password,phone,name,company})
        return data;
    }catch(error){
    
        return {status:'failed',message:error.response.data.error}
    }
}

export async function addCruise(formData) {
    try {
      const {data}  = await partnerAxiosInstance.post(
        "add-cruise",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    } catch (error) {
        
      return { status: false, message: "Network error" };
    }
  }
export async function updateCruise(formData,id) {
    try {
      const { data } = await partnerAxiosInstance.post(
        `update-cruise?id=${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    } catch (error) {
        
      return { status: false, message: "Network error" };
    }
  }



  export async function  getCategories (){
    try{
        const {data}=await partnerAxiosInstance.get(`get-categories`)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function  getCruiseData (){
    try{
        const {data}=await partnerAxiosInstance.get(`cruise-data`)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function  getSingleCruiseData (id){
    try{
        const {data}=await partnerAxiosInstance.get(`single-cruise-data?id=${id}`)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function  blockCruise (id){
    try{
        const {data}=await partnerAxiosInstance.patch(`blockCruise?id=${id}`,{})
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function sendOTP(email){
    try {
        const {data} = await partnerAxiosInstance.post("sendOTP", { email });
        return data;
    } catch (error) {
        
        
        return {status:false,message:error.response.data.message}
    }
}
export async function verifyOTP(email,otp){
    try {
        const {data} = await partnerAxiosInstance.post("verifyOTP", { email,otp });
        return data;
    } catch (error) {
        return {error:error.message}
    }
}
export async function partnerEmailCheck(email) {
    try {
      const { data } = await partnerAxiosInstance.get(`emailTest?email=${email}`);
      return data;
    } catch (error) {
      console.error("Error in emailAuth:", error);
      return { error: error.message };
    }
  }
  
  export async function resetPasswordPartner(email,password) {
    try {
      
      const { data } = await partnerAxiosInstance.post("resetPassword",{email,password});
      return data;
    } catch (error) {
      console.error("Error in emailAuth:", error);
      return { error: error.message };
    }
  }
 
  
  export async function updateProof(formData) {
    try {
      const { data } = await partnerAxiosInstance.post(
        "proof-upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    } catch (error) {
      return { status: "failed", message: "Network error" };
    }
  }


  export async function  getOfferData (){
    try{
        const {data}=await partnerAxiosInstance.get('get-offer-data')
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function  blockOffer (id){
    try{
        const {data}=await partnerAxiosInstance.patch(`blockoffer?id=${id}`,{})
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function  addOffer (datas){
    try{
        const {data}=await partnerAxiosInstance.post(`add-offer`,datas)
        return data;
    }catch(error){
        
        return {status:false,message:error.response.data.error}
    }
}
export async function  deleteOffer (id){
    try{
        const {data}=await partnerAxiosInstance.delete(`delete-offer?id=${id}`,{})
        return data;
    }catch(error){
        
        return {status:false,message:error.response.data.error}
    }
}

