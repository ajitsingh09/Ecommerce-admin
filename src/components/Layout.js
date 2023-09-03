import Nav from "@/components/Nav";
import { useSession, signIn } from "next-auth/react";

export default function Layout({ children }) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex justify-center items-center bg-blue-600 text-black h-screen w-screen">
        <div className="flex justify-center items-center flex-col outline-cyan-200 outline-dotted p-4 gap-4">
          <span>Ecommerce Website </span>

          <button
            onClick={() => signIn("google")}
            className="bg-white p-2 rounded-lg"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-blue-600 text-black h-screen w-screen">
      <Nav />
      <div className=" bg-white flex-grow m-2 ml-0 rounded-md p-4">
        {children}
      </div>
    </div>
  );
}
