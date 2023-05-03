import { useEffect, useState } from "react"
import Navbar from "../../components/navbar"
import SideNav from "../../components/navbar/SideNav"
import UserDeletedTask from "./UserDeletedTask"
import http from "../../lib/http"
import { useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeletedTask = () => {
  const navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [taskLists, setTaskList] = useState([])
  const [taskListCompleted, setTaskListCompleted] = useState([])
  const [taskListDeleted, setTaskListDeleted] = useState([])
  
  const [showWarningMessage, setShowWarningMessage] = useState('hidden')
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const disable = taskListDeleted.length === 0 ? true : false;

  const notify = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }

  // call fetchTaskListDeleted and fetchTaskList on load
  useEffect(() => {
    fetchTaskListCompleted() //Jan added
    fetchTaskListDeleted()
    fetchTaskList()
  }, [token])

  //  Fetching all user completed task (Jan added)
  const fetchTaskListCompleted = async () => {
    const res = await http.get('/task_completed', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setTaskListCompleted(res.data.completed_task)
  }

  //  Fetch all task deleted
  const fetchTaskListDeleted = async () => {
    try {
      const res = await http.get('/task_deleted', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTaskListDeleted(res.data.deleted_task)

    } catch (error) {
      alert(error.message)
    }
  }

  // Fetch all task list
  const fetchTaskList = async () => {
    try {
      const res = await http.get('/task_list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTaskList(res.data.tasks)

    } catch (error) {
      alert(error.message)
    }
  }

  // Restore task deleted by id (one task) then call the fetchTaskListDeleted and fetchTaskList to update the task
  const restoreTaskById = async (taskId) => {
    try {
      const res = await http.post(`/task_deleted/${taskId}/restore`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      notify(res.data.message)
      fetchTaskListDeleted()
      fetchTaskList()

    } catch (error) {
      alert(error.message)
    }
  }

  // Restore all task then call fetchTaskListDeleted and fetchTaskList to update the task
  const restoreAllTask = async () => {
    try {
      const res = await http.post('/task_deleted/restore_all', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      notify(res.data.message)
      fetchTaskListDeleted()
      fetchTaskList()

    } catch (error) {
      alert(error.message)
    }
  }

  // Delete task by id (Permanently delete one task) and call fetchTaskListDeleted  to update the deleted task list
  const deleteTaskById = async (taskId) => {
    try {
      const res = await http.delete(`/task_deleted/${taskId}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      notify(res.data.message)
      fetchTaskListDeleted()

    } catch (error) {
      alert(error.message)
    }
  }

  // Delete all task and call fetchTaskListDeleted  to update the deleted task list
  const deleteAllTask = async () => {
    try {
      const res = await http.delete('/task_deleted/delete_all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      notify(res.data.message)
      fetchTaskListDeleted()
      
    } catch (error) {
      alert(error.message)
    }
  }

  // Handling user logout
  const logout = async () => {
    await http.post('/logout', null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
  })
    localStorage.removeItem('token')
    setToken('')
    navigate('/login')
  }

  // Show the warning message
    const handleShowWarningMessage = () => {
      setShowWarningMessage(showWarningMessage === 'hidden' && 'block' )
    }

    // Hide the warning message
    const handleHideWarningMessage = () => {
      setShowWarningMessage(showWarningMessage === 'block' && 'hidden' )
    }

    // onclick it will set the id that user want to permanently delete (one task will be delete) then show the warning message
    const handleDeleteTask = (taskId) => {
      setTaskIdToDelete(taskId)
      handleShowWarningMessage()
    }
  
  return (
    <>
      <ToastContainer />
      <Navbar numberOfTask={taskLists.length} handleLogout={logout} numberOfTaskCompleted={taskListCompleted.length} numberOfTaskDeleted={taskListDeleted.length} handleShowWarningMessage={handleShowWarningMessage} restoreAllTask={restoreAllTask} taskListDeleted={taskListDeleted} disable={disable}/>
      <div className="container mx-auto h-screen flex">
        <div className="hidden lg:block">
          <SideNav token={token} handleLogout={logout} numberOfTaskCompleted={taskListCompleted.length} numberOfTask={taskLists.length} numberOfTaskDeleted={taskListDeleted.length}/>
        </div>
        <div className="w-full lg:flex lg:justify-end mt-14">
          <div className="lg:w-3/4 xl:w-[77%] 2xl:w-[80.6%] py-2">
            <UserDeletedTask taskListDeleted={taskListDeleted} restoreTaskById={restoreTaskById} restoreAllTask={restoreAllTask} deleteTaskById={deleteTaskById} deleteAllTask={deleteAllTask} showWarningMessage={showWarningMessage} handleHideWarningMessage={handleHideWarningMessage} handleDeleteTask={handleDeleteTask} taskIdToDelete={taskIdToDelete}  setTaskIdToDelete={setTaskIdToDelete}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeletedTask