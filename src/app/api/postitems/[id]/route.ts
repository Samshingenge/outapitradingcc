// import dbConnect from "../../../../../config/db";
// import PostItem from "../../../../../models/PostItem";

// dbConnect()

// export async function GET(_request: Request,{params}: {params: {id: string}}){
//     try{
//         const postItem = await PostItem.findById(params.id).select('-__v');
//         return Response.json(postItem);
//     }catch(error){
//         return new Response(JSON.stringify({message: 'SERVER ERROR'}),
//         {status: 500,}
//     )
//     }
// }


// export async function PUT(request: Request ,{ params }: { params: { id: string } }) {
//     const updatedItem = await request.json();
//     try {
//        const postItem = await PostItem.findByIdAndUpdate(params.id,{ 
//         ...updatedItem,});
//         if(!postItem)
//             return new Response(
//                 JSON.stringify({ message: 'Post not found' }),
//                 { status: 404 }
//             );
//             return new Response(
//                 JSON.stringify(postItem),
//                 { 
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     status: 200 }
//             );
//     } catch (error) {
//         return new Response(
//             JSON.stringify({ 
//                 message: 'Server Error'
//                  }),
//             { 
//                 status: 500,
//             });
//     }
// }

// export async function DELETE(request: Request, { params }: { params: { id: string } }) {
 

//     try {
        
        
//         const postItem = await PostItem.findByIdAndDelete(params.id);

//         if(!postItem)
//             return new Response(
//                 JSON.stringify({ message: 'Post not found' }),
//                 { status: 404 }
//             );
//         return new Response(
//             JSON.stringify(postItem),
//             { 
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 status: 200, }
//         );  


//     } catch (error) {
//         return new Response(
//             JSON.stringify({ 
//                 message: 'Server Error'
//                  }),
//             { 
//                 status: 500,
//             });
//     }
// }

import { NextRequest } from 'next/server';
import dbConnect from "../../../../../config/db";
import PostItem from "../../../../../models/PostItem";

await dbConnect();

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await Promise.resolve(context.params);
  
  try {
    const postItem = await PostItem.findById(id).select('-__v');
    
    if (!postItem) {
      return Response.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }
    
    return Response.json(postItem);
  } catch (error) {
    return Response.json(
      { message: 'SERVER ERROR' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await Promise.resolve(context.params);
  
  try {
    const updatedItem = await request.json();
    const postItem = await PostItem.findByIdAndUpdate(
      id,
      { ...updatedItem },
      { new: true }
    );

    if (!postItem) {
      return Response.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }

    return Response.json(postItem);
  } catch (error) {
    return Response.json(
      { message: 'Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await Promise.resolve(context.params);
  
  try {
    const postItem = await PostItem.findByIdAndDelete(id);
    
    if (!postItem) {
      return Response.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }

    return Response.json(postItem);
  } catch (error) {
    return Response.json(
      { message: 'Server Error' },
      { status: 500 }
    );
  }
}