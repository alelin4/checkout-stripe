import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import "../css/Main.css";

const Login = () => { 
  // Destructure values from the context
  const { setUsername, setEmail, user, register, invalidUser, setPassword, login, registration } = useContext(StoreContext);
  
  return (
    <div className='login-header'> 
      {/* Login Section */}
      <div>
        <h2>Login:</h2>
        <input type='text' onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
        <input type='text' onChange={e => setPassword(e.target.value)} placeholder='Password' />
        <button onClick={login} className='login-button'>Login</button>

        {invalidUser ? <p>Invalid user</p> : ''}  
      </div>

      {/* Information Section */}
      <div className='login-headers'>
        <h1>DoggyCollars</h1>
        <p>Welcome to this <br/> brand new shop</p>
      </div>

      {/* Registration Section */}
      <div>
        <h2>Create user:</h2>
        <input type='text' onChange={e => setUsername(e.target.value)} placeholder='Username' />
        <input type='text' onChange={e => setEmail(e.target.value)} placeholder='E-mail' />
        <input type='text' onChange={e => setPassword(e.target.value)} placeholder='Password' />
        <button onClick={registration} className='login-btn'>Register</button>
        {user ? <p>this username already exists</p> : ''}
        {register ? <p>Registration complete</p> : ''}
      </div>
    </div>
  );
}

export default Login;
