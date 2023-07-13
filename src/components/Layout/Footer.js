import classes from './Footer.module.css';
import { Fragment } from 'react';
import {BsLinkedin , BsGithub ,BsInstagram} from 'react-icons/bs'
const Footer=()=>{
    return (
        <Fragment>
            <div className={classes.footer}>
            <div><a rel="noreferrer" href="https://www.linkedin.com/in/nikhil-garg-474527232/" alt='Linkedin' target='_blank'><i><BsLinkedin/></i></a></div>
            <div><a rel="noreferrer" href="https://github.com/Nikhilg657" alt='Github' target='_blank'><i><BsGithub/></i></a></div>
            <div><a rel="noreferrer" href="https://www.instagram.com/nikhil_garg_0101/" alt='Instagram' target='_blank'><i><BsInstagram/></i></a></div>
            </div>
        </Fragment>
    )
}
export default Footer;