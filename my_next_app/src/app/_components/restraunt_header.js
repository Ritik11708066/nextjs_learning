"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

function RestrauntHeader() {
  const router = useRouter();
  const [restroDetails, setRestroDetails] = useState(null);
  const pathName = usePathname()

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("restraunt"));
    if (!data) {
      router.push("/restraunt");
    } 
    else if (data && pathName === '/restraunt'){
        router.push("/restraunt/dashboard")
    }
    else {
      setRestroDetails(data);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('restraunt')
    router.push('/restraunt')
  }
  return (
    <div className="header-wrapper">
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        Logo
      </div>
      <div>
        <ul>
          <li>
            <Link href="/home">Home</Link>
          </li>
          <li>
            {restroDetails && restroDetails?.email ? (
              <Link href="/profile">Profile</Link>
            ) : (
              <Link href="/login">Login/Signup</Link>
            )}
          </li>
          {restroDetails && restroDetails.email ? (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}

export default RestrauntHeader;
