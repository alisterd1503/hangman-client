import { SetStateAction, useState } from "react";
import { checkLogin } from "../../api/checkLogin";
import { play } from "../sounds/generalSFX";
import error from '../../sounds/error.mp3'
import { LoginModel } from "../../models/LoginModel";
import { AuthForm } from "./AuthForm";

type LoginProps = {
    navigateToHome: () => void
}

export function LoginPage({navigateToHome}: LoginProps) {

    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event: { target: { value: SetStateAction<string> } }) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: { target: { value: SetStateAction<string> } }) => {
        setPassword(event.target.value);
    };

    const validateLogin = async () => {
        const body: LoginModel = {
            username: username,
            password: password
        }
        const result = await checkLogin(body);
        if (result.success) {
            setMessage('');
            setUsername('');
            setPassword('');
            navigateToHome();
        } else {
            play(error);
            if (result.message) setMessage(result.message)
        }
    };

    return (
        <AuthForm 
            handlePasswordChange={handlePasswordChange}
            handleUsernameChange={handleUsernameChange}
            autherisation={validateLogin}
            message={message}
            title="Login"
            username={username}
            password={password}
            toggleVisibilty={true}
        ></AuthForm>
    )
}