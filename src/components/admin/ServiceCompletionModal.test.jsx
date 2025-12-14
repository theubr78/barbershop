import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ServiceCompletionModal from './ServiceCompletionModal'

describe('ServiceCompletionModal', () => {
    const mockAppointment = { time: '14:00' }
    const mockCustomer = { name: 'John Doe', freeCutsAvailable: 0, loyaltyCuts: 5 }
    const mockService = { name: 'Haircut', price: 50 }
    const mockBarber = { name: 'Barber Jack' }
    const mockOnClose = vi.fn()
    const mockOnConfirm = vi.fn()
    const mockOnRedeem = vi.fn()

    it('should not render if not open', () => {
        render(
            <ServiceCompletionModal
                isOpen={false}
                onClose={mockOnClose}
                appointment={mockAppointment}
                customer={mockCustomer}
                service={mockService}
                barber={mockBarber}
            />
        )
        expect(screen.queryByText('Finalizar Serviço')).toBeNull()
    })

    it('should render correct details when open', () => {
        render(
            <ServiceCompletionModal
                isOpen={true}
                onClose={mockOnClose}
                appointment={mockAppointment}
                customer={mockCustomer}
                service={mockService}
                barber={mockBarber}
                onConfirm={mockOnConfirm}
            />
        )

        expect(screen.getByText('Finalizar Serviço')).toBeInTheDocument()
        expect(screen.getByText('John Doe')).toBeInTheDocument()
        expect(screen.getByText('Haircut')).toBeInTheDocument()
        expect(screen.getByText('Barber Jack')).toBeInTheDocument()
        expect(screen.getByText('5/10')).toBeInTheDocument() // Loyalty progress
    })

    it('should show free cut alert if available', () => {
        const customerWithFreeCut = { ...mockCustomer, freeCutsAvailable: 1 }
        render(
            <ServiceCompletionModal
                isOpen={true}
                onClose={mockOnClose}
                appointment={mockAppointment}
                customer={customerWithFreeCut}
                service={mockService}
                barber={mockBarber}
                onRedeemFreeCut={mockOnRedeem}
            />
        )

        expect(screen.getByText('CLIENTE TEM CORTE GRÁTIS!')).toBeInTheDocument()
        expect(screen.getByText('Resgatar Corte Grátis')).toBeInTheDocument()
    })

    it('should show "Will Earn Reward" alert if at 9 cuts', () => {
        const customerNearReward = { ...mockCustomer, loyaltyCuts: 9, freeCutsAvailable: 0 }
        render(
            <ServiceCompletionModal
                isOpen={true}
                onClose={mockOnClose}
                appointment={mockAppointment}
                customer={customerNearReward}
                service={mockService}
                barber={mockBarber}
            />
        )

        expect(screen.getByText(/Este cliente vai GANHAR um corte grátis/)).toBeInTheDocument()
    })

    it('should call onConfirm when confirmed', () => {
        render(
            <ServiceCompletionModal
                isOpen={true}
                onClose={mockOnClose}
                appointment={mockAppointment}
                customer={mockCustomer}
                service={mockService}
                barber={mockBarber}
                onConfirm={mockOnConfirm}
            />
        )

        fireEvent.click(screen.getByText('Confirmar'))
        expect(mockOnConfirm).toHaveBeenCalled()
        expect(mockOnClose).toHaveBeenCalled()
    })

    it('should call onRedeemFreeCut when redeeming', () => {
        const customerWithFreeCut = { ...mockCustomer, freeCutsAvailable: 1 }
        render(
            <ServiceCompletionModal
                isOpen={true}
                onClose={mockOnClose}
                appointment={mockAppointment}
                customer={customerWithFreeCut}
                service={mockService}
                barber={mockBarber}
                onRedeemFreeCut={mockOnRedeem}
            />
        )

        fireEvent.click(screen.getByText('Resgatar Corte Grátis'))
        expect(mockOnRedeem).toHaveBeenCalled()
        expect(mockOnClose).toHaveBeenCalled()
    })
})
