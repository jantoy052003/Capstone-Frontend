import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import UploadProfilePicture from "./UploadProfilePicture"
import DefaultProfile from "../assets/DefaultProfile.png"

const Logout = ({showForm, showUploadImageForm, hideUploadForm, setShowForm, profileUrl, uploadProfileImage, logout}) => {
  
  return (
    <section className="logout text-idle">
      <UploadProfilePicture showForm={showForm} hideUploadForm={hideUploadForm} setShowForm={setShowForm} uploadProfileImage={uploadProfileImage}/>
      <div className='flex items-center justify-between rounded-md mb-2 bg-bg-input'>
        <button className='flex-1 flex items-center cursor-pointer px-3 py-2 lg:py-3 hover:bg-orange-600 transition-all duration-300 rounded-md group' onClick={logout}>
          <span className='mr-2 text-orange-600 text-xl group-hover:text-white duration-300 transition-all'><FontAwesomeIcon  icon={faArrowRightFromBracket} /></span>
          <span className='group-hover:text-white group-hover:duration-300 group-hover:transition-all'>Logout</span>
        </button>
        <button type="button" className=' px-3 py-2 cursor-pointer duration-300 transition-all hover:bg-orange-600 rounded-md' onClick={showUploadImageForm}>
          <img
            className='w-7 h-7 lg:w-9 lg:h-9 rounded-full bg-white object-cover object-center'
            src={profileUrl ? profileUrl : DefaultProfile}
            alt="Profile Picture" />
        </button>
      </div>
    </section>
  )
}

export default Logout