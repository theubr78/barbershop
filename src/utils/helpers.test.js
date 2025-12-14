import { describe, it, expect } from 'vitest'
import {
    validateEmail,
    validatePhone,
    validateName,
    formatCurrency,
    generateWhatsAppLink,
    isSlotAvailable
} from './helpers'

describe('Helpers', () => {
    describe('Validation', () => {
        it('should validate correct emails', () => {
            expect(validateEmail('test@example.com')).toBe(true)
            expect(validateEmail('user.name@domain.co.uk')).toBe(true)
        })

        it('should reject invalid emails', () => {
            expect(validateEmail('invalid-email')).toBe(false)
            expect(validateEmail('@domain.com')).toBe(false)
            expect(validateEmail('user@')).toBe(false)
        })

        it('should validate phone numbers with enough digits', () => {
            expect(validatePhone('(11) 98765-4321')).toBe(true)
            expect(validatePhone('11987654321')).toBe(true)
        })

        it('should reject short phone numbers', () => {
            expect(validatePhone('123')).toBe(false)
        })

        it('should validate names with at least 3 chars', () => {
            expect(validateName('Ana')).toBe(true)
            expect(validateName('João Silva')).toBe(true)
        })

        it('should reject short names', () => {
            expect(validateName('Jo')).toBe(false)
        })
    })

    describe('Formatting', () => {
        it('should format currency for BRL', () => {
            // Note: Intl.NumberFormat might behave differently depending on node environment
            // checking for key parts instead of exact string if locale is strict
            const result = formatCurrency(100)
            expect(result).toContain('100')
            expect(result).toContain('R$')
        })
    })

    describe('WhatsApp Link', () => {
        it('should generate correct link with message', () => {
            const link = generateWhatsAppLink('11999999999', 'Hello World')
            expect(link).toBe('https://wa.me/5511999999999?text=Hello%20World')
        })
    })

    describe('Slot Availability', () => {
        const appointments = [
            {
                barberId: 'barber1',
                date: '2023-10-10',
                time: '14:00',
                status: 'confirmed'
            },
            {
                barberId: 'barber1',
                date: '2023-10-10',
                time: '15:00',
                status: 'cancelled'
            }
        ]

        it('should return true if no appointment at that time', () => {
            const result = isSlotAvailable('16:00', appointments, 'barber1', '2023-10-10')
            expect(result).toBe(true)
        })

        it('should return false if appointment exists and confirmed', () => {
            const result = isSlotAvailable('14:00', appointments, 'barber1', '2023-10-10')
            expect(result).toBe(false)
        })

        it('should return true if appointment exists but is cancelled', () => {
            const result = isSlotAvailable('15:00', appointments, 'barber1', '2023-10-10')
            expect(result).toBe(true)
        })

        it('should return true if appointment exists but for another barber', () => {
            const result = isSlotAvailable('14:00', appointments, 'barber2', '2023-10-10')
            expect(result).toBe(true)
        })
    })
})
