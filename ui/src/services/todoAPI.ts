import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface ToDo {
  id: string
  dateCreated: string
  text: string
  isComplete: boolean
}

export interface AddToDo {
  text: string
}

export const todoAPI = createApi({
  reducerPath: "todoAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  tagTypes: ["Todo"],
  endpoints: builder => ({
    getTodos: builder.query<ToDo[], void>({
      query: () => "todos/",
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Todo", id }) as const),
              { type: "Todo", id: "LIST" },
            ]
          : [{ type: "Todo", id: "LIST" }],
    }),

    addTodo: builder.mutation<ToDo, AddToDo>({
      query: newTodo => ({
        url: "todos/",
        method: "POST",
        body: newTodo,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [{ type: "Todo", id: "LIST" }],
    }),

    toggleTodo: builder.mutation<ToDo, string>({
      query: id => ({
        url: `todos/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "Todo", id: "LIST" }],
    }),

    deleteTodo: builder.mutation<ToDo, string>({
      query: id => ({
        url: `todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Todo", id: "LIST" }],
    }),
  }),
})

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useToggleTodoMutation,
  useDeleteTodoMutation,
} = todoAPI
