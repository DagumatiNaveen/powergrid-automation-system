import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (event) => {

        event.preventDefault();

        try {

            const response = await api.post("/auth/login", {
                email: email,
                password: password
            });

            const token = response.data;

            localStorage.setItem("token", token);

            setError("");

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            setError("Invalid email or password");
        }
    };

    return (
        <div className="login-container">

            <div className="login-card">

                <h1>PowerGrid</h1>

                <h2>Login</h2>

                <form onSubmit={handleLogin}>

                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            placeholder="Enter your email"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="Enter your password"
                            required
                        />

                    </div>

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}

                    <button type="submit">
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;