import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, query, where, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { firebaseConfig } from '../config/firebase'

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

// ==================== HELPER FUNCTIONS ====================

const getBarbershopPath = (barbershopId) => `barbershops/${barbershopId}`

const getCollectionRef = (barbershopId, collectionName) => {
    return collection(db, getBarbershopPath(barbershopId), collectionName)
}

// ==================== SERVICES ====================

export const servicesService = {
    // Get all services
    async getAll(barbershopId) {
        const servicesRef = getCollectionRef(barbershopId, 'services')
        const snapshot = await getDocs(servicesRef)
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    },

    // Get active services
    async getActive(barbershopId) {
        const servicesRef = getCollectionRef(barbershopId, 'services')
        const q = query(servicesRef, where('active', '==', true))
        const snapshot = await getDocs(q)
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    },

    // Add service
    async add(barbershopId, service) {
        const servicesRef = getCollectionRef(barbershopId, 'services')
        const docRef = await addDoc(servicesRef, service)
        return { id: docRef.id, ...service }
    },

    // Update service
    async update(barbershopId, serviceId, updates) {
        const serviceRef = doc(db, getBarbershopPath(barbershopId), 'services', serviceId)
        await updateDoc(serviceRef, updates)
        return { id: serviceId, ...updates }
    },

    // Delete service
    async delete(barbershopId, serviceId) {
        const serviceRef = doc(db, getBarbershopPath(barbershopId), 'services', serviceId)
        await deleteDoc(serviceRef)
    },

    // Real-time listener
    subscribe(barbershopId, callback) {
        const servicesRef = getCollectionRef(barbershopId, 'services')
        return onSnapshot(servicesRef, (snapshot) => {
            const services = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            callback(services)
        })
    }
}

// ==================== BARBERS ====================

export const barbersService = {
    async getAll(barbershopId) {
        const barbersRef = getCollectionRef(barbershopId, 'barbers')
        const snapshot = await getDocs(barbersRef)
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    },

    async getActive(barbershopId) {
        const barbersRef = getCollectionRef(barbershopId, 'barbers')
        const q = query(barbersRef, where('active', '==', true))
        const snapshot = await getDocs(q)
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    },

    async add(barbershopId, barber) {
        const barbersRef = getCollectionRef(barbershopId, 'barbers')
        const docRef = await addDoc(barbersRef, barber)
        return { id: docRef.id, ...barber }
    },

    async update(barbershopId, barberId, updates) {
        const barberRef = doc(db, getBarbershopPath(barbershopId), 'barbers', barberId)
        await updateDoc(barberRef, updates)
        return { id: barberId, ...updates }
    },

    async delete(barbershopId, barberId) {
        const barberRef = doc(db, getBarbershopPath(barbershopId), 'barbers', barberId)
        await deleteDoc(barberRef)
    },

    subscribe(barbershopId, callback) {
        const barbersRef = getCollectionRef(barbershopId, 'barbers')
        return onSnapshot(barbersRef, (snapshot) => {
            const barbers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            callback(barbers)
        })
    }
}

// ==================== CUSTOMERS ====================

export const customersService = {
    async getAll(barbershopId) {
        const customersRef = getCollectionRef(barbershopId, 'customers')
        const snapshot = await getDocs(customersRef)
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    },

    async getById(barbershopId, customerId) {
        const customerRef = doc(db, getBarbershopPath(barbershopId), 'customers', customerId)
        const snapshot = await getDoc(customerRef)
        return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null
    },

    async findByPhone(barbershopId, phone) {
        const customersRef = getCollectionRef(barbershopId, 'customers')
        const q = query(customersRef, where('phone', '==', phone))
        const snapshot = await getDocs(q)
        return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() }
    },

    async add(barbershopId, customer) {
        const customersRef = getCollectionRef(barbershopId, 'customers')
        const customerData = {
            ...customer,
            registeredAt: new Date().toISOString().split('T')[0],
            totalSpent: 0,
            loyaltyPoints: 0,
            tier: 'Bronze',
            visits: 0,
            loyaltyCuts: 0,
            freeCutsAvailable: 0,
            totalCutsCompleted: 0
        }
        const docRef = await addDoc(customersRef, customerData)
        return { id: docRef.id, ...customerData }
    },

    async update(barbershopId, customerId, updates) {
        const customerRef = doc(db, getBarbershopPath(barbershopId), 'customers', customerId)
        await updateDoc(customerRef, updates)
        return { id: customerId, ...updates }
    },

    async delete(barbershopId, customerId) {
        const customerRef = doc(db, getBarbershopPath(barbershopId), 'customers', customerId)
        await deleteDoc(customerRef)
    },

    subscribe(barbershopId, callback) {
        const customersRef = getCollectionRef(barbershopId, 'customers')
        return onSnapshot(customersRef, (snapshot) => {
            const customers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            callback(customers)
        })
    }
}

