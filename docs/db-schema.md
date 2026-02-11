# Firestore Database Schema

## Collections Structure

### 1. `barbershops` Collection
Stores information about each barbershop (multi-tenant)

```javascript
{
  id: "barbearia-matheus", // Document ID (slug-friendly)
  name: "Barbearia do Matheus",
  createdAt: timestamp,
  active: true,
  settings: {
    workingHours: {
      monday: { start: "09:00", end: "18:00" },
      // ... other days
    }
  }
}
```

### 2. `barbershops/{barbershopId}/services` Subcollection
Services for each barbershop

```javascript
{
  id: "auto-generated-id",
  name: "Corte Clássico",
  description: "Corte de cabelo tradicional",
  price: 45,
  duration: 30, // minutes
  category: "Cabelo",
  active: true
}
```

### 3. `barbershops/{barbershopId}/barbers` Subcollection
Barbers working at each barbershop

```javascript
{
  id: "auto-generated-id",
  name: "Rafael Silva",
  photo: "url",
  bio: "Especialista em...",
  specialties: ["Cortes Clássicos", "Fade"],
  active: true,
  schedule: {
    monday: { start: "09:00", end: "18:00" },
    // ... other days
  }
}
```

### 4. `barbershops/{barbershopId}/customers` Subcollection
Customers of each barbershop

```javascript
{
  id: "auto-generated-id",
  name: "João Silva",
  email: "joao@email.com",
  phone: "11987654321",
  registeredAt: timestamp,
  lastVisit: "2024-12-10",
  totalSpent: 890,
  loyaltyPoints: 445,
  tier: "Prata",
  visits: 18,
  loyaltyCuts: 8,
  freeCutsAvailable: 0,
  totalCutsCompleted: 18,
  notes: ""
}
```

### 5. `barbershops/{barbershopId}/appointments` Subcollection
Appointments for each barbershop

```javascript
{
  id: "auto-generated-id",
  customerId: "ref-to-customer-id",
  barberId: "ref-to-barber-id",
  serviceId: "ref-to-service-id",
  date: "2024-12-14", // YYYY-MM-DD
  time: "10:00",
  status: "pending" | "confirmed" | "completed" | "cancelled",
  createdAt: timestamp,
  redeemed: false // if using free cut
}
```

## Indexes Required

Create these composite indexes in Firebase Console:

1. **Appointments by Date**
   - Collection: `barbershops/{barbershopId}/appointments`
   - Fields: `date` (Ascending), `status` (Ascending)

2. **Appointments by Barber**
   - Collection: `barbershops/{barbershopId}/appointments`
   - Fields: `barberId` (Ascending), `date` (Ascending)

3. **Customers by Last Visit**
   - Collection: `barbershops/{barbershopId}/customers`
   - Fields: `lastVisit` (Descending)

## Security Rules

See `firestore.rules` file for complete security configuration.

Key rules:
- Public can READ services and barbers (for booking flow)
- Public can CREATE appointments
- Only authenticated admin users can UPDATE/DELETE
- Data is isolated by `barbershopId`
