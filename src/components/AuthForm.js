import React, { useEffect, useState } from 'react';
import { authService} from '../fbase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';

const AuthForm =()=>{
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) { // create newAccount
        data = createUserWithEmailAndPassword(authService, email, password).then(() => {
          setEmail("");
          setPassword("");
      });
      } else {
        data = signInWithEmailAndPassword(authService, email, password).then(() => {
          console.log("이미 가입된 회원"); })
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

    return (
        <>
            <form onSubmit={onSubmit}>
                <input name="email" type="text" placeholder="Email" required value={email} onChange={onChange} /><br/>
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} /><br/>
                <input type="submit" value={newAccount ? "계정 생성": "로그인"} />
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "로그인": "계정 생성"}
            </span>
            <br/>
        </>
    )
}
export default AuthForm;