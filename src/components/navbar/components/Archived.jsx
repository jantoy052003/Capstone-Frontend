import { Link, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck, faTrash } from "@fortawesome/free-solid-svg-icons"


const Archived = ({ numberOfTaskCompleted, numberOfTaskDeleted }) => {
  const location = useLocation();
  const isActiveDelete = location.pathname === '/deleted';
  const isActiveComplete = location.pathname === '/completed';

  return (
    <div className='Archived mb-6 text-idle'>
      <h1 className='mb-2 text-sm font-light'>Archived</h1>
      <Link
        to='/completed'
         className={`flex items-center bg-bg-input px-3 py-2 rounded-md mb-2 duration-300 transition-all hover:bg-orange-600 group ${isActiveComplete ? 'bg-orange-600' : ''}`}
      >
        <span className={`mr-2 text-xl text-orange-600 duration-300 transition-all group-hover:text-white ${isActiveComplete ? 'text-white' : ''}`}>
            <FontAwesomeIcon icon={faCircleCheck} />
        </span>
        <p className='flex-1'>Completed</p>
        <span className={`bg-navbar text-[12px] py-1 px-3 flex items-center rounded-md duration-300 transition-all group-hover:bg-white group-hover:text-bg-input ${isActiveComplete ? 'bg-white text-navbar' : ''}`}>
         {numberOfTaskCompleted}
        </span>
      </Link>
      <Link 
        to='/deleted'
        className={`flex items-center bg-bg-input px-3 py-2 rounded-md mb-2 duration-300 transition-all hover:bg-orange-600 group ${isActiveDelete ? 'bg-orange-600' : ''}`}
      >
        <span className={`mr-2 text-xl text-orange-600 duration-300 transition-all group-hover:text-white ${isActiveDelete ? 'text-white' : ''}`}>
          <FontAwesomeIcon  icon={faTrash} />
        </span>
        <p className='flex-1'>Deleted</p>
        <span className={`bg-navbar text-[12px] py-1 px-3 flex items-center rounded-md duration-300 transition-all group-hover:bg-white group-hover:text-bg-input ${isActiveDelete ? 'bg-white text-navbar' : ''}`}>
          {numberOfTaskDeleted}
        </span>
      </Link>
    </div>
  )
}

export default Archived