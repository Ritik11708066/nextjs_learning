"use client";
import RestrauntFooter from "@/app/_components/RestrauntFooter";
import RestrauntHeader from "@/app/_components/restraunt_header";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "../../restraunt/style.css";
import AddFoodItem from "@/app/_components/AddFoodItem";
import FoodItemList from "@/app/_components/FoodItemList";

function Dashboard() {
  const router = useRouter();
  const [restroDetails, setRestroDetails] = useState(null);

  // const [isFoodItem, setFoodItem] = useState(false)

  useEffect(() => {
    // here we are checking from local storage weather restrant data exists or not
    // if not then we will redirect to login page. else we will get the data and set it to local state so as to use it in our component.
    const data = JSON.parse(localStorage.getItem("restraunt"));
    if (!data) {
      router.push("/restraunt");
    } else {
      setRestroDetails(data);
    }
  }, []);

  const handleRoute = (route) => {
    router.push(`${route}`)
  }
  return (
    <div>
      <RestrauntHeader />
      <button onClick={() => handleRoute('/restraunt/addFood')}>Add food item</button>
      <button onClick={() => handleRoute('/restraunt/dashboard')}>Dashboard</button>
      <div className="container">
        <h1>welcome {restroDetails?.email}</h1>
        <FoodItemList />
      </div>
      <RestrauntFooter />
    </div>
  );
}

export default Dashboard;
