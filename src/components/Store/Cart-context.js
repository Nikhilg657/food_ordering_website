import React from "react";
const CartContext=React.createContext({
    items:[],
    totalAmount:0,
    addItemToCart:(item)=>{},
    removeItem:(id)=>{}
});
export default CartContext;