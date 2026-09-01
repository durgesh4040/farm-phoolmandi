import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real application, you would save this to a database
    console.log("Received inquiry:", body);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(
      { success: true, message: "Inquiry received successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to process inquiry." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: true, data: [] },
    { status: 200 }
  );
}
