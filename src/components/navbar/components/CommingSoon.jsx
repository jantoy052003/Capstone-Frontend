import { faCalendarDays, faChalkboardUser, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CommingSoon = () => {
  
  return (
    <div className='future-content mb-6 text-idle'>
      <h1 className='mb-2 text-sm font-light'>Coming Soon</h1>
      <div className='flex items-center bg-bg-input px-3 py-2 rounded-md mb-2'>
        <span className='mr-2  text-orange-600 text-xl'><FontAwesomeIcon  icon={faCalendarDays} /></span>
        <p className='flex-1'>Daily Planner</p>
      </div>
      <div className='flex items-center bg-bg-input px-3 py-2 rounded-md mb-2'>
        <span className='mr-2  text-orange-600 text-xl'><FontAwesomeIcon  icon={faChalkboardUser} /></span>
        <p className='flex-1'>Learning Tracker</p>
      </div>
      <div className='flex items-center bg-bg-input px-3 py-2 rounded-md mb-2'>
        <span className='mr-2  text-orange-600 text-xl'><FontAwesomeIcon  icon={faHeart} /></span>
        <p className='flex-1'>Fitness Tracker</p>
      </div>
    </div>
  )
}

export default CommingSoon