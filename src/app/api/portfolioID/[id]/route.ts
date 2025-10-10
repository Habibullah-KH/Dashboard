import dbConnect, { collectionNameOpj } from "@/app/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
const p = await params;
const collection = dbConnect(collectionNameOpj.portfolioData);
const data = await collection.findOne({_id: new ObjectId(p.id)});

return NextResponse.json(data);
}

export const DELETE = async (req, {params}) => {
    const p = await params;
    const collection = dbConnect(collectionNameOpj.portfolioData);
    const query = {_id: new ObjectId(p.id)}
    const deleteResponse = await collection.deleteOne(query)

    return NextResponse(deleteResponse)
}