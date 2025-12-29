import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { AuthPost } from "../utils/utils";
import { AuthContext } from "../context/AuthContext";

function LoginForm() {    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] =  useState(false);
    const [error, setError] = useState(null);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);

            const tokens = await AuthPost(
                'token/',
                {
                    username,
                    password
                }
            )
            login(tokens)
            navigate('/dashboard');
            console.log('success login');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
    <form onSubmit={(e) => { handleSubmit(e); }} className="login-form">
        {error && (
            <div className="alert alert-error" role="alert">
                {error}
            </div>
        )}

        <div className="form-group">
            <label htmlFor="identifier">Username or Email</label>
            <input
            id="identifier"
            name="identifier"
            type="text"
            placeholder="jane@example.com"
            value={username}
            onChange={(e) => { setUsername(e.target.value) }}
            required
            />
        </div>

        <div className="form-group">
            <div className="password-header">
            <label htmlFor="password">Password</label>
            <a href="#" className="forgot-link">Forgot Password?</a>
            </div>
            <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            required
            />
        </div>

        <button type="submit" className={`submit-button ${loading ? 'loading' : ''}`}>
            {loading ? (
                        <>
                        <span className="spinner"></span>
                        Logging In...
                        </>
                    ) : (
                        'Log In'
                    )}
        </button>

        <div className="signup-prompt">
            <p>
            Don't have an account?{' '}
            <Link to={'/signup'} className="signup-link">Sign Up</Link>
            </p>
        </div>
        </form>
    )
}

export default LoginForm;