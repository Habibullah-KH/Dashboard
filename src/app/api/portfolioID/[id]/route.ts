import dbConnect, { collectionNameOpj } from "@/app/lib/dbConnect";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

interface Params{
params: {id: string}
}

export const GET = async (req: Request, { params }: Params) => {
try{
    const {id} = await params;
    const collection = dbConnect(collectionNameOpj.portfolioData);
    const data = await collection.findOne({_id: new ObjectId(id)});
    
    return NextResponse.json(data);
}
catch (error) {
        console.error("single get error:", error);
        return NextResponse.json(
            {success: false, message: "Failed to get portfolio"},
            {status: 500}
        );
    }
}

export const DELETE = async (req: Request, { params }: Params) => {
    try{
        const {id} = params;
        const collection = await dbConnect(collectionNameOpj.portfolioData);
        const query = {_id: new ObjectId(id)}
        const deleteResponse = await collection.deleteOne(query);

        if (deleteResponse.deletedCount === 0){
            return NextResponse.json(
                {success: false, message: "Item not found"},
                {status: 404}
            );
        }

        revalidatePath('/my-portfolio');

        return NextResponse.json({
            success: true,
            message: "Portfolio deleted successfully!",
            result: deleteResponse,
        });
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json(
            {success: false, message: "Failed to delete portfolio"},
            {status: 500}
        );
    }
}

export const PATCH = async (req: Request, { params }: Params) => {
    try{
        const {id} = params;
        const collection = await dbConnect(collectionNameOpj.portfolioData);
        const query = {_id: new ObjectId(id)}

        const body = await req.json();
        const filter = {
            $set: {...body}
        }
        const option = {
            upsert: true
        }
        const updateResponse = collection.updateOne(query, filter, option)

        return NextResponse.json(updateResponse);
    }
    catch(error){
        console.error('Delete error:', error);
        return NextResponse.json(
            {success: false, messaeg: "Failed to delete portfolio"},
            {status: 500}
        );
    }
}