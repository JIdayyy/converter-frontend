import { handleSignOut } from "@/actions/auth";

export default function SignOut() {
  return (
    <form action={handleSignOut}>
      <button
        className={"flex space-x-2 items-center  justify-center"}
        type={"submit"}
      >
        <p>Sign out</p>
      </button>
    </form>
  );
}
