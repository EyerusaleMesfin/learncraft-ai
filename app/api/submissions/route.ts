import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // Backend placeholder: persist submissions in your database and attach the real user id here.
  return NextResponse.json({
    success: true,
    message: "Submission received successfully.",
    submission: {
      id: "sub_" + Date.now(),
      submittedAt: new Date().toISOString(),
      ...body
    }
  });
}
