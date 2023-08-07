
// import { userAxiosInstance } from "./axios";

// export async function  userSignUp (email,password,phone,name,company){
//     try{
//         const {data}=await userAxiosInstance.post(`userSignUp`,{email,password,phone,name})
//         return data;
//     }catch(error){
    
//         return {status:'failed',message:error.response.data.error}
//     }
// }
// export async function  userSignin (email,password){
//     try{
//         const {data}=await userAxiosInstance.post(`userSignin`,{email,password})
//         return data;
//     }catch(error){
 
//         return {status:'failed',message:error.response.data.error}
//     }
// }

// export async function  cruiseData (){
//     try{
//         const {data}=await userAxiosInstance.get(`cruise-data`)
//         return data;
//     }catch(error){
//         return {status:'failed',message:'Network error'}
//     }
// }
// export async function  bookedDatesData (id){
//     try{
//         const {data}=await userAxiosInstance.get(`booked-dates?id=${id}`)
//         return data;
//     }catch(error){
//         return {status:'failed',message:'Network error'}
//     }
// }
// export async function  verifyPayment (response){
//     try{
//         const {data}=await userAxiosInstance.post(`verify`,response)
//         return data;
//     }catch(error){
//         return {status:'failed',message:'Network error'}
//     }
// }
// export async function  orders (totalAmount,guest,checkOutDate,checkInDate,cruiseId,discount,tax,fee){
//     try{
//         const {data}=await userAxiosInstance.post(`orders`,{totalAmount,guest,checkOutDate,checkInDate,cruiseId,discount,tax,fee})
//         return data;
//     }catch(error){
//         return {status:'failed',message:'Network error'}
//     }
// }
// export async function sendOTP(email){
//     try {
//         const {data} = await userAxiosInstance.post("sendOTP", { email });
//         return data;
//     } catch (error) {
        
        
//         return {status:false,message:error.response.data.message}
//     }
// }
// export async function verifyOTP(email,otp){
//     try {
//         console.log(email,otp,"ppppppppppppp");
//         const {data} = await userAxiosInstance.post("verifyOTP", { email,otp });
//         return data;
//     } catch (error) {
//         return {error:error.message}
//     }
// }
// export async function userEmailCheck(email) {
//     try {
//       const { data } = await userAxiosInstance.get(`emailTest?email=${email}`);
//       return data;
//     } catch (error) {
//       console.error("Error in emailAuth:", error);
//       return { error: error.message };
//     }
//   }
// export async function resetPassword(email,password) {
//     try {
//       const { data } = await userAxiosInstance.post("resetPassword",{email,password});
//       return data;
//     } catch (error) {
//       console.error("Error in emailAuth:", error);
//       return { error: error.message };
//     }
//   }
// export async function applyCoupon(coupon) {
//     try {
//       const { data } = await userAxiosInstance.post("apply-coupon",{coupon});
//       console.log(data,"data");
//       return data;
//     } catch (error) {
//       return { message: error.response.data.message, status:false };
//     }
//   }
  

//   export async function  getCruiseOffer (id){
//     try{
//         const {data}=await userAxiosInstance.get(`get-cruise-offer?id=${id}`)
//         return data;
//     }catch(error){
//         return {status:'failed',message:'Network error'}
//     }
// }
//   export async function  getCouponData(){
//     try{
//         const {data}=await userAxiosInstance.get(`get-coupon`)
//         return data;
//     }catch(error){
//         return {status:'failed',message:'Network error'}
//     }
// }


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
export async function  orders (totalAmount,guest,checkOutDate,checkInDate,cruiseId,discount,tax,fee){
    try{
        const {data}=await userAxiosInstance.post(`orders`,{totalAmount,guest,checkOutDate,checkInDate,cruiseId,discount,tax,fee})
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
        
        
        return {status:false,message:error.response.data.message}
    }
}
export async function verifyOTP(email,otp){
    try {
        console.log(email,otp,"ppppppppppppp");
        const {data} = await userAxiosInstance.post("verifyOTP", { email,otp });
        return data;
    } catch (error) {
        return {error:error.message}
    }
}
export async function userEmailCheck(email) {
    try {
      const { data } = await userAxiosInstance.get(`emailTest?email=${email}`);
      return data;
    } catch (error) {
      console.error("Error in emailAuth:", error);
      return { error: error.message };
    }
  }
export async function resetPassword(email,password) {
    try {
      const { data } = await userAxiosInstance.post("resetPassword",{email,password});
      return data;
    } catch (error) {
      console.error("Error in emailAuth:", error);
      return { error: error.message };
    }
  }
export async function applyCoupon(coupon) {
    try {
      const { data } = await userAxiosInstance.post("apply-coupon",{coupon});
      console.log(data,"data");
      return data;
    } catch (error) {
      return { message: error.response.data.message, status:false };
    }
  }
  

  export async function  getCruiseOffer (id){
    try{
        const {data}=await userAxiosInstance.get(`get-cruise-offer?id=${id}`)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
  export async function  getCouponData(){
    try{
        const {data}=await userAxiosInstance.get(`get-coupon`)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}

export async function  cancelBooking (id){
    try{
        const {data}=await userAxiosInstance.patch(`cancel-booking?id=${id}`,{})
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}

export async function  getUserData (){
    try{
        const {data}=await userAxiosInstance.get(`getUserData`)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function  sendReview (obj){
    try{
        const {data}=await userAxiosInstance.post(`review`,obj)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function  getBookings (){
    try{
        const {data}=await userAxiosInstance.get(`bookings`)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}

export async function updateProfilePic(formData) {
    try {
      const { data } = await userAxiosInstance.post(
        "user-pic",
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

  export async function  updateProfileData (updatedProfileData){
    try{
        const {data}=await userAxiosInstance.patch(`update-profile`,updatedProfileData)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function  singleView (id){
    try{
        const {data}=await userAxiosInstance.get(`single-view/${id}`)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}

export async function  getUserChat (){
    try{
        const {data}=await userAxiosInstance.get(`userChat`)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}
export async function  createChat (){
    try{
        const {data}=await userAxiosInstance.post(`createChat`)
        return data;
    }catch(error){
        return {status:'failed',message:'Network error'}
    }
}