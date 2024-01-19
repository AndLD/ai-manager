import LogoutBtn from '../components/LogoutBtn'

export default function Forbidden() {
    return (
        <div
            style={{
                fontSize: 45,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column',
            }}
        >
            <div>Verification email sent, check your inbox</div>
            <LogoutBtn />
        </div>
    )
}
