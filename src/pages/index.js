
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {

  const { data: session } = useSession()

  if (!session) {
    return (

      <div className='flex justify-center items-center bg-blue-600 text-black h-screen w-screen'>
        <div className="flex justify-center items-center flex-col outline-cyan-200 outline-dotted p-4 gap-4">
          <span>Ecommerce Website </span>
          <button onClick={() => signIn("google")} className="bg-white p-2 rounded-lg">Login with Google</button>
        </div>

      </div>
    )
  }

  return (
    <div className='flex justify-center items-center bg-blue-600 text-black h-screen w-screen'>
      <div>Signed in as {session.user.email} {JSON.stringify(session)} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    </div>
  )

}
