import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';




function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  

  const onNameHandler = e => {
    setName(e.currentTarget.value)
  }
  const onConfirmPasswordHandler = e => {
    setConfirmPassword(e.currentTarget.value)
  }
  const onEmailHandler = e => {
    setEmail(e.currentTarget.value)
  };
  const onPasswordHandler = e => {
    setPassword(e.currentTarget.value)
  }
  const onSubmitHandler = e => {
    e.preventDefault();

    if(password !== confirmPassword){
      alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
    }

    let body ={
      name,
      email,
      password,
    }

    dispatch(registerUser(body))
      .then(res => {
        if(res.payload.success){
          navigate('/login')
        } else {
          alert('ERROR');
        }
      })
  }

  return (
    <div className="register_wrap">
      <form onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={email} onChange={onEmailHandler} />

        <label>Name</label>
        <input type="name" value={name} onChange={onNameHandler} />

        <label>PassWord</label>
        <input type="password" value={password} onChange={onPasswordHandler} />

        <label>confirmPassword</label>
        <input type="password" value={confirmPassword} onChange={onConfirmPasswordHandler} />

        <br />
        <button>
          Register
        </button>
      </form>
    </div>
  )
}

export default RegisterPage