# BRACU Consultation System - Quick Start Guide

## ✅ Prerequisites Installed

- Node.js (v18+)
- MongoDB (local or Atlas)
- Git (optional)

## 🚀 Quick Setup (5 Minutes)

### Step 1: Install Dependencies

Open terminal and navigate to project root, then run:

```bash
cd bracu-consultation-system
npm run install-all
```

This installs dependencies for root, server, and client.

### Step 2: Configure Environment

**Server (.env already created):**
- Located at: `server/.env`
- Default MongoDB: `mongodb://localhost:27017/bracu-consultation`
- If using MongoDB Atlas, update `MONGODB_URI`
- JWT secret is set (change in production!)

**Client (.env already created):**
- Located at: `client/.env`
- Points to `http://localhost:5000` (backend)

### Step 3: Seed Database (Optional but Recommended)

```bash
cd server
npm run seed
```

This creates test accounts:
- **Admin**: admin@bracu.ac.bd / Admin@123
- **Doctor**: doctor1@example.com / Doctor@123  
- **Patient**: patient1@example.com / Patient@123

### Step 4: Start the Application

**Option A: Run Both Servers (Recommended)**
```bash
# From root directory
npm run dev
```

**Option B: Run Separately**
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend  
cd client
npm run dev
```

### Step 5: Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 📝 Testing the System

### Phase 1: Doctor Registration & Verification

1. **Register as Doctor**
   - Go to http://localhost:5173/register
   - Select "Doctor" role
   - Fill in details (e.g., doctor2@example.com / Doctor@123)
   
2. **Create Doctor Profile**
   - Login as the new doctor
   - Fill out profile form:
     - Specialization: e.g., "Cardiology"
     - Experience: e.g., 5 years
     - Fee: e.g., 1000 BDT
     - License: e.g., "BMDC-98765"
     - Bio: Brief description
   - Submit (status will be PENDING)

3. **Admin Verifies Doctor**
   - Logout, login as admin@bracu.ac.bd / Admin@123
   - Navigate to "Verify Doctors"
   - Click "Verify" on pending doctor
   
4. **Doctor Confirmed**
   - Logout, login as doctor again
   - Profile status should show VERIFIED

### Phase 2: Availability Slots

1. **Login as Doctor** (doctor1@example.com / Doctor@123)
2. **Navigate to "Manage Slots"**
3. **Create Availability Slots**:
   - Date: Tomorrow's date
   - Start Time: 10:00
   - End Time: 11:00
   - Click "Create Slot"
   - Add more slots for different times

### Phase 3: Book Appointment

1. **Login as Patient** (patient1@example.com / Patient@123)
2. **Navigate to "Find Doctors"**
3. **Search & Filter**:
   - Try filtering by specialization (e.g., "Cardiology")
   - Or by available date (select tomorrow)
4. **Click "View Available Slots"** on a doctor
5. **Click "Book"** on a time slot
6. **Booking Created** (status: PENDING_PAYMENT)

### Phase 4: Payment

1. **Go to "My Appointments"** (as patient)
2. **Click "Pay Now"** on pending appointment
3. **Confirm Mock Payment** (click OK on prompt)
4. **Payment Successful** - status changes to CONFIRMED
5. **Check console** for email receipt (if SMTP not configured)

### Phase 5: Consultation Chat

1. **Login as Doctor** (at appointment time)
2. **Navigate to "Appointments"**
3. **Click "Start Consultation"** on CONFIRMED appointment
4. **Chat Interface Opens**:
   - Type message and click Send
   - Click 📎 to upload file
   - Messages appear in real-time
5. **Login as Patient** in another browser/incognito
6. **Start same consultation** - see real-time chat
7. **Doctor clicks "End Consultation"**
8. **Status changes to COMPLETED**

### Phase 6: Prescription & Health Records

1. **After consultation, Doctor creates prescription**:
   - Install a browser extension or use Postman
   - POST to `/api/prescriptions`
   - Or implement prescription UI (not in current scope)

2. **Patient views prescriptions**:
   - Navigate to "Prescriptions"
   - See all prescriptions from completed consultations

3. **Patient manages health records**:
   - Navigate to "Health Records"
   - Click "Add Record"
   - Enter BP, blood sugar, weight, notes
   - Submit and view history

## 🔧 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: 
- Ensure MongoDB is running: `mongod` or start MongoDB service
- Or use MongoDB Atlas and update `MONGODB_URI` in `server/.env`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**:
- Change `PORT=5001` in `server/.env`
- Update `VITE_API_URL` in `client/.env` to match

### Cannot Find Module Errors
```
Error: Cannot find module 'express'
```
**Solution**:
```bash
# Reinstall dependencies
cd server
npm install
cd ../client
npm install
```

### Socket.IO Connection Failed
- Check both servers are running
- Verify `VITE_SOCKET_URL` in `client/.env`
- Check browser console for CORS errors

### CORS Errors
- Verify `CLIENT_URL` in `server/.env` matches frontend URL
- Check browser developer tools → Network tab for details

## 📚 API Endpoints Quick Reference

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Doctors
- `GET /api/doctors` - List verified doctors (with filters)
- `POST /api/doctor/me/profile` - Create/update doctor profile
- `GET /api/doctor/me/slots` - Get doctor slots

### Admin
- `GET /api/admin/doctors/pending` - List pending doctors
- `PATCH /api/admin/doctors/:id/verify` - Verify doctor

### Appointments
- `POST /api/appointments` - Book appointment
- `GET /api/appointments/me` - Get user appointments
- `PATCH /api/appointments/:id/cancel` - Cancel appointment

### Payments
- `POST /api/payments/init` - Initialize payment
- `POST /api/payments/confirm` - Confirm payment

### Chat
- `GET /api/chat/:appointmentId/messages` - Get messages
- Socket.IO events: `join-room`, `send-message`, `receive-message`

### Prescriptions
- `POST /api/prescriptions` - Create prescription (Doctor)
- `GET /api/prescriptions/me` - Get my prescriptions (Patient)

### Health Records
- `POST /api/health-records` - Create record (Patient)
- `GET /api/health-records/me` - Get my records (Patient)

## 🎯 Feature Checklist

✅ User registration with role selection (Patient/Doctor/Admin)  
✅ JWT-based authentication with protected routes  
✅ Doctor profile creation with admin verification  
✅ Doctor availability slot management  
✅ Patient search doctors by specialization/availability  
✅ Appointment booking with slot locking  
✅ Mock payment system with email receipts  
✅ Real-time consultation chat with Socket.IO  
✅ File upload in chat  
✅ Prescription management  
✅ Patient health records  
✅ Role-based access control (RBAC)  
✅ Email notifications (console fallback)  
✅ Responsive Tailwind CSS UI  
✅ Clean MVC architecture  
✅ Zod validation on all inputs  
✅ Centralized error handling  

## 💡 Development Tips

### Adding New Features
1. Backend: Create model → controller → validation → routes → register in app.js
2. Frontend: Create API function → page component → add route in App.jsx

### Debugging
- Backend logs: Check terminal running `npm run dev` in server
- Frontend logs: Open browser DevTools → Console
- Network: DevTools → Network tab to see API calls
- Database: Use MongoDB Compass to view data

### Code Organization
- **Backend**: `/server/src/modules/[feature]/` contains related files
- **Frontend**: `/client/src/pages/[feature]/` for page components
- **Shared**: `/client/src/components/` for reusable components

## 📦 Production Deployment

### Backend (Railway/Render/Heroku)
1. Set environment variables in platform
2. Use MongoDB Atlas for database
3. Set `NODE_ENV=production`
4. Configure SMTP for real emails

### Frontend (Vercel/Netlify)
1. Build: `cd client && npm run build`
2. Deploy `dist/` folder
3. Set `VITE_API_URL` to production backend URL

## 🎓 CSE470 Project Submission

This project demonstrates:
- Full-stack MERN development
- RESTful API design
- Real-time communication (WebSockets)
- Database design and relationships
- Authentication & Authorization
- File handling
- Payment integration
- Email notifications
- Responsive UI/UX
- Clean code architecture

## 📞 Support

For issues:
1. Check Troubleshooting section above
2. Review browser console & server logs
3. Verify all environment variables are set
4. Ensure all dependencies are installed

Good luck with your CSE470 project! 🎉
