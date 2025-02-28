import {
    getUserProfileApi,updateUserProfileApi
  } from "../Components/constent/Api";
  import { myApi } from "./api";
  
  export const profileApi = myApi.injectEndpoints({
    endpoints: (builder) => ({
      getProfile: builder.query({
        query: () => ({
          url: getUserProfileApi,
          method: "GET",
        }),
        transformResponse: (response, meta, arg) => {
          return response.status ? response?.data ?? "" : "";
        },
        providesTags: (_) => ["profile"],
      }),
      setProfile: builder.mutation({
        query: (post) => ({
          url: updateUserProfileApi,
          method: "POST",
          body: post,
        }),
        invalidatesTags: (_) => ["profile"],
      }),

    }),
  });
  
  export const {
    useGetProfileQuery,
    useSetProfileMutation
    // useSetFaqMutation,

  } = profileApi;
  



