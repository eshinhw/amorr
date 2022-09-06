import React, { useState, useEffect } from 'react'
import { useTransition, animated, config } from 'react-spring'

const image1 =  require("../images/barber.jpg")
const image2 =  require("../images/makeup.jpg")
const images = [
  image1,image2 
]

const Animation = () => {
  const [index, setindex] = useState(0)
  const transition = useTransition(images[index], {
    from: { opacity: 0 },
    enter: { opacity: 0.8 },
    leave: { opacity: 0 },
    config: config.molasses,
  })

  const fragment = transition((style, item) => {
    return <animated.div style={style} >
      <img src={item}  className="amination" alt='provider working'/>
    </animated.div>;
  });

  useEffect(function appRunTimer() {
    // Creates a new timer when mount the component.
    const timer = setInterval(() => {
      setindex((index) => (index + 1) % 2); 
    }, 3000)
    
    // Stops the old timer when umount the component.
    return function stopTimer() {
      clearInterval(timer)
    }
  }, [])
  
  return (
    <div>
      {fragment}
    </div>
  )
}

export default Animation;