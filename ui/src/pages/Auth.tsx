import { useState } from 'react'
import '../styles/Auth.css'
import SignupForm from '../components/Auth/SignupForm'
import SigninForm from '../components/Auth/SigninForm'

export default function Auth() {
    const [isSignUp, setIsSignUp] = useState(false)

    const title = isSignUp ? 'Register' : 'Sign In'
    const form = isSignUp ? (
        <SignupForm setIsSignUp={setIsSignUp} />
    ) : (
        <SigninForm setIsSignUp={setIsSignUp} />
    )

    return (
        <div className="auth-page">
            <span className="flex-layout">
                <div className="auth-card">
                    <h1>{title}</h1>
                    {form}
                </div>

                <div className="dynamic-logo">
                    <div className="dynamic-logo-block left" />
                    <div className="dynamic-logo-block right" />
                </div>
            </span>

            <div className="corner-block">
                <div style={{ fontSize: 60, fontWeight: 'bold' }}>ai manager</div>
                <div style={{ fontStyle: 'italic', fontSize: 23 }}>
                    Management sucks, do something else
                </div>
            </div>
        </div>
    )
}
