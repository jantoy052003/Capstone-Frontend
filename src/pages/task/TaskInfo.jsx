import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { format } from "date-fns"

const TaskInfo = ({taskInfo, showTaskInfo, setShowTaskInfo}) => {
  return (
    <div className={`bg-black bg-opacity-20 fixed left-0 right-0 h-screen top-0 flex justify-center items-center z-50 ${showTaskInfo}`}>
      <div className="bg-navbar w-80 md:w-1/4 p-4 rounded-md relative bottom-[15rem] text-white">
        <h1 className="mb-3 text-xl font-medium text-blue-500">Task Info</h1>
        <span
        className="absolute -top-[.75rem] -right-[.75rem] bg-orange-600 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
        onClick={() => setShowTaskInfo(showTaskInfo === 'block' && 'hidden')}      
      >
        <FontAwesomeIcon icon={faXmark} />
      </span>
      {taskInfo && (
        <div className="grid grid-rows-2 gap-5">
          <div className="grid grid-rows-2">
            <h1>Description</h1>
            <p>{taskInfo.task_body}</p>
          </div>
          <div className="grid grid-cols-2">
            <div className="grid grid-rows-2">
              <h1>Task Start</h1>
              <p>{taskInfo.task_start ? format(new Date(taskInfo.task_start), 'MMMM dd, yyyy') : 'Not set'}</p>
            </div>
            <div className="grid grid-rows-2">
              <h1>Task End</h1>
               <p>{taskInfo.task_end ? format(new Date(taskInfo.task_end), 'MMMM dd, yyyy') : 'Not set'}</p>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default TaskInfo