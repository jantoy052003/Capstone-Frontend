import { useEffect, useState } from "react"
import { useSidebar } from "../../hooks/useSideBar"
import { useApiTasks } from "../../hooks/useApiTask"
import { useGetTaskInfo } from "../../hooks/useGetTaskInfo"
import Sidebar from "../../components/Sidebar"
import Navbar from "../../components/Navbar"
import MainMenu from "../../components/MainMenu"
import Archived from "../../components/Archived"
import CommingSoon from "../../components/CommingSoon"
import Logout from "../../components/Logout"
import UserTaskInput from "./UserTaskInput"
import UserTaskList from "./UserTaskList"
import api from "../../lib/api"
import { useApiDeleteTask } from "../../hooks/useApiDeleteTask"
import NoTaskToShow from "../../assets/NoTask.svg"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Rolling from "../../assets/Rolling.svg"
import { useToggleForm } from "../../hooks/useToggleForm"
import { useFetchProfilePic } from "../../hooks/useFetchProfilePic"
import { useNavigate } from "react-router-dom"

const Task = () => {
  const [showSidebar, handleOpenSidebar, handleCloseSidebar] = useSidebar()
  const [taskInfo, showTaskInfo, setShowTaskInfo, getTaskInfo] = useGetTaskInfo()
  const [selectedTaskIdToEdit, setSelectedTaskIdToEdit] = useState(null)
  const [createTaskToggle, setCreateTaskToggle] = useState("hidden")
  const [showForm, setShowForm, showUploadImageForm, hideUploadForm] = useToggleForm()
  const [userId, setUserId] = useState(localStorage.getItem("id"))
  const navigate = useNavigate()

  // handling error
  const apiError = (errorMsg) => {
    const customId = "custom-id-yes"
    const existingToast = toast.isActive(customId)

    if (existingToast) {
      toast.update(existingToast, {
        render: errorMsg,
        type: toast.TYPE.ERROR,
        autoClose: 2000,
        hideProgressBar: false,
        closeButton: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    } else {
        toast.error(errorMsg, {
          toastId: customId,
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
    }
  }

  // handling success
  const apiSuccess = (successMsg) => {
    const customId = "custom-id-yes"
    const existingToast = toast.isActive(customId)

    if (successMsg === "Task has been moved to your archived." || successMsg === "It is recommended to set a start and end date for the task") {
      if (existingToast) {
        toast.update(existingToast, {
          render: successMsg,
          type: toast.TYPE.INFO,
          autoClose: 2000,
          hideProgressBar: false,
          closeButton: true,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }) 
      } else {
        toast.info(successMsg, {
          toastId: customId,
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
    } else {
      if (existingToast) {
        toast.update(existingToast, {
          render: successMsg,
          type: toast.TYPE.SUCCESS,
          autoClose: 2000,
          hideProgressBar: false,
          closeButton: true,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      } else {
        toast.success(successMsg, {
          toastId: customId,
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
    }

  }
  const [handleDeleteTask, handleCompleteTask, , , , ] = useApiDeleteTask(apiSuccess, apiError)
  const [setToken, token, tasks, tasksCompleted, tasksDeleted, taskTitle, taskBody, taskStart,
          taskEnd, taskUpdate, setTaskTitle, setTaskBody, setTaskStart, setTaskEnd,
          fetchTasks, fetchTasksCompleted, fetchTasksDeleted, fetchTaskToEdit, isLoading
        ] = useApiTasks(apiError)
  const [profileUrl, fetchDefaultProfile] = useFetchProfilePic(apiError)
    
  useEffect(() => {
    fetchTasks()
    fetchTasksCompleted()
    fetchTasksDeleted()
    fetchDefaultProfile()
  }, [])


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
        const res = await api.put(`/tasks/${selectedTaskIdToEdit}`, requestData, requestConfig)
        setSelectedTaskIdToEdit(null)
        if (taskUpdate.task_body !== taskBody || taskUpdate.task_title !== taskTitle || taskUpdate.task_start !== taskStart || taskUpdate.task_end !== taskEnd) {
          apiSuccess(res.data.message)
        } 
      } else {
        const res = await api.post("/tasks", requestData, requestConfig)
         apiSuccess(res.data.message)
      }
      setTaskTitle("")
      setTaskStart("")
      setTaskEnd("")
      setTaskBody("")
      fetchTasks()
 
    } catch (error) {
        apiError(error.message)
    }
  }

  // Reset the form to and set the selectedTaskIdToEdit to null
  const handleCancelEdit = () => {
    setSelectedTaskIdToEdit(null)
    setTaskTitle("")
    setTaskStart("")
    setTaskEnd("")
    setTaskStart("")
    setTaskBody("")
  }
  
  // toggle the form input
  const handleToggleCreateTask = () => {
    setCreateTaskToggle(createTaskToggle === "hidden" ? "block" : "hidden")
  }

  const uploadProfileImage = async (e) => {
    e.preventDefault()
    const fileInput = e.target.elements.image

    if (!fileInput.value) {
      apiError('Please select a file')
      return
    }

    const formData = new FormData()
    formData.append('image', fileInput.files[0])

    try {
      const res = await api.post(`/upload/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      apiSuccess(res.data.message)
      fetchDefaultProfile()
      fileInput.value = ''

    } catch (error) {
      apiError(error.message)
    }
  }

  const logout = async () => {
    try {
      await api.post('/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      setToken('')
      navigate('/login')

    } catch (error) {
      apiError('An error occurred while logging out:', error)
    }
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <Sidebar token={token} showSidebar={showSidebar} handleCloseSidebar={handleCloseSidebar} tasks={tasks.length} tasksCompleted={tasksCompleted.length} tasksDeleted={tasksDeleted.length} showForm={showForm} setShowForm={setShowForm} showUploadImageForm={showUploadImageForm} hideUploadForm={hideUploadForm} uploadProfileImage={uploadProfileImage} profileUrl={profileUrl} logout={logout}/>
      <header>
        <Navbar token={token} handleOpenSidebar={handleOpenSidebar} handleToggleCreateTask={handleToggleCreateTask} />
      </header>
      <div className="layout h-screen">
        <div className="container mx-auto flex">
          <aside className="w-1/4 lg:block hidden bg-body border-navbar border-r h-screen py-3 px-4">
            <div className="flex flex-col justify-between h-[92%] mt-16 py-5">
              <MainMenu tasks={tasks.length}/>
              <Archived tasksCompleted={tasksCompleted.length} tasksDeleted={tasksDeleted.length} />
              <CommingSoon />
              <Logout logout={logout} uploadProfileImage={uploadProfileImage} showForm={showForm} setShowForm={setShowForm} showUploadImageForm={showUploadImageForm} hideUploadForm={hideUploadForm} profileUrl={profileUrl}/>
            </div>
          </aside>
          <main className="w-full h-screen lg:flex-1 overflow-y-auto">
            <div className={`mt-16 py-3 px-4 h-[90%] ${tasks.length === 0 && "py-5"}`}>
              <section className={`add-task-form mb-4 ${createTaskToggle}`}>
                <UserTaskInput
                  handleSubmitTask={handleSubmitTask}
                  taskTitle={taskTitle}
                  setTaskTitle={setTaskTitle}
                  taskBody={taskBody}
                  setTaskBody={setTaskBody}
                  taskStart={taskStart}
                  setTaskStart={setTaskStart}
                  taskEnd={taskEnd}
                  setTaskEnd={setTaskEnd}
                  selectedTaskIdToEdit={selectedTaskIdToEdit}
                  handleCancelEdit={handleCancelEdit}
                />
              </section>
              {isLoading ? (
                <div  className={`h-full flex justify-center items-center ${createTaskToggle !== "hidden" && "h-60 mt-10"}`}>
                  <img src={Rolling} alt="loading svg" className="w-9 " />
                </div>
              ) : (
                tasks.length === 0 ? (
                <section className={`h-full flex items-center justify-center bg-bg-input rounded-md ${createTaskToggle !== "hidden" && "h-2/5 md:h-[55%]  lg:h-[52%] xl:h-[51%] 2xl:h-[55%]" }`}>
                   <div className="text-white text-center">
                      <h1 className="text-xl mb-5 mf:mb-0 md:mr-5 md:text-3xl font-medium">Click the button create task to create a new task</h1>
                      <img src={NoTaskToShow} alt="no task image" className="w-48 mx-auto" />
                    </div>
                </section>
              ) : (
                <section className="tasks-list">
                  <UserTaskList
                    taskLists={tasks}
                    fetchTaskToEdit={fetchTaskToEdit}
                    setSelectedTaskIdToEdit={setSelectedTaskIdToEdit}
                    taskInfo={taskInfo}
                    getTaskInfo={getTaskInfo}
                    showTaskInfo={showTaskInfo}
                    setShowTaskInfo={setShowTaskInfo}
                    handleDeleteTask={handleDeleteTask}
                    fetchTasksDeleted={fetchTasksDeleted}
                    fetchTasks={fetchTasks}
                    handleCompleteTask={handleCompleteTask}
                    fetchTasksCompleted={fetchTasksCompleted}
                    setCreateTaskToggle={setCreateTaskToggle}                   
                  />
                </section>
              )
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default Task