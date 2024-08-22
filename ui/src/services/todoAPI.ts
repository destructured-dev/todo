import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface ToDo {
  id: string
  dateCreated: string
  text: string
  isComplete: boolean
}

export const todoAPI = createApi({
  reducerPath: "todoAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  endpoints: builder => ({
    getTodos: builder.query<ToDo[], void>({
      query: () => "todos/",
    }),
  }),
})

export const { useGetTodosQuery } = todoAPI
