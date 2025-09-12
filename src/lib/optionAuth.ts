import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import bcrypt from "bcryptjs"
import prisma from "./prisma"


// Configuration de NextAuth
// Utilise Prisma pour la gestion des utilisateurs et des sessions
// Ajoute Google comme fournisseur d'authentification
// Ajoute un fournisseur d'authentification par email/mot de passe (custom)

export const optionsAuth: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),

    providers: [
        CredentialsProvider({
            name: "Identifiants",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Mot de passe", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Veuillez remplir tous les champs")
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                })

                if (!user) {
                    throw new Error("Utilisateur introuvable")
                }

                if (!user.verifie) {
                    throw new Error("Veuillez vérifier votre email avant de vous connecter")
                }

                if (!user.superUser) {
                    throw new Error("Vous n'etres pas un administrateur")
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                )

                if (!isPasswordValid) {
                    throw new Error("Mot de passe incorrect")
                }

                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.email,
                    superUser: user.superUser,
                }
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
    },

    callbacks: {
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub

                const userDb = await prisma.user.findUnique({
                    where: { id: Number(token.sub) },
                })
                if (userDb) {
                    session.user.superUser = userDb.superUser
                }
            }
            return session
        },
    },
}