import { useState } from "react"

export const useToggleForm = () => {
  const [showForm, setShowForm] = useState('hidden')

  // show the showForm
  const showUploadImageForm = () =>{
    setShowForm(showForm === 'hidden' && 'block')
  }
  
  // hide the showForm
  const hideUploadForm = () => {
    setShowForm(showForm === 'block' && 'hidden')
  }

  return [showForm, setShowForm, showUploadImageForm, hideUploadForm]
}
