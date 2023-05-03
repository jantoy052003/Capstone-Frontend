import { useEffect, useState } from 'react'
import Navbar from "../../components/navbar"
import SideNav from "../../components/navbar/SideNav"
import UserCompletedTask from "../taskCompleted/UserCompletedTask"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import http from "../../lib/http"
import { useNavigate } from 'react-router-dom'

const CompletedTask = () => {

  const navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [taskLists, setTaskList] = useState([])
  const [taskListCompleted, setTaskListCompleted] = useState([])
  const [taskListDeleted, setTaskListDeleted] = useState([])  

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
    await http.delete(`/task_completed/${taskId}/complete`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    fetchTaskListCompleted()
  }

  // Delete all task and call fetchTaskListDeleted  to update the deleted task list
  const deleteAllTask = async () => {
    await http.delete('/task_completed/complete_all', {
      headers: {
         Authorization: `Bearer ${token}`,
      },
    })
    fetchTaskListCompleted()
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

  return (
    <>
      <Navbar numberOfTask={taskLists.length} handleLogout={logout} numberOfTaskCompleted={taskListCompleted.length} numberOfTaskDeleted={taskListDeleted.length}/>
      <div className='container mx-auto h-screen flex'>
          <div className="hidden lg:block">
              <SideNav token={token} numberOfTask={taskLists.length} handleLogout={logout} numberOfTaskCompleted={taskListCompleted.length} numberOfTaskDeleted={taskListDeleted.length}/>
          </div>
          <div className="w-full lg:flex lg:justify-end mt-14">
              <div className="lg:w-3/4 xl:w-[77%] 2xl:w-[80.6%] py-2">
              <UserCompletedTask taskListCompleted={taskListCompleted} deleteTaskById={deleteTaskById} deleteAllTask={deleteAllTask}/>
              </div>
          </div>
      </div>
    </>
  )
}

export default CompletedTask
