import React from 'react'

const UserTaskInput = ({handleSubmitTask, taskTitle, setTaskTitle, taskBody, setTaskBody, taskStart, setTaskStart, taskEnd, setTaskEnd, selectedTaskIdToEdit, handleCancelEdit}) => {
  return (
    <>
      <form onSubmit={handleSubmitTask} className='flex flex-col  text-white bg-bg-input px-4 py-3'>
        <div className='md:flex md:justify-between items-center md:gap-20 mb-4'>
          <div className='mb-4 md:mb-0 md:flex-1'>
            <label className='block mb-2' htmlFor="title">Title</label>
            <input
              className='w-full bg-bg-focus p-4 rounded-md focus:outline focus:outline-white'
              id='title'
              type="text"
              value={taskTitle}
              required
              onChange={e => setTaskTitle(e.target.value)}
            />
          </div>
          <div className='grid grid-cols-2 gap-3 md:gap-4'>
            <div>
              <label className='block mb-2' htmlFor="task-start">Task Start</label>
              <input
                className='w-full bg-bg-focus p-4 rounded-md focus:outline focus:outline-white uppercase'
                id='task-start'
                type="date"
                value={taskStart}
                onChange={e => setTaskStart(e.target.value)}
              />  
            </div>
            <div>
              <label className='block mb-2' htmlFor="task-end">Task End</label>
              <input
                className='w-full bg-bg-focus p-4 rounded-md focus:outline focus:outline-white uppercase'
                id='task-end'
                type="date"
                value={taskEnd}
                onChange={e => setTaskEnd(e.target.value)}
              />  
            </div>
          </div>
        </div>
        <div className='mb-3'>
          <textarea 
            className='w-full bg-bg-focus p-4 rounded-md focus:outline focus:outline-white max-h-[9rem] min-h-[9rem] 2xl:min-h-[10.65rem] 2xl:max-h-[10.65rem] placeholder:text-white'
            id="description"
            cols="30"
            rows="10"
            placeholder='Description'
            required
            value={taskBody}
            onChange={e => setTaskBody(e.target.value)}
          >
          </textarea>
        </div>
        <div className='flex justify-end'>
          {selectedTaskIdToEdit ? (
            <>
              <button
                className='mr-4 bg-blue-600 px-4 py-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-blue-700 focus:bg-blue-700'
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
              <input
                className='bg-green-700 px-4 py-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-green-800 focus:bg-green-800'
                type="submit"
                value="Update Task"
              />
            </>
          ) : (
            <input
              className='bg-green-700 px-4 py-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-green-800 focus:bg-green-800'
              type="submit"
              value="Add Task"
            />
          )}
        </div>
      </form>
    </>
  )
}

export default UserTaskInput