// by naming folder like this [abc] we can dynamically pass the parmas to our api end point
// which can ultimatley used within get api method

import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";
import { NextResponse } from "next/server";
import Food from "@/app/lib/foodItemModel";

export async function GET(request, content) {
  // here we will get the dynamically passed  id with the help of content
  const id = content.params.restraunt_id;
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
        message: error.message
    })
  }
}
