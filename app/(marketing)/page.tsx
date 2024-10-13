import { auth } from "@/auth";
import { ThemeToggle } from "@/components/theme-toggle";
import { SignIn, SignOut } from "@/components/login-logout";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <h1 className="text-3xl text-center bg-red-500">Marketing Page</h1>
      <main className="flex flex-col space-y-5">
        {session?.user ? (
          <>
            <p>Hey {session.user.name}</p>
            <SignOut />
          </>
        ) : (
          <SignIn />
        )}
        <ThemeToggle />
      </main>
    </>
  );
}
