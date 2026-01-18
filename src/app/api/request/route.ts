// PUT /api/request/route.ts

// import { NextResponse } from "next/server"; 
import { ResponseType } from "@/lib/types/apiResponse"; 
import { ServerResponseBuilder } from "@/lib/builders/serverResponseBuilder"; 
import clientPromise from "@/lib/mongodb";
import { RequestStatus } from "@/lib/types/request";
import { PAGINATION_PAGE_SIZE } from "@/lib/constants/config";


export async function PUT(request: Request) { 
  try { 
    const req = await request.json();
    const {requestorName, itemRequested } = req; 
    
    if (!requestorName || requestorName.length < 3 || requestorName.length > 30) {
      return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
    }
    if (!itemRequested || itemRequested.length < 2 || itemRequested.length > 100) {
      return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
    }
    
    const client = await clientPromise; 
    const db = client.db("bog-takehome");
    const collection = db.collection("requests");
    
    const newRequest = {
      requestorName,
      itemRequested,
      createdDate: new Date(), 
      lastEditedDate: new Date(), 
      status: RequestStatus.PENDING, 
    };

    const result = await collection.insertOne(newRequest); 

    return new Response(JSON.stringify({
      id: result.insertedId, 
      ...newRequest
    }), {
      status: 201, 
      headers: { "Content-Type": "application/json"},
    });
    
    
  } catch (e) {
    console.error(e); 
    return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build(); 
  }
  
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1"); 
  
    const client = await clientPromise; 
    const db = client.db("bog-takehome");
    const collection = db.collection("requests"); 
  
    const allRequests = await collection.find({}).sort({ createdDate: -1 }).toArray(); 
    const startindex = (page - 1) * PAGINATION_PAGE_SIZE;
    const paginationRequests = allRequests.slice(startindex, startindex + PAGINATION_PAGE_SIZE); 

    return new Response(JSON.stringify(paginationRequests), {
      status: 200, 
      headers: { "Content-Type": "application/json" }, 
    });

  } catch(e) { 
    console.error(e); 
    return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build(); 
  }

}