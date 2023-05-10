import { useState } from "react"
import api from "../lib/api"


export const useFetchProfilePic = (apiError) => {
  const [profileUrl, setProfileUrl] = useState()
  const [userId, setUserId] = useState(localStorage.getItem('id'))
  const [token, setToken] = useState(localStorage.getItem("token"))

  const fetchDefaultProfile = async () => {
    try {
      const res = await api.get(`/image/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'arraybuffer'
      })
      const blob = new Blob([res.data], { type: 'image/jpeg' })
      const url = URL.createObjectURL(blob)
      setProfileUrl(url)

    } catch (error) {
      apiError(error)
    }
  }


  return [profileUrl, fetchDefaultProfile]
}