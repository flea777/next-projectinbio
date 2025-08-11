import { FirestoreAdapter } from '@auth/firebase-adapter'
import NextAuth from 'next-auth'
import { firebaseCert } from './firebase'
import GitHub from 'next-auth/providers/github'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: FirestoreAdapter({
    credential: firebaseCert,
  }),
  providers: [GitHub],
  events: {},
  callbacks: {},
})
