import { faCheck, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoTaskToShow from '../../assets/NoTask.svg'
import TaskInfo from './TaskInfo'

const UserTaskList = ({ taskLists, handleCompleteTask, fetchTaskListCompleted, handleDeleteTask, fetchTaskListDeleted, fetchTaskListToEdit, setSelectedTaskIdToEdit, getTaskInfo, taskInfo, showTaskInfo, setShowTaskInfo }) => {
  return (
    <div className='py-4 text-white'>
      <h1 className='text-xl font-medium mb-5'>Task Lists</h1>
      {taskLists.length === 0 ? (
        <div className='flex justify-center items-center h-[90vh]'>
          <div className='block md:flex md:items-center md:justify-center'>
            <h1 className='text-xl mb-5 mf:mb-0 md:mr-5 md:text-3xl font-medium'>Click the button create task to create a new task</h1>
            <img src={NoTaskToShow} alt="no task image" className='w-48' />
          </div>
        </div>
      ) : (
        <>
          <TaskInfo taskInfo={taskInfo} showTaskInfo={showTaskInfo} setShowTaskInfo={setShowTaskInfo} />
          {taskLists.map((taskList) =>  (
            <div key={taskList.id} className='mb-6 p-3 bg-bg-focus rounded-md flex justify-between items-center'>
              <p  className='cursor-pointer duration-200 transition-all hover:text-orange-300' onClick={() => getTaskInfo(taskList)}>
                {taskList.task_title}
              </p>
              <div className='flex items-center'>
                <div className='bg-green-600 px-2 py-1 mr-2 rounded-md cursor-pointer relative hover:bg-green-500 duration-300 transition-all group' onClick={() => {handleCompleteTask(taskList.id), fetchTaskListCompleted}}>
                  <FontAwesomeIcon icon={faCheck} />
                  <span className='absolute text-[12px] w-36 -top-[3rem] -left-[3rem] bg-body text-center py-2 rounded-md hidden duration-300 transition-all group-hover:block'>Mark as completed</span>
                </div>
                <div className='bg-blue-600 px-2 py-1 rounded-md  cursor-pointer mr-2 relative hover:bg-blue-500 duration-300 transition-all group' onClick={() => {fetchTaskListToEdit(taskList.id), setSelectedTaskIdToEdit(taskList.id)}}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                  <span className='absolute text-[12px] w-12 -top-[3rem] -left-[1rem] bg-body text-center py-2 rounded-md hidden duration-300 transition-all group-hover:block'>Edit</span>
                </div>
                <div className='bg-red-600 px-2 py-1 rounded-md cursor-pointer relative hover:bg-red-500 duration-300 transition-all group' onClick={() => {handleDeleteTask(taskList.id), fetchTaskListDeleted }}>
                  <FontAwesomeIcon icon={faTrash} />
                  <span className='absolute text-[12px] w-16 -top-[3rem] -left-[1rem] bg-body text-center py-2 rounded-md hidden duration-300 transition-all group-hover:block'>Delete</span>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default UserTaskList