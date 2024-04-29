import Link from "next/link";

export default function SignUpPage() {
    return (
        <div>
            Sign Up page
            <Link href={"/auth/login"}>Login</Link>
        </div>
    )
}