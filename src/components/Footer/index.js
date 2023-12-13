import './styles.css';

import logo from '../../assets/logo.png';
import linkedin from '../../assets/linkedin.svg';
import instagram from '../../assets/instagram.svg';
import github from '../../assets/github.svg';
import geo from '../../assets/geo-alt-fill.svg';
import telephone from '../../assets/telephone-fill.svg';

function Footer() {
    return (
        <footer>
            <div className="content">
                <div className="row">
                    <div>
                        <img src={logo} alt="logo" className="logo" />
                    </div>
                    <div>
                        <h3><img src={geo} alt="Address" /> Address</h3>
                        <a href="https://maps.google.com" target="_blank" rel="noreferrer">555 Main Street<br />
                            Chicago IL, 90608<br /></a>
                        <br />
                        <h3><img src={telephone} alt="Phone" /> Phone</h3>
                        <a href="tel:(5555555555)">(555) 555-5555</a><br />
                        <br />
                        <h3>Links</h3>
                        <ul className="links">
                            <li><a href="/" title="Home">Home</a></li>
                            <li><a href="/" title="About">About</a></li>
                            <li><a href="/" title="Menu">Menu</a></li>
                            <li><a href="/" title="Reservations">Reservations</a></li>
                            <li><a href="/" title="Login">Login</a></li>
                        </ul>

                    </div>
                    <div>
                        <p>
                            <strong>Note:</strong> This is a fictional website
                            for demonstration purposes only.
                            It is from the capstone project
                            in the <a href="https://www.coursera.org/professional-certificates/meta-front-end-developer"
                                target="_blank" rel="noreferrer">Meta Front-End Developer Professional Certificate</a> program
                            and it was built using
                            the <a href="https://react.dev/" target="_blank" rel="noreferrer">React JS framework</a>.
                        </p>
                        <p>
                            This website and its components were designed and developed by Grant Lee.
                            Please visit and follow me using
                            the social links below!
                        </p>
                        <ul className="socials">
                            <li><a href="https://www.linkedin.com/in/grantklee/" title="LinkedIn" target="_blank" rel="noreferrer">
                                <img src={linkedin} alt="LinkedIn" className="icon" />
                            </a></li>
                            <li><a href="https://www.instagram.com/grizzlypuff/" title="Instagram" target="_blank" rel="noreferrer">
                                <img src={instagram} alt="Instagram" className="icon" />
                            </a></li>
                            <li><a href="https://github.com/grantl33" title="GitHub" target="_blank" rel="noreferrer">
                                <img src={github} alt="GitHub" className="icon" />
                            </a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </footer >
    )
}
export default Footer;