import React from 'react'
import { useFirebase } from '../context/Firebase'
import { Link } from 'react-router-dom'

export default function Navbar() {

    const firebase = useFirebase()

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Todo-List</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {firebase.user && <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Todo</Link>
                            </li>}
                            {firebase.user && <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/createtodo">Create New</Link>
                            </li>}
                            {!firebase.user && <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>}
                            {!firebase.user && <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>}
                        </ul>
                        {firebase.user && <button type="button" className="btn btn-secondary" onClick={firebase.logoutUser}>Logout</button>}
                    </div>
                </div>
            </nav>
        </div>
    )
}
