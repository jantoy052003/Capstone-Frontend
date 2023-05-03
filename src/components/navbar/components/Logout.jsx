import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const Logout = ({handleLogout}) => {
  return (
    <div className=' text-idle'>
      <div className='flex items-center justify-between rounded-md mb-2 bg-bg-input'>
        <div className='flex-1 flex items-center cursor-pointer px-3 py-2 hover:bg-orange-600 transition-all duration-300 rounded-md group'
          onClick={handleLogout}
        >
          <span className='mr-2 text-orange-600 text-xl group-hover:text-white group-hover:duration-300 group-hover:transition-all'><FontAwesomeIcon  icon={faArrowRightFromBracket} /></span>
          <p className='group-hover:text-white group-hover:duration-300 group-hover:transition-all'>Logout</p>
        </div>
        <span className='px-3 py-2'>
          test
        </span>
      </div>
    </div>
  )
}

export default Logout