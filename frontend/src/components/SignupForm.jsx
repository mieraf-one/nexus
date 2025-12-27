function SignupForm() {
    return (
        <form
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 15
            }}
            >
            <input
                type="text"
                placeholder="First Name"    
            />
            <input
                type="text"
                placeholder="Last Name"    
            />
            <input
                type="text"
                placeholder="Username"    
            />
            <input
                type="text"
                placeholder="Email"    
            />
            <input
                type="text"
                placeholder="Password"    
            />
            <input
                type="text"
                placeholder="Confirm Password"    
            />
            <button
                type="submit">
                    Sign up
                </button>
        </form>
    )
}

export default SignupForm;