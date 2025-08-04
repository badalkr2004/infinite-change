import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/jwt";
import { z } from "zod";

// Schema for validation
const mindfulnessServiceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  duration: z.string().min(1, "Duration is required"),
  level: z.string().min(1, "Level is required"),
  features: z.array(z.string()),
  serviceLink: z.string().optional().nullable(),
});

export async function GET() {
  try {
    const session = await getCurrentUser();

    // Check if user is authenticated and is admin
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const mindfulnessServices = await prisma.mindfulnessService.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(mindfulnessServices);
  } catch (error) {
    console.error("Error fetching mindfulness services:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getCurrentUser();

    // Check if user is authenticated and is admin
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Validate request body
    const validatedData = mindfulnessServiceSchema.parse(body);

    const mindfulnessService = await prisma.mindfulnessService.create({
      data: validatedData,
    });

    return NextResponse.json(mindfulnessService, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    console.error("Error creating mindfulness service:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
