import classes from "./Cart.module.css";
import { Fragment, useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartContext from "../Store/Cart-context";
const Cart = (props) => {
  const cartcontextformodal = useContext(CartContext);
  const [isOrdered, setIsOrdered] = useState(false);
  const [ifConfirmed, setIfConfirmed] = useState(false);

  const [customerName, setCustomerName] = useState();
  const [customerAddress, setCustomerAddress] = useState();
  const [customerContactNumber, setCustomerContactNumber] = useState();
//   const [customerInfo, setCustomerInfo] = useState();
//   const [orderInfo, setOrderInfo] = useState();

  const customerNameHandler = (event) => {
    setCustomerName(event.target.value);
  };
  const customerAddressHandler = (event) => {
    setCustomerAddress(event.target.value);
  };
  const customerContactNumberHandler = (event) => {
    setCustomerContactNumber(event.target.value);
  };
   const storeOrderInfo=async(userInfo,orderInfo)=>{
    try {
        const response = await fetch(
          "https://food-ordering-app-625c3-default-rtdb.firebaseio.com/order.json",
          {
            method: "POST",
            body: JSON.stringify({ customer:userInfo, order: orderInfo }),
            headers: {
              "content-type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Something Went Wrong!!");
        }
      } catch (err) {
        console.log(err.message);
      }  
};
  const onConfirmHandler = () => {
    setIfConfirmed(true);
    const userInfo = {
      name: customerName,
      address: customerAddress,
      contactNo: customerContactNumber,
    };
    // setCustomerInfo(userInfo);
    const orderInfo = {
      items: cartcontextformodal.items,
      totalAmount: cartcontextformodal.totalAmount,
    };
    // setOrderInfo(orderInfo);
   storeOrderInfo(userInfo,orderInfo);
    cartcontextformodal.resetCart();
  };
  const onOrderHandler = () => {
    setIsOrdered(true);
  };
  const confirmOnOrdered = () => {
    setIsOrdered(false);
    setIfConfirmed(false);
  };
  

  const cartItemRemoveHandler = (id) => {
    cartcontextformodal.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartcontextformodal.addItemToCart(item);
  };

  const selectedItemsInCart = (
    <ul className={classes.modalcartdesc}>
      <div className={classes.cartTitles}>

        <span>Name</span>
        <span>Price</span>
        <span>Amount</span>
        <span className={classes.mutator}>Inc/Dec</span>
        <span>Item Total</span>
      </div>
      {cartcontextformodal.items.map((item) => (
        <li key={item.id}>
          <span>{item.name}</span>
          <span>{item.price}</span>
          <span className={classes.amount}>{item.amount}</span>
          <div className={classes.mutator}>
            <button onClick={cartItemRemoveHandler.bind(null, item.id)}>
              −
            </button>
            <button onClick={cartItemAddHandler.bind(null, item)}>+</button>
          </div>
          <span>{item.price * item.amount}</span>
        </li>
      ))}
    </ul>
  );
  const finalTotalAmount = cartcontextformodal.totalAmount.toFixed(2);
  const hasitems = cartcontextformodal.items.length > 0;
  return (
    <Fragment>
      {!ifConfirmed && (
        <Fragment>
          <Modal className={classes["cart--items"]} onClose={props.onHideCart}>
            {selectedItemsInCart}
            <div className={classes.total}>
              <span>Total</span>
              <span>{finalTotalAmount}</span>
            </div>
            {isOrdered && (
              <div>
                <div className={classes.details}>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" onChange={customerNameHandler} />
                </div>
                <div className={classes.details}>
                  <label htmlFor="address">Shipping address</label>
                  <input
                    type="text"
                    id="address"
                    onChange={customerAddressHandler}
                  />
                </div>
                <div className={classes.details}>
                  <label htmlFor="contactNo">Contact Number</label>
                  <input
                    type="number"
                    id="contactNo"
                    className={classes.number}
                    onChange={customerContactNumberHandler}
                  />
                </div>
              </div>
            )}
            <div className={classes.actions}>
              <button
                className={classes["button--alt"]}
                onClick={props.onHideCart}
              >
                Close
              </button>
              {hasitems && !isOrdered && (
                <button className={classes.button} onClick={onOrderHandler}>
                  Order
                </button>
              )}
              {isOrdered && (
                <button className={classes.button} onClick={onConfirmHandler}>
                  Confirm
                </button>
              )}
            </div>
          </Modal>
        </Fragment>
      )}
      {ifConfirmed && (
        <Modal onClose={confirmOnOrdered && props.onHideCart}>
          <h2 className={classes.order}>
            Congratulations!! Your Order is placed succesfully. Have a nice day!{" "}
          </h2>
        </Modal>
      )}
    </Fragment>
  );
};
export default Cart;
