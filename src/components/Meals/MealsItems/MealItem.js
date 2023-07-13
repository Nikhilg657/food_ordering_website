import MealsForm from './MealsForm';
import classes from './MealItem.module.css';
import { useContext } from 'react';
import CartContext from '../../Store/Cart-context';
const MealItem=(props)=>{
    const cartCtx=useContext(CartContext);
    const price=`$${props.price.toFixed(2)}`;
    const addToCartHandler=(amount)=>{
        cartCtx.addItemToCart({
            id:props.id,
            name:props.name,
            description:props.description,
            price:props.price,
            amount:amount,
        })
    }
    return(
        <li>
            <div className={classes.meal}>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div className={classes.mealform}>
                <MealsForm onAddToCart={addToCartHandler}/>
            </div>
        </li>
    )
}
export default MealItem;