import { faCircleCheck, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useLocation } from "react-router-dom"


const Archived = ({tasksCompleted, tasksDeleted}) => {
  const location = useLocation()
  const isActiveDelete = location.pathname === "/archived/deleted"
  const isActiveComplete = location.pathname === "/archived/completed"

  return (
    <section className="archived text-idle">
      <h1 className='mb-2 text-sm font-light'>Archived</h1>
      <Link to="/archived/completed"
        className={`flex items-center px-3 py-2 lg:py-3 rounded-md mb-2 duration-300 transition-all hover:bg-orange-600 group ${isActiveComplete ? "bg-orange-600" : "bg-bg-input"}`}
      >
        <span className={`mr-2 text-xl text-orange-600 duration-300 transition-all group-hover:text-white ${isActiveComplete ? "text-white" : "text-orange-600"}`}>
          <FontAwesomeIcon icon={faCircleCheck} />
        </span>
        <span className="flex-1">Completed</span>
        <span className={`text-[12px] py-1 px-3 flex items-center rounded-md duration-300 transition-all group-hover:bg-white group-hover:text-bg-input ${isActiveComplete ? "bg-white text-bg-input" : "bg-navbar"}`}>
          {tasksCompleted}
        </span>
      </Link>
      <Link to="/archived/deleted"
        className={`flex items-center px-3 py-2 lg:py-3 rounded-md mb-2 duration-300 transition-all hover:bg-orange-600 group ${isActiveDelete ? "bg-orange-600" : "bg-bg-input"}`}
      >
        <span className={`mr-2 text-xl text-orange-600 duration-300 transition-all group-hover:text-white ${isActiveDelete? "text-white" : "text-orange-600"}`}>
          <FontAwesomeIcon icon={faTrash} />
        </span>
        <span className="flex-1">Deleted</span>
        <span className={`text-[12px] py-1 px-3 flex items-center rounded-md duration-300 transition-all group-hover:bg-white group-hover:text-bg-input ${isActiveDelete ? "bg-white text-bg-input" : "bg-navbar"}`}>
          {tasksDeleted}
        </span>
      </Link>
    </section>
  )
}

export default Archived