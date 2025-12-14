import { describe, it, expect } from 'vitest'
import {
    calculateLoyaltyPoints,
    getTierByPoints,
    getNextTier
} from './helpers'

describe('Loyalty Program Helpers', () => {
    describe('calculateLoyaltyPoints', () => {
        it('should calculate points based on spend', () => {
            // Default rate is 0.5 points per real
            expect(calculateLoyaltyPoints(100)).toBe(50)
            expect(calculateLoyaltyPoints(50)).toBe(25)
            expect(calculateLoyaltyPoints(10)).toBe(5)
        })

        it('should handle custom rates', () => {
            expect(calculateLoyaltyPoints(100, 1)).toBe(100)
            expect(calculateLoyaltyPoints(100, 0.1)).toBe(10)
        })

        it('should round down to integer', () => {
            expect(calculateLoyaltyPoints(15, 0.5)).toBe(7) // 7.5 -> 7
        })
    })

    describe('Tiers', () => {
        const mockTiers = [
            { name: 'Bronze', minPoints: 0, maxPoints: 99 },
            { name: 'Silver', minPoints: 100, maxPoints: 499 },
            { name: 'Gold', minPoints: 500, maxPoints: 9999 }
        ]

        it('should return correct tier for points', () => {
            expect(getTierByPoints(0, mockTiers)).toEqual(mockTiers[0])
            expect(getTierByPoints(50, mockTiers)).toEqual(mockTiers[0])
            expect(getTierByPoints(100, mockTiers)).toEqual(mockTiers[1])
            expect(getTierByPoints(250, mockTiers)).toEqual(mockTiers[1])
            expect(getTierByPoints(500, mockTiers)).toEqual(mockTiers[2])
            expect(getTierByPoints(1000, mockTiers)).toEqual(mockTiers[2])
        })

        it('should return next tier information', () => {
            // At 50 points (Bronze), next is Silver (100)
            const result = getNextTier(50, mockTiers)
            expect(result.tier).toEqual(mockTiers[1])
            expect(result.pointsNeeded).toBe(50)
        })

        it('should return null if already at top tier', () => {
            const result = getNextTier(1000, mockTiers)
            expect(result).toBe(null)
        })
    })
})
