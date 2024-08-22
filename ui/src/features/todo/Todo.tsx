import { useGetTodosQuery, ToDo } from "../../services/todoAPI"

export const Todo = () => {
  const { data, error, isLoading } = useGetTodosQuery()

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }

  const friendlyDate = (str: string) => {
    const dateObject = new Date(str)
    return dateObject.toLocaleDateString("en-AU", dateOptions)
  }

  if (isLoading) {
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
      <div>
        {data.map(item => (
          <div
            className="flex items-center justify-between rounded border border-gray-300 p-4"
            key={item.id}
          >
            <label className="text-gray-700" htmlFor={item.id}>
              {friendlyDate(item.dateCreated)} - {item.text}
            </label>
            <input
              className="form-checkbox h-5 w-5 text-blue-600"
              type="checkbox"
              id={item.id}
              defaultChecked={item.isComplete}
            ></input>
          </div>
        ))}
      </div>
    )
  }

  return <div>No content available</div>
}
