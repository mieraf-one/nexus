import { useState } from "react";
import { SignupPost } from "../utils/utils";

function SignupForm() {    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            setLoading(true);
            setError(null);

            console.log(password, confirmPassword)
            const res = await SignupPost(
                {
                    first_name: firstName,
                    last_name: lastName,
                    username,
                    email,
                    password,
                    confirm_password: confirmPassword
                }
            )
            console.log(res)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={(e) => {handleSubmit(e)}}

            style={{
                display: "flex",
                flexDirection: "column",
                gap: 15
            }}
            >
            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => { setFirstName(e.target.value) }}
            />

            <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => {setLastName(e.target.value)}}
            />

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => {setUsername(e.target.value)}}
                required
            />

            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
            />

            <input
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
                required
            />

            <input
                type="text"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {setConfirmPassword(e.target.value)}}
                required
            />
            
            <span>{loading ? "loading..." : ''}</span>
            <span>{error}</span>
            <button
                type="submit"
            >
                    Sign up
            </button>
        </form>
    )
}

export default SignupForm;