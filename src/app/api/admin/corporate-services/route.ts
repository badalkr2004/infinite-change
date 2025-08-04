import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/jwt";
import { z } from "zod";

// Schema for validation
const corporateServiceSchema = z.object({
  icon: z.string().min(1, "Icon is required"),
  category: z.string().min(1, "Category is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
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

    const corporateServices = await prisma.corporateService.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(corporateServices);
  } catch (error) {
    console.error("Error fetching corporate services:", error);
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
    const validatedData = corporateServiceSchema.parse(body);

    const corporateService = await prisma.corporateService.create({
      data: validatedData,
    });

    return NextResponse.json(corporateService, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    console.error("Error creating corporate service:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
