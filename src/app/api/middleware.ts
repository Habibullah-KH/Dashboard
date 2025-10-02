import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const allowOrigen = [
process.env.NEXT_PUBLIC_SERVER_URL,
process.env.NEXT_PUBLIC_Frontend_URL,
]

export function middleWare (req: NextRequest){
    const origin = req.headers.get("origin");

    if (req.method === "OPTIONS"){
        return new Response (null, {
            status: 204,
            headers: {
                "Access-Control-Allow-Origin": allowOrigen.includes(origin || "")
                ?
                   "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
            }
        })
    }

    const response = NextResponse.next();
    if(allowOrigen.includes(origin || "")) {
        response.headers.set(
            "Access-Control-Allow-Origin", origin!);
    }
     response.headers.set(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
return response;
}

export const config = {
    matcher: ["/api/:path"]
}