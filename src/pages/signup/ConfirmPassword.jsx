import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"

const ConfirmPassword = ({ value, onChange, password, onErrorChange }) => {
  const [confirmPasswordError, setconfirmPasswordError] = useState("")

  const handleconfirmPasswordError = () => {
    if (password.trim() === "") {
      setconfirmPasswordError("Please enter your password")
    } else if (value.trim() === "") {
      setconfirmPasswordError("Confirm your password")
    } else if (value.trim() !== password.trim() || !value.trim().endsWith(password.trim())) {
      setconfirmPasswordError("Passwords do not match")
    } else {
      setconfirmPasswordError("")
    }
    onErrorChange(confirmPasswordError)
  }

  const handleInputChange = (e) => {
    onChange(e)
    handleconfirmPasswordError()
     if (e.target.value === password.trim()) {
      setconfirmPasswordError("")    
    } else if (!e.target.value.trim().endsWith(password.trim())) {
      setconfirmPasswordError("Passwords do not match")
    }
    onErrorChange(confirmPasswordError)
  }

  return (
    <div className="mb-6 relative">
      <input
        className={`${confirmPasswordError ? "outline-red-500 w-full px-4 py-4 lg:py-5 rounded-lg bg-bg-input peer placeholder-transparent outline-none focus:outline focus:outline-red-500" : "w-full px-4 py-4 lg:py-5 rounded-lg bg-bg-input peer placeholder-transparent outline-none focus:outline focus:outline-white"}`}
        type="password"
        name="password_confirmation"
        placeholder="Password"
        id="password_confirmation"
        required
        value={value}
        onChange={handleInputChange}
        onBlur={handleconfirmPasswordError}
      />
      <label htmlFor="password_confirmation" className="transition-all duration-300 text-orange-500 absolute top-3 left-4 translate-y-[-50%] text-[14px] lg:text-[14px] peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-white peer-focus:text-orange-400 peer-focus:absolute peer-focus:top-3 peer-focus:left-4 peer-focus:translate-y-[-50%] peer-focus:text-[14px]">Confirm password</label>
      {confirmPasswordError && (
        <>
          <span className="absolute font-medium bottom-[-1.4rem] flex items-center text-[14px]  text-red-400">
            {confirmPasswordError}
          </span>
          <FontAwesomeIcon icon={faExclamationCircle} className="absolute right-4 top-1/2 translate-y-[-50%] text-lg text-red-400"/>
        </>
      )}
    </div>
  )
}

export default ConfirmPassword