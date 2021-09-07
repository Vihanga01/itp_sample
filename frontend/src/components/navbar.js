import React from "react";
import {Link} from 'react-router-dom';

function navbar() {

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <Link to="/add" className="nav-link">Register customer</Link>
              </li>
              <li className="nav-item">
                <Link to="/all" className="nav-link">ALL customer</Link>
              </li>
              
               
            </ul>
          </div>
        </div>
      </nav>
    )

    }
    export default navbar;
