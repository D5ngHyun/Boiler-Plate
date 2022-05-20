import React, { useState } from 'react'
import './LoginPage.css';

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');

  const onEmailHandler = e => setEmail(e.currentTarget.value);
  const onPasswordHandler = e => setPassword(e.currentTarget.value)
  const onSubmitHandler = e => {
    e.preventDefault();
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
