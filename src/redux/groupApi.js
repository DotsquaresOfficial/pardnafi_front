import {
  createGroupApi,
  getAllGroupApi,inviteGroupApi,groupManagementApi, getGroupAnalyticsApi,myGroupApi,getGroupDetailsByIdApi,isGroupUniqueApi

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

    
    setUniqueGroup: builder.mutation({
      query: (post) => ({
        url: isGroupUniqueApi,
        method: "POST",
        body: post,
      }),
      invalidatesTags: (_) => ["uniqueGroup"],
    }),
    setGroupManagement: builder.mutation({
      query: (post) => ({
        url: groupManagementApi,
        method: "POST",
        body: post,
      }),
      providesTags: (_) => ["groupManagement"],
      
    }),
    getGroupAnalytics: builder.query({
      query: () => ({
        url: getGroupAnalyticsApi,
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => {
        return response.status ? response?.data ?? "" : "";
      },
      providesTags: (_) => ["groupAnalytics"],
    }),
 

    setGroup: builder.mutation({
      query: (post) => ({
        url: createGroupApi,
        method: "POST",
        body: post,
      }),
      invalidatesTags: (_) => ["group", "dashboard"],
    }),
    setMyGroup: builder.mutation({
      query: (post) => ({
        url: myGroupApi,
        method: "POST",
        body: post,
      }),
      invalidatesTags: (_) => ["group", "dashboard"],
    }),
    setGroupDetails: builder.mutation({
      query: (post) => ({
        url: getGroupDetailsByIdApi,
        method: "POST",
        body: post,
      }),
      invalidatesTags: (_) => ["group", "dashboard"],
    }),  setInviteGroupMember: builder.mutation({
      query: (post) => ({
        url: inviteGroupApi,
        method: "POST",
        body: post,
      }),
      providesTags: (_) => ["groupManagement"],
      invalidatesTags: (_) => ["groupManagement"],
    }),

    


  }),
});

export const {
  useGetGroupQuery,useSetUniqueGroupMutation,useSetInviteGroupMemberMutation,
  useSetGroupMutation, useGetGroupAnalyticsQuery,useSetMyGroupMutation,useSetGroupDetailsMutation,useSetGroupManagementMutation
} = groupApi;




