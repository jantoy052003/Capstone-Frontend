import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSidebar } from "../../hooks/useSideBar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import Sidebar from "../../components/Sidebar"
import Navbar from "../../components/Navbar"
import api from "../../lib/api"


const Login = () => {
  const [showSidebar, handleOpenSidebar, handleCloseSidebar] = useSidebar()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passType, setPassType] = useState("password")

  const [error, setError] = useState("")

  const handleSubmitLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post("/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("id", res.data.user.id)
      navigate("/menu/my-task")

    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError(error.response.data.message)
        setTimeout(() =>  {
          setError(null)
        }, 5000)
      } else {
        setError("An error occurred while processing your request")
        }
    }
  }
  return (
    <>
      <Sidebar showSidebar={showSidebar} handleCloseSidebar={handleCloseSidebar}/>
      <header>
        <Navbar handleOpenSidebar={handleOpenSidebar} />
      </header>
      <main className="background-bg-image">
        <section className="login-form container mx-auto h-screen flex justify-center items-center px-4 md:justify-start">
          <form onSubmit={handleSubmitLogin} className="text-white relative">
            {error &&  <p className="font-medium absolute top-[-3.5rem] bg-red-600 px-4 py-2 rounded-md">{error}</p>}
            <div>
              <h1 className="text-4xl md:text-5xl  md:mb-8 font-bold mb-4">Login To MindfullTasks</h1>
              <p className="font-medium mb-6">Don"t have an account yet? <Link to="/signup" className="text-orange-600">Create account</Link></p>
            </div>
            <div className="mb-6 relative">
              <input
                className="w-full  px-4 py-4 lg:py-5 rounded-lg bg-bg-input peer placeholder-transparent outline-none focus:outline focus:outline-white"
                type="text"
                name="email"
                placeholder="Email address"
                id="email"
                required
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email" className="transition-all duration-300 text-orange-500 absolute top-3 left-4 translate-y-[-50%] text-[14px] lg:text-[14px] peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-white peer-focus:text-orange-400 peer-focus:absolute peer-focus:top-3 peer-focus:left-4 peer-focus:translate-y-[-50%] peer-focus:text-[14px]">
                Email address
              </label>
            </div>
            <div className="mb-6 relative">
              <input
                className="w-full  px-4 py-4 lg:py-5 rounded-lg bg-bg-input peer placeholder-transparent outline-none focus:outline focus:outline-white"
                type={passType}
                name="password"
                placeholder="Password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password" className="transition-all duration-300 text-orange-500 absolute top-3 left-4 translate-y-[-50%] text-[14px] lg:text-[14px] peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-white peer-focus:text-orange-400 peer-focus:absolute peer-focus:top-3 peer-focus:left-4 peer-focus:translate-y-[-50%] peer-focus:text-[14px]">
                Password
              </label>
              <FontAwesomeIcon
                className="absolute right-3 top-1/2 translate-y-[-50%] cursor-pointer p-3"
                onClick={() => setPassType(passType === "password" ? "text" : "password")}
              icon={passType === "password" ? faEye : faEyeSlash} />
            </div>
            <input
              className="w-full px-4 py-4 lg:py-5 rounded-lg bg-orange-600 cursor-pointer transition-all hover:bg-orange-500 outline-none focus:outline-orange-600"
              type="submit"
              value="Login"
            />
          </form>
        </section>
      </main>
    </>
  )
}

export default Login