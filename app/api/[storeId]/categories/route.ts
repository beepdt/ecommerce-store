import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name Required", { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse("Billboard Required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID Required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(category);
  } catch (e) {
    console.log("[CATEGORY_POST]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store ID Required", { status: 400 });
    }

    const category = await prismadb.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(category);
  } catch (e) {
    console.log("[CATEGORY_GET]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
