import React, { useState } from 'react';
import { useQuery, gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

const LOGIN_QUERY = gql`mutation ($email: String!, $password: String!) {
    generateCustomerToken(email:$email, password:$password) {
        token
    }
  }`;




export default function Login({ setToken }) {
  const [email, setEmail] = useState('dasram@mailinator.com');
  const [password, setPassword] = useState('Abcd@1234');
  const [error, setError] = useState();
  const [loginUser] = useMutation(LOGIN_QUERY, {
      onError: (err) => {
          setError(err.message);
      }
    });
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    const {data: {generateCustomerToken: {token} = {token: null}} = {token: null}} = await loginUser({ variables:{
      email,
      password
    }});

    if (token) {
        
    setToken(token);   
    
    setError(null)
    window.location.href = '/home';
    }
  }
  
  return(
    <div className="login-wrapper">
      
      <form  onSubmit={handleSubmit}>

      <div className="container">
      <div className="row justify-content-center">
      <div className="col-3">
      <h3>Customer login Page</h3>
      <div className="mb-3">
        <label for="" className="form-label">Email</label>
        <input type="email" className="form-control" value="dasram@mailinator.com" onChange={e => setEmail(e.target.value)} placeholder="name@example.com" />
      </div>
      <div className="mb-3">
        <label for="exampleFormControlTextarea1" className="form-label">Password</label>
        <input type="password" className="form-control" password="Abcd@1234"  onChange={e => setPassword(e.target.value)} />
      </div>
        <div className="d-grid gap-2">
          <button className="btn btn-dark" type="submit">Sign In</button>
        </div>
        </div>
        </div>
        </div>
      </form>
      {error}
    </div>
  )
}