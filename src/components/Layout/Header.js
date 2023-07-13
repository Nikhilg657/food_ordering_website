import { Fragment } from "react";
import classes from './Header.module.css';
import foodimg from '../../assets/propo-agro.jpg';
import HeaderCartButton from "./HeaderCartButton";
const Header=(props)=>{
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>Nikhil Meals</h1>
                <HeaderCartButton onOpen={props.onShowCart}/>
            </header>
            <img src={foodimg} alt="Food" />
        </Fragment>
    );
}
export default Header;