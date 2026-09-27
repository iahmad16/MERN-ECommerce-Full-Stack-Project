
import './Navbar.css'
import nav_logo from '../../assets/navlogo.png'
import nav_profile from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='nav-logo' src={nav_logo} alt="" />
      <img className='nav-profile' src={nav_profile} alt="" />
    </div>
  )
}

export default Navbar
