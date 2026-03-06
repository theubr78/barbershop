import { useParams, Link, useLocation } from 'react-router-dom'
import { CheckCircle, Calendar, User, Scissors, Clock, ArrowLeft, MessageCircle } from 'lucide-react'
import { useApp } from '../../contexts/AppContext'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { formatCurrency, formatDate, generateWhatsAppLink } from '../../utils/helpers'

const BookingConfirmation = () => {
    const { id } = useParams()
    const location = useLocation()
    const { getAppointmentById, getServiceById, getBarberById, getCustomerById } = useApp()

    // Primary: data passed via navigation state (works for non-admin users)
    // Fallback: lookup from AppContext (works for admin users)
    const bookingData = location.state
    const appointment = bookingData?.appointment || getAppointmentById(id)
    const service = bookingData?.service || (appointment ? getServiceById(appointment.serviceId) : null)
    const barber = bookingData?.barber || (appointment ? getBarberById(appointment.barberId) : null)
    const customer = bookingData?.customer || (appointment ? getCustomerById(appointment.customerId) : null)

    if (!appointment || !service || !barber) {
        return (
            <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
                <Card className="text-center max-w-md">
                    <p className="text-white/70">Agendamento não encontrado</p>
                    <Link to="/" className="mt-4">
                        <Button>Voltar ao Início</Button>
                    </Link>
                </Card>
            </div>
        )
    }

    const whatsappMessage = `Olá! Acabei de agendar um horário:\n\n📅 Data: ${formatDate(appointment.date)}\n⏰ Horário: ${appointment.time}\n✂️ Serviço: ${service.name}\n👤 Barbeiro: ${barber.name}\n\nAguardo confirmação!`
    const whatsappLink = generateWhatsAppLink('71992139485', whatsappMessage)

    return (
        <div className="min-h-screen bg-gradient-dark py-12">
            <div className="container-custom max-w-2xl">
                {/* Success Message */}
                <div className="text-center mb-8 animate-slide-up">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-4">
                        <CheckCircle className="text-green-500" size={48} />
                    </div>
                    <h1 className="text-4xl font-display font-bold mb-4">
                        Agendamento <span className="text-gradient-primary">Confirmado!</span>
                    </h1>
                    <p className="text-white/70 text-lg">
                        Seu horário foi reservado com sucesso
                    </p>
                </div>

                {/* Appointment Details */}
                <Card className="mb-6">
                    <div className="space-y-6">
                        {/* Service */}
                        <div className="flex items-start gap-4 pb-6 border-b border-white/10">
                            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent-purple/20">
                                <Scissors className="text-accent-purple" size={24} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-white/60 mb-1">Serviço</p>
                                <p className="text-lg font-semibold text-white">{service.name}</p>
                                {service.description && (
                                    <p className="text-sm text-white/60">{service.description}</p>
                                )}
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-accent-purple">
                                    {formatCurrency(service.price)}
                                </p>
                                <div className="flex items-center gap-1 text-sm text-white/60 mt-1">
                                    <Clock size={14} />
                                    {service.duration} min
                                </div>
                            </div>
                        </div>

                        {/* Barber */}
                        <div className="flex items-center gap-4 pb-6 border-b border-white/10">
                            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent-purple/20">
                                <User className="text-accent-purple" size={24} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-white/60 mb-1">Profissional</p>
                                <p className="text-lg font-semibold text-white">{barber.name}</p>
                                {barber.specialties && (
                                    <div className="flex gap-2 mt-1">
                                        {barber.specialties.slice(0, 2).map((specialty, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-0.5 rounded text-xs bg-accent-purple/20 text-accent-purple"
                                            >
                                                {specialty}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {barber.photo && (
                                <img
                                    src={barber.photo}
                                    alt={barber.name}
                                    className="w-16 h-16 rounded-full border-2 border-accent-purple object-cover"
                                />
                            )}
                        </div>

                        {/* Date & Time */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent-purple/20">
                                <Calendar className="text-accent-purple" size={24} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-white/60 mb-1">Data e Horário</p>
                                <p className="text-lg font-semibold text-white">
                                    {formatDate(appointment.date)} às {appointment.time}
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Actions */}
                <div className="space-y-4">
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block">
                        <Button
                            variant="primary"
                            size="lg"
                            icon={<MessageCircle size={20} />}
                            className="w-full"
                        >
                            Enviar Confirmação via WhatsApp
                        </Button>
                    </a>

                    <Link to="/" className="block">
                        <Button variant="secondary" size="lg" className="w-full" icon={<ArrowLeft size={20} />}>
                            Voltar ao Início
                        </Button>
                    </Link>
                </div>

                {/* Info */}
                <Card variant="glass" className="mt-8">
                    <p className="text-sm text-white/70 text-center">
                        💡 <strong>Dica:</strong> Chegue com 5 minutos de antecedência para um melhor atendimento
                    </p>
                </Card>
            </div>
        </div>
    )
}

export default BookingConfirmation
