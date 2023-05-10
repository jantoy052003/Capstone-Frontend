import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"


const Email = ({ value, onChange, existingEmailError, onErrorChange }) => {
  const [emailError, setEmailError] = useState("")

  useEffect(() => {
    if (existingEmailError) {
     setEmailError(existingEmailError)
    }
  }, [existingEmailError])

  useEffect(() => {
    onErrorChange(emailError)
  }, [emailError, onErrorChange])

  const handleEmailError = () => {
    const regex = /\S+@\S+\.\S+/
    if (value.trim() === "") {
      setEmailError("Email address is required")
    } else if (!regex.test(value)) {
      setEmailError("Invalid email format")
    } else {
     setEmailError("")
    }
  }

  return (
    <div className="mb-6 relative">
      <input
        className={`${emailError ? "outline-red-500 w-full px-4 py-4 lg:py-5 rounded-lg bg-bg-input peer placeholder-transparent outline-none focus:outline focus:outline-red-500" : "w-full px-4 py-4 lg:py-5 rounded-lg bg-bg-input peer placeholder-transparent outline-none focus:outline focus:outline-white"}`}
        type="text"
        name="email"
        placeholder="Email address"
        id="email"
        required
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e)}
        onBlur={handleEmailError}
      />
      <label htmlFor="email" className="transition-all duration-300 text-orange-500 absolute top-3 left-4 translate-y-[-50%] text-[14px] lg:text-[14px] peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-white peer-focus:text-orange-400 peer-focus:absolute peer-focus:top-3 peer-focus:left-4 peer-focus:translate-y-[-50%] peer-focus:text-[14px]">
        Email address
      </label>
      {emailError && (
        <>
          <span className="absolute font-medium bottom-[-1.4rem] flex items-center text-[14px]  text-red-400">
            {emailError}
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

export default Email