import './styles.css';
import logowide from '../../assets/logo_wide.jpg'
import Nav from './Nav';

function Header() {
    return (
        <header>
            <div className="content">
                <div className="row">
                    <div className="left">
                        <img src={logowide} alt="Logo" className="logo" />
                    </div>
                    <div className="right">
                        <Nav />
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header;