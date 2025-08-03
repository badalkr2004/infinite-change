import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/jwt";

export async function GET() {
  try {
    const session = await getCurrentUser();

    // Check if user is authenticated and is admin
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get counts for all service types
    const [
      mindfulnessServicesCount,
      counsellingServicesCount,
      beyondWordsServicesCount,
      corporateServicesCount,
    ] = await Promise.all([
      prisma.mindfulnessService.count(),
      prisma.counsellingService.count(),
      prisma.beyondWordsService.count(),
      prisma.corporateService.count(),
    ]);

    return NextResponse.json({
      mindfulnessServices: mindfulnessServicesCount,
      counsellingServices: counsellingServicesCount,
      beyondWordsServices: beyondWordsServicesCount,
      corporateServices: corporateServicesCount,
    });
  } catch (error) {
    console.error("Error fetching service counts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
