'use server'

import { Timestamp } from 'firebase-admin/firestore'
import { db } from '../lib/firebase'
import { auth } from '../lib/auth'

export interface addSocialLinksParams {
  profileId: string
  github: string
  instagram: string
  linkedin: string
  twitter: string
}

export async function addSocialLinks(params: addSocialLinksParams) {
  const session = await auth()

  if (!session) return

  const { profileId, github, instagram, linkedin, twitter } = params

  try {
    await db.collection('profiles').doc(profileId).update({
      socialMedias: {
        github,
        instagram,
        linkedin,
        twitter,
      },
      updatedAt: Timestamp.now().toMillis(),
    })

    return true
  } catch (err) {
    console.error(err)
    return false
  }
}
