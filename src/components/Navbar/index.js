import React from 'react'
import './Navbar.css'
import { FiSettings } from 'react-icons/fi'
import { MdNotificationsNone } from 'react-icons/md'
import { FaRegUserCircle } from 'react-icons/fa'

function Navbar() {
    return (
        <nav className="Navbar">
            <div className="navbar__items">
                <div className="navbar__logo">STYLO</div>

                <div className="navbar__tabs">
                    <a className="navbar__tab" href="">Home</a>
                    <a className="navbar__tab active" href="">Past Paper</a>
                    <a className="navbar__tab" href="">Calendar</a>
                </div>

                <div className="navbar__actions">
                    <a className="navbar__action"><FiSettings size={24}/></a>
                    <a className="navbar__action"><MdNotificationsNone size={26} /></a>
                    <a className="navbar__action"><FaRegUserCircle fontSize={26}/></a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
