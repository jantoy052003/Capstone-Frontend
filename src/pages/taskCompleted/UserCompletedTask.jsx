import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faTrashArrowUp } from "@fortawesome/free-solid-svg-icons"
import WarningMessage from "../taskDeleted/warningMessage"
import { useState } from "react"
import NoTaskToShow from '../../assets/NoTask.svg'

const UserCompletedTask = ({taskListCompleted, deleteTaskById, deleteAllTask}) => {
  const [showWarningMessage, setShowWarningMessage] = useState('hidden')
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);

  // Show the warning message
  const handleShowWarningMessage = () => {
    setShowWarningMessage(showWarningMessage === 'hidden' && 'block' )
  }

  // Hide the warning message
  const handleHideWarningMessage = () => {
    setShowWarningMessage(showWarningMessage === 'block' && 'hidden' )
  }

  // onclick it will set the id that user want to permanently delete (one task will be delete) then show the warning message
  const handleDeleteTask = (taskId) => {
    setTaskIdToDelete(taskId)
    handleShowWarningMessage()
  }

  return (
    <>
      <WarningMessage showWarningMessage={showWarningMessage}handleHideWarningMessage={handleHideWarningMessage} deleteAllTask={deleteAllTask} deleteTaskById={deleteTaskById} taskIdToDelete={taskIdToDelete} setTaskIdToDelete={setTaskIdToDelete} />
        <div className="bg-bg-input mt-4 p-4 rounded-md"> 
          {taskListCompleted.length !== 0 && (
              <div className="flex justify-end mb-5">
                  <button className="bg-red-600 py-2 px-3 rounded-md text-white" onClick={() =>handleShowWarningMessage()}>
                      Delete All
                  </button>
              </div>
          )}
          {taskListCompleted.length !== 0 ? (
              <>
                  {taskListCompleted.map((taskDeleted) => (
                      <div key={taskDeleted.id} className="bg-bg-focus text-white mb-3 py-3 px-4 bg-bg-100 rounded-md flex justify-between items-center">
                          <p>{taskDeleted.task_title}</p>
                          <div>
                              <span className="bg-red-600 py-2 px-3 rounded-md cursor-pointer" onClick={() => handleDeleteTask(taskDeleted.id)}>
                                  <FontAwesomeIcon icon={faTrash} />
                              </span>
                          </div>
                      </div>
                  ))}
              </>
          ) : (
              <div className="h-screen flex justify-center items-center text-white">
              <div className='block md:flex md:items-center md:justify-center'>
                <h1 className='text-xl mb-5 md:mb-0 md:mr-5 md:text-3xl font-medium'>No completed tasks to display</h1>
                <img src={NoTaskToShow} alt="No deleted task image" className='w-48 mx-auto' />
              </div>
            </div>
          )}
        </div>
    </>
  )
}

export default UserCompletedTask
