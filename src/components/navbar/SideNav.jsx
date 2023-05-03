import {  faLeaf, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import MainMenu from './components/MainMenu'
import Archived from './components/Archived'
import CommingSoon from './components/CommingSoon'
import Logout from './components/Logout'

const SideNav = ({ token, showSideNav, onCloseSideNav, numberOfTask, handleLogout, numberOfTaskDeleted, numberOfTaskCompleted }) => {
  return (
    <div className={`fixed top-0 h-screen bg-body lg:border-navbar lg:border-r-2 w-72 lg:w-60 xl:w-72 p-4 text-navbar transition-all duration-500 ${showSideNav}`}>
      <div className='relative flex items-center'>
        <span className='text-2xl font-bold tracking-wide flex items-center text-white'>
          <FontAwesomeIcon  icon={faLeaf} className='text-orange-600 mr-1 text-3xl'/>
          MindfullTasks
         </span>
         <span className='absolute right-[-2rem] top-[-.5rem] flex items-center justify-center bg-orange-600 h-8 w-8 rounded-full text-white lg:hidden' onClick={onCloseSideNav}>
          <FontAwesomeIcon icon={faXmark} className=''/>
         </span>
      </div>
      {token ? (
        <div className='h-full flex flex-col justify-evenly'>
          <MainMenu numberOfTask={numberOfTask}/>
          <Archived numberOfTaskDeleted={numberOfTaskDeleted} numberOfTaskCompleted={numberOfTaskCompleted}/>
          <CommingSoon />
          <Logout handleLogout={handleLogout}/>
        </div>
      ) : (
        <div className='mt-5'>
          <Link to='/login' className='block py-2 mb-2 text-center bg-bg-100 rounded-md'>Login</Link>
          <Link to='/signup' className='block py-2 text-center bg-bg-100 rounded-md'>Signup</Link>
        </div>
      )}
    </div>
  )
}

export default SideNav