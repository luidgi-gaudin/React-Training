import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            const from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });
        } catch (error) {
            setError("Failed to log in: " + error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
                <h1>Connexion</h1>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="w-full p-2 border rounded"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="w-full p-2 border rounded"
                />
                <button type="submit" className="w-full p-2 bg-indigo-600 text-white rounded hover:bg-indigo-500">
                    Connexion
                </button>
            </form>
            <div className="mt-4 flex justify-between">
                <Link to="/register" className="text-indigo-600 hover:underline">
                    Vous n'avez pas de compte? Inscrivez-vous
                </Link>
            </div>
        </div>
    );
}

export default Login;