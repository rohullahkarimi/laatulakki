import React, { useEffect, useState } from "react";

function MyComponent() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch("/api/my-endpoint");
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return <div>{message}</div>;
}

export default MyComponent;

/* OLD 
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const json = {
    message: "Hello World"
  };

  return NextResponse.json(json);
}
*/
