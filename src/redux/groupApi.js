import {
    createGroupApi,
 
  } from "../Components/constent/Api";
  import { myApi } from "./api";
  
  export const groupApi = myApi.injectEndpoints({
    endpoints: (builder) => ({
  
      setGroup: builder.mutation({
        query: (post) => ({
          url: createGroupApi,
          method: "POST",
          body: post,
        }),
        invalidatesTags: (_) => ["group", "dashboard"],
      }),

   
    }),
  });
  
  export const {
    useSetGroupMutation
  } = groupApi;
  



