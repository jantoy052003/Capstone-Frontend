import { useState } from "react"

export const useShowWarningMessage = () => {
 
  const [showWarningMessage, setShowWarningMessage] = useState('hidden')
  const [taskIdToDelete, setTaskIdToDelete] = useState(null)

  // Show the warning message
  const handleShowWarningMessage = () => {
    setShowWarningMessage(showWarningMessage === 'hidden' && 'block' )
  }

  // Hide the warning message
  const handleHideWarningMessage = () => {
    setShowWarningMessage(showWarningMessage === 'block' && 'hidden' )
  }

  // onclick it will set the id that user want to permanently delete (one task will be delete) then show the warning message
  const permanentDeleteTask = (taskId) => {
    setTaskIdToDelete(taskId)
    handleShowWarningMessage()
  }

  return [showWarningMessage, taskIdToDelete, setTaskIdToDelete, handleHideWarningMessage, handleShowWarningMessage, permanentDeleteTask]
}