import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { signOut } from "next-auth/react"
import SignOutButton from "../api/_components/signout"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  return (
  <>
    <div className="p-6">Welcome {session.user?.email} 👋</div>
    <SignOutButton />
  </>);
}
