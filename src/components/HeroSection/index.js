import { NavLink } from 'react-router-dom';
import './styles.css';

function HeroSection() {
    return (
        <section className="hero">
            <div className="content">
                <div className="left">
                    <h1>Little Lemon</h1>
                    <h2>Chicago</h2>
                    <p>
                        We serve delicious food made with fresh, high-quality ingredients.
                        Come dine with us today!
                    </p>
                    <NavLink to="/reservations" className="buttonlink">Reservations</NavLink>
                </div>
                <div className="right"></div>
            </div>
        </section>
    )
}

export default HeroSection;