import {  faLeaf, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useLocation} from 'react-router-dom'
import MainMenu from './components/MainMenu'
import Archived from './components/Archived'
import CommingSoon from './components/CommingSoon'
import Logout from './components/Logout'

const SideNav = ({ token, showSideNav, onCloseSideNav, numberOfTask, handleLogout, numberOfTaskDeleted, numberOfTaskCompleted }) => {
  const location = useLocation()
  const isActiveHome = location.pathname === '/';

  return (
    <div className={`fixed top-0 h-screen bg-body lg:border-navbar lg:border-r-2 w-72 lg:w-60 xl:w-72 p-4 text-navbar transition-all duration-500 ${showSideNav}`}>
      <div className='relative flex items-center'>
        <Link to='/' className='text-2xl font-bold tracking-wide flex items-center text-white'>
          <FontAwesomeIcon  icon={faLeaf} className='text-orange-600 mr-1 text-3xl'/>
          MindfullTasks
         </Link>
         <span className='absolute right-[-2rem] top-[-.5rem] flex items-center justify-center bg-orange-600 h-8 w-8 rounded-full text-white lg:hidden' onClick={onCloseSideNav}>
          <FontAwesomeIcon icon={faXmark} className=''/>
         </span>
      </div>
      {token ? (
        isActiveHome ? (
          <div className='mt-10 text-white'>
            <Link to='/tasks'className='bg-orange-600 px-4 py-2 rounded-md transition-all duration-300 hover:bg-orange-500'>My Tasks</Link>
          </div>
        ) : (
          <div className='h-full flex flex-col justify-evenly'>
            <MainMenu numberOfTask={numberOfTask}/>
            <Archived numberOfTaskDeleted={numberOfTaskDeleted} numberOfTaskCompleted={numberOfTaskCompleted}/>
            <CommingSoon />
            <Logout handleLogout={handleLogout} token={token}/>
          </div>
          
        )
      ) : (
        <div className='mt-5 text-white text-center'>
            <Link to='/login' className='block bg-bg-input mb-4 px-4 py-2 rounded-md transition-all duration-300 hover:bg-orange-500'>Login</Link>
            <Link to='/signup'className='block bg-orange-600 px-4 py-2 rounded-md transition-all duration-300 hover:bg-orange-500'>Start now</Link>
        </div>
      )}
    </div>
  )
}

export default SideNav