import React , {Component} from 'react'
import logo from '../Assets/images/logo.png'
import {NavLink } from 'react-router-dom';


class Navbar extends Component {
render() {
    return (
        <div>
            <div className="menu container">
                <div className="logo">
                    <img className="logoImg"  src={logo} alt="لوگو" />
                </div>
                <ul className="menuUl">
                    <li className="menuUlLi">
                        <NavLink className="navLink color1" to={"/Home"}>   خانه </NavLink>    
                    </li>
                    <li className="menuUlLi" >
                        <NavLink className="navLink color1" to={"/ContactUs"}>  تماس با ما </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )

}
}

export default Navbar