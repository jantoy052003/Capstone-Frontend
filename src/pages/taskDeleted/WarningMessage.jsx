import React from 'react'
import { useLocation } from 'react-router-dom';

const WarningMessage = ({ showWarningMessage, handleHideWarningMessage, deleteAllTask, deleteTaskById, taskIdToDelete, setTaskIdToDelete }) => {
  const location = useLocation();
  const isActiveComplete = location.pathname === '/completed';

  // if the id(taskIdToDelete) is present(true) the deleteTaskById will be call and set the id to null else it will delete all if the id(taskIdToDelete) is null (false) and call the handleHideWarningMessage to hide the warning message
  const handleDeleteTask = () => {
    if(taskIdToDelete){
      deleteTaskById(taskIdToDelete)
      setTaskIdToDelete(null)
    } else {
      deleteAllTask()
    }
    
    handleHideWarningMessage()
  }
  return (
    <div className={`bg-black bg-opacity-20 fixed left-0 right-0 h-screen p-4 ${showWarningMessage}`}>
      <div className='text-white flex flex-col items-center h-full'>
        <div className='bg-navbar p-4 rounded-md mt-20 md:w-96'>
          <h1 className='text-yellow-400 text-xl font-medium mb-3'>Warning</h1>
          <p>
            {isActiveComplete ? 'Are you sure you want to delete all of your achievements?' : `Are you sure you want to permanently delete ${taskIdToDelete ? 'this' : 'all the'} task? This action is irreversible.`}       
          </p>
          <div className='w-full flex justify-end mt-4'>
            <button className='bg-green-600 py-2 px-3 rounded-md mr-4' onClick={() => {handleHideWarningMessage(), setTaskIdToDelete(null)}}>Cancel</button>
            <button className='bg-red-600 py-2 px-3 rounded-md' onClick={handleDeleteTask}>Delete</button>
          </div>
        </div>
      </div>
    </div>  
  )
}

export default WarningMessage