import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  console.log(session, "usedetails");

  return (
    <Layout>
      <div className="flex justify-between text-blue-900">
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>

        <Image
          src={session?.user?.image}
          alt={session?.user?.name}
          width={40}
          height={40}
        />
      </div>
    </Layout>
  );
}
