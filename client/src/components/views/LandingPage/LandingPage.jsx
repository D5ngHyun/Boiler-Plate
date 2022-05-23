import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


function LandingPage() {
  const navigate = useNavigate();

  
  const onClickHandler = () => {
    axios.get('/api/users/logout')
      .then(res => {
        if(res.data.success){
          navigate('/login');
        } else {
          alert('로그아웃하는데 실패 했어요');
        }
      })
  }

  useEffect(() => {
    axios.get('/api/hello')
      .then(result => result.data)
      .then(result => console.log(result));
  }, [])
  

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh',
    }}>
      <h2>시작 페이지</h2>
      <button onClick={onClickHandler}>
        로그아웃
      </button>
    </div>
    
  )
}

export default LandingPage