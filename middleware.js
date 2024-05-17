import { NextResponse, NextRequest } from "next/server";

export function middleware(NextRequest) {

  console.log("middleware is working fine...");
  // return NextResponse.json({ success: "successfully ran" });
}

export const config = {
  matcher: ["/"],
};
