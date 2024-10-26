"use client";
import local from "next/font/local";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

function AddFoodItem(props) {
  const {editFoodData} = props
  const router = useRouter()
  const [foodData, setFoodData] = useState({
    foodName: "",
    price: "",
    path: "",
    description: "",
  });

  useEffect(() => {
    if(editFoodData){
      setFoodData({
        foodName: editFoodData?.name,
        price: editFoodData?.price,
        path: editFoodData?.path,
        description: editFoodData?.description
      })
    }
  }, [editFoodData])

  const [foodItemError, setFoodItemError] = useState({
    foodName: "",
    price: "",
  });

  const [isError, setError] = useState(false);

  const checkValidation = (value) => {
    return value.length === 0 ? false : true;
  };
  const validatePrice = (value) => {
    const numberRegex = /^\d*$/;
    return numberRegex.test(value);
  };

  const validateField = (value, fieldName) => {
    switch (fieldName) {
      case "foodName":
        return checkValidation(value);
      case "price":
        return validatePrice(value);
      default:
        return true;
    }
  };
  const handleCustomError = (fieldName) => {
    switch (fieldName) {
      case "foodName":
        return "food Name is required";
      case "price":
        return "price is invalid";
      default:
        return true;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFoodData({
      ...foodData,
      [name]: value,
    });

    const tempError = { ...foodItemError };
    if (!value) {
      tempError[name] = `${name} is required`;
    } else if (!validateField(value, name)) {
      tempError[name] = handleCustomError(name);
    } else {
      tempError[name] = "";
    }

    setFoodItemError(tempError);

    if (Object.values(tempError).some((error) => error !== "")) {
      setError(true); // If any field has an error, set isError to true
    } else {
      setError(false); // No errors, so set isError to false
    }
  };

  const handleOnFocus = (e) => {
    const { name, value } = e.target;
    if (!value.length) {
      setFoodItemError({
        ...foodItemError,
        [name]: `${name} is required`,
      });
      setError(true);
    } else {
      setFoodItemError({
        ...foodItemError,
        [name]: "",
      });
      setError(false);
    }
  };

  const handleAddFoodItem = async (e) => {
    const { foodName, price, path, description } = foodData;

    e.preventDefault();
    let tempError = false;

    function handleErr(fieldname) {
      tempError = true;
      setFoodItemError({
        ...foodItemError,
        [fieldname]: `${fieldname} is required`,
      });
      setError(true);
    }

    if (!foodName) {
      handleErr("foodName");
    }
    if (!price) {
      handleErr("price");
    }

    if (!tempError) {
      try {
        // here we will get the restraunt detail from the local storage ,
        // bcz we want restro id so that we can get to know which particular restro is adding food item
        // and with the help of that same id we can display food items of different different restraunts.

        let restro_id;
        const restrauntData = JSON.parse(localStorage.getItem("restraunt"));
        if (restrauntData) {
          console.log("got the data", restrauntData);
          restro_id = restrauntData._id;
        }

        const url = editFoodData ? `http://localhost:3000/api/food/${editFoodData?._id}` : 'http://localhost:3000/api/food'

        let data = await fetch(url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            foodName: foodName,
            foodPrice: price,
            foodImgPath: path,
            foodDescription: description,
            restro_id: restro_id,
          }),
        });
        let response = await data.json();
        if (response.success) {
          alert(response.message);
          router.push('/restraunt/dashboard')
        } else {
            alert('food item is not saved')
        }
      } catch (error) {
        console.log("error while saving", error.message);
      }
    }
  };
  return (
    <div className="container">
      <h1>Add Food Item</h1>
      <div className="input-wrapper">
        <input
          type="text"
          name="foodName"
          value={foodData?.foodName}
          className="input-field"
          placeholder="enter food name"
          onChange={handleInputChange}
          onFocus={handleOnFocus}
        />
        {foodItemError?.foodName?.length ? (
          <div style={{ color: "red" }}>{foodItemError?.foodName}</div>
        ) : (
          ""
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          name="price"
          value={foodData?.price}
          className="input-field"
          placeholder="enter price"
          onChange={handleInputChange}
          onFocus={handleOnFocus}
        />
        {foodItemError?.price?.length ? (
          <div style={{ color: "red" }}>{foodItemError?.price}</div>
        ) : (
          ""
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          name="path"
          value={foodData?.path}
          className="input-field"
          placeholder="enter image path"
          onChange={handleInputChange}
        />
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          name="description"
          value={foodData?.description}
          className="input-field"
          placeholder="enter description"
          onChange={handleInputChange}
        />
      </div>
      <div className="input-wrapper">
        <button onClick={(e) => {
              if (!isError) {
                handleAddFoodItem(e);
              }
            }}
            className={isError ? "button-wrapper-error" : "button-wrapper"}>{
              editFoodData ? "Edit Food" : "Add Food"
            }</button>
      </div>
    </div>
  );
}

export default AddFoodItem;
