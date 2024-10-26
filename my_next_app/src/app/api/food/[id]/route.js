// by naming folder like this [abc] we can dynamically pass the parmas to our api end point
// which can ultimatley used within get api method

import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";
import { NextResponse } from "next/server";
import Food from "@/app/lib/foodItemModel";

export async function GET(request, content) {
  // here we will get the dynamically passed  id with the help of content
  const id = content.params.id;
  let success = false;

  try {
    // we will establish mongodb connection
    await mongoose
      .connect(connectionStr)
      .then(() => console.log("connection to db successfull"))
      .catch((error) => console.log(`connection failed with ${error}`));

    // now we will find the all the records(added food items) by passing particular restroid in the find method
    const result = await Food.find({ restro_id: id });

    // now we will check whether we got the result or not
    if (result) {
      success = true;
    }
    return NextResponse.json({
      success,
      result,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}

export async function POST(request, content){
  try {
    const id = content.params.id
    const payload = await request.json()
    await mongoose
    .connect(connectionStr)
    .then(() => console.log("connection to db successfull"))
    .catch((error) => console.log(`connection failed with ${error}`));
  
    const result = await Food.findByIdAndUpdate(id, {
      name: payload.foodName,
      price: payload.foodPrice,
      path: payload.foodImgPath,
      description: payload.foodDescription,
      restro_id: payload.restro_id
    }, {
      new: true, // returns the updated document
      runValidators: true  // run the validation check on the data
    })

    if(!result){
      return NextResponse.json({
        success: false,
        message: 'Food not updated'
      })
    }

    return NextResponse.json({
      success: true,
      result,
      message: 'Food updated successfully'
    })

  } catch (error) {
    
  }
}

export async function DELETE(request, content) {
  try {
    const id = content.params.id;
    await mongoose
      .connect(connectionStr)
      .then(() => console.log("connection to db successfull"))
      .catch((error) => console.log(`connection failed with ${error}`));
    
    const deletedItem = await Food.findByIdAndDelete(id)
    if(!deletedItem){
      console.log('item not found')
      return NextResponse.json({
        success: false,
        message: 'item not found'
      })
    }
    return NextResponse.json({
      success: true,
      message: 'item deleted successfully',
      data: deletedItem
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'there is some error !!!'
    })
  }
}
