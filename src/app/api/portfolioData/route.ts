import dbConnect, { collectionNameOpj } from "@/app/lib/dbConnect";
import { NextResponse } from "next/server"

// GET data form db
export const GET = async () => {
    try{
        const portfolioCollection = await dbConnect(collectionNameOpj.portfolioData)
        const data = await portfolioCollection.find({}).toArray();
        return NextResponse.json(data, {status: 200})
    }
    catch(error){
        console.error('faild get data from database', error)
        return NextResponse.json({error: 'faild to get'}, {status: 500})
    }
}

// POST 'upload' data on db
export const POST = async (req: Request) => {
try{
    const body = await req.json(); 
    const portfolioCollection = dbConnect(collectionNameOpj.portfolioData)
    const result = await portfolioCollection.insertOne(body);
    return NextResponse.json(result);
}
catch(error){
console.error('faild to post', error)
return NextResponse.json({error: 'faild to post'}, {status: 500})
}
}