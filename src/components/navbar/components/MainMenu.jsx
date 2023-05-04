import { faBarsProgress } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useLocation } from 'react-router-dom'

const MainMenu = ({ numberOfTask }) => {
  const location = useLocation();
  const isActiveTask = location.pathname === '/tasks';
  
  return (
    <div className='main-menu mb-6 text-idle'>
      <h1 className='mb-2 text-sm font-light'>Main Menu</h1>
      <Link
        to='/tasks'
        className={`flex items-center bg-bg-input px-3 py-2 rounded-md mb-2 duration-300 transition-all hover:bg-orange-600 group ${isActiveTask ? 'bg-orange-600' : ''}`}
      >
        <span className={`mr-2 text-xl text-orange-600 duration-300 transition-all group-hover:text-white ${isActiveTask ? 'text-white' : ''}`}>
          <FontAwesomeIcon  icon={faBarsProgress} />
        </span>
        <p className='flex-1'>My Task</p>
        <span className={`bg-navbar text-[12px] py-1 px-3 flex items-center rounded-md duration-300 transition-all group-hover:bg-white group-hover:text-bg-input ${isActiveTask ? 'bg-white text-navbar' : ''}`}>
          {numberOfTask}
        </span>
      </Link>
    </div>
  )
}

export default MainMenu
