import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import http from '../../../lib/http'
import UploadProfilePicture from './UploadProfilePicture'


const Logout = ({handleLogout, token}) => {
  const [profileUrl, setProfileUrl] = useState('')
  const [userId, setUserId] = useState(localStorage.getItem('id'))
  const [showForm, setShowForm] = useState('hidden')

  // handling upload profile picture
  const uploadProfileImage = async (e) => {
    e.preventDefault()
    const fileInput = e.target.elements.image

    if (!fileInput.value) {
      alert('Please select a file')
      return
    }

    const formData = new FormData()
    formData.append('image', fileInput.files[0])

    try {
      const res = await http.post(`/upload/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      hideUploadForm()
      fetchDefaultProfile()
    } catch (error) {
      alert(error.message)
    }
  }

  // call the fetchDefaultProfil to get the profile picture onload
  useEffect(() => {
    fetchDefaultProfile()
  }, [])

  //
  const fetchDefaultProfile = async () => {
    try {
      const res = await http.get(`/image/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'arraybuffer'
      })

      const blob = new Blob([res.data], { type: 'image/jpeg' })
      const url = URL.createObjectURL(blob)
      setProfileUrl(url)
    } catch (error) {
      console.log(error)
    }
  }

  // show the showForm
  const showUploadImageForm = () =>{
    setShowForm(showForm === 'hidden' && 'block')
  }
  
  // hide the showForm
  const hideUploadForm = () => {
    setShowForm(showForm === 'block' && 'hidden')
  }

  return (
    <>
    <UploadProfilePicture showForm={showForm} hideUploadForm={hideUploadForm} uploadProfileImage={uploadProfileImage}/>
      <div className=' text-idle'>
        <div className='flex items-center justify-between rounded-md mb-2 bg-bg-input'>
          <div className='flex-1 flex items-center cursor-pointer px-3 py-2 hover:bg-orange-600 transition-all duration-300 rounded-md group'
            onClick={handleLogout}
          >
            <span className='mr-2 text-orange-600 text-xl group-hover:text-white duration-300 transition-all'><FontAwesomeIcon  icon={faArrowRightFromBracket} /></span>
            <p className='group-hover:text-white group-hover:duration-300 group-hover:transition-all'>Logout</p>
          </div>
          <div className='px-3 py-2 cursor-pointer' onClick={showUploadImageForm}>
            <img
              className='w-7 h-7 rounded-full bg-white'
              src={profileUrl}
              alt="Profile Picture" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Logout