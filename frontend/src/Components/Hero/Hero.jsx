import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import hero_image from '../Assets/iphone.png'

const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            {/* <h2>NEW ARRIVALS ONLY</h2> */}
            <div>
                <div className="hero-hand-icon">
                    <p>New</p>
                    <img src={hand_icon} alt="" />
                </div>
                <p>Gadgets</p>
                <p>For Everyone</p>
            </div>
            <div className="hero-latest-button">
                <div>Browse Products</div>
            </div>
        </div>

        <div className="hero-right">
            <img src={hero_image} alt="" />
        </div>
    </div>
  )
}

export default Hero
