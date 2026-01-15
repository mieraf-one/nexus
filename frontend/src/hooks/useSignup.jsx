import { useState } from "react";
import { signupUser } from "../auth/auth.api";
import { useNavigate } from "react-router-dom";

function useSignup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [terms, setTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();

    const clearForm = () => {
        setFirstName('');
        setLastName('');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setTerms(false);
    }

    const resetMsg = () => {
        setLoading(true);
        setError(null);
        setSuccess(null);
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            resetMsg();

            if (!terms) {
                throw new Error("You must accept Terms of Service.")
            }

            await signupUser(firstName, lastName, username, email, password, confirmPassword);
            setSuccess('You are successfully registered.')
            navigate('/login');
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false);
        }
    }

    return {
        firstName, setFirstName,
        lastName, setLastName,
        username, setUsername,
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        terms, setTerms,
        error, setError,
        success, setSuccess,
        loading, setLoading,
        handleSubmit,
        clearForm
    }
}

export default useSignup;