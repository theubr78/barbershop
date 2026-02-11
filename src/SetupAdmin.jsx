import { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from './services/firebaseService'
import { useNavigate } from 'react-router-dom'

const SetupAdmin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setStatus('Criando administrador...')

        try {
            await createUserWithEmailAndPassword(auth, email, password)
            setStatus('Admin criado com sucesso! Redirecionando...')
            setTimeout(() => navigate('/admin/login'), 2000)
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setStatus('Erro: Este email já está em uso.')
            } else if (error.code === 'auth/weak-password') {
                setStatus('Erro: A senha deve ter pelo menos 6 caracteres.')
            } else {
                setStatus('Erro: ' + error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-800">
                <h1 className="text-2xl font-bold mb-6 text-center text-accent">Criar Novo Admin</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-accent outline-none"
                            placeholder="admin@exemplo.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Senha</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-accent outline-none"
                            placeholder="Mínimo 6 caracteres"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-accent text-white font-bold py-2 px-4 rounded hover:bg-opacity-90 transition disabled:opacity-50"
                    >
                        {loading ? 'Criando...' : 'Criar Administrador'}
                    </button>
                </form>

                {status && (
                    <div className={`mt-4 p-3 rounded text-center ${status.includes('Sucesso') ? 'bg-green-900/50 text-green-200' : 'bg-red-900/50 text-red-200'}`}>
                        {status}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SetupAdmin
