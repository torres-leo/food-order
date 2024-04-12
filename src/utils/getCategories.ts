'use server';
import { prisma } from '@/src/lib/prisma';
import { Category } from '@prisma/client';

export async function getCategories(): Promise<Category[]> {
	return await prisma.category.findMany();
}
