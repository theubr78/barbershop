import { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from './services/firebaseService'
import { useNavigate } from 'react-router-dom'

const SetupAdmin = () => {
    const [status, setStatus] = useState('Creating admin...')
    const navigate = useNavigate()

    useEffect(() => {
        const create = async () => {
            try {
                await createUserWithEmailAndPassword(auth, 'admin@barbearia.com', 'admin123')
                setStatus('Admin created! Redirecting...')
                setTimeout(() => navigate('/admin/login'), 2000)
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    setStatus('Admin already exists! Redirecting...')
                    setTimeout(() => navigate('/admin/login'), 2000)
                } else {
                    setStatus('Error: ' + error.message)
                }
            }
        }
        create()
    }, [])

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <h1>{status}</h1>
        </div>
    )
}

export default SetupAdmin
