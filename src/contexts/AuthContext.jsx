import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/firebaseService'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = authService.onAuthChange((user) => {
            setUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const login = async (email, password) => {
        try {
            setError(null)
            const user = await authService.login(email, password)
            setUser(user)
            return user
        } catch (err) {
            setError(err.message)
            throw err
        }
    }

    const logout = async () => {
        try {
            setError(null)
            await authService.logout()
            setUser(null)
        } catch (err) {
            setError(err.message)
            throw err
        }
    }

    const value = {
        user,
        loading,
        error,
        login,
        logout,
        isAuthenticated: !!user,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
