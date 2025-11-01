import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
import crypto from 'crypto'
import { sendVerificationEmail } from "@/app/_utils/nodemailer-helper"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    const hashed = await bcrypt.hash(password, 10)
    const verificationToken = crypto.randomBytes(32).toString('hex')

    const user = await prisma.user.create({
      data: { 
        name, 
        email, 
        password: hashed, 
        verified: false,
        verificationToken
      }
    })

    await sendVerificationEmail(email, verificationToken)

    return NextResponse.json({ user })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}