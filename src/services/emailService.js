import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const NOTIFICATION_EMAILS = [
    'matheusdesantana05@gmail.com',
    'samuel.r.28@hotmail.com'
]

export async function sendBookingNotification({ customerName, customerPhone, serviceName, barberName, date, time, price }) {
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        console.warn('EmailJS not configured — skipping notification')
        return
    }

    const formattedDate = new Date(date + 'T12:00:00').toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })

    const templateParams = {
        customer_name: customerName,
        customer_phone: customerPhone,
        service_name: serviceName,
        barber_name: barberName,
        date: formattedDate,
        time,
        price: `R$ ${price?.toFixed(2).replace('.', ',')}`,
    }

    const results = await Promise.allSettled(
        NOTIFICATION_EMAILS.map(email =>
            emailjs.send(SERVICE_ID, TEMPLATE_ID, { ...templateParams, to_email: email }, PUBLIC_KEY)
        )
    )

    results.forEach((result, i) => {
        if (result.status === 'fulfilled') {
            console.log(`Email sent to ${NOTIFICATION_EMAILS[i]}`)
        } else {
            console.error(`Failed to send email to ${NOTIFICATION_EMAILS[i]}:`, result.reason)
        }
    })
}