// ==================== APPOINTMENTS ====================

export const appointmentsService = {
    async getAll(barbershopId) {
        const appointmentsRef = getCollectionRef(barbershopId, 'appointments')
        const snapshot = await getDocs(appointmentsRef)
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    },

    async getById(barbershopId, appointmentId) {
        const appointmentRef = doc(db, getBarbershopPath(barbershopId), 'appointments', appointmentId)
        const snapshot = await getDoc(appointmentRef)
        return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null
    },

    async getByDate(barbershopId, date) {
        const appointmentsRef = getCollectionRef(barbershopId, 'appointments')
        const q = query(
            appointmentsRef,
            where('date', '==', date),
            where('status', '!=', 'cancelled')
        )
        const snapshot = await getDocs(q)
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    },

    async getByBarber(barbershopId, barberId) {
        const appointmentsRef = getCollectionRef(barbershopId, 'appointments')
        const q = query(
            appointmentsRef,
            where('barberId', '==', barberId),
            where('status', '!=', 'cancelled')
        )
        const snapshot = await getDocs(q)
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    },

    async getByCustomer(barbershopId, customerId) {
        const appointmentsRef = getCollectionRef(barbershopId, 'appointments')
        const q = query(appointmentsRef, where('customerId', '==', customerId))
        const snapshot = await getDocs(q)
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    },

    async add(barbershopId, appointment) {
        const appointmentsRef = getCollectionRef(barbershopId, 'appointments')
        const appointmentData = {
            ...appointment,
            createdAt: new Date().toISOString().split('T')[0],
            status: appointment.status || 'pending'
        }
        const docRef = await addDoc(appointmentsRef, appointmentData)
        return { id: docRef.id, ...appointmentData }
    },

    async update(barbershopId, appointmentId, updates) {
        const appointmentRef = doc(db, getBarbershopPath(barbershopId), 'appointments', appointmentId)
        await updateDoc(appointmentRef, updates)
        return { id: appointmentId, ...updates }
    },

    async delete(barbershopId, appointmentId) {
        const appointmentRef = doc(db, getBarbershopPath(barbershopId), 'appointments', appointmentId)
        await deleteDoc(appointmentRef)
    },

    async updateStatus(barbershopId, appointmentId, status) {
        return await this.update(barbershopId, appointmentId, { status })
    },

    subscribe(barbershopId, callback) {
        const appointmentsRef = getCollectionRef(barbershopId, 'appointments')
        return onSnapshot(appointmentsRef, (snapshot) => {
            const appointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            callback(appointments)
        })
    }
}

// ==================== BARBERSHOP ====================

export const barbershopService = {
    async get(barbershopId) {
        const barbershopRef = doc(db, 'barbershops', barbershopId)
        const snapshot = await getDoc(barbershopRef)
        return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null
    },

    async exists(barbershopId) {
        const barbershop = await this.get(barbershopId)
        return barbershop !== null && barbershop.active
    }
}

// ==================== AUTHENTICATION ====================

export const authService = {
    async login(email, password) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        return userCredential.user
    },

    async logout() {
        await signOut(auth)
    },

    onAuthChange(callback) {
        return onAuthStateChanged(auth, callback)
    },

    getCurrentUser() {
        return auth.currentUser
    }
}

// Export auth and db for direct usage if needed
export { auth, db }
