import { useState } from 'react'
import { faBars, faLeaf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useLocation } from 'react-router-dom'
import SideNav from './SideNav'

const Navbar = ({ numberOfTask, handleLogout, numberOfTaskDeleted, numberOfTaskCompleted, handleToggleCreateTask, handleShowWarningMessage, restoreAllTask, disable }) => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [searchExpand, setSearchExpand] = useState('w-8')
  const [showSideNav, setShowSideNav] = useState('left-[-20rem]')

  const location = useLocation();
  const isActiveTask = location.pathname === '/tasks';
  const isActiveDelete = location.pathname === '/deleted';
  const isActiveComplete = location.pathname === '/completed';//Jan added
  const isActiveHome = location.pathname === '/';

   const handleSideNav = () => {
    setShowSideNav(showSideNav === 'left-[-20rem]' && 'left-0')
  }

  const handleCloseSideNav = () => {
    setShowSideNav('left-[-20rem]')
  }

  return (
    <nav className='bg-navbar text-white fixed top-0 left-0 right-0 z-50'>
      <SideNav token={token} showSideNav={showSideNav} onCloseSideNav={handleCloseSideNav} numberOfTask={numberOfTask} handleLogout={handleLogout} numberOfTaskDeleted={numberOfTaskDeleted} numberOfTaskCompleted={numberOfTaskCompleted}/>
      <div className='container mx-auto py-4 px-4 sm:px-0 flex justify-between items-center'>
        {token ? (
          <>
            <Link to='/' className='hidden lg:block'>
              <span className='text-2xl text-white font-bold tracking-wide flex items-center'>
                <FontAwesomeIcon  icon={faLeaf} className='text-orange-600 mr-1 text-3xl'/>
                MindfullTasks
              </span>
            </Link>
            {isActiveTask ?
              <button className='bg-orange-600 px-4 py-2 rounded-md order-2 transition-all duration-300 hover:bg-orange-500' onClick={() => handleToggleCreateTask()}>
                Create Task
              </button> : ''
            }
            {/* Jan added */}
            {isActiveComplete ?
              <div className="flex justify-end order-2">
              <button disabled={disable} className="bg-red-600 py-2 px-3 rounded-md text-white transition-all duration-300 hover:bg-red-500" onClick={() =>handleShowWarningMessage()}>
                Delete All
              </button>
            </div> : '' 
            }
            {/*------*/}
            {isActiveDelete ? 
              <div className="flex justify-end order-2">
                <button disabled={disable}  className="bg-green-600 py-2 px-3 rounded-md mr-3 text-white transition-all duration-300 hover:bg-green-500" onClick={() => restoreAllTask()}>
                  Restore All
                </button>
                <button disabled={disable} className="bg-red-600 py-2 px-3 rounded-md text-white transition-all duration-300 hover:bg-red-500" onClick={() =>handleShowWarningMessage()}>
                  Delete All
                </button>
              </div> : '' 
            }
          </>     
        ) : (
          <Link to='/' className='text-2xl text-white font-bold tracking-wide flex items-center'>
            <FontAwesomeIcon  icon={faLeaf} className='text-orange-600 mr-1 text-3xl'/>
            MindfullTasks
          </Link>
        )}
        <FontAwesomeIcon icon={faBars} className='text-2xl lg:hidden order-1' onClick={handleSideNav} />
        {token ? (
          isActiveHome ? <Link to='/tasks'className='order-2 bg-orange-600 px-4 py-2 rounded-md transition-all duration-300 hover:bg-orange-500'>My Tasks</Link> : ''
        ) : (
          <div className='hidden lg:block'>
            <Link to='/login' className='mr-4 px-4 py-3 rounded-md transition-all duration-300 hover:bg-orange-500'>Login</Link>
            <Link to='/signup'className='bg-orange-600 px-4 py-3 rounded-md transition-all duration-300 hover:bg-orange-500'>Start now</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar