import React from 'react'
import Loading  from '../../icons/vegan.gif'
import style from './loader.module.css'

const Loader = () => {
  return (
    <div className={style.containerLoader}>
      <img src={Loading} alt="loader" />
    </div>
  )
}

export default Loader
