import { Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import Login from "./pages/login"
import Signup from "./pages/signup"
import ProtectedRoute from "./utils/ProtectedRoute"
import Task from "./pages/task"
import TaskCompleted from "./pages/task_completed"
import TaskDeleted from "./pages/task_deleted"

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} exact />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Private Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/menu/my-task" element={<Task />} />
        <Route path="/archived/completed" element={<TaskCompleted />} />
        <Route path="/archived/deleted" element={<TaskDeleted />} />
      </Route>
    </Routes>
  )
}

export default App