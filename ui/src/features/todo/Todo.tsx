import {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useToggleTodoMutation,
} from "../../services/todoAPI"
import { useState } from "react"

export const Todo = () => {
  const { data, error, isLoading: isTodoQueryLoading } = useGetTodosQuery()
  const [addTodo, setAddTodo] = useState<string>("")
  const [
    createTodo,
    { isLoading: isTodoAddMutationLoading, isSuccess, isError },
  ] = useAddTodoMutation()
  const [
    toggleTodo,
    {
      isLoading: isToggleTodoMutationLoading,
      isSuccess: isToggleTodoMutationSuccess,
      isError: isToggleTodoMutationError,
    },
  ] = useToggleTodoMutation()

  const [deleteTodo] = useDeleteTodoMutation()

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }

  const handleAlert = (
    event: React.MouseEvent<SVGSVGElement>,
    message: String,
  ) => {
    alert(message)
  }

  const handleAddTodo = async () => {
    if (addTodo) {
      try {
        const result = await createTodo({ text: addTodo }).unwrap()
        console.log("Added todo: ", result)
      } catch (error) {
        console.error("Failed to create todo: ", error)
      }
    } else {
      console.log("No todo value.")
    }
  }

  const handleToggleComplete = async (id: string) => {
    try {
      const result = await toggleTodo(id).unwrap()
      console.log("Toggle todo: ", result)
    } catch (error) {
      console.error("Failed to toggle todo: ", error)
    }
  }

  const handleDeleteTodo = async (id: string) => {
    try {
      const result = await deleteTodo(id).unwrap()
      console.log("Deleted todo: ", result)
    } catch (error) {
      console.error("Failed to delete todo: ", error)
    }
  }

  const friendlyDate = (str: string) => {
    const dateObject = new Date(str)
    return dateObject.toLocaleDateString("en-AU", dateOptions)
  }

  if (isTodoQueryLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    if ("status" in error) {
      if (error.status === "FETCH_ERROR") {
        return <div>Network error: {error.error}</div>
      } else if (error.status === "PARSING_ERROR") {
        return <div>Parsing error: {error.error}</div>
      } else if (typeof error.status === "number") {
        return <div>HTTP error: {error.status}</div>
      }
    } else {
      return <div>Unknown error</div>
    }
  }

  if (data) {
    return (
      <div className="mt-4 grid w-11/12 place-items-center bg-white p-4 pb-8 shadow-lg md:w-3/4 lg:w-1/2">
        <h1 className="pb-6 text-xl font-bold">Things To Do</h1>
        <div className="striped mb-5 flex w-full items-center justify-between gap-2">
          <input
            type="text"
            className="m2-2 w-full rounded border border-gray-400 p-1"
            value={addTodo}
            onChange={e => setAddTodo(e.target.value)}
          />
          <button type="button" onClick={handleAddTodo}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              className="size-8 fill-blue-800"
            >
              <path d="M19,0H5C2.243,0,0,2.243,0,5v14c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V5c0-2.757-2.243-5-5-5Zm-3,13h-3v3c0,.553-.448,1-1,1s-1-.447-1-1v-3h-3c-.552,0-1-.447-1-1s.448-1,1-1h3v-3c0-.553,.448-1,1-1s1,.447,1,1v3h3c.552,0,1,.447,1,1s-.448,1-1,1Z" />
            </svg>
          </button>
        </div>
        {data.map(item => (
          <div
            className="flex w-full items-center justify-between py-2"
            key={item.id}
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleToggleComplete(item.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                  className="size-5 fill-green-700"
                >
                  <g>
                    <path d="M405.333,0H106.667C47.786,0.071,0.071,47.786,0,106.667v298.667C0.071,464.214,47.786,511.93,106.667,512h298.667   C464.214,511.93,511.93,464.214,512,405.333V106.667C511.93,47.786,464.214,0.071,405.333,0z M426.667,172.352L229.248,369.771   c-16.659,16.666-43.674,16.671-60.34,0.012c-0.004-0.004-0.008-0.008-0.012-0.012l-83.563-83.541   c-8.348-8.348-8.348-21.882,0-30.229s21.882-8.348,30.229,0l83.541,83.541l197.44-197.419c8.348-8.318,21.858-8.294,30.176,0.053   C435.038,150.524,435.014,164.034,426.667,172.352z" />
                  </g>
                </svg>
              </button>
              <button type="button" onClick={() => handleDeleteTodo(item.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Layer_1"
                  data-name="Layer 1"
                  viewBox="0 0 24 24"
                  className="size-5 fill-red-800"
                >
                  <path d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm4.707,15.293-1.414,1.414L12,13.414,8.707,16.707,7.293,15.293,10.586,12,7.293,8.707,8.707,7.293,12,10.586l3.293-3.293,1.414,1.414L13.414,12Z" />
                </svg>
              </button>
            </div>
            <div className="grid w-full place-items-start pl-6">
              <label
                className={
                  item.isComplete
                    ? "text-gray-400 line-through"
                    : "text-gray-700"
                }
                htmlFor={item.id}
              >
                {item.text}
              </label>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return <div>No content available</div>
}
