import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  console.log('inside middleware function', 'token-->', token, 'url--->', url)

  if (!token) {
    url.pathname = "/restraunt";
    return NextResponse.redirect(url);
  }

  try {
    const {payload} = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET) );
    console.log('inside middleware , user----->', payload)
    const { role } = payload;

    console.log("inside middleware file----");

    if (url.pathname.startsWith("/admin") && role !== "admin") {
      console.log("url consists admin but role is not admin");
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }
    if (url.pathname.startsWith("/owner") && role !== "owner") {
      console.log("url consists owner but role is not owner");
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  } catch(error) {
    console.log('inside middleware there is some error', error.message)
    url.pathname = "/restraunt";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/admin/:path*", "/owner/:path*"],
};
