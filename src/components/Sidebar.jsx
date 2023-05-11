import { faLeaf, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useLocation } from "react-router-dom"
import MainMenu from "./MainMenu"
import Archived from "./Archived"
import CommingSoon from "./CommingSoon"
import Logout from "./Logout"
import { useState } from "react"


const Sidebar = ({showSidebar, handleCloseSidebar, tasks, tasksCompleted, tasksDeleted, showForm, showUploadImageForm, hideUploadForm, setShowForm, profileUrl, uploadProfileImage, logout}) => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const location = useLocation()
  const isActiveHome = location.pathname === "/"
  const isActiveSignup = location.pathname === "/signup"
  const isActiveLogin = location.pathname === "/login"
  const isActiveTask = location.pathname === "/menu/my-task"
  const isActiveDelete = location.pathname === "/archived/deleted"
  const isActiveComplete = location.pathname === "/archived/completed"

  return (
    <div className={`side-nav text-white fixed z-50 px-4 h-screen bg-body w-72 transition-all duration-300 ${showSidebar} lg:hidden`}>
      <div className='relative py-4'>
        <Link to='/' className='text-2xl font-bold tracking-wide flex items-center text-white'>
          <span className="text-orange-600 text-3xl mr-1">
            <FontAwesomeIcon  icon={faLeaf} />
          </span>
           MindfullTasks
        </Link>
        <button className="absolute -right-2 top-1/2 -translate-y-1/2 bg-orange-600 h-8 w-8 rounded-full flex items-center justify-center" onClick={handleCloseSidebar}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      {token ? (
        <>
          {isActiveHome && (
            <Link to="/menu/my-task" className="block w-1/2 mx-auto text-center bg-orange-600 py-2 px-3 mt-3 rounded-md transition-all duration-300 hover:bg-orange-700">My Task</Link>
          )}
          {isActiveSignup &&  (
            <Link to="/menu/my-task" className="block w-1/2 mx-auto text-center bg-orange-600 py-2 px-3 mt-3 rounded-md transition-all duration-300 hover:bg-orange-700">My Task</Link>
          )}
          {isActiveLogin && (
            <Link to="/menu/my-task" className="block w-1/2 mx-auto text-center bg-orange-600 py-2 px-3 mt-3 rounded-md transition-all duration-300 hover:bg-orange-700">My Task</Link>
          )}
          {isActiveTask || isActiveComplete || isActiveDelete ?(
            <div className="h-[90%] flex flex-col justify-between">
              <MainMenu tasks={tasks}/>
              <Archived tasksCompleted={tasksCompleted} tasksDeleted={tasksDeleted}/>
              <CommingSoon />
              <Logout logout={logout} showForm={showForm} setShowForm={setShowForm} showUploadImageForm={showUploadImageForm} hideUploadForm={hideUploadForm} profileUrl={profileUrl}  uploadProfileImage={uploadProfileImage}/>
            </div>
          ): ""}
        </>

      ) : (
        <>
          {isActiveHome && (
            <>
              <Link to="/login" className="block w-1/2 mx-auto text-center py-2 px-3 mt-3 rounded-md transition-all duration-300 hover:bg-orange-600 ">Login</Link>
              <Link to="/signup" className="block w-1/2 mx-auto text-center bg-orange-600 py-2 px-3 rounded-md transition-all duration-300 hover:bg-orange-700">Start now</Link>
            </>
          )}
          {isActiveSignup && (
            <>
              <Link to="/login" className="block w-1/2 mx-auto text-center py-2 px-3 mt-3 rounded-md transition-all duration-300 hover:bg-orange-600 ">Login</Link>
              <Link to="/signup" className="block w-1/2 mx-auto text-center bg-orange-600 py-2 px-3 rounded-md transition-all duration-300 hover:bg-orange-700">Start now</Link>
            </>
          )}
          {isActiveLogin && (
            <>
              <Link to="/login" className="block w-1/2 mx-auto text-center py-2 px-3 mt-3 rounded-md transition-all duration-300 hover:bg-orange-600 ">Login</Link>
              <Link to="/signup" className="block w-1/2 mx-auto text-center bg-orange-600 py-2 px-3 rounded-md transition-all duration-300 hover:bg-orange-700">Start now</Link>
            </>
          )}
        </>    
      )}
    </div>
  )
}

export default Sidebar