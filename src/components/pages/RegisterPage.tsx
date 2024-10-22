import { SetStateAction, useEffect, useState } from "react";

import { getUsernames } from '../../api/getUsernames';
import { addUser } from '../../api/registerUser'

import { RegisterModel } from "../../models/RegisterModel";

import { getCountryByTimeZone } from '../../utils/getLocation';
import { validatePassword } from "../../utils/validatePassword";
import { validateUsername } from "../../utils/validateUsername";

import { play } from "../sounds/generalSFX";
import error from '../../sounds/error.mp3'

import { AuthForm } from "./AuthForm";

const location: string = getCountryByTimeZone();

type RegisterPageProps = {
    navigateToLogin: () => void
}

export function RegisterPage({navigateToLogin}:RegisterPageProps) {

    const [usedNames, setUsedNames] = useState<string[]>([]);
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchScores = async () => {
            const data = await getUsernames();
            setUsedNames(data);
        };
    
        fetchScores();
    }, [])

    const validateRegisteration = () => {
        const passwordCheck = validatePassword(password)
        const usernameCheck = validateUsername(username, usedNames)
        if (passwordCheck.valid && usernameCheck.valid) {
            valideRegisteration()
        } else {
            play(error)
            if (usernameCheck.valid == false) {
                setMessage(usernameCheck.message)
            } else if (passwordCheck.valid == false) {
                setMessage(passwordCheck.message)
            }
        }
    }

    const valideRegisteration = async () => {
        setMessage('')
        const body: RegisterModel = {
            username: username,
            password: password,
            location: location
        }
        await addUser(body)
        setUsername('');
        setPassword('');
        navigateToLogin()
    };

    const handleUsernameChange = (event: { target: { value: SetStateAction<string> } }) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: { target: { value: SetStateAction<string> } }) => {
        setPassword(event.target.value);
    };

    return (
        <AuthForm 
            handlePasswordChange={handlePasswordChange}
            handleUsernameChange={handleUsernameChange}
            autherisation={validateRegisteration}
            message={message}
            title="Register"
            username={username}
            password={password}
            toggleVisibilty={false}
        ></AuthForm>
    )
}