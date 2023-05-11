import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { useSidebar } from '../../hooks/useSideBar'
import heroImage from '../../assets/heroImage.png'
import waveTop from "../../assets/waveTop.svg"
import waveBot from "../../assets/waveBot.svg"
import { Link } from 'react-router-dom'

const Home = () => {
  const [showSidebar, handleOpenSidebar, handleCloseSidebar] = useSidebar()

  return (
    <>
      <Sidebar showSidebar={showSidebar} handleCloseSidebar={handleCloseSidebar}/>
      <header>
        <Navbar handleOpenSidebar={handleOpenSidebar} />
      </header>
      <main className='relative'>
        <section className='container mx-auto text-idle h-screen flex items-center relative px-4'>
          <div className='lg:w-4/6 xl:w-4/6 text-center mb-20 sm:text-left'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lg:tracking-wide'>Maximize Your Time and Focus with MindfullTasks</h1>
            <p className='text-lg mb-8 text-gray-300'>Get more done with MindfullTasks, the task management app designed to help you stay organized and focused on what matters most.  It's completely free, try it now.</p>
            <Link to='/signup' className='bg-orange-600 px-4 py-3 rounded-md duration-300 transition-all hover:bg-orange-700'>
              Start now
            </Link>
          </div>
          <img className='w-[210px] absolute bottom-0 right-4 sm:w-5/12 md:w-4/12' src={heroImage} alt="" />
        </section>
        <img src={waveBot} alt="wave" className='absolute w-full bottom-0 -z-10'/>
        <img src={waveTop} alt="wave" className='absolute w-full top-0 -z-10 rotate-180'/>
      </main>
    </>
  )
}

export default Home