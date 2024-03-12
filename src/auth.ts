import NextAuth, { DefaultSession } from "next-auth";
import { DefaultJWT, JWT } from "@auth/core/jwt";
import Keycloak from "@auth/core/providers/keycloak";

declare module "next-auth" {
  interface Session extends DefaultSession {
    error: unknown;
    user: {
      access_token: string;
      roles: string;
      email: string;
      name: string;
      picture: string;
      refresh_token: string;
    };
  }

  interface JWT extends DefaultJWT {
    id: string;
    roles: string;
    name: string;
    email: string;
    picture: string;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/signin",
  },
  debug: true,

  jwt: {
    maxAge: 8 * 60, //
  },

  secret: process.env.AUTH_SECRET,

  providers: [
    Keycloak({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: `${process.env.KEYCLOAK_URL}/realms/jidayyy`,
      userinfo: `${process.env.KEYCLOAK_URL}/realms/jidayyy/protocol/openid-connect/userinfo`,
      token: `${process.env.KEYCLOAK_URL}/realms/jidayyy/protocol/openid-connect/token`,
      authorization: {
        url: `${process.env.KEYCLOAK_URL}/realms/jidayyy/protocol/openid-connect/auth`,

        params: {
          scope: "openid email profile",
        },
      },

      wellKnown: `${process.env.KEYCLOAK_URL}/realms/jidayyy/.well-known/openid-configuration`,
    }),
  ],

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log("AUTH", auth);
      const isLoggedIn = auth?.user;

      if (nextUrl.pathname.startsWith("/auth") && isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },

    session: async ({ session, token }) => {
      console.log("SESSION", session, token);
      session.error = token?.error;
      return {
        ...session,
        user: {
          ...token,
        },
      };
    },

    jwt: async ({ token, user, account }) => {
      return {
        ...token,
        ...user,
        access_token: token?.access_token || account?.access_token,
        refresh_token: token?.refresh_token || account?.refresh_token,
      };
    },
  },
});
