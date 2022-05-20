import axios from 'axios'
import React, { useEffect } from 'react'


function LandingPage() {

  useEffect(() => {
    axios.get('/api/hello')
      .then(result => result.data)
      .then(result => console.log(result));
  }, [])
  

  return (
    <div>LandingPage</div>
  )
}

export default LandingPage