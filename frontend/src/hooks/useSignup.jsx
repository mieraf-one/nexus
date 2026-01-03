import { useState } from "react";
import { AuthPost } from "../utils/utils";
import path from "../utils/apiEndPoints";

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

            console.log(password, confirmPassword)
            const res = await AuthPost(
                path.signup,
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
            clearForm();
            setSuccess("You are successfully registered.")
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