import './styles.css'
import '@popperjs/core';
import { AuthContext } from 'AuthContext';
import 'bootstrap/js/src/collapse';
import { useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getTokenData, isAuthenticated } from 'util/auth';
import history from 'util/history';
import { removeAuthData } from 'util/storage';

const Navbar = () => {

    const { authContextData, setAuthContextData } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated()) {
            setAuthContextData({
                authenticate: true,
                tokenData: getTokenData()
            });
        } else {
            setAuthContextData({
                authenticate: false
            });
        }
    }, [setAuthContextData]);

    const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        removeAuthData();
        setAuthContextData({
            authenticate: false
        });
        history.replace('/');
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-primary main-nav">
            <div className="container-fluid">
                <Link to="/" className="nav-logo-text">
                    <h4>DS Catalog</h4>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#dscatalog-navbar"
                    aria-controls="dscatalog-navbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="dscatalog-navbar">
                    <ul className="navbar-nav offset-md-2 main-menu">
                        <li>
                            <NavLink to="/" activeClassName='active' exact>HOME</NavLink>
                        </li>
                        <li>
                            <NavLink to="/products" activeClassName='active'>CATÁLAGO</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin" activeClassName='active'>ADMIN</NavLink>
                        </li>
                    </ul>
                </div>

                <div className='nav-login-logout'>
                    {authContextData.authenticate ? (
                        <>
                            <span className='nav-username'>{authContextData.tokenData?.user_name}</span>
                            <a href="#logout" onClick={handleLogoutClick}>Logout</a>
                        </>
                    ) : (
                        <Link to="/admin/auth">Login</Link>
                    )}
                </div>

            </div>
        </nav>

    );
}

export default Navbar;
