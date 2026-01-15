import { useState } from "react";
import useSignup from "../hooks/useSignup";
import styles from "../pages/css/SignupPage.module.css"

function SignupForm() {    
    const {
        firstName, setFirstName, lastName, setLastName,
        username, setUsername, email, setEmail, password, setPassword,
        confirmPassword, setConfirmPassword, terms, setTerms,
        success, error, loading, handleSubmit
        
     } = useSignup();
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

     const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

    return (
        <form onSubmit={handleSubmit} className={styles.signupForm}>
                {/* Success Message */}
                {success && (
                <div className={`${styles.alert} ${styles.success}`} role="alert">
                    {success}
                </div>
                )}
                
                {/* Error Message */}
                {error && (
                    <div className={`${styles.alert} ${styles.error}`} role="alert">
                        {error}
                    </div>
                )}

                {/* Name Fields - Side by side on desktop */}
                <div className={styles.nameFields}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>First Name</label>
                    <input 
                        type="text" 
                        className={styles.formInput}
                        placeholder="Elyas"
                        value={firstName}
                        onChange={(e) => {setFirstName(e.target.value)}}
                        required
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Last Name</label>
                    <input 
                        type="text" 
                        className={styles.formInput}
                        placeholder="Tadesse"
                        value={lastName}
                        onChange={(e) => { setLastName(e.target.value) }}
                    />
                  </div>
                </div>
                
                {/* Username Field with @ prefix */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Username</label>
                  <div className={styles.usernameWrapper}>
                    <span className={styles.usernamePrefix}>@</span>
                    <input 
                        type="text" 
                        className={styles.formInputWithPrefix}
                        placeholder="ela"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value)} }
                        required
                    />
                  </div>
                </div>
                
                {/* Email Field */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email</label>
                  <input 
                    type="email" 
                    className={styles.formInput}
                    placeholder="elyas@example.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                  />
                </div>
                
                {/* Password Fields */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Password</label>
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
                
                {/* Confirm Password Field */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Confirm Password</label>
                  <div className={styles.passwordWrapper}>
                    <input 
                      type={showConfirmPassword ? "text" : "password"}
                      className={styles.formInput}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value) }}
                      required
                    />
                    <button 
                      type="button"
                      className={styles.passwordToggle}
                      onClick={toggleConfirmPasswordVisibility}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? (
                        <span className="material-symbols-outlined">visibility_off</span>
                      ) : (
                        <span className="material-symbols-outlined">visibility</span>
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Terms Checkbox */}
                <div className={styles.termsContainer}>
                  <input 
                    type="checkbox" 
                    id="terms" 
                    className={styles.termsCheckbox}
                    checked={terms}
                    onChange={(e) => { setTerms(e.target.checked) }}
                  />
                  <label htmlFor="terms" className={styles.termsLabel}>
                    I agree to the <a href="#" className={styles.termsLink}>Terms of Service</a> and <a href="#" className={styles.termsLink}>Privacy Policy</a>.
                  </label>
                </div>
                
                {/* Submit Button */}
                <button type="submit" className={`${styles.signupButton} ${loading ? styles.loading : ''}`}>
                  {loading ? (
                        <>
                        <span className={styles.spinner}></span>
                        Signing In...
                        </>
                    ) : (
                        'Sign Up'
                        )}
                </button>
              </form>
    )
}

export default SignupForm;