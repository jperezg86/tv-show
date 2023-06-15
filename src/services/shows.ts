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
        }),
        filterShows: builder.query<Show[], string>({
           query: (q: string) => `/search/shows?q=${q}`,
           transformResponse: (response: {score: number, show: Show}[]) : any => {
                return response?.map(item => item.show)
           } 
        })

    }),
})

export const { useGetShowsQuery, useFilterShowsQuery } = showsApi
