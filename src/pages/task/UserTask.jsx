import React from 'react'
import UserTaskInput from './UserTaskInput'
import UserTaskList from './UserTaskList'

const UserTask = ({ handleSubmit, taskTitle, taskStart, taskEnd, taskBody, setTaskTitle, setTaskStart, setTaskEnd, setTaskBody, taskLists, handleCompleteTask, fetchTaskListCompleted, handleDeleteTask, fetchTaskListDeleted, fetchTaskListToEdit, setSelectedTaskIdToEdit, selectedTaskIdToEdit, handleCancelEdit  }) => {
  return (
    <>
      <form onSubmit={handleSubmit}  className='lg:ml-1 px-4 bg-bg-input rounded-md'>
        <UserTaskInput
          taskTitle={taskTitle}
          taskStart={taskStart}
          taskEnd={taskEnd}
          taskBody={taskBody}
          setTaskTitle={setTaskTitle}
          setTaskStart={setTaskStart}
          setTaskEnd={setTaskEnd}
          setTaskBody={setTaskBody}
          selectedTaskIdToEdit={selectedTaskIdToEdit}
          handleCancelEdit={handleCancelEdit}
        />
      </form>
      <div className='px-4 bg-bg-input rounded-md mt-3 lg:ml-1 '>
        <UserTaskList taskLists={taskLists} handleCompleteTask={handleCompleteTask} fetchTaskListCompleted={fetchTaskListCompleted} handleDeleteTask={handleDeleteTask} fetchTaskListDeleted ={fetchTaskListDeleted } fetchTaskListToEdit={fetchTaskListToEdit} setSelectedTaskIdToEdit={setSelectedTaskIdToEdit} />
      </div>
    </>
  )
}

export default UserTask