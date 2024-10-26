"use client"
import AddFoodItem from '@/app/_components/AddFoodItem'
import React from 'react'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import RestrauntHeader from '@/app/_components/restraunt_header'
import RestrauntFooter from '@/app/_components/RestrauntFooter'
import "../../restraunt/style.css";



function AddFood() {
    const router = useRouter()
    const searchParams = useSearchParams();
    const [editData, setEditData] = useState(null)

    useEffect(() => {
        // here we are checking from local storage weather restrant data exists or not
        // if not then we will redirect to login page. else we will get the data and set it to local state so as to use it in our component.
        const data = JSON.parse(localStorage.getItem("restraunt"));
        if (!data) {
          router.push("/restraunt");
        }

        if(JSON.parse(decodeURIComponent(searchParams.get('data')))){
            setEditData(JSON.parse(decodeURIComponent(searchParams.get('data'))))
        }
      }, []);
    
    const handleRoute = (route) => {
        router.push(`${route}`)
    }
    console.log('data from state ----> ', editData)
  return (
    <div>
        <RestrauntHeader/>
        <button onClick={() => handleRoute('/restraunt/addFood')}>Add food item</button>
        <button onClick={() => handleRoute('/restraunt/dashboard')}>Dashboard</button>
        <AddFoodItem editFoodData={editData}/>
        <RestrauntFooter/>
    </div>
  )
}

export default AddFood