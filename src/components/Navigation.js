import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/routes/Home">Home</Link>
        </li>
        <li>
          <Link to="/routes/profile">{userObj.displayName} Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;