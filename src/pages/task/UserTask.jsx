import React from 'react'
import UserTaskInput from './UserTaskInput'
import UserTaskList from './UserTaskList'

const UserTask = ({ handleSubmit, taskTitle, taskStart, taskEnd, taskBody, setTaskTitle, setTaskStart, setTaskEnd, setTaskBody, taskLists, handleCompleteTask, fetchTaskListCompleted, handleDeleteTask, fetchTaskListDeleted, fetchTaskListToEdit, setSelectedTaskIdToEdit, selectedTaskIdToEdit, handleCancelEdit, createTaskToggle, getTaskInfo, taskInfo, showTaskInfo, setShowTaskInfo}) => {
  return (
    <>
      <form onSubmit={handleSubmit}  className={`lg:ml-1 px-4 bg-bg-input rounded-md mx-4 sm:mx-0 ${createTaskToggle}`}>
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
      <div className='px-4 bg-bg-input rounded-md mt-3 lg:ml-1 mx-4 sm:mx-0'>
        <UserTaskList taskLists={taskLists} handleCompleteTask={handleCompleteTask} fetchTaskListCompleted={fetchTaskListCompleted} handleDeleteTask={handleDeleteTask} fetchTaskListDeleted ={fetchTaskListDeleted } fetchTaskListToEdit={fetchTaskListToEdit} setSelectedTaskIdToEdit={setSelectedTaskIdToEdit} getTaskInfo={getTaskInfo} taskInfo={taskInfo} showTaskInfo={showTaskInfo} setShowTaskInfo={setShowTaskInfo} />
      </div>
    </>
  )
}

export default UserTask