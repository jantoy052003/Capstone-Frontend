import { useState } from "react"
import api from "../lib/api"

export const useApiDeleteTask = (apiSuccess, apiError) => {
  const [token, setToken] = useState(localStorage.getItem("token"))

  // Handling user delete task
  const handleDeleteTask = async (taskId) => {
    try {
      const res = await api.delete(`/task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      apiSuccess(res.data.message)

    } catch (error) {
      apiError(`An error occurred while deleting task ${taskId}:`, error)
    }
  }

  // Handling user complete task
  const handleCompleteTask = async (taskId) => {
    try {
      const res = await api.delete(`/task_complete/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      })
      apiSuccess(res.data.message)

    } catch (error) {
      apiError(`An error occurred while completing task ${taskId}:`, error)
    }
  }

  // Delete task by id (Permanently delete one task) and call fetchTaskListDeleted  to update the deleted task list
  const deleteCompletedTaskById = async (taskId) => {
    try {
      const res = await api.delete(`/task_completed/${taskId}/complete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      apiSuccess(res.data.message)

    } catch (error) {
      apiError(error.message)
    }
  }

  // Delete all task and call fetchTaskListDeleted  to update the deleted task list
  const deleteAllCompletedTask = async () => {
    try {
      const res = await api.delete("/task_completed/complete_all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      apiSuccess(res.data.message)

    } catch (error) {
      apiError(error.message)
    }
  }

  // Delete task by id (Permanently delete one task) and call fetchTaskListDeleted  to update the deleted task list
  const deletedTaskById = async (taskId) => {
    try {
      const res = await api.delete(`/task_deleted/${taskId}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      apiSuccess(res.data.message)

    } catch (error) {
      apiError(error.message)
    }
  }

  // Delete all task and call fetchTaskListDeleted  to update the deleted task list
  const deletedAllTaskDelete = async () => {
    try {
      const res = await api.delete("/task_deleted/delete_all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      apiSuccess(res.data.message)
    } catch (error) {
      apiError(error.message)
    }
  }
  
  return [handleDeleteTask, handleCompleteTask, deleteCompletedTaskById, deleteAllCompletedTask, deletedTaskById, deletedAllTaskDelete]

}