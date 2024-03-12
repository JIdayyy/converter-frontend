"use server";

import { auth, signOut } from "@/auth";

export const handleSignOut = async () => {
  const session = await auth();

  await fetch(
    `${process.env.KEYCLOAK_URL}/realms/jidayyy/protocol/openid-connect/logout?redirect_uri=${process.env.NEXTAUTH_URL}`,
    {
      headers: {
        Content_Type: "application/x-www-form-urlencoded",
        Authorization: `Bearer ${session?.user.access_token}`,
      },
      body: new URLSearchParams({
        client_id: process.env.KEYCLOAK_CLIENT_ID as string,
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET as string,
        refresh_token: session?.user.refresh_token as string,
      }),
      method: "POST",
    }
  )
    .then(() => console.log("LOGOUT REQ"))
    .catch((err) => console.log("LOGOUT ERR", err));

  await signOut();
};
