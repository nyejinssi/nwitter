import React, { useState } from 'react';
import { authService } from '../fbase';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import AuthForm from '../components/AuthForm';

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider(); 
    } 
    const data = await signInWithPopup(authService, provider).then(() => {
      console.log("구글로 Sign");
  });
  };

  return (
    <div>
      <AuthForm/>
      <button onClick={onSocialClick} name="google" alt="구글로 로그인">google로 회원가입/로그인</button><br/>
    </div>
    
  );
};

export default Auth;