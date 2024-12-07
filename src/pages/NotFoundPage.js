import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div>
            <h1>Not Found 404</h1>
            <Link to="/">Go to Home Page</Link>
        </div>
    );
}