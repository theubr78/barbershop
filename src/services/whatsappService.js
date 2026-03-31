const CALLMEBOT_API_KEY = import.meta.env.VITE_CALLMEBOT_API_KEY
const BARBER_PHONE = '5571992139485'

export function sendWhatsAppNotification({ customerName, customerPhone, serviceName, barberName, date, time, price }) {
    if (!CALLMEBOT_API_KEY) {
        console.warn('CallMeBot API key not configured — skipping WhatsApp notification')
        return Promise.resolve()
    }

    const formattedDate = new Date(date + 'T12:00:00').toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })

    const formattedPrice = `R$ ${price?.toFixed(2).replace('.', ',')}`

    const message = [
        '✂️ *Novo Agendamento!*',
        '',
        `👤 Cliente: ${customerName}`,
        `📱 Telefone: ${customerPhone}`,
        `💈 Serviço: ${serviceName}`,
        `📅 Data: ${formattedDate}`,
        `⏰ Horário: ${time}`,
        `💰 Valor: ${formattedPrice}`,
    ].join('\n')

    const encodedMessage = encodeURIComponent(message)
    const url = `https://api.callmebot.com/whatsapp.php?phone=${BARBER_PHONE}&text=${encodedMessage}&apikey=${CALLMEBOT_API_KEY}`

    // Use Image trick to bypass CORS (fire-and-forget)
    return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => {
            console.log('WhatsApp notification sent successfully')
            resolve(true)
        }
        img.onerror = () => {
            // CallMeBot returns non-image response, so onerror fires
            // but the message is still sent successfully
            console.log('WhatsApp notification dispatched')
            resolve(true)
        }
        img.src = url
    })
}
