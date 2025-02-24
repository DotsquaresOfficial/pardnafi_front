import {
  createGroupApi,
  getAllGroupApi, getGroupAnalyticsApi

} from "../Components/constent/Api";
import { myApi } from "./api";

export const groupApi = myApi.injectEndpoints({
  endpoints: (builder) => ({
    getGroup: builder.query({
      query: () => ({
        url: getAllGroupApi,
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => {
        return response.status ? response?.data ?? "" : "";
      },
      providesTags: (_) => ["group"],
    }),


    setGroupAnalytics: builder.mutation({
      query: (post) => ({
        url: getGroupAnalyticsApi,
        method: "POST",
        body: post,
      }),
      invalidatesTags: (_) => ["group", "groupAnalytics"],
    }),


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
  useGetGroupQuery,
  useSetGroupMutation, useSetGroupAnalyticsMutation
} = groupApi;




