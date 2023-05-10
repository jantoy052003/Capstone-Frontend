import { useState } from "react"
import api from "../lib/api"

export const useApiTasks =  (apiError) => {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [tasks, setTasks] = useState([])
  const [tasksCompleted, setTasksCompleted] = useState([])
  const [tasksDeleted, setTasksDeleted] = useState([])

  const [taskTitle, setTaskTitle] = useState("")
  const [taskBody, setTaskBody] = useState("")
  const [taskStart, setTaskStart] = useState("")
  const [taskEnd, setTaskEnd] = useState("")
  const [taskUpdate, setTaskUpdate] = useState([])
  const [isLoading, setIsLoading] = useState(false)

   // Fetching all User Task
  const fetchTasks = async () => {
    setIsLoading(true)
    try {
      const res = await api.get("/task_list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTasks(res.data.tasks)

    } catch (error) {
      apiError("An error occurred while fetching tasks:", error)
    } finally {
      setIsLoading(false)
    }
  }

  //  Fetching all user completed task 
  const fetchTasksCompleted = async () => {
    setIsLoading(true)
    try {
      const res = await api.get("/task_completed", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTasksCompleted(res.data.completed_task)

    } catch (error) {
      apiError("An error occurred while fetching completed tasks:", error)
    } finally {
      setIsLoading(false)
    }
  }

  //  Fetching all user deleted task
  const fetchTasksDeleted = async () => {
    try {
      const res = await api.get("/task_deleted", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTasksDeleted(res.data.deleted_task)

    } catch (error) {
      apiError("An error occurred while fetching deleted task list:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchTaskToEdit = async (taskId) => {
    try {
      const res = await api.get(`/task_list/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.data.task.task_start === null) {
        setTaskStart("")
      }
      if (res.data.task.task_end === null) {
        setTaskEnd("")
      } else {
        setTaskStart(res.data.task.task_start)
        setTaskEnd(res.data.task.task_end)
      }
      setTaskBody(res.data.task.task_body)
      setTaskTitle(res.data.task.task_title)
      setTaskUpdate(res.data.task)

    } catch (error) {
      apiError(`An error occurred while fetching task ${taskId} for editing:`, error)
    }
  }

  return [setToken, token, tasks, tasksCompleted, tasksDeleted, taskTitle, taskBody, taskStart, taskEnd, taskUpdate, setTaskTitle, setTaskBody, setTaskStart, setTaskEnd, fetchTasks, fetchTasksCompleted, fetchTasksDeleted, fetchTaskToEdit, isLoading]

}