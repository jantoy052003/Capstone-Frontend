
const AuthSubmitButton = ({value}) => {
  return (
     <input
      className='w-full px-4 py-4 lg:py-5 rounded-lg bg-orange-600 cursor-pointer transition-all hover:bg-orange-500 outline-none focus:outline-orange-600'
      type="submit"
      value={value}
    />
  )
}

export default AuthSubmitButton