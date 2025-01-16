import {
    submitKycApi,
 
  } from "../Components/constent/Api";
  import { myApi } from "./api";
  
  export const kycApi = myApi.injectEndpoints({
    endpoints: (builder) => ({
  
      setKyc: builder.mutation({
        query: (post) => ({
          url: submitKycApi,
          method: "POST",
          body: post,
        }),
        invalidatesTags: (_) => ["kyc"],
      }),

   
    }),
  });
  
  export const {
    useSetKycMutation
  } = kycApi;
  



