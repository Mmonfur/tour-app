import './NavBar.css';
import { route } from "preact-router";

export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#036b48"}}>
            <div className="container-fluid d-flex flex-column align-items-center">
                <div className="navbar-nav justify-content-center">
                    <a className="nav-link" onClick={() => route('/')}>Kezdőlap</a>
                    <a className="nav-link" onClick={() => route('/tours')}>Túrák</a>
                    <a className="nav-link" onClick={() => route('/tours/new')}>Új túra</a>
                </div>
            </div>
        </nav>
    );
}