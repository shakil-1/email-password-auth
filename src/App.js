import './App.css';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import app from './firebase.init';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';


const auth = getAuth(app);

function App() {
  const [validated, setValidated] = useState(false);
  const [registerd, setRegisterd] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [passowrd, setPassword] = useState('');
  const handelEmailBlure = e => {
    setEmail(e.target.value);
  }

  const handelNameblure = e => {
    setName(e.target.value);
  }
  const handelPasswordblure = e => {
    setPassword(e.target.value);
  }

  const handelRegister = event => {
    setRegisterd(event.target.checked);
  }


  const handelFormSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {

      e.stopPropagation();
      return;
    }
    if (!/(?=.*[!@#$%^&*])/.test(passowrd)) {
      setError('plase enter one spacial carectar');
      return;
    }
    setValidated(true);
    setError('');

    if (registerd) {
      signInWithEmailAndPassword(auth, email, passowrd)
        .then(result => {
          const user = result.user;
          console.log(user);
        })
        .catch(error => {
          console.error(error);
          setError(error.message)
        })
    }

    else {
      createUserWithEmailAndPassword(auth, email, passowrd)
        .then(result => {
          const user = result.user;
          console.log(user);
          setEmail('');
          setPassword('');
          VerifyEmail();
          setUserName();
        })
        .catch(error => {
          console.error(error);
          setError(error.message);
        })
    }

    e.preventDefault();
  }


  const handelPasswordResat =() =>{
    sendPasswordResetEmail(auth, email)
    .then(() =>{
      console.log('email sent');
    })
  }

  const setUserName =() =>{
    updateProfile(auth.currentUser, {
      displayName: name
    })
    .then(() =>{
      console.log('update name');
    })
    .catch(error =>{
      setError(error.message)
    })
  }

  const VerifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('Email verification sent');
      })
  }

  


  return (
    <div >
      <div className="registetion mx-auto w-50 border mt-5 p-3">
        <h2 className='text-primary'>Please {registerd ? 'Login' : 'Register'}</h2>
        <Form noValidate validated={validated} onSubmit={handelFormSubmit}>
         { ! registerd && <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter your name</Form.Label>
            <Form.Control onBlur={handelNameblure} type="text" placeholder="Enter your name" required />
            <Form.Text className="text-muted">
              We'll never share your name.
            </Form.Text>
          </Form.Group>}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handelEmailBlure} type="email" placeholder="Enter email" required />

            <Form.Control.Feedback type="invalid">
              Please provide a valid Email.
            </Form.Control.Feedback>

            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handelPasswordblure} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handelRegister} type="checkbox" label="Alredy registerd?" />
          </Form.Group>
          <p className='text-danger'>{error}</p><br />
          <Button onClick={handelPasswordResat} variant="link text-decoration-none">Forget Password</Button>
          <Button variant="primary" type="submit">
            {registerd ? 'Login' : 'Register'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;



