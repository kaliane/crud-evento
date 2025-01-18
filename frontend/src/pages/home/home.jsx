import React from 'react';
import './home.css';
import {Link} from "react-router-dom";
export default function Home() {
    return (
        <div className = "profile-container">
            <header>
                <span>
                    <h1>CRUD Eventos</h1>
                </span>
            </header>
            <ul>
                <li>
                    <Link className="button" to="/institution">Instituição</Link>
                </li>
                <li>
                    <Link className="button" to="/event">Evento</Link>
                </li>
            </ul>
        </div>
    );
}