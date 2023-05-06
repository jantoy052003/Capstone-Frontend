import { faTrash, faTrashArrowUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import WarningMessage from "./warningMessage"
import NoTaskToShow from '../../assets/NoTask.svg'

const UserDeletedTask = ({taskListDeleted, restoreTaskById, deleteTaskById, deleteAllTask, showWarningMessage, handleHideWarningMessage, handleDeleteTask, taskIdToDelete, setTaskIdToDelete }) => {

  return (
    <>
      <WarningMessage showWarningMessage={showWarningMessage} handleHideWarningMessage={handleHideWarningMessage} deleteAllTask={deleteAllTask} deleteTaskById={deleteTaskById} taskIdToDelete={taskIdToDelete} setTaskIdToDelete={setTaskIdToDelete} />
      <div className="bg-bg-input mt-4 p-4 rounded-md mx-4 sm:mx-0"> {/* Jan added mt-4 */}
        {taskListDeleted.length !== 0 ? (
          <>
          <h1 className="text-xl text-white font-medium mb-5">Deleted Tasks</h1>
            {taskListDeleted.map((taskDeleted) => (
              <div key={taskDeleted.id} className="bg-bg-focus text-white mb-6 py-3 px-4 bg-bg-100 rounded-md flex justify-between items-center">
                <p>{taskDeleted.task_title}</p>
                <div className="flex items-center">
                  <div className=" bg-green-600 px-2 py-1 mr-2 rounded-md cursor-pointer relative hover:bg-green-500 duration-300 transition-all group" onClick={() => restoreTaskById(taskDeleted.id)}>
                    <FontAwesomeIcon icon={faTrashArrowUp} />
                    <span className='absolute text-[12px] w-16 -top-[3rem] -left-[1rem] bg-body text-center py-2 rounded-md hidden duration-300 transition-all group-hover:block'>
                      Restore
                    </span>
                  </div>
                  <div className="bg-red-600 px-2 py-1 rounded-md cursor-pointer relative hover:bg-red-500 duration-300 transition-all group" onClick={() => handleDeleteTask(taskDeleted.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                    <span className='absolute text-[12px] w-16 -top-[3rem] -left-[1rem] bg-body text-center py-2 rounded-md hidden duration-300 transition-all group-hover:block'>
                      Delete
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </>     
        ) : (
          <div className="h-screen flex justify-center items-center text-white">
            <div className='block md:flex md:items-center md:justify-center'>
              <h1 className='text-xl mb-5 md:mb-0 md:mr-5 md:text-3xl font-medium'>No deleted tasks to display</h1>
              <img src={NoTaskToShow} alt="No deleted task image" className='w-48 mx-auto' />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default UserDeletedTask