import React from 'react'

const UserTaskInput = ({ taskTitle, taskStart, taskEnd, taskBody, setTaskTitle, setTaskStart, setTaskEnd, setTaskBody, selectedTaskIdToEdit, handleCancelEdit }) => {
  return (
    <>
      <div className='flex flex-col mt-4 py-4 md:block md:text-end text-white'> {/* Jan added mt-4 */}
        <div className='md:flex justify-between md:text-start'>
          <div>
            <label htmlFor="title">Title</label>
            <input
              id='title'
              className='w-full px-4 py-3 rounded-md mt-2 bg-bg-focus focus:outline-white focus:outline'
              type="text"
              required
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              />
          </div>
          <div className='grid grid-cols-2  mt-4 md:gap-10 md:mt-0'>
            <div>
              <label htmlFor="task-start" className='block'>Task Start</label>
              <input
                className='mt-2 py-3 uppercase bg-bg-focus rounded-md px-4'
                type="date"
                value={taskStart}
                onChange={(e) => setTaskStart(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="task-end"  className='block'>Task End</label>
              <input
                className='mt-2 py-3 uppercase bg-bg-focus rounded-md px-4 placeholder-shown:text-sm focus:outline-white focus:outline'
                type="date"
                value={taskEnd}
                onChange={(e) => setTaskEnd(e.target.value)}
              />
            </div>
          </div>
       </div>
        <div>
          <textarea
            className='bg-bg-focus w-full px-4 py-3 rounded-md mt-4 max-h-32 min-h-[8rem] placeholder:text-white mb-2 focus:outline-white focus:outline'
            id="task-body"
            cols="30"
            rows="10"
            required
            placeholder='Description'
            value={taskBody}
            onChange={(e) => setTaskBody(e.target.value)}
          >
          </textarea>
        </div>
        {selectedTaskIdToEdit  ? (
          <>
          <button
            className='mb-2 md:mb-0 md:mr-3 px-4 py-3 bg-blue-600 text-white rounded-md md:py-2 cursor-pointer duration-300 transition-all'
            onClick={() => handleCancelEdit()}
          >
              Cancel
          </button>
          <input
            className='px-4 py-3 bg-green-600 text-white rounded-md md:py-2 cursor-pointer duration-300 transition-all'
            type="submit"
            value='Update Task' />
          </>
        ) : (
          <>
            <input
              className='px-4 py-3 bg-green-600 text-white rounded-md md:py-2 cursor-pointer duration-300 transition-all hover:bg-green-500'
              type="submit"
              value='Add Task'
            />
          </>
        )}
      </div>
    </>
  )
}

export default UserTaskInput