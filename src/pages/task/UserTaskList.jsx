import { faCheck, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoTaskToShow from '../../assets/NoTask.svg'

const UserTaskList = ({ taskLists, handleCompleteTask, fetchTaskListCompleted, handleDeleteTask, fetchTaskListDeleted, fetchTaskListToEdit, setSelectedTaskIdToEdit }) => {
  return (
    <div className='py-4 text-white'>
      <h1 className='mb-4'>TaskList</h1>
      {taskLists.length === 0 ? (
        <div className='flex justify-center items-center h-[90vh]'>
          <div className='block md:flex md:items-center md:justify-center'>
            <h1 className='text-xl mb-5 mf:mb-0 md:mr-5 md:text-3xl font-medium'>No tasks to display</h1>
            <img src={NoTaskToShow} alt="no task image" className='w-48' />
          </div>
        </div>
      ) : (
        <>
          {taskLists.map((taskList) => (
            <div key={taskList.id} className='mb-3 p-4 bg-bg-focus rounded-md flex justify-between items-center'>
              <p>
                {taskList.task_title}
              </p>
              <div>
                <span className='bg-green-600 py-2 px-3 mr-2 rounded-md cursor-pointer' onClick={() => {handleCompleteTask(taskList.id), fetchTaskListCompleted }}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className='bg-blue-600 py-2 px-3 rounded-md  cursor-pointer mr-2' onClick={() => {fetchTaskListToEdit(taskList.id), setSelectedTaskIdToEdit(taskList.id)}}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </span>
                <span className='bg-red-600 py-2 px-3 rounded-md cursor-pointer' onClick={() => {handleDeleteTask(taskList.id), fetchTaskListDeleted }}>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default UserTaskList