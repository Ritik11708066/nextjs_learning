'use client'
import RestrauntFooter from '@/app/_components/RestrauntFooter'
import RestrauntHeader from '@/app/_components/restraunt_header'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import '../../restraunt/style.css'


function Dashboard() {
    const router = useRouter()
    const [restroDetails, setRestroDetails] = useState(null)

    useEffect(() => {
        // here we are checking from local storage weather restrant data exists or not 
        // if not then we will redirect to login page. else we will get the data and set it to local state so as to use it in our component.
        const data = JSON.parse(localStorage.getItem('restraunt'))
        if(!data){
            router.push('/restraunt')
        } else {
            setRestroDetails(data)
        }
    }, [])
  return (
    <div>
        <RestrauntHeader/>
        welcome {restroDetails?.email}
        <RestrauntFooter/>
    </div>
  )
}

export default Dashboard