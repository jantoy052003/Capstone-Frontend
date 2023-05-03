import { useEffect, useState } from 'react'
import SideNav from '../../components/navbar/SideNav'
import UserTask from './UserTask'
import http from '../../lib/http'
import Navbar from '../../components/navbar'
import { useNavigate } from 'react-router-dom'

const Tasks = () => {
  const navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [taskLists, setTaskList] = useState([])
  const [taskTitle, setTaskTitle] = useState('')
  const [taskBody, setTaskBody] = useState('')
  const [taskStart, setTaskStart] = useState('')
  const [taskEnd, setTaskEnd] = useState('')
  const [taskListCompleted, setTaskListCompleted] = useState([]) //Jan added for completed task
  const [taskListDeleted, setTaskListDeleted] = useState([])
  const [selectedTaskIdToEdit, setSelectedTaskIdToEdit] = useState(null)

  // Handling Add Task and Update Task
  const handleSubmitTask = async (e) => {
    e.preventDefault()
    try {
      const requestData = {
        task_title: taskTitle,
        task_body: taskBody,
        task_start: taskStart,
        task_end: taskEnd,
      }
      const requestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      if (selectedTaskIdToEdit) {
        await http.put(`/tasks/${selectedTaskIdToEdit}`, requestData, requestConfig)
        setSelectedTaskIdToEdit(null)
      } else {
        await http.post('/tasks', requestData, requestConfig)
        }

      setTaskTitle('')
      setTaskStart('')
      setTaskEnd('')
      setTaskStart('')
      setTaskBody('')
      fetchTaskList()

    } catch (error) {
        console.error(error)
      }
  }
  
  // Calling all the user task and user deleted and user completed task on load
  useEffect(() => {
    fetchTaskList()
    fetchTaskListCompleted() //Jan added
    fetchTaskListDeleted()
  }, [token])

  // Fetching all User Task
  const fetchTaskList = async () => {
    const res = await http.get('/task_list', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setTaskList(res.data.tasks)
  }

  //  Fetching all user completed task (Jan added)
  const fetchTaskListCompleted = async () => {
    const res = await http.get('/task_completed', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setTaskListCompleted(res.data.completed_task)
  }

  //  Fetching all user deleted task
  const fetchTaskListDeleted = async () => {
    const res = await http.get('/task_deleted', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setTaskListDeleted(res.data.deleted_task)
  }
  
  // handling user task(byId) to fill the form input
  const fetchTaskListToEdit = async (taskId) => {
    const res = await http.get(`/task_list/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setTaskBody(res.data.task.task_body)
    setTaskEnd(res.data.task.task_end)
    setTaskStart(res.data.task.task_start)
    setTaskTitle(res.data.task.task_title)
  }

  // reset the form to and set the selectedtaskid to null
  const handleCancelEdit = () => {
    setSelectedTaskIdToEdit(null)
    setTaskTitle('')
    setTaskStart('')
    setTaskEnd('')
    setTaskStart('')
    setTaskBody('')
  }

  // Handling user complete task (Jan added)
  const handleCompleteTask = async (taskId) => {
    await http.delete(`/task_complete/${taskId}`, { 
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
    fetchTaskList()
    fetchTaskListCompleted()
    fetchTaskListDeleted()
  }

  // Handling user delete task
  const handleDeleteTask = async (taskId) => {
    await http.delete(`/task/${taskId}`, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
    })
    fetchTaskList()
    fetchTaskListCompleted()
    fetchTaskListDeleted()
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
        <div className='hidden lg:block'>
          <SideNav token={token} numberOfTask={taskLists.length} handleLogout={logout} numberOfTaskCompleted={taskListCompleted.length} numberOfTaskDeleted={taskListDeleted.length}/>
        </div>
        <div className='w-full lg:flex lg:justify-end mt-14'>
          <div className='lg:w-3/4 xl:w-[77%] 2xl:w-[80.6%] py-2'>
            <UserTask
              taskLists={taskLists}
              handleSubmit={handleSubmitTask}
              taskTitle={taskTitle}
              taskStart={taskStart}
              taskEnd={taskEnd}
              taskBody={taskBody}
              setTaskTitle={setTaskTitle}
              setTaskStart={setTaskStart}
              setTaskEnd={setTaskEnd}
              setTaskBody={setTaskBody}
              handleCompleteTask={handleCompleteTask} //Jan added
              fetchTaskListCompleted={fetchTaskListCompleted} //Jan added
              handleDeleteTask={handleDeleteTask}
              fetchTaskListDeleted={fetchTaskListDeleted}
              fetchTaskListToEdit={fetchTaskListToEdit}
              setSelectedTaskIdToEdit={setSelectedTaskIdToEdit}
              selectedTaskIdToEdit={selectedTaskIdToEdit}
              handleCancelEdit={handleCancelEdit}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Tasks