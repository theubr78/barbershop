import dotenv from 'dotenv'
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

dotenv.config({ path: '.env.local' })

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const email = 'admin@demo.com'
const password = 'password123'

async function createTestUser() {
    try {
        console.log(`Creating user ${email}...`)
        await createUserWithEmailAndPassword(auth, email, password)
        console.log('✅ User created successfully')
        process.exit(0)
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            console.log('ℹ️ User already exists, proceeding...')
            process.exit(0)
        }
        console.error('❌ Error creating user:', error)
        process.exit(1)
    }
}

createTestUser()
