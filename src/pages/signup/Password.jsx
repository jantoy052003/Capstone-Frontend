import { useState } from "react"
import { FontAwesomeIcon  } from "@fortawesome/react-fontawesome"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"

const Password = ({ value, onChange, onErrorChange }) => {
  const [passwordError, setPasswordError] = useState(false)

  const handlePasswordError = () => {
    if (value.trim() === "") {
      setPasswordError("Password is required")
    } else if (value.trim().length < 7) {
      setPasswordError("Minimum of 8 characters")
    } else {
      setPasswordError(false)
    }
    onErrorChange(passwordError)
  }

  return (
    <div className="mb-6 relative">
      <input
        className={`${passwordError ? "outline-red-500 w-full px-4 py-4 lg:py-5 rounded-lg bg-bg-input peer placeholder-transparent outline-none focus:outline focus:outline-red-500" : "w-full px-4 py-4 lg:py-5 rounded-lg bg-bg-input peer placeholder-transparent outline-none focus:outline focus:outline-white"}`}
        type="password"
        name="password"
        placeholder="Password"
        id="password"
        required
        value={value}
        onChange={(e) => {
          onChange(e)
          handlePasswordError()
        }}
        onBlur={handlePasswordError}
      />
      <label htmlFor="password" className="transition-all duration-300 text-orange-500 absolute top-3 left-4 translate-y-[-50%] text-[14px] lg:text-[14px] peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-white peer-focus:text-orange-400 peer-focus:absolute peer-focus:top-3 peer-focus:left-4 peer-focus:translate-y-[-50%] peer-focus:text-[14px]">
        Password
      </label>
      {passwordError && (
        <>
          <span className="absolute font-medium bottom-[-1.4rem] flex items-center text-[14px]  text-red-400">
            {passwordError}
          </span>
          <FontAwesomeIcon icon={faExclamationCircle} className="absolute right-4 top-1/2 translate-y-[-50%] text-lg text-red-400"/>
        </>
      )}
    </div>
  )
}

export default Password