import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../firebase/firebase";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            handleLogin(e);
        } catch (error) {
            setError("Failed to register: " + error.message);
        }
    };

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
            {error && <p style={{color: "red"}}>{error}</p>}
            <form onSubmit={handleRegister} className="space-y-4">
                <h1>Inscription</h1>
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
                    S'inscrire
                </button>
            </form>
            <div className="mt-4 flex justify-between">
                <Link to="/login" className="text-indigo-600 hover:underline">
                    Vous avez deja un compte? Connectez-vous
                </Link>
            </div>
        </div>
    );
}

export default Register;