import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import SignOutButton from "../api/_components/signout"
import GeminiForm from "../api/_components/geminiform"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  return (
  <div className="min-h-screen flex flex-col items-center justify-center">
    <div className="p-6">Welcome {session.user?.email} 👋</div>
    <GeminiForm/>
    <p className="pt-5">Or</p>
    <SignOutButton />
  </div>);
}
