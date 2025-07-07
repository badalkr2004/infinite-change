import { NextRequest, NextResponse } from "next/server";
import {
  addToNewsletterSheet,
  checkEmailExists,
  getAllSubscriptions,
} from "@/lib/google-sheets";
import { z } from "zod";

const newsletterSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = newsletterSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid input",
          details: validation.error.errors,
        },
        { status: 400 }
      );
    }

    const { name, email } = validation.data;

    // Check if email already exists
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      return NextResponse.json(
        {
          success: false,
          error: "This email is already subscribed to our newsletter",
        },
        { status: 409 }
      );
    }

    // Add to Google Sheets
    const result = await addToNewsletterSheet({ name, email });

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          message: "Successfully subscribed to newsletter!",
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to subscribe. Please try again.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const result = await getAllSubscriptions();

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          data: result.data,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to get subscriptions",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Newsletter GET API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
