import React from 'react'
import Osa from './Osa'

const Sisalto = ({kurssi}) => {
  const osatMap = kurssi.osat.map(o => <Osa osa={o.nimi} tehtavia={o.tehtavia}/>)
  return (
    <div>
      {osatMap}
    </div>
  )
}

export default Sisalto
