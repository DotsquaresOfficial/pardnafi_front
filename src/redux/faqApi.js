import {
    addFaqApi,
    deleteFaqApi,
    getFaqApi,
    updateFaqApi,
    updateFaqStatusApi,
  } from "../Components/constent/Api";
  import { myApi } from "./api";
  
  export const faqApi = myApi.injectEndpoints({
    endpoints: (builder) => ({
      getFaq: builder.query({
        query: () => ({
          url: getFaqApi,
          method: "GET",
        }),
        transformResponse: (response, meta, arg) => {
          return response.status ? response?.data ?? "" : "";
        },
        providesTags: (_) => ["faq"],
      }),
      setFaq: builder.mutation({
        query: (post) => ({
          url: addFaqApi,
          method: "POST",
          body: post,
        }),
        invalidatesTags: (_) => ["faq", "dashboard"],
      }),
      deleteFaq: builder.mutation({
        query: (post) => ({
          url: deleteFaqApi + "/" + post.id,
          method: "DELETE",
        }),
        invalidatesTags: (_) => ["faq", "dashboard"],
      }),
      updateStatusFaq: builder.mutation({
        query: (post) => ({
          url: updateFaqStatusApi + "/" + post.id,
          method: "PUT",
        }),
        invalidatesTags: (_) => ["faq"],
      }),
      updateFaq: builder.mutation({
        query: (post) => ({
          url: updateFaqApi,
          method: "PUT",
          body: post,
        }),
        invalidatesTags: (_) => ["faq"],
      }),
    }),
  });
  
  export const {
    useGetFaqQuery,
    useSetFaqMutation,
    useDeleteFaqMutation,
    useUpdateStatusFaqMutation,
    useUpdateFaqMutation,
  } = faqApi;
  