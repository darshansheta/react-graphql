import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faTwitter, faPinterest } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
    return (
        <footer className="footer mt-auto py-3 bg-light">
          <div className="container">
          <nav className="navbar ">
            {/*<span className="text-muted">Place sticky footer content here.</span>*/}
            <ul className="navbar-nav flex-row flex-wrap me-auto">
               <li className="nav-item">
                 <a href="/" className="nav-link"> Cookies Policy - Legal Notice </a>
               </li>
            </ul>
            <ul className="navbar-nav flex-row flex-wrap mx-auto">
               <li className="nav-item">
                 <span className="text-dark">Copyright @ 2021 Made with ❤ form seepossible</span>
               </li>
            </ul>
            <ul className="navbar-nav flex-row flex-wrap ms-auto">
               <li className="nav-item mx-2">
                 <a href="/" className="nav-link"><FontAwesomeIcon icon={faFacebook} /> </a>
               </li>
               <li className="nav-item mx-2">
                 <a href="/" className="nav-link"><FontAwesomeIcon icon={faInstagram} /> </a>
               </li>
               <li className="nav-item mx-2">
                 <a href="/" className="nav-link"><FontAwesomeIcon icon={faTwitter} /> </a>
               </li>
               <li className="nav-item mx-2">
                 <a href="/" className="nav-link"><FontAwesomeIcon icon={faPinterest} /> </a>
               </li>
            </ul>
          </nav>
          </div>
        </footer>
    );
}