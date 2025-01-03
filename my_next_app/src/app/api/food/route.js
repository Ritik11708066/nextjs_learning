import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";
import { NextResponse } from "next/server";
import Food from "@/app/lib/foodItemModel";

export async function POST(request) {
  try {
    const payload = await request.json();
    console.log('payload', payload);
    let result;
    let success = false
    let message = 'failed'
    await mongoose
      .connect(connectionStr)
      .then(() => console.log("connection to db successfull"))
      .catch((error) => console.log(`connection failed with ${error}`));

    result = await Food.create({
        name: payload.foodName,
        price: payload.foodPrice,
        path: payload.foodImgPath,
        description: payload.foodDescription,
        restro_id: payload.restro_id
    })
    console.log(" data to be saved in db", result);
    // if everything works fine we get the proper result then we will set success as true
    if(result){
        success = true
        message = "food added successfully"
    }
    return NextResponse.json({
        success,
        result,
        message
    })
    
  } catch (error) {
    return NextResponse.json({
        success: false,
        message: error.message
    })
  }
}
