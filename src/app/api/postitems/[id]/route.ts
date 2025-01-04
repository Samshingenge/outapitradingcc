import { NextRequest } from 'next/server';
import dbConnect from "../../../../../config/db";
import PostItem from "../../../../../models/PostItem";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const postItem = await PostItem.findById(params.id).select('-__v');
        if (!postItem) {
            return new Response(
                JSON.stringify({ message: 'No Item Found for this ID' }),
                { status: 404 }
            );
        }
        return new Response(JSON.stringify(postItem), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ message: 'Server Error', error: error.message }),
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const postItem = await request.json();
        const updatedPostItem = await PostItem.findByIdAndUpdate(
            params.id,
            postItem,
            { new: true }
        );
        if (!updatedPostItem) {
            return new Response(
                JSON.stringify({ message: 'No Item Found for this ID' }),
                { status: 404 }
            );
        }
        return new Response(JSON.stringify(updatedPostItem), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ message: 'Server Error', error: error.message }),
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    if (!params.id) {
        return new Response(
            JSON.stringify({ message: 'ID is required' }),
            { status: 400 }
        );
    }

    try {
        await dbConnect();
        
        const postItem = await PostItem.findById(params.id);
        if (!postItem) {
            return new Response(
                JSON.stringify({ message: 'Post not found' }),
                { status: 404 }
            );
        }

        await PostItem.findByIdAndDelete(params.id);
        
        return new Response(
            JSON.stringify({ message: 'Post deleted successfully' }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Delete error:', error);
        return new Response(
            JSON.stringify({ 
                message: 'Server Error', 
                error: error.message 
            }),
            { 
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}