import { faBarsProgress } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Link, useLocation } from "react-router-dom"

const MainMenu = ({tasks}) => {
  const location = useLocation()
  const isActiveTask = location.pathname === "/menu/my-task"

  return (
    <section className="main-menu text-idle">
      <h1 className="mb-2 text-sm font-light">Main Menu</h1>
      <Link to="/menu/my-task"
        className={`flex items-center px-3 py-2 lg:py-3 rounded-md mb-2 duration-300 transition-all hover:bg-orange-600 group ${isActiveTask ? "bg-orange-600" : "bg-bg-input"}`}
      >
        <span className={`mr-2 text-xl text-orange-600 duration-300 transition-all group-hover:text-white ${isActiveTask ? "text-white" : "text-orange-600"}`}>
          <FontAwesomeIcon icon={faBarsProgress} />
        </span>
        <span className='flex-1'>My Tasks</span>
        <span className={`text-[12px] py-1 px-3 flex items-center rounded-md duration-300 transition-all group-hover:bg-white group-hover:text-bg-input ${isActiveTask ? "bg-white text-bg-input" : "bg-navbar"}`}>
          {tasks}
        </span>
      </Link>
    </section>
  )
}

export default MainMenu