import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, Clock, CheckCircle, PlayCircle, XCircle, Check } from 'lucide-react'

const StatusDropdown = ({ currentStatus, onStatusChange, disabled = false }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [menuStyle, setMenuStyle] = useState({})
    const buttonRef = useRef(null)
    const menuRef = useRef(null)

    const statuses = [
        { value: 'pending', label: 'Pendente', icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-500/20' },
        { value: 'confirmed', label: 'Confirmado', icon: CheckCircle, color: 'text-blue-500', bg: 'bg-blue-500/20' },
        { value: 'in-progress', label: 'Em Atendimento', icon: PlayCircle, color: 'text-purple-500', bg: 'bg-purple-500/20' },
        { value: 'completed', label: 'Finalizado', icon: Check, color: 'text-green-500', bg: 'bg-green-500/20' },
        { value: 'cancelled', label: 'Cancelado', icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/20' },
    ]

    const currentStatusObj = statuses.find(s => s.value === currentStatus) || statuses[0]
    const CurrentIcon = currentStatusObj.icon

    const calculatePosition = useCallback(() => {
        if (!buttonRef.current) return
        const rect = buttonRef.current.getBoundingClientRect()
        const menuHeight = statuses.length * 48 + 8
        const spaceBelow = window.innerHeight - rect.bottom - 8
        const openUpward = spaceBelow < menuHeight

        const style = {
            position: 'fixed',
            right: Math.max(8, window.innerWidth - rect.right),
            width: 192,
            zIndex: 9999,
        }

        if (openUpward) {
            style.bottom = window.innerHeight - rect.top + 4
        } else {
            style.top = rect.bottom + 4
        }

        setMenuStyle(style)
    }, [])

    useEffect(() => {
        if (!isOpen) return

        const handleClickOutside = (event) => {
            if (
                buttonRef.current && !buttonRef.current.contains(event.target) &&
                menuRef.current && !menuRef.current.contains(event.target)
            ) {
                setIsOpen(false)
            }
        }

        const handleScroll = () => setIsOpen(false)

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('touchstart', handleClickOutside)
        window.addEventListener('scroll', handleScroll, true)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('touchstart', handleClickOutside)
            window.removeEventListener('scroll', handleScroll, true)
        }
    }, [isOpen])

    const handleToggle = () => {
        if (disabled) return
        if (!isOpen) calculatePosition()
        setIsOpen(!isOpen)
    }

    const handleSelect = (status) => {
        onStatusChange(status)
        setIsOpen(false)
    }

    const menu = isOpen && !disabled && createPortal(
        <div
            ref={menuRef}
            style={menuStyle}
            className="bg-dark-800 border border-white/10 rounded-lg shadow-2xl overflow-hidden animate-slide-up"
        >
            {statuses.map((status) => {
                const Icon = status.icon
                const isSelected = status.value === currentStatus

                return (
                    <button
                        key={status.value}
                        onClick={() => handleSelect(status.value)}
                        className={`
                            flex items-center gap-3 w-full px-4 py-3 transition-colors
                            ${isSelected ? status.bg + ' ' + status.color : 'text-white/70 hover:bg-white/5'}
                            text-sm
                        `}
                    >
                        <Icon size={18} />
                        <span className="flex-1 text-left">{status.label}</span>
                        {isSelected && <Check size={16} />}
                    </button>
                )
            })}
        </div>,
        document.body
    )

    return (
        <>
            <button
                ref={buttonRef}
                onClick={handleToggle}
                disabled={disabled}
                className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg border transition-all
                    ${currentStatusObj.bg} ${currentStatusObj.color} border-current
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-30 cursor-pointer'}
                    text-sm font-medium
                `}
            >
                <CurrentIcon size={16} />
                <span>{currentStatusObj.label}</span>
                {!disabled && <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
            </button>
            {menu}
        </>
    )
}

export default StatusDropdown
