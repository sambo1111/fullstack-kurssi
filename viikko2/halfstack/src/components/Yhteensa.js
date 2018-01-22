import React from 'react'

const Yhteensa = ({kurssi}) => {
  var yht = (a,c) => a + c;
  return (
    <div>
      <p> yhteensä {kurssi.osat.map(o => o.tehtavia).reduce(yht)} tehtävää</p>
    </div>
  )
}

export default Yhteensa
