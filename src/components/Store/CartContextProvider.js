import CartContext from "./Cart-context";
import { useReducer } from "react";
const defaultCart={
    items:[],
    totalAmount:0
};
const setCartItems=(state,action)=>{
    if(action.type==='ADD')
    {
        let updatedCartItems;
        const alreadyItemIndex=state.items.findIndex(item=>item.id===action.item.id);
        const alreadyItem=state.items[alreadyItemIndex];
        if(alreadyItem)
        {
            const updateAlreadyItem={...alreadyItem,amount:alreadyItem.amount+action.item.amount};
            updatedCartItems=[...state.items];
            updatedCartItems[alreadyItemIndex]=updateAlreadyItem;
        }
        else {updatedCartItems=state.items.concat(action.item);}
        const updatedAmount=state.totalAmount + action.item.amount*action.item.price;
        return {
            items:updatedCartItems,
            totalAmount:updatedAmount,
        }
    }
    else if(action.type==='REMOVE')
    {
        let updatedCartItems;
        const alreadyItemIndex=state.items.findIndex((item)=>item.id===action.id);
        const alreadyItem=state.items[alreadyItemIndex];
        let updatedAmount=state.totalAmount - alreadyItem.price;
        if(alreadyItem.amount!==1)
        {
            const updateAlreadyItem={...alreadyItem,amount:alreadyItem.amount-1};
            updatedCartItems=[...state.items];
            updatedCartItems[alreadyItemIndex]=updateAlreadyItem;
        }
        else {updatedCartItems=state.items.filter((item)=>{ return item.id!==action.id})}
        if(updatedAmount<0) {
            updatedAmount=0;
        }
        return {
            items:updatedCartItems,
            totalAmount:updatedAmount,
        }
    }
    return defaultCart;
}
const CartContextProvider=(props)=>{
    const [cartState,DispatchedItem]=useReducer(setCartItems,defaultCart);
    const addItemToCartHandler=(item)=>{
        DispatchedItem({
            type:'ADD',
            item:item,
        })
    }
    const removeItemHandler=(id)=>{
        DispatchedItem({
            type:'REMOVE',
            id:id,
        })
    }
    const cartContext={
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItemToCart: addItemToCartHandler,
        removeItem:removeItemHandler,
    };  
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}
export default CartContextProvider;