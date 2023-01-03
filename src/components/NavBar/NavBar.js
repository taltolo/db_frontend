import './NavBar.css';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="nav">
      <img
        className="logo-img"
        src="header_logo.png"
        alt="ceav logo"
        width={170}
        height={75}
      />
      <ul>
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/addNetwork">Add Network</CustomLink>
        <CustomLink to="/deleteNetwork">Delete Network</CustomLink>
        <CustomLink to="/createJson">Create Json</CustomLink>
      </ul>
    </nav>
  );
};

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default NavBar;
