import { faBars, faLeaf } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

const Navbar = ({handleOpenSidebar, disable, handleShowWarningMessage, handleToggleCreateTask, restoreAllTask}) => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const location = useLocation()
  const isActiveTask = location.pathname === "/menu/my-task"
  const isActiveDelete = location.pathname === "/archived/deleted"
  const isActiveComplete = location.pathname === "/archived/completed"
  const isActiveHome = location.pathname === "/"
  const isActiveSignup = location.pathname === "/signup"
  const isActivelogin = location.pathname === "/login"

  return (
    <nav className="bg-navbar fixed top-0 left-0 right-0 z-40">
      <div className="container mx-auto text-white flex items-center justify-between py-3 px-4">
      {token ? (
        <>
          <Link to="/" className="hidden lg:block">
            <span className="text-2xl font-bold tracking-wide flex items-center">
              <FontAwesomeIcon className="text-orange-600 mr-1 text-3xl" icon={faLeaf} />
              MindfullTasks
            </span>
          </Link>
          {isActiveTask &&
              <button onClick={handleToggleCreateTask} type="button" className="order-2 bg-orange-600 py-2 px-3 rounded-md transition-all duration-300 hover:bg-orange-700">Create Task</button>
            }
            {isActiveComplete &&
              <button onClick={handleShowWarningMessage} type="button" disabled={disable} className="order-2 bg-red-600 py-2 px-3 rounded-md transition-all duration-300 hover:bg-red-700">Delete All</button>
            }
            {isActiveDelete && 
              <div className="order-2">
                <button onClick={restoreAllTask} type="button" disabled={disable} className="mr-2 bg-green-600 py-2 px-3 rounded-md transition-all duration-300 hover:bg-green-700">Restore All</button>
                <button onClick={handleShowWarningMessage} type="button" disabled={disable} className="bg-red-600 py-2 px-3 rounded-md transition-all duration-300 hover:bg-red-700">Delete All</button>
              </div>
            }
            {isActiveSignup && (
              <Link to="/menu/my-task" className=" order-2 bg-orange-600 py-2 px-3 rounded-md transition-all duration-300 hover:bg-orange-700">My Task</Link>
            )}
            {isActivelogin && (
              <Link to="/menu/my-task" className=" order-2 bg-orange-600 py-2 px-3 rounded-md transition-all duration-300 hover:bg-orange-700">My Task</Link>
            )}
        </>
      ) : (
        <Link to="/" className="">
          <span className="text-2xl font-bold tracking-wide flex items-center">
            <FontAwesomeIcon className="text-orange-600 mr-1 text-3xl" icon={faLeaf} />
            MindfullTasks
          </span>
        </Link>
      )}
        <button type="button" className="text-2xl lg:hidden" onClick={handleOpenSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        {token ? (
          isActiveHome && <Link to="/menu/my-task" className="bg-orange-600 py-2 px-3 rounded-md transition-all duration-300 hover:bg-orange-700">My Task</Link>
        ) : (
          <div className="hidden lg:block">
            <Link to="/login" className="py-2 px-3 rounded-md transition-all duration-300 hover:bg-orange-600 mr-2">Login</Link>
            <Link to="/signup" className="bg-orange-600 py-2 px-3 rounded-md transition-all duration-300 hover:bg-orange-700">Start now</Link>
          </div>
        )}













        {/* <button type="button" className="text-2xl lg:hidden" onClick={handleOpenSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <Link to="/" className="hidden lg:block">
          <span className="text-2xl font-bold tracking-wide flex items-center">
            <FontAwesomeIcon className="text-orange-600 mr-1 text-3xl" icon={faLeaf} />
            MindfullTasks
          </span>
        </Link>
        {token ? (
          <>
            {isActiveTask &&
              <button onClick={handleToggleCreateTask} type="button" className="bg-orange-600 py-2 px-3 rounded-md transition-all duration-300 hover:bg-orange-700">Create Task</button>
            }
            {isActiveComplete &&
              <button onClick={handleShowWarningMessage} type="button" disabled={disable} className="bg-red-600 py-2 px-3 rounded-md transition-all duration-300 hover:bg-red-700">Delete All</button>
            }
            {isActiveDelete && 
              <div>
                <button onClick={restoreAllTask} type="button" disabled={disable} className="mr-2 bg-green-600 py-2 px-3 rounded-md transition-all duration-300 hover:bg-green-700">Restore All</button>
                <button onClick={handleShowWarningMessage} type="button" disabled={disable} className="bg-red-600 py-2 px-3 rounded-md transition-all duration-300 hover:bg-red-700">Delete All</button>
              </div>
            }
            {isActiveHome && <Link to="/menu/my-task" className="bg-orange-600 py-2 px-3 rounded-md transition-all duration-300 hover:bg-orange-700">My Task</Link>}
          </>
        ) : (
          <div className="hidden lg:block">
            <Link to="/login" className="py-2 px-3 rounded-md transition-all duration-300 hover:bg-orange-600 mr-4">Login</Link>
            <Link to="/signup" className="bg-orange-600 py-2 px-3 rounded-md transition-all duration-300 hover:bg-orange-700">Signup</Link>
          </div>
        )} */}
      </div>
    </nav>
  )
}

export default Navbar
