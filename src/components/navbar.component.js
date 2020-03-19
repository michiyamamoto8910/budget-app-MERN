import React, { Component } from "react";
import { Link } from 'react-router-dom';
import '../App.css'





export default class Navbar extends Component {
   
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        {/* <li className="nav-item">BudgetTracker</li>
                         */}
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Items</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/create" className="nav-link">Create Items</Link>
                        </li>
                        
                       <li className = "month-selector" id="month-selector">
                        {this.props.select}
                       </li>
                    </ul>
                </div>
            </nav>
          

        )
    }
}