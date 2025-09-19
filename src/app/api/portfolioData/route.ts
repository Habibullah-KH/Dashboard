import dbConnect, { collectionNameOpj } from "@/app/lib/dbConnect";
import { NextResponse } from "next/server"

export const POST = async (req) => {

    const body = await req.json(); 
    const portfolioCollection = dbConnect(collectionNameOpj.portfolioData)
    const result = await portfolioCollection.insertOne(body);
    return NextResponse.json(result);
}