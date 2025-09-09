'use server';

import { revalidatePath } from 'next/cache';

export async function createBoard(formData: FormData): Promise<void> {
  const name = String(formData.get('name') || '').trim();

  if (!name) {
    return;
  }

  // TODO: Save into db
  // await db.insert({ title: name });

  revalidatePath('/'); // o la ruta donde listás boards
}
