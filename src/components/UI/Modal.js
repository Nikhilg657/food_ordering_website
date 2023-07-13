import classes from './Modal.module.css';
import ReactDOM  from 'react-dom';
import { Fragment } from 'react';
const Overlay=(props)=>{
    return (<div className={classes.modal}>
        <div>{props.children}</div>
    </div>)
}
const Backdrop=(props)=>{
    return (<div className={classes.backdrop} onClick={props.onClick}></div>)
}
const portal=document.getElementById('overlay');
const Modal=(props)=>{
    return (
        <Fragment>
            {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>,portal)}
            {ReactDOM.createPortal(<Backdrop onClick={props.onClose}/>,portal)}
        </Fragment>
    )
}
export default Modal;