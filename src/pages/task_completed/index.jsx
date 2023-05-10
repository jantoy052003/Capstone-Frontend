import { useEffect, useState } from "react"
import { useSidebar } from "../../hooks/useSideBar"
import { useApiTasks } from "../../hooks/useApiTask"
import { useGetTaskInfo } from "../../hooks/useGetTaskInfo"
import { useApiDeleteTask } from "../../hooks/useApiDeleteTask"
import { useShowWarningMessage } from "../../hooks/useShowWarningMessage"
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import MainMenu from "../../components/MainMenu"
import Archived from "../../components/Archived"
import CommingSoon from "../../components/CommingSoon"
import Logout from "../../components/Logout"
import UserTaskCompletedList from "./UserTaskCompletedList"
import NoTaskToShow from '../../assets/NoTask.svg'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Rolling from '../../assets/Rolling.svg'
import { useToggleForm } from "../../hooks/useToggleForm"
import api from "../../lib/api"
import { useFetchProfilePic } from "../../hooks/useFetchProfilePic"
import { useNavigate } from "react-router-dom"

const TaskCompleted = () => {
  const [showSidebar, handleOpenSidebar, handleCloseSidebar] = useSidebar()
  const [taskInfo, showTaskInfo, setShowTaskInfo, getTaskInfo] = useGetTaskInfo()
  const [showWarningMessage, taskIdToDelete, setTaskIdToDelete, handleHideWarningMessage, handleShowWarningMessage, permanentDeleteTask] = useShowWarningMessage()
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
  const [ , , deleteCompletedTaskById, deleteAllCompletedTask, , ] = useApiDeleteTask(apiSuccess, apiError)
  const [setToken, token, tasks, tasksCompleted, tasksDeleted, , , , , , , , , , fetchTasks, fetchTasksCompleted, fetchTasksDeleted, , isLoading] = useApiTasks(apiError)
  const disable = tasksCompleted.length === 0 ? true : false
  const [profileUrl, fetchDefaultProfile] = useFetchProfilePic(apiError)
    
  useEffect(() => {
    fetchTasks()
    fetchTasksCompleted()
    fetchTasksDeleted()
    fetchDefaultProfile()
  }, [])
  
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
      <Sidebar logout={logout} showSidebar={showSidebar} handleCloseSidebar={handleCloseSidebar} tasks={tasks.length} tasksCompleted={tasksCompleted.length} tasksDeleted={tasksDeleted.length} showForm={showForm} setShowForm={setShowForm} showUploadImageForm={showUploadImageForm} hideUploadForm={hideUploadForm} uploadProfileImage={uploadProfileImage} profileUrl={profileUrl}/>
      <header>
        <Navbar token={token} handleOpenSidebar={handleOpenSidebar} disable={disable} handleShowWarningMessage={handleShowWarningMessage}/>
      </header>
      <div className="layout h-screen">
        <div className="container mx-auto flex">
          <aside className="w-1/4 lg:block hidden bg-body border-navbar border-r h-screen py-3 px-4">
            <div className="flex flex-col justify-between h-[92%] mt-16 py-5">
              <MainMenu tasks={tasks.length}/>
              <Archived tasksCompleted={tasksCompleted.length} tasksDeleted={tasksDeleted.length} />
              <CommingSoon />
              <Logout logout={logout} showForm={showForm} showUploadImageForm={showUploadImageForm} hideUploadForm={hideUploadForm} uploadProfileImage={uploadProfileImage} profileUrl={profileUrl} setShowForm={setShowForm}/>
            </div>
          </aside>
          <main className="w-full h-screen lg:flex-1 overflow-y-auto">
            <div className={`mt-16 py-3 px-4 h-[90%] ${tasksCompleted.length === 0 && 'py-5'}`}>
              {isLoading ? (
                <div  className="h-full flex justify-center items-center">
                  <img src={Rolling} alt="loading svg" className="w-9 " />
                </div>
              ) : (
                tasksCompleted.length === 0 ? (
                <section className={`h-full flex items-center justify-center bg-bg-input rounded-md`}>
                  <div className='text-white text-center'>
                    <h1 className='text-xl mb-5 mf:mb-0 md:mr-5 md:text-3xl font-medium'>No completed tasks to display</h1>
                    <img src={NoTaskToShow} alt="no task image" className='w-48 mx-auto' />
                  </div>
                </section>
              ) : (
                <section className="completed-list">
                  <UserTaskCompletedList
                    tasksCompleted={tasksCompleted}
                    taskInfo={taskInfo}
                    getTaskInfo={getTaskInfo}
                    showTaskInfo={showTaskInfo}
                    setShowTaskInfo={setShowTaskInfo}
                    deleteCompletedTaskById={deleteCompletedTaskById}
                    deleteAllCompletedTask={deleteAllCompletedTask}
                    showWarningMessage={showWarningMessage}
                    handleShowWarningMessage={handleShowWarningMessage}
                    handleHideWarningMessage={handleHideWarningMessage}
                    permanentDeleteTask={permanentDeleteTask}
                    taskIdToDelete={taskIdToDelete}
                    setTaskIdToDelete={setTaskIdToDelete}
                    fetchTasksCompleted={fetchTasksCompleted}
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

export default TaskCompleted