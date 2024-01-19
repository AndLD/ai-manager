import { useState } from 'react'
import '../styles/Chat.css'

export default function Chat() {
    const [message, setMessage] = useState('')

    const onSubmit = () => {
        // send
    }

    return (
        <>
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
