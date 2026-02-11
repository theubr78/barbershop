import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SetupAdmin from './SetupAdmin'
import { AuthProvider } from './contexts/AuthContext'
import { BarbershopProvider } from './contexts/BarbershopContext'
import { AppProvider } from './contexts/AppContext'
import { ToastProvider } from './contexts/ToastContext'
import ToastContainer from './components/ui/ToastContainer'
import ProtectedRoute from './components/ProtectedRoute'

// Public Pages
import Landing from './pages/public/Landing'
import BookingFlow from './pages/public/BookingFlow'
import BookingConfirmation from './pages/public/BookingConfirmation'

// Admin Pages
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import Agenda from './pages/admin/Agenda'
import Customers from './pages/admin/Customers'
import LoyaltyProgram from './pages/admin/LoyaltyProgram'
import Services from './pages/admin/Services'
import Barbers from './pages/admin/Barbers'

function App() {
    return (
        <Router>
            <AuthProvider>
                <BarbershopProvider>
                    <ToastProvider>
                        <AppProvider>
                            <Routes>
                                {/* Public Routes */}
                                <Route path="/setup-admin" element={<SetupAdmin />} />
                                <Route path="/" element={<Landing />} />
                                <Route path="/agendar" element={<BookingFlow />} />
                                <Route path="/confirmacao/:id" element={<BookingConfirmation />} />

                                {/* Admin Login */}
                                <Route path="/admin/login" element={<Login />} />

                                {/* Protected Admin Routes */}
                                <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                                <Route path="/admin/agenda" element={<ProtectedRoute><Agenda /></ProtectedRoute>} />
                                <Route path="/admin/clientes" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
                                <Route path="/admin/fidelidade" element={<ProtectedRoute><LoyaltyProgram /></ProtectedRoute>} />
                                <Route path="/admin/servicos" element={<ProtectedRoute><Services /></ProtectedRoute>} />
                                <Route path="/admin/barbeiros" element={<ProtectedRoute><Barbers /></ProtectedRoute>} />
                            </Routes>
                            <ToastContainer />
                        </AppProvider>
                    </ToastProvider>
                </BarbershopProvider>
            </AuthProvider>
        </Router>
    )
}

export default App
