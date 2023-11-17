import { NavLink } from "react-router-dom";

function Nav() {
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/menu">Menu</NavLink>
            <NavLink to="/reservations" data-testid="nav-reservations">Reservations</NavLink>
            <NavLink to="/login">Login</NavLink>
        </nav>
    )
}
export default Nav;