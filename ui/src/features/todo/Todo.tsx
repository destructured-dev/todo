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
      <div className="grid w-11/12 place-items-center p-4 shadow-lg md:w-3/4 lg:w-1/2">
        {data.map(item => (
          <div
            className="flex w-full items-center justify-between border-b border-gray-300 py-1"
            key={item.id}
          >
            <label className="text-gray-700" htmlFor={item.id}>
              {item.text}
            </label>
            <div className="flex items-center gap-2">
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                className="size-5 fill-red-800"
              >
                <path d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm4.707,15.293-1.414,1.414L12,13.414,8.707,16.707,7.293,15.293,10.586,12,7.293,8.707,8.707,7.293,12,10.586l3.293-3.293,1.414,1.414L13.414,12Z" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return <div>No content available</div>
}
