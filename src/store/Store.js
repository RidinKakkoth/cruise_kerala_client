import { configureStore } from "@reduxjs/toolkit";
// import UserAuth  from "./UserAuth";
import adminAuth from "./AdminAuth";
import partnerAuth from "./PartnerAuth";
import userAuth from "./UserAuth";

const Store = configureStore(
    {reducer:{Admin:adminAuth.reducer,
              Partner:partnerAuth.reducer,
                 User:userAuth.reducer  }}
)

export default Store