import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { format } from "date-fns"
import NoTaskToShow from '../../assets/NoTask.svg'
import TaskInfo from "../task/TaskInfo"
import WarningMessage from "../taskDeleted/WarningMessage"

const UserCompletedTask = ({taskListCompleted, deleteTaskById, deleteAllTask, showWarningMessage, handleHideWarningMessage, handleDeleteTask, taskIdToDelete, setTaskIdToDelete, getTaskInfo, taskInfo, showTaskInfo, setShowTaskInfo}) => {

  return (
    <>
      <WarningMessage showWarningMessage={showWarningMessage} handleHideWarningMessage={handleHideWarningMessage} deleteAllTask={deleteAllTask} deleteTaskById={deleteTaskById} taskIdToDelete={taskIdToDelete} setTaskIdToDelete={setTaskIdToDelete} />
        <div className="bg-bg-input mt-4 p-4 rounded-md mx-4 sm:mx-0"> 
          <h1 className="text-xl text-white font-medium mb-5">Task Completed</h1>
          {taskListCompleted.length !== 0 ? (
            <>
            <TaskInfo taskInfo={taskInfo} showTaskInfo={showTaskInfo} setShowTaskInfo={setShowTaskInfo} />
              {taskListCompleted.map((taskDeleted) => (
                <div key={taskDeleted.id} className="bg-bg-focus text-white mb-3 rounded-md flex justify-between items-center">
                  <p className='cursor-pointer hover:text-orange-300 py-2 px-4 flex-1' onClick={() => getTaskInfo(taskDeleted)}>{taskDeleted.task_title}</p>
                  <div className="flex items-center py-2 px-4">
                    <div className="text-sm mr-4">
                      <span className="block text-green-500 text-[12px]">
                        Task Completed
                      </span>
                      {format(new Date(taskDeleted.completed_at), 'MMMM dd, yyyy')}
                    </div>
                    <div className='bg-red-600 px-2 py-1 rounded-md cursor-pointer relative hover:bg-red-500 duration-300 transition-all group' onClick={() => handleDeleteTask(taskDeleted.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                      <span className='absolute text-[12px] w-16 -top-[3rem] -left-[1rem] bg-body text-center py-2 rounded-md hidden duration-300 transition-all group-hover:block'>Delete</span>
                    </div>
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
