import Navbar from '../../components/navbar'
import { Link } from 'react-router-dom'
import heroImage from '../../assets/heroImage.png'

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <section className='container mx-auto text-white h-screen flex items-center relative px-4'>
          <div className='lg:w-4/6 xl:w-3/6 text-center mb-20 sm:text-left'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4'>Maximize Your Time and Focus with MindfullTasks</h1>
            <p className='text-lg mb-8'>Get more done with MindfullTasks, the task management app designed to help you stay organized and focused on what matters most.  It's completely free, try it now.</p>
            <Link to='/signup' className='bg-orange-600 px-4 py-3 rounded-md duration-300 transition-all hover:bg-orange-500'>
              Start now
            </Link>
          </div>
          <img className='w-[210px] absolute bottom-0 right-4 sm:w-5/12 md:w-4/12' src={heroImage} alt="" />
        </section>
      </main>
    </>
  )
}

export default Home