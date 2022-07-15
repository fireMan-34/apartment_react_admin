import React from 'react'
import './index.scss';
import LoginLayout from './LoginLayout';
import LoginContent from './LoginContent';

export default function Login() {
    return (
        <LoginLayout Content={LoginContent} />
    )
}
