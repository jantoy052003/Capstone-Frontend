import { useState } from "react";

export const useGetTaskInfo = () => {
  const [taskInfo, setTaskInfo] = useState([])
  const [showTaskInfo, setShowTaskInfo] = useState("hidden")

  const getTaskInfo = (task) => {
    setTaskInfo(task);
    setShowTaskInfo(showTaskInfo === 'hidden' && 'block')
  }
  
  return [taskInfo, showTaskInfo, setShowTaskInfo, getTaskInfo]

}