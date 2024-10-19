import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";
import { NextResponse } from "next/server";
import Restraunt from "@/app/lib/restrauntModel";

export async function GET() {
  try {
    console.log("calling get api again");
    await mongoose
      .connect(connectionStr)
      .then(() => console.log("connected to db"))
      .catch((error) => console.log("faild connection", error));
    const data = await Restraunt.find();
    console.log("Data from MongoDB:", data);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}

export async function POST(req, res) {
  try {
    const body = await req.json();
    let result;
    console.log("payload send to post api call", body);
    await mongoose
      .connect(connectionStr)
      .then(() => console.log("connection to db successfull"))
      .catch((error) => console.log(`connection failed with ${error}`));

    if (body.login) {
      result = await Restraunt.findOne({ email: body.email });

      // will check whether user exist or not
      if (!result) {
        return NextResponse.json({
          success: false,
          message: "user does not exists",
        });
      }

      // if user exist then password is correct for that user or not
      if (body.password !== result.password) {
        return NextResponse.json({
          success: false,
          message: "password is incorrect",
        });
      }

      // if everything is correct then we will return sucess true
      return NextResponse.json({
        success: true,
        message: "logged in successfully",
        result,
      });
    } else {
      result = await Restraunt.create({
        email: body.email,
        password: body.password,
        restrauntName: body.restrauntName,
        address: body.address,
        city: body.city,
        contact: body.contact,
      });
      console.log(" data to be saved in db", result);
      return NextResponse.json({ result, success: true });
    }
  } catch (error) {
    console.error("Error post api call", error);
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
