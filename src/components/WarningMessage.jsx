import { useLocation } from "react-router-dom";

const WarningMessage = ({showWarningMessage, handleHideWarningMessage, deleteCompletedTaskById, taskIdToDelete, setTaskIdToDelete, fetchTasksCompleted, deleteAllCompletedTask, deletedTaskById, fetchTasksDeleted, deletedAllTaskDelete}) => {
  const location = useLocation();
  const isActiveComplete = location.pathname === "/archived/completed"
  const isActiveDelete = location.pathname === "/archived/deleted"

  const handleDeleteTask = () => {
    if(taskIdToDelete){
      if (isActiveComplete) {
        deleteCompletedTaskById(taskIdToDelete)
        fetchTasksCompleted()
      }
      if (isActiveDelete) {
        deletedTaskById(taskIdToDelete)
        fetchTasksDeleted()
      }
      setTaskIdToDelete(null)

    } else {
      if (isActiveComplete) {
        deleteAllCompletedTask()
        fetchTasksCompleted()
      }
      if (isActiveDelete) {
        deletedAllTaskDelete()
        fetchTasksDeleted()
      }
    }
    handleHideWarningMessage()
  }

  return (
    <div className={`bg-black bg-opacity-20 fixed left-0 right-0 h-screen top-0 flex justify-center items-center z-50 ${showWarningMessage}`}>
      <div className='text-white flex flex-col w-80 sm:w-96'>
        <div className='bg-navbar p-4 rounded-md'>
          <h1 className='text-yellow-400 text-xl font-medium mb-3'>Warning</h1>
          <p className='bg-bg-focus px-4 py-3 rounded-md'>
           {isActiveComplete ? `${taskIdToDelete ? 'Are you sure you want to delete this achievement?' : 'Are you sure you want to delete all of your achievements?'}` : `Are you sure you want to permanently delete ${taskIdToDelete ? 'this' : 'all the'} task? This action is irreversible.`}     
          </p>
          <div className='w-full flex justify-end mt-4'>
            <button type="button" className='bg-green-600 py-2 px-3 rounded-md mr-4 transition-all duration-300 hover:bg-green-700' onClick={() => {handleHideWarningMessage(), setTaskIdToDelete(null)}}>Cancel</button>
            <button type="button" className='bg-red-600 py-2 px-3 rounded-md transition-all duration-300 hover:bg-red-700' onClick={handleDeleteTask}>{taskIdToDelete ? 'Delete' : 'Delete All'}</button>
          </div>
        </div>
      </div>
    </div>  
  )
}

export default WarningMessage