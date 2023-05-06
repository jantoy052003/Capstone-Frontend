import { useEffect, useState } from 'react'
import SideNav from '../../components/navbar/SideNav'
import UserTask from './UserTask'
import http from '../../lib/http'
import Navbar from '../../components/navbar'
import { useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

  const [createTaskToggle, setCreateTaskToggle] = useState('hidden')
  const [taskUpdate, setTaskUpdate] = useState([])

    const notify = (message) => {
      if (message === 'It is recommended to set a start and end date for the task') {
        toast.info(message, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      } else if (message === 'Task has been moved to your archived.') {
        toast.info(message, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      } else {
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
    }

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
        const res = await http.put(`/tasks/${selectedTaskIdToEdit}`, requestData, requestConfig)
        setSelectedTaskIdToEdit(null)
        if (taskUpdate.task_body !== taskBody || taskUpdate.task_title !== taskTitle || taskUpdate.task_start !== taskStart || taskUpdate.task_end !== taskEnd) {
          notify(res.data.message)
        } 
      } else {
        const res = await http.post('/tasks', requestData, requestConfig)
        notify(res.data.message)
      }
      setTaskTitle('')
      setTaskStart('')
      setTaskEnd('')
      setTaskBody('')
      fetchTaskList()

    } catch (error) {
        alert(error.message)
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
    try {
      const res = await http.get('/task_list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTaskList(res.data.tasks)

    } catch (error) {
      alert('An error occurred while fetching task list:', error)
    }
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
    try {
      const res = await http.get('/task_deleted', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTaskListDeleted(res.data.deleted_task)

    }  catch (error) {
      alert('An error occurred while fetching deleted task list:', error)
    }
  }
  
  // handling user task(byId) to fill the form input if the value is null set it to empty string then create a copy of the fetchTaskListToEdit
  const fetchTaskListToEdit = async (taskId) => {
    try {
      const res = await http.get(`/task_list/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if  (res.data.task.task_start === null) {
        setTaskStart('')
      }
      if (res.data.task.task_end === null) {
        setTaskEnd('')
      } else {
        setTaskStart(res.data.task.task_start)
        setTaskEnd(res.data.task.task_end)
      }
      if(createTaskToggle === 'hidden') {
        handleToggleCreateTask()
      }
      setTaskBody(res.data.task.task_body)
      setTaskTitle(res.data.task.task_title)
      setTaskUpdate(res.data.task)

    } catch (error) {
      alert(`An error occurred while fetching task ${taskId} for editing:`, error)
    }
  }

  // Reset the form to and set the selectedTaskIdToEdit to null
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
    try{
      const res = await http.delete(`/task_complete/${taskId}`, { 
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      })
      notify(res.data.message)
      fetchTaskList()
      fetchTaskListCompleted()
      fetchTaskListDeleted()

    } catch (error) {
      alert(`An error occurred while completing task ${taskId}:`, error)
    }
  }

  // Handling user delete task
  const handleDeleteTask = async (taskId) => {
    try {
      const res = await http.delete(`/task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      notify(res.data.message)
      fetchTaskList()
      fetchTaskListDeleted()

    } catch (error) {
      alert(`An error occurred while deleting task ${taskId}:`, error)
    }
  }

  // Handling user logout
  const logout = async () => {
    try {
      await http.post('/logout', null, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      localStorage.removeItem('token')
      setToken('')
      navigate('/login')
    } catch (error) {
      alert('An error occurred while logging out:', error)
    }
  }

  // toggle the form input
  const handleToggleCreateTask = () => {
    setCreateTaskToggle(createTaskToggle === 'hidden' ? 'block' : 'hidden')
  }

  return (
    <>
      <header>
        <Navbar numberOfTask={taskLists.length} handleLogout={logout} numberOfTaskCompleted={taskListCompleted.length} numberOfTaskDeleted={taskListDeleted.length} handleToggleCreateTask={handleToggleCreateTask}/>
      </header>
      <div className='container mx-auto h-screen flex'>
        <ToastContainer />
        <aside className='hidden lg:block'>
          <SideNav token={token} numberOfTask={taskLists.length} handleLogout={logout} numberOfTaskCompleted={taskListCompleted.length} numberOfTaskDeleted={taskListDeleted.length}/>
        </aside>
        <main className='w-full lg:flex lg:justify-end mt-14'>
          <div className='lg:w-3/4 mt-1  xl:w-[77.3%] 2xl:w-[80.6%] py-2'> {/*na trigger OCD ko dito hehe*/}
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
              createTaskToggle={createTaskToggle}
            />
          </div>
        </main>
      </div>
    </>
  )
}

export default Tasks