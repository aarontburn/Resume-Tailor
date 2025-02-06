import Link from "next/link"
import "./Header.css"

const Space = ({ space = "auto" }: { space?: string | number }) =>
    <div style={{ marginRight: `${space}` }}></div>

export default function Header() {
    return <div className="header">
        <Link href="/"><h1>Resume Tailor</h1></Link>

        <Space space={"2em"} />

        <Link href="/documents"><p>Documents</p></Link>

        <Space />

        <Link href="/auth"><p>Login/Register</p></Link>


    </div>
}