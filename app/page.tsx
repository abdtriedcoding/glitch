import { auth } from "@/auth";
import { SignIn, SignOut } from "@/components/login-logout";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex flex-col space-y-5">
      {session?.user ? (
        <>
          <p>Hey {session.user.name}</p>
          <SignOut />
        </>
      ) : (
        <SignIn />
      )}
    </main>
  );
}
