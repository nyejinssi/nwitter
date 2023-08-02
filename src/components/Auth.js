import { Link } from "react-router-dom";

const Auth = () => {
  return (
    <>
        <li>
          <Link to="/routes/SignIn">로그인</Link>
        </li>
        <li>
          <Link to="/routes/SignUp">회원가입</Link>
        </li>
    </>
  );
};

export default Auth;