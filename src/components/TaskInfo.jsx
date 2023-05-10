import { format } from "date-fns"

const TaskInfo = ({taskInfo, showTaskInfo, setShowTaskInfo}) => {
  return (
    <div className={`bg-black bg-opacity-20 fixed left-0 right-0 h-screen top-0 flex justify-center items-center z-50 ${showTaskInfo}`}>
      <div className="bg-navbar w-80 md:w-1/2 lg:w-1/4 p-4 rounded-md text-white">
        <h1 className="mb-3 text-xl font-medium">Task Info: {taskInfo.task_title}</h1>
      {taskInfo && (
        <div className="grid grid-rows-2 gap-5">
          <div className="mb-3">
            <h1 className="mb-1 font-light">Description</h1>
            <p className="bg-bg-focus px-4 py-3 rounded-md">{taskInfo.task_body}</p>
          </div>
          <div className="grid grid-cols-2  gap-4">
            <div className="mb-3">
              <h1 className="mb-1 font-light">Task Start</h1>
              <p className="bg-bg-focus px-4 py-3 rounded-md">{taskInfo.task_start ? format(new Date(taskInfo.task_start), 'MMMM dd, yyyy') : 'Not set'}</p>
            </div>
            <div className="mb-3">
              <h1 className="mb-1 font-light">Task End</h1>
               <p className="bg-bg-focus px-4 py-3 rounded-md">{taskInfo.task_end ? format(new Date(taskInfo.task_end), 'MMMM dd, yyyy') : 'Not set'}</p>
            </div>
          </div>
        </div>
      )}
      <button className="bg-orange-600 block mx-auto mt-5 px-4 py-1 rounded-md duration-300 transition-all hover:bg-orange-500" onClick={() => setShowTaskInfo(showTaskInfo === 'block' && 'hidden')} >
        Close
      </button>
      </div>
    </div>
  )
}

export default TaskInfo