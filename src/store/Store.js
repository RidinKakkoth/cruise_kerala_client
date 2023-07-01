import { configureStore } from "@reduxjs/toolkit";
// import UserAuth  from "./UserAuth";
import adminAuth from "./AdminAuth";
import partnerAuth from "./PartnerAuth";

const Store = configureStore(
    {reducer:{Admin:adminAuth.reducer,
              Partner:partnerAuth.reducer  }}
)

export default Store