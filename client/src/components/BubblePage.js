import React, { useState, useEffect } from 'react'
import Bubbles from './Bubbles'
import ColorList from './ColorList'
import { axiosWithAuth } from '../utils/AxiosWithAuth'

const BubblePage = () => {
  const [colorList, setColorList] = useState([])

  useEffect(() => {
    // fetch your colors data from the server when the component mounts
    // set that data to the colorList state property
    axiosWithAuth()
      .get('/colors')
      .then(res => {
        setColorList(res.data)
      })
  }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  )
}

export default BubblePage
