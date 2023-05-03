import {useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Name from "./components/Name"
import Email from './components/Email'
import Password from './components/Password'
import ConfirmPassword from './components/ConfirmPassword'
import AuthSubmitButton from '../../../components/AuthSubmitButton'
import http from '../../../lib/http'
import Navbar from '../../../components/navbar'

const Signup = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [nameError, setNameError] = useState('')
  const [existingEmailError, setExistingEmailError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const handleNameError = error => setNameError(error)
  const handleEmailError = error => setEmailError(error)
  const handlePassError = error => setPasswordError(error)
  const handleConfirmPassError = error => setConfirmPasswordError(error)

  useEffect(() => {
    setNameError('')
    setEmailError('')
    setPasswordError('')
    setConfirmPasswordError('')
  }, [name, email])

  const register = async (e) => {
    e.preventDefault()
    if (nameError || emailError || passwordError || confirmPasswordError ) {
      return
    }
    try {
      const res = await http.post('/signup', {
        name: name,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
      })

        localStorage.setItem('token', res.data.token)
        navigate('/tasks')

    } catch (error) {
      if (error.response && error.response.status === 422) {
        setExistingEmailError('The email address has already been taken')
      } else {
        alert('An error occurred while processing your request')
      }
    }
    
  }

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className='background-bg-image'>
        <div className='container mx-auto h-screen flex justify-center items-center px-4 md:justify-start lg:px-0'>
          <form onSubmit={register} className='text-white'>
            <div>
              <h1 className='text-4xl md:text-5xl lg:text-6xl md:mb-8 font-bold mb-4'>Create New Account</h1>
              <p className='font-medium mb-6'>Already have an account? <Link to='/login' className='text-orange-600'>Log In</Link></p>
            </div>
            <Name value={name} onChange={(e) => setName(e.target.value)} onErrorChange={handleNameError}/>
            <Email value={email} onChange={(e) => setEmail(e.target.value)} existingEmailError={existingEmailError}  onErrorChange={handleEmailError}/>
            <div className='md:grid md:grid-cols-2 gap-4'>
              <Password value={password} onChange={(e) => setPassword(e.target.value)}  onErrorChange={handlePassError}/>
              <ConfirmPassword value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} password={password}  onErrorChange={handleConfirmPassError}/>
            </div>
            <AuthSubmitButton value='Create Account'/>
          </form>
        </div>
      </main>
    </>
  )
}

export default Signup