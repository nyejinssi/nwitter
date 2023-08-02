import React, {useState} from 'react';
import {authService} from '../fbase';
import {useNavigate, Link} from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true); 
    const [error, setError] = useState(""); 
    const [errorMessage, setErrorMessage] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [word, setWord] = useState("");
    const [User, setUser] = useState(null);
    const data = useState("");
    
    const onSubmit = (event) => {
        event.preventDefault();        
        try{    
                data = signInWithEmailAndPassword(authService, email, password).then(() => {
                    navigate('/Home');
                    console.log(data); })
                } catch(error){
                    setErrorMsg(error.message);
                    setErrorMessage("이메일 또는 비밀번호가 잘못되었습니다.");
                }
        };

    const onSocialClick = async (event) => {
        const { target: {name},} = event;
        let provider;
        if (name === "google"){ provider = new GoogleAuthProvider(); }
        const data = await signInWithPopup(authService, provider);
        console.log("구글 계정으로 로그인 성공");
        navigate('/Home');
    };

    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "email"){ 
            setEmail(value);
        } else if(name === "password"){
                setPassword(value);
    }};       
    return (
        <>
            <form onSubmit={onSubmit}>
                <input name="email" type="text" placeholder="Email" required value={email} onChange={onChange} /><br/>
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} /><br/>
                <input type="submit" value="로그인" />
            </form>
            <button onClick={onSocialClick} name="google" alt="구글로 로그인">google로 회원가입/로그인</button><br/>
            <Link to="/routes/SignUp"><button>회원가입 하러가기</button></Link>
        </>
    )
}

export default SignIn;