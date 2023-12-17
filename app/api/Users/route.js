import User from "@/app/[models]/Users";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function POST(req){
    try {
        const body = await req.json()
        const userData = body.formData

        // Confirm data exist
        if(!userData?.email || !userData.password){
            return NextResponse.json({message:"All fields are require"},{status:400})
        }

        // Check for duplicated email
        const duplicated = await User.findOne({email:userData.email}).learn().exec()

        if(duplicated){
            return NextResponse.json({message: "Duplicated email !"},{status:409})
        }

        const hashPassword = await bcrypt.hash(userData.password,10)
        userData.password = hashPassword

        await User.create(userData)
        return NextResponse.json({message:"User created ."},{status:201})

    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Error", error},{status:500})
    }
}