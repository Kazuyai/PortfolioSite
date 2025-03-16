import React from 'react'
import styles from '@/styles/sections/Gallery.module.scss'

interface GalleryProps {
  activeEvent: string | null;
}

const Gallery = ({ activeEvent }: GalleryProps) => {
  return (
    <section className={styles.gallery}>
        <h1>Gallery</h1>
        <p>These are my gallery</p>
    </section>
  )
}

export default Gallery