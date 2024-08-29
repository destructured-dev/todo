import "./App.css"
import { Todo } from "./features/todo/Todo"

const App = () => {
  return (
    <div className="grid h-screen w-full place-items-center content-start bg-blue-50 pt-10">
      <Todo />
    </div>
  )
}

export default App
