import classes from './HeaderCartButton.module.css';
import {BsCart} from 'react-icons/bs';
import { useContext } from 'react';
import CartContext from '../Store/Cart-context';
const HeaderCartButton=(props)=>{
    const cartCxt=useContext(CartContext);
    const itemsCount=cartCxt.items.reduce((curr,item)=>{
        return curr+item.amount;
},0);
    return (
        <button className={classes.buttonn} onClick={props.onOpen}>
            <div className={classes.icon}><BsCart/></div>
            <div className={classes.cart}>My Cart</div>
            <div className={classes.item_count}>{itemsCount}</div>
        </button>
    )
}
export default HeaderCartButton;