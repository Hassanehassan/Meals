import { useState, useEffect } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [fetchData, setFetchData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchs = async () => {
      const response = await fetch(
        "https://react-https-c78c4-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const transformData = [];
      for (const key in data) {
        transformData.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setFetchData(transformData);
      setIsLoading(false);
    };
    fetchs().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);
  if (isLoading) {
    return (
      <section className={classes.isloading}>
        <p>Loading...</p>
      </section>
    );
  }
  if (error) {
    return (
      <section className={classes.error}>
        <p>{error}</p>
      </section>
    );
  }
  const mealsList = fetchData.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>{!isLoading && <ul>{mealsList}</ul>}</Card>
    </section>
  );
};

export default AvailableMeals;
