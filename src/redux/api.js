import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../Components/constent/BaseUrl'



export const myApi = createApi({
    reducerPath: "myApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: async (headers) => {
            const token = await localStorage.getItem('jwtToken')
            console.log(token, "token")
            if (!!token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes: ["faq", "contactUs", "kyc", "group", "groupAnalytics", "profile"],
    endpoints: (builder) => ({
    }),

})