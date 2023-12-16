"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

const Member = () => {
    const {data: session } = useSession({
        required: true,
        onUnauthenticated(){
            redirect("/api/auth/signin?callbackUrl=/ClientMamber")
        }
    })

    return (
        <div>
            <h1>Member server session</h1>
        </div>
    );
}

export default Member;
