import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { getCurrentUser } from "@/lib/jwt";

// Schema for validation
const corporateServiceSchema = z.object({
  icon: z.string().min(1, "Icon is required"),
  category: z.string().min(1, "Category is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  features: z.array(z.string()),
  serviceLink: z.string().optional().nullable(),
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getCurrentUser();

    // Check if user is authenticated and is admin
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const corporateService = await prisma.corporateService.findUnique({
      where: { id },
    });

    if (!corporateService) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(corporateService);
  } catch (error) {
    console.error("Error fetching corporate service:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getCurrentUser();

    // Check if user is authenticated and is admin
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    // Validate request body
    const validatedData = corporateServiceSchema.parse(body);

    const existingService = await prisma.corporateService.findUnique({
      where: { id },
    });

    if (!existingService) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const updatedCorporateService = await prisma.corporateService.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(updatedCorporateService);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    console.error("Error updating corporate service:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getCurrentUser();

    // Check if user is authenticated and is admin
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existingService = await prisma.corporateService.findUnique({
      where: { id },
    });

    if (!existingService) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.corporateService.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting corporate service:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
