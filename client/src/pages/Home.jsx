import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Products from '../components/Products'
import Slider from '../components/Slider'
import { hotjar } from 'react-hotjar';
import { useEffect } from 'react'

const Home = () => {
  useEffect(() => {
    hotjar.initialize(Number(String(process.env.REACT_APP_HOTJAR_HJID)), Number(String(process.env.REACT_APP_HOTJAR_HJSV)))
  }, [])

  return (
    <div>
        <Announcement/>
        <Navbar/>
        <Slider/>
        <Categories/>
        <Products/>
        <Newsletter/>
        <Footer/>
    </div>
  )
}

export default Home