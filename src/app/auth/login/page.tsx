import Link from "next/link";

export default function LoginPage () {
    return (
        <div>
            Login page
            <Link href={"/auth/signup"}>Signup</Link>
        </div>
    )
}