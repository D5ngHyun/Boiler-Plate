import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';


function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  

  const onEmailHandler = e => setEmail(e.currentTarget.value);
  const onPasswordHandler = e => setPassword(e.currentTarget.value)
  const onSubmitHandler = e => {
    e.preventDefault();

    let body = {
      email,
      password
    }

    dispatch(loginUser(body))
      .then(response => {
        if(response.payload.loginSuccess){
          navigate('/');
        } else {
          alert('Error')
        }
        
      })

    console.log(dispatch(loginUser(body)));

    
  }

  return (
    <div className="login_wrap">
      <form onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={email} onChange={onEmailHandler} />
        <label>PassWord</label>
        <input type="password" value={password} onChange={onPasswordHandler} />

        <br />
        <button>
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
