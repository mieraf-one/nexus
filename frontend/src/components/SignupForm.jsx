import useSignup from "../hooks/useSignup";

function SignupForm() {    
    const {
        firstName, setFirstName, lastName, setLastName,
        username, setUsername, email, setEmail, password, setPassword,
        confirmPassword, setConfirmPassword, terms, setTerms,
        success, error, loading, handleSubmit
        
     } = useSignup();

    return (
        <form onSubmit={handleSubmit} className="signup-form">
            {success && (
                <div className="alert alert-success" role="alert">
                    {success}
                </div>
            )}

            {error && (
                <div className="alert alert-error" role="alert">
                    {error}
                </div>
            )}

                <div className="name-row">
                    <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="Elyas"
                        value={firstName}
                        onChange={(e) => {setFirstName(e.target.value)}}
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Tadesse"
                        value={lastName}
                        onChange={(e) => { setLastName(e.target.value) }}
                    />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <div className="input-with-prefix">
                    <span className="input-prefix">@</span>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="ela"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value)} }
                    />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="elyas@example.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value)} }
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value) }}
                    />
                </div>

                <div className="terms-check">
                    <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={terms}
                    onChange={(e) => { setTerms(e.target.checked) }}
                    />
                    <label htmlFor="terms">
                    I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                    </label>
                </div>

                <button
                    type="submit"
                    className={`submit-button ${loading ? 'loading' : ''}`}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                        <span className="spinner"></span>
                        Creating Account...
                        </>
                    ) : (
                        'Create Account'
                    )}
                </button>
                </form>
    )
}

export default SignupForm;