import AvailableMeals from "./AvailableMeals";
import MealSummary from "./MealSummary";
import { Fragment } from "react";
const Meals=()=>{
    return (
        <Fragment>
            <MealSummary/>
            <div>
            <AvailableMeals/>
            </div>
        </Fragment>
    )
}
export default Meals;