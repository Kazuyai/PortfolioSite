import React, { useState } from 'react'
import styles from '@/styles/common/ToTopButton.module.scss'

const ToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  const handleOnClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button
      onClick={handleOnClick}
      className={`${styles.toTopButton} ${isVisible ? styles.visible : ''}`}
    >
      <img src="/images/star.svg" alt="" />
    </button>
  )
}

export default ToTopButton