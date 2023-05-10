import { faCheck, faListCheck, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import TaskInfo from "../../components/TaskInfo"

const UserTaskList = ({taskLists, fetchTaskToEdit, setSelectedTaskIdToEdit, getTaskInfo, taskInfo, showTaskInfo, setShowTaskInfo, handleDeleteTask, fetchTasksDeleted, fetchTasks, handleCompleteTask, fetchTasksCompleted, setCreateTaskToggle}) => {
  return (
    <div className="text-white bg-bg-input px-4 py-3 rounded-md h-full">
      <h1 className='text-xl font-medium mb-5'>Task Lists<span className="ml-1 text-blue-500"><FontAwesomeIcon icon={faListCheck} /></span></h1>
      <TaskInfo taskInfo={taskInfo} showTaskInfo={showTaskInfo} setShowTaskInfo={setShowTaskInfo} />
      <ul>
        {taskLists.map((task) => (
          <li key={task.id} className="bg-bg-focus rounded-md flex justify-between items-center mb-4">
            <span className="cursor-pointer duration-200 transition-all hover:text-orange-300 py-3 px-4 flex-1" onClick={() => getTaskInfo(task)}>
              {task.task_title}
            </span>
            <div className="flex items-center py-2 px-4 gap-3">
              <button className='bg-green-600 px-2 py-1 rounded-md cursor-pointer relative hover:bg-green-700 duration-300 transition-all group' onClick={() => {handleCompleteTask(task.id), fetchTasks(), fetchTasksCompleted()}}>
              <FontAwesomeIcon icon={faCheck} />
              <span className='absolute text-[12px] w-36 -top-[3rem] -left-[3rem] bg-body text-center py-2 rounded-md hidden duration-300 transition-all group-hover:block'>Mark as completed</span>
              </button>
              <button className='bg-blue-600 px-2 py-1 rounded-md  cursor-pointer relative hover:bg-blue-700 duration-300 transition-all group' onClick={() => {fetchTaskToEdit(task.id), setSelectedTaskIdToEdit(task.id), setCreateTaskToggle('block')}}>
                <FontAwesomeIcon icon={faPenToSquare} />
                <span className='absolute text-[12px] w-12 -top-[3rem] -left-[1rem] bg-body text-center py-2 rounded-md hidden group-hover:block'>Edit</span>
              </button>
              <button className='bg-red-600 px-2 py-1 rounded-md cursor-pointer relative hover:bg-red-700 duration-300 transition-all group' onClick={() => {handleDeleteTask(task.id), fetchTasks(), fetchTasksDeleted()}}>
                <FontAwesomeIcon icon={faTrash} />
                <span className='absolute text-[12px] w-16 -top-[3rem] -left-[1rem] bg-body text-center py-2 rounded-md hidden duration-300 transition-all group-hover:block'>Delete</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserTaskList