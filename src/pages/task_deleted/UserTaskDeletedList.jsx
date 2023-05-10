import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import TaskInfo from "../../components/TaskInfo"
import { faTrash, faTrashArrowUp } from "@fortawesome/free-solid-svg-icons"
import WarningMessage from "../../components/WarningMessage"

const UserTaskDeletedList = ({tasksDeleted, getTaskInfo, taskInfo, showTaskInfo, setShowTaskInfo, showWarningMessage, handleShowWarningMessage, handleHideWarningMessage, taskIdToDelete, setTaskIdToDelete, deletedTaskById, fetchTasksDeleted, deletedAllTaskDelete, restoreTaskById}) => {
  return (
    <>
      <WarningMessage
        showWarningMessage={showWarningMessage}
        handleHideWarningMessage={handleHideWarningMessage}
        taskIdToDelete={taskIdToDelete}
        setTaskIdToDelete={setTaskIdToDelete}
        deletedTaskById={deletedTaskById}
        fetchTasksDeleted={fetchTasksDeleted}
        deletedAllTaskDelete={deletedAllTaskDelete}
        />
      <TaskInfo taskInfo={taskInfo} showTaskInfo={showTaskInfo} setShowTaskInfo={setShowTaskInfo} />
      <div className="text-white bg-bg-input px-4 py-3 rounded-md">
        <h1 className="text-xl font-medium mb-5">Task Deleted <span className="ml-1 text-red-600"><FontAwesomeIcon icon={faTrash} /></span></h1>
        <ul>
          {tasksDeleted.map((taskDelete) => (
            <li key={taskDelete.id} className="bg-bg-focus rounded-md flex justify-between items-center mb-4">
              <span className="cursor-pointer duration-200 transition-all hover:text-orange-300 py-3 px-4 flex-1" onClick={() => getTaskInfo(taskDelete)}>
                {taskDelete.task_title}
              </span>
              <div className="flex items-center py-2 px-4 gap-3">
                <button className="bg-green-600 px-2 py-1 rounded-md cursor-pointer relative hover:bg-green-700 duration-300 transition-all group" onClick={() => {restoreTaskById(taskDelete.id)}}>
                  <FontAwesomeIcon icon={faTrashArrowUp} />
                  <span className='absolute text-[12px] w-16 -top-[3rem] -left-[1rem] bg-body text-center py-2 rounded-md hidden duration-300 transition-all group-hover:block'>Restore</span>
                </button>
                <button className="bg-red-600 px-2 py-1 rounded-md cursor-pointer relative hover:bg-red-700 duration-300 transition-all group" onClick={() => {handleShowWarningMessage(), setTaskIdToDelete(taskDelete.id)}}>
                  <FontAwesomeIcon icon={faTrash} />
                  <span className='absolute text-[12px] w-16 -top-[3rem] -left-[1rem] bg-body text-center py-2 rounded-md hidden duration-300 transition-all group-hover:block'>Delete</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default UserTaskDeletedList