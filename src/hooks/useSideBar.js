import { useState } from "react"

export const useSidebar = () => {
  const [showSidebar, setShowSidebar] = useState("left-[-20rem]")

  const handleOpenSidebar = () => {
    setShowSidebar("left-0")
  }

  const handleCloseSidebar = () => {
    setShowSidebar((prevShowSidebar) => 
      prevShowSidebar === "left-0" ? "left-[-20rem]" : prevShowSidebar
    )
  }

  return [showSidebar, handleOpenSidebar, handleCloseSidebar]
}
