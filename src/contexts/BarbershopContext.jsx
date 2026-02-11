import { createContext, useContext } from 'react'
import { useParams, useLocation } from 'react-router-dom'

const BarbershopContext = createContext()

export const useBarbershop = () => {
    const context = useContext(BarbershopContext)
    if (!context) {
        throw new Error('useBarbershop must be used within BarbershopProvider')
    }
    return context
}

export const BarbershopProvider = ({ children }) => {
    const { barbershopId } = useParams()
    const location = useLocation()

    // Extract barbershopId from URL path
    // Supports formats: /b/:barbershopId/* or direct usage
    const activeBarbershopId = barbershopId || extractBarbershopIdFromPath(location.pathname) || 'demo'

    // Use simple default values - no Firebase query needed for now
    const value = {
        barbershopId: activeBarbershopId,
        barbershop: { id: activeBarbershopId, name: 'Barbearia', active: true },
        loading: false,
        error: null,
    }

    return <BarbershopContext.Provider value={value}>{children}</BarbershopContext.Provider>
}

// Helper function to extract barbershopId from path
function extractBarbershopIdFromPath(pathname) {
    // Match pattern /b/:barbershopId/*
    const match = pathname.match(/^\/b\/([^\/]+)/)
    return match ? match[1] : null
}
