import { redirect } from "next/navigation";

const CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID;
const KEYCLOAK_URL = process.env.KEYCLOAK_URL;
const REDIRECT_URL = process.env.NEXTAUTH_URL;
const LOCALE = "fr";

export default async function SignIn() {
  return redirect(
    `${KEYCLOAK_URL}/realms/jidayyy/protocol/openid-connect/registrations?client_id=${CLIENT_ID}&response_type=code&scope=openid email&redirect_uri=${REDIRECT_URL}&kc_locale=${LOCALE}`
  );
}
