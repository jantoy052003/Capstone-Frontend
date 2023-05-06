import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { format } from "date-fns"
import WarningMessage from "../taskDeleted/warningMessage"
import NoTaskToShow from '../../assets/NoTask.svg'

const UserCompletedTask = ({taskListCompleted, deleteTaskById, deleteAllTask, showWarningMessage, handleHideWarningMessage, handleDeleteTask, taskIdToDelete, setTaskIdToDelete }) => {

  return (
    <>
      <WarningMessage showWarningMessage={showWarningMessage} handleHideWarningMessage={handleHideWarningMessage} deleteAllTask={deleteAllTask} deleteTaskById={deleteTaskById} taskIdToDelete={taskIdToDelete} setTaskIdToDelete={setTaskIdToDelete} />
        <div className="bg-bg-input mt-4 p-4 rounded-md mx-4 sm:mx-0"> 
          <h1 className="text-xl text-white font-medium mb-5">Task Completed</h1>
          {taskListCompleted.length !== 0 ? (
            <>
              {taskListCompleted.map((taskDeleted) => (
                <div key={taskDeleted.id} className="bg-bg-focus text-white mb-3 py-3 px-4 bg-bg-100 rounded-md flex justify-between items-center">
                  <p>{taskDeleted.task_title}</p>
                  <div className="w-44 md:w-96 md:grid md:grid-cols-3 md:gap-4 ">
                    <div className="mb-3 md:mb-0 text-sm">
                      <span className="block text-orange-300 text-[12px] mb-1">
                        Task Start
                      </span>
                      {taskDeleted.task_start === null ? 'Not Set' : format(new Date(taskDeleted.task_start), 'MMMM dd, yyyy')}
                    </div>
                    <div className="mb-3 md:mb-0 text-sm">
                      <span className="block text-orange-300 text-[12px] mb-1">
                        Task End
                      </span>
                      {taskDeleted.task_end === null ? 'Not Set' : format(new Date(taskDeleted.task_end), 'MMMM dd, yyyy')}
                    </div>
                    <div className="text-sm">
                      <span className="block text-orange-300 text-[12px] mb-1">
                        Task Completed
                      </span>
                      {format(new Date(taskDeleted.completed_at), 'MMMM dd, yyyy')}
                    </div>
                    {/* <span className="bg-red-600 py-2 px-3 rounded-md cursor-pointer" onClick={() => handleDeleteTask(taskDeleted.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </span> */}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="h-screen flex justify-center items-center text-white">
              <div className='block md:flex md:items-center md:justify-center'>
                <h1 className='text-xl mb-5 md:mb-0 md:mr-5 md:text-3xl font-medium'>No completed tasks to display</h1>
                <img src={NoTaskToShow} alt="No completed task image" className='w-48 mx-auto' />
              </div>
            </div>
          )}
        </div>
    </>
  )
}

export default UserCompletedTask
