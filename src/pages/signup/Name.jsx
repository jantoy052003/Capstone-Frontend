import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"

const Name = ({ value, onChange, onErrorChange }) => {
  const [nameError, setNameError] = useState("")

  const handleNameChange = (e) => {
    const newName = e.target.value
    if (newName.length < 6) {
      setNameError("Minimum of 6 characters")
    } else if (/\d|[!@#$%^&*(),.?":{}|<>]/.test(newName)) {
      setNameError("Name only allowed text")
    } else {
      setNameError(false)
    }

    onChange(e)
    onErrorChange(nameError)
  }

  const handleNameBlur = (e) => {
    const newName = e.target.value
    if (newName.length === 0) {
      setNameError("Name is required")
    }
    onErrorChange(nameError)
  }

  return (
    <div className="mb-6 relative">
      <input
        className={`${nameError ? "outline-red-500 w-full px-4 py-4 lg:py-5 rounded-lg bg-bg-input peer placeholder-transparent outline-none focus:outline focus:outline-red-500" : "w-full px-4 py-4 lg:py-5 rounded-lg bg-bg-input peer placeholder-transparent outline-none focus:outline focus:outline-white"}`}
        type="text"
        name="name"
        placeholder="Name"
        id="name"
        required
        autoComplete="off"
        value={value}
        onChange={handleNameChange}
        onBlur={handleNameBlur}
      />
      <label htmlFor="name" className="transition-all duration-300 text-orange-500 absolute top-3 left-4 translate-y-[-50%] text-[14px] lg:text-[14px] peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-white peer-focus:text-orange-400 peer-focus:absolute peer-focus:top-3 peer-focus:left-4 peer-focus:translate-y-[-50%] peer-focus:text-[14px]">
        Name
      </label>
      {nameError && (
        <>
          <span className="absolute font-medium bottom-[-1.4rem] flex items-center text-[14px] text-red-400">
            {nameError}
          </span>
          <FontAwesomeIcon
            icon={faExclamationCircle}
            className="absolute right-4 top-1/2 translate-y-[-50%] text-lg text-red-400"
          />
        </>
      )}
    </div>
  )
}

export default Name