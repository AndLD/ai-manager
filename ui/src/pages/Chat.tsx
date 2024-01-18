import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import '../styles/Chat.css'

export default function Chat() {
    const [message, setMessage] = useState('')

    const onSubmit = () => {
        // send
    }

    return (
        <>
            <div>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>AI Manager</h1>
            <div className="card">
                <div className="chat"></div>
                <div>
                    <input
                        value={message}
                        onChange={event => setMessage(event.target.value)}
                        onKeyDown={event => {
                            if (event.key === 'Enter') {
                                onSubmit()
                            }
                        }}
                        className="chat-input"
                    />
                    <button onClick={onSubmit}>Send</button>
                </div>
            </div>
            <p className="read-the-docs">Add a doc and ask a quest</p>
        </>
    )
}
