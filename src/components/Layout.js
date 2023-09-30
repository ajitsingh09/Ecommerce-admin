import Nav from "@/components/Nav";
import { useSession, signIn } from "next-auth/react";
import Logo from "./parts/nav/Logo";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const { data: session } = useSession();
  const [showNav, setShowNav] = useState(false);

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
    <div className=" bg-blue-600 text-black h-screen w-screen min-h-screen flex flex-col">
      <div className="md:hidden flex items-center  text-white p-4">
        <button onClick={() => setShowNav(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="flex grow justify-center mr-6 relative">
          <Logo
            show={showNav}
            handleClick={() => {
              console.log("btn clicked");
              setShowNav(false);
            }}
          />
        </div>
      </div>
      <div className="flex w-full h-[calc(100%-60px)] md:h-full p-1">
        <Nav show={showNav} />
        <div className=" bg-white flex-grow md:m-2 md:ml-0  rounded-md p-4 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
