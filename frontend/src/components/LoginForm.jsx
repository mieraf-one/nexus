import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { AuthPost } from "../utils/utils";
import { AuthContext } from "../context/AuthContext";
import styles from '../pages/css/LoginPage.module.css'
import path from "../utils/apiEndPoints";

function LoginForm() {    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] =  useState(false);
    const [error, setError] = useState(null);
     const [showPassword, setShowPassword] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);

            const tokens = await AuthPost(
                path.login,
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

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
        <form onSubmit={(e) => { handleSubmit(e); }} className={styles.loginForm}>

                {error && (
                    <div className={`${styles.alert} ${styles.error}`} role="alert">
                        {error}
                    </div>
                )}

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Username</label>
                  <input 
                    type="text" 
                    className={styles.formInput}
                    placeholder="ela"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value) }}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <div className={styles.passwordHeader}>
                    <label className={styles.formLabel}>Password</label>
                    <a href="#" className={styles.forgotLink}>Forgot Password?</a>
                  </div>
                  <div className={styles.passwordWrapper}>

                  
                  <input 
                    type={showPassword ? "text" : "password"}
                    className={styles.formInput}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                    required
                  />
                  <button 
                    type="button"
                    className={styles.passwordToggle}
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <span className="material-symbols-outlined">visibility_off</span>
                    ) : (
                      <span className="material-symbols-outlined">visibility</span>
                    )}
                  </button>
                  </div>
                </div>
  
                
                <button type="submit" className={`${styles.loginButton} ${loading ? styles.loading : ''}`}>
                 {loading ? (
                         <>
                         <span className={styles.spinner}></span>
                         Logging In...
                         </>
                     ) : (
                         'Log In'
                        )}
                </button>
                
                <div className={styles.signupPrompt}>
                  <p className={styles.promptText}>
                    Don't have an account?{' '}
                    <Link to={'/signup'} className={styles.signupLink}>Sign Up</Link>
                  </p>
                </div>
              </form>
    )
}

export default LoginForm;