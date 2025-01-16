import {
    addContactUsApi,
 
  } from "../Components/constent/Api";
  import { myApi } from "./api";
  
  export const contactUsApi = myApi.injectEndpoints({
    endpoints: (builder) => ({
  
      setContactUs: builder.mutation({
        query: (post) => ({
          url: addContactUsApi,
          method: "POST",
          body: post,
        }),
        invalidatesTags: (_) => ["contactUs", "dashboard"],
      }),

   
    }),
  });
  
  export const {
    useSetContactUsMutation
  } = contactUsApi;
  



