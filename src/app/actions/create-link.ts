'use server'

import { Timestamp } from 'firebase-admin/firestore'
import { db } from '../lib/firebase'
import { auth } from '../lib/auth'

export async function createLink(link: string) {
  const session = await auth()

  if (!session?.user) {
    return 401
  }

  try {
    await db.collection('profiles').doc(link).set({
      userId: session.user.id,
      totalVisits: 0,
      createdAt: Timestamp.now().toMillis(),
    })

    return 201
  } catch (error) {
    return 500
  }
}
