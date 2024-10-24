"use client";
import local from "next/font/local";
import React from "react";
import { useEffect, useState } from "react";

function FoodItemList() {
  const [foodItems, setFoodItems] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    try {
      console.log("inside use effect");
      setLoading(true);
      const { _id } = JSON.parse(localStorage.getItem("restraunt"));
      const getFoodItems = async () => {
        const data = await fetch(`http://localhost:3000/api/food/${_id}`);
        const res = await data.json();
        console.log("data from the api", res);

        if (res.success) {
          setFoodItems(res?.result);
          setLoading(false);
        }
      };

      getFoodItems();
    } catch (error) {
      console.log("error occured!!", error.message);
    }
  }, []);
  return (
    <>
      {isLoading ? (
        <div>Loading items....</div>
      ) : (
        <>
          <div>Here are your Food Items</div>
          <div>
            <table>
              <thead>
                <tr>
                  <td>S.No</td>
                  <td>Item Name</td>
                  <td>Price</td>
                  <td>Image</td>
                  <td>Description</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {foodItems && foodItems?.length
                  ? foodItems?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.name}</td>
                        <td>{item?.price}</td>
                        <td>image</td>
                        <td>{item?.description}</td>
                        <td>
                          <button>Delete</button>
                          <button>Edit</button>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

export default FoodItemList;
