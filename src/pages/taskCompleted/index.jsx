import { useEffect, useState } from 'react'
import Navbar from "../../components/navbar"
import SideNav from "../../components/navbar/SideNav"
import UserCompletedTask from "../taskCompleted/UserCompletedTask"
import http from "../../lib/http"
import { useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CompletedTask = () => {

  const navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [taskLists, setTaskList] = useState([])
  const [taskListCompleted, setTaskListCompleted] = useState([])
  const [taskListDeleted, setTaskListDeleted] = useState([])

  // Jan added
  const [showWarningMessage, setShowWarningMessage] = useState('hidden')
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const disable = taskListCompleted.length === 0 ? true : false;

  const [taskInfo, setTaskInfo] = useState(null)
  const [showTaskInfo, setShowTaskInfo] = useState('hidden')

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

  // call fetchTaskListDeleted, fetchTaskList and fetchTaskListCompleted on load
  useEffect(() => {
    fetchTaskListCompleted()
    fetchTaskListDeleted()
    fetchTaskList()
  }, [token])

   //  Fetch all task completed
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
    const res = await http.get('/task_deleted', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setTaskListDeleted(res.data.deleted_task)
  }

  // Fetch all task list
  const fetchTaskList = async () => {
    const res = await http.get('/task_list', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setTaskList(res.data.tasks)
  }

  // Delete task by id (Permanently delete one task) and call fetchTaskListDeleted  to update the deleted task list
  const deleteTaskById = async (taskId) => {
    try {
      const res = await http.delete(`/task_completed/${taskId}/complete`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      notify(res.data.message)
      fetchTaskListCompleted()

    } catch (error) {
      alert(error.message)
    }
  }

  // Delete all task and call fetchTaskListDeleted  to update the deleted task list
  const deleteAllTask = async () => {
    try {
      const res = await http.delete('/task_completed/complete_all', {
        headers: {
           Authorization: `Bearer ${token}`,
        },
      })
      notify(res.data.message)
      fetchTaskListCompleted()

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

  //Jan added
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

  // get the task info
  const getTaskInfo = (task) => {
    setTaskInfo(task);
    setShowTaskInfo(showTaskInfo === 'hidden' && 'block')
  };

  return (
    <>
      <header>
        <Navbar numberOfTask={taskLists.length} handleLogout={logout} numberOfTaskCompleted={taskListCompleted.length} handleShowWarningMessage={handleShowWarningMessage} numberOfTaskDeleted={taskListDeleted.length} disable={disable}/>
      </header>
      <div className='container mx-auto h-screen flex'>
        <ToastContainer />
        <aside className="hidden lg:block">
            <SideNav token={token} numberOfTask={taskLists.length} handleLogout={logout} numberOfTaskCompleted={taskListCompleted.length} numberOfTaskDeleted={taskListDeleted.length}/>
        </aside>
        <main className="w-full lg:flex lg:justify-end mt-14">
          <div className="lg:w-3/4 xl:w-[77%] 2xl:w-[80.6%] py-2">
            <UserCompletedTask taskListCompleted={taskListCompleted} deleteTaskById={deleteTaskById} deleteAllTask={deleteAllTask} showWarningMessage={showWarningMessage} handleHideWarningMessage={handleHideWarningMessage} handleDeleteTask={handleDeleteTask} taskIdToDelete={taskIdToDelete}  setTaskIdToDelete={setTaskIdToDelete} getTaskInfo={getTaskInfo} taskInfo={taskInfo} showTaskInfo={showTaskInfo} setShowTaskInfo={setShowTaskInfo} />
          </div>
        </main>
      </div>
    </>
  )
}

export default CompletedTask
