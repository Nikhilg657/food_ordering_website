import Input from '../../UI/Input';
import classes from './MealsForm.module.css';
import { useState, useRef} from 'react';
const MealsForm=(props)=>{
    const enteredAmountRef=useRef();
    const [isValidAmount,setValidAmount]= useState(true);
    const submitHandler=(e)=>{
        e.preventDefault();
        const enteredAmountinstring=(enteredAmountRef.current.value);
        const enteredAmount=+enteredAmountinstring;
        if(enteredAmountinstring.trim().length===0||enteredAmount<1)
        {
            setValidAmount(false);
            return;
        }
        else {
            setValidAmount(true);
        }
        props.onAddToCart(enteredAmount);
    }
    return (
        <form action="" className={classes.addmealform} onSubmit={submitHandler}>
            <Input label='Amount'
            ref={enteredAmountRef}
            input={
                {id:'amount',
                min: 0,
                step:1,
                defaultValue:0,}
            } />
            <button type='submit'>+ Add</button>
            {!isValidAmount && <p>Enter amount more than 0</p>}
        </form>
    )
}
export default MealsForm;