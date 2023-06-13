import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Show } from '../types/show'

export const showsApi = createApi({
    reducerPath: 'showsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.tvmaze.com/' }),
    endpoints: (builder) => ({
        getShows: builder.query<Show[],number>({
            query: (page = 0) => `shows?page=${page}`,
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName
              },
            merge: (cachedData, currentData) => {
                cachedData.push(...currentData)
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
        })
    }),
})

export const { useGetShowsQuery } = showsApi
