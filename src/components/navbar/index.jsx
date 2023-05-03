import { useState } from 'react'
import { faBars, faBell, faLeaf, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import SideNav from './SideNav'

const Navbar = ({ numberOfTask, handleLogout, numberOfTaskDeleted, numberOfTaskCompleted }) => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [searchExpand, setSearchExpand] = useState('w-8')
  const [showSideNav, setShowSideNav] = useState('left-[-20rem]')

  const expand = () => {
    setSearchExpand(searchExpand === 'w-8' ? 'w-48' : 'w-8')
  }

   const handleSideNav = () => {
    setShowSideNav(showSideNav === 'left-[-20rem]' && 'left-0')
  }

  const handleCloseSideNav = () => {
    setShowSideNav('left-[-20rem]')
  }

  return (
    <nav className='bg-navbar text-white fixed top-0 left-0 right-0 z-50'>
      <SideNav token={token} showSideNav={showSideNav} onCloseSideNav={handleCloseSideNav} numberOfTask={numberOfTask} handleLogout={handleLogout} numberOfTaskDeleted={numberOfTaskDeleted} numberOfTaskCompleted={numberOfTaskCompleted}/>
      <div className='container mx-auto py-4 px-4 lg:px-0 flex justify-between items-center'>
        {token ? (
          <>
            <div className='order-2 lg:hidden text-lg  flex items-center'>
              <div className='bg-white py-1 px-2 rounded-md mr-2'>
                <FontAwesomeIcon icon={faSearch} className='text-orange-600'/>
              </div>
              <div className='bg-white py-1 px-2 rounded-md mr-2'>
                <FontAwesomeIcon icon={faBell} className='text-orange-600' />
              </div>
            </div>
            <div className='hidden lg:block'>
              <span className='text-2xl text-white font-bold tracking-wide flex items-center'>
                <FontAwesomeIcon  icon={faLeaf} className='text-orange-600 mr-1 text-3xl'/>
                MindfullTasks
              </span>
            </div>
            <div className='hidden lg:block'>
            <div className='flex'>
              <form className={`bg-white py-1 px-2 rounded-md mr-2 relative flex items-center duration-300 transition-all ${searchExpand}`}>
                <span className='absolute right-0 bg-white h-full flex items-center rounded-md cursor-pointer' onClick={expand}>
                  <FontAwesomeIcon icon={faSearch} className='text-orange-600  bg-white px-2 '/>
                </span>
                <input type="text" className='w-full h-full text-navbar outline-none'/>
              </form>
              <div className='bg-white py-1 px-2 rounded-md'>
                <FontAwesomeIcon icon={faBell} className='text-orange-600' />
              </div>
             </div>
            </div>
          </>     
        ) : (
          <Link to='/' className='text-2xl text-white font-bold tracking-wide flex items-center'>
            <FontAwesomeIcon  icon={faLeaf} className='text-orange-600 mr-1 text-3xl'/>
            MindfullTasks
          </Link>
        )}
        <FontAwesomeIcon icon={faBars} className='text-2xl lg:hidden order-1' onClick={handleSideNav} />
        {token ? '' : (
          <div className='hidden lg:block'>
            <Link to='/login' className='mr-4 bg-orange-600 px-4 py-2 rounded-md transition-all duration-300 hover:bg-orange-500'>Login</Link>
            <Link to='/signup'className='bg-orange-600 px-4 py-2 rounded-md transition-all duration-300 hover:bg-orange-500'>Signup</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar