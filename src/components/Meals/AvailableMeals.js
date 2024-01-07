import classes from './AvailableMeals.module.css';
import Card from "../UI/Card";
import MealItem from './MealsItems/MealItem';
import { useEffect, useState } from 'react';
const AvailableMeals=()=>{
    const [meals,setMeals]=useState([]);
    const [isLoading, setIsLoading]=useState();
    const [error,setError]=useState(false);
    const fetchMeals=async()=>{
      setIsLoading(true);
      try{
        const response=await fetch("https://food-ordering-app-625c3-default-rtdb.firebaseio.com/meals.json");
        if(!response.ok)
        {
          throw new Error("Something went wrong!!!");
        }
        const data=await response.json();
        const loadedMeals=[];
        for(const key in data)
        {
          loadedMeals.push({
            key:data[key].id,
            id:data[key].id,
            name:data[key].name,
            description:data[key].description,
            price:data[key].price,
          });
        }
        setMeals(loadedMeals);
      }catch(err){
        setError(true);
        console.log(err.message);
      }
      setIsLoading(false);
    };
    useEffect(()=>{
      fetchMeals();
    },[]);

    const mealsitems=meals.map((item)=>(
        <MealItem  key={item.id} id={item.id} name={item.name}
        description={item.description}  
        price={item.price} />
        
    ));
    let content=<section className={classes.meals}>
    <Card>
      <ul>
          {mealsitems}
      </ul>
      </Card>
  </section>;
  if(isLoading)
  {
    content= <p className={classes.loading}>Loading...</p>
  }
  if(error)
  {
    content= <p className={classes.loading}>Something went wrong!! Please Reload...</p>
  }
    return (
        content
    )
}
export default AvailableMeals;