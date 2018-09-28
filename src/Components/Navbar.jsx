import React , {Component} from 'react'
import logo from '../Assets/images/logo.png'
import {NavLink } from 'react-router-dom';


class Navbar extends Component {
render() {
    return (
        <div>
            <div className="menu   colorSilver">
                <div className="logo">
                    <NavLink className="navLink color1" exact activeclassname={"active"} to={"/"}> 
                        <img className="logoImg"  src={logo} alt="لوگو" />
                    </NavLink>   
                   
                </div>
                <ul className="menuUl">
                    <li className="menuUlLi">
                        <NavLink className="navLink color1" exact activeclassname={"active"} to={"/"}>   خانه </NavLink>    
                    </li>
                    <li className="menuUlLi" >
                        <NavLink className="navLink color1" activeclassname={"active"} to={"/ContactUs"}>  تماس با ما </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )

}
}

export default Navbar