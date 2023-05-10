import { format } from "date-fns"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faTrash } from "@fortawesome/free-solid-svg-icons"
import TaskInfo from "../../components/TaskInfo"
import WarningMessage from "../../components/WarningMessage"

const UserTaskCompletedList = ({tasksCompleted, getTaskInfo, taskInfo, showTaskInfo, setShowTaskInfo, showWarningMessage, permanentDeleteTask, handleHideWarningMessage, deleteCompletedTaskById, taskIdToDelete, setTaskIdToDelete, fetchTasksCompleted, deleteAllCompletedTask}) => {
  return (
    <>
      <WarningMessage
        showWarningMessage={showWarningMessage}
        handleHideWarningMessage={handleHideWarningMessage}
        deleteCompletedTaskById={deleteCompletedTaskById}
        taskIdToDelete={taskIdToDelete}
        setTaskIdToDelete={setTaskIdToDelete}
        fetchTasksCompleted={fetchTasksCompleted}
        deleteAllCompletedTask={deleteAllCompletedTask}
        />
      <TaskInfo taskInfo={taskInfo} showTaskInfo={showTaskInfo} setShowTaskInfo={setShowTaskInfo} />
      <div className="text-white bg-bg-input px-4 py-4 rounded-md">
        <h1 className="text-xl font-medium mb-5">Task Completed <span className="ml-1 text-green-600"><FontAwesomeIcon icon={faCheckCircle} /></span></h1>
        <ul>
          {tasksCompleted.map((taskComplete) => (
            <li key={taskComplete.id} className="bg-bg-focus rounded-md flex justify-between items-center mb-4">
              <span className="cursor-pointer duration-200 transition-all hover:text-orange-300 py-3 px-4 flex-1" onClick={() => getTaskInfo(taskComplete)}>
                {taskComplete.task_title}
              </span>
              <div className="flex items-center py-2 px-4 gap-4">
                <span className="block text-green-600 text-[12px]">
                  Task Completed
                <span className="block text-white text-sm">
                  {format(new Date(taskComplete.completed_at), 'MMMM dd, yyyy')}
                </span>
              </span>
              <button className='bg-red-600 px-2 py-1 rounded-md cursor-pointer relative hover:bg-red-700 duration-300 transition-all group' onClick={() => permanentDeleteTask(taskComplete.id)}>
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

export default UserTaskCompletedList