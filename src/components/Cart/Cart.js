import classes from './Cart.module.css';
import { Fragment,useContext,useState} from 'react';
import Modal from '../UI/Modal';
import CartContext from '../Store/Cart-context';
const Cart=(props)=>{
    const cartcontextformodal=useContext(CartContext);
    const cartItemRemoveHandler=(id)=>{ 
        cartcontextformodal.removeItem(id);
    }
    const cartItemAddHandler=(item)=>{
        cartcontextformodal.addItemToCart(item);
    }
    
    const selectedItemsInCart=(<ul className={classes.modalcartdesc}>
        <li className={classes.cartTitles}>
        <span>Name</span>
            <span>Price</span>
            <span>Amount</span>
            <span className={classes.mutator}>Inc/Dec</span>
            <span>Item Total</span>
        </li>
        {      
        cartcontextformodal.items.map((item)=>(
        <li >
            <span>{item.name}</span>
            <span>{item.price}</span>
            <span>{item.amount}</span>
            <div className={classes.mutator}>
        <button onClick={cartItemRemoveHandler.bind(null,item.id)}>−</button>
        <button onClick={cartItemAddHandler.bind(null, item)}>+</button>
        </div>
            <span>{item.price*item.amount}</span>
        </li>
        
    ))}</ul>
    );
    const finalTotalAmount=cartcontextformodal.totalAmount.toFixed(2);
    const hasitems=cartcontextformodal.items.length>0;

    const [isOrdered,setIsOrdered]=useState(false);
    const onOrderHandler=()=>{
        setIsOrdered(true);
    }
    const confirmOnOrdered=()=>{
        setIsOrdered(false);
    }
    return (
        <Fragment>
        {!isOrdered &&<Modal className={classes['cart--items']} onClose={props.onHideCart}>
            {selectedItemsInCart}
        <div className={classes.total}>
            <span>Total</span>
            <span>{finalTotalAmount}</span>
        </div>
        <div className={classes.actions} >
            <button className={classes['button--alt'] } onClick={props.onHideCart}>Close</button>
            { hasitems && <button className={classes.button} onClick={onOrderHandler}>Order</button>}
        </div>
        </Modal>}
        {isOrdered && <Modal onClose={confirmOnOrdered && props.onHideCart}>
            <h2 className={classes.order}>Congratulations!! Your Order is placed succesfully. Have a nice day! </h2>
            </Modal>}
        </Fragment>
    );
}
export default Cart;