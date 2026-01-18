// PUT /api/request/route.ts

import { ResponseType } from "@/lib/types/apiResponse"; 
import { ServerResponseBuilder } from "@/lib/builders/serverResponseBuilder"; 
import { RequestStatus } from "@/lib/types/request";
import { PAGINATION_PAGE_SIZE } from "@/lib/constants/config";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongodb";

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
    
    const collection = await getCollection(); 
    
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
    const status = url.searchParams.get("status"); 
  
  
    const collection = await getCollection(); 

    const queryFilter: { status?: string } = {}; 
    if (status) {
      queryFilter.status = status; 
    }
  
    const allRequests = await collection.find(queryFilter).sort({ createdDate: -1 }).toArray(); 
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

export async function PATCH(request: Request) {
  try {
    const req = await request.json(); 
    const { id, status } = req; 

    if (!id) {
      return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build(); 
    }

    const existingStatus = ["approved", "completed", "rejected", "pending"]; 
    if (!status || !existingStatus.includes(status)) { 
      return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build(); 
    }

    const collection = await getCollection(); 

    const res = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          status : status, 
          lastEditedDate: new Date()
        }
      }, 
      { returnDocument: "after" }
    );

    if (!res) {
      return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
    }

    return new Response(JSON.stringify({
      id: res._id,
      requestorName: res.requestorName, 
      itemRequested: res.itemRequested, 
      createdDate: res.createdDate, 
      lastEditedDate: res.lastEditedDate, 
      status: res.status, 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }, 
    });
  } catch (e) {
    console.error(e);
    return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build(); 
  }
}