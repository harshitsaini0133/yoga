# User & Platform API Documentation

---

# 📄 User & Platform API Reference

## Auth APIs

### 1. Register User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "idToken": "string",
  "name": "string"
}
```

**Response:**
```json
{
  "id": 10,
  "name": "test",
  "phNo": "+91 1234567890",
  "email": null,
  "password": null,
  "age": null,
  "role": "USER",
  "createdAt": "2026-02-26T20:47:20.261Z",
  "updatedAt": "2026-02-26T20:47:20.261Z"
}
```

### 2. Login User
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "idToken": "string"
}
```

**Response:**
Same as Register.

---

## Payment APIs (Razorpay)

### 1. Create Order
**POST** `/api/payment/create-order`

**Request Body:**
```json
{
  "subscriptionId": 1
}
```

**Response:**
```json
{
  "razorpayOrder": {
    "id": "order_SKw1PduRgJwekF",
    "amount": 100000,
    "amount_due": 100000,
    "currency": "INR",
    "status": "created",
    "receipt": "receipt_1772143953800",
    "notes": [],
    "attempts": 0,
    "created_at": 1772143959
  },
  "order": {
    "id": 5,
    "subscriptionId": 1,
    "userId": 10,
    "amount": "1000",
    "status": "PENDING",
    "razorpayOrderId": "order_SKw1PduRgJwekF",
    "paymentId": null,
    "createdAt": "2026-02-26T22:12:34.087Z",
    "updatedAt": "2026-02-26T22:12:34.087Z"
  }
}
```

### 2. Verify Payment
**POST** `/api/payment/verify-payment`

**Request Body:**
```json
{
  "razorpay_order_id": "string",
  "razorpay_payment_id": "string",
  "razorpay_signature": "string"
}
```

**Responses:**
- **Success:**
```json
{
  "success": "true"
}
```
- **Error:**
```json
{
  "error": "Order not found"
}
```

---

## Subscription APIs

### 1. Get All User Subscriptions
**GET** `/api/my/subscription`

**Response:**
```json
[
  {
    "id": 1,
    "userId": 10,
    "subscriptionId": 1,
    "startDate": "2026-02-26T22:08:08.296Z",
    "endDate": "2026-03-05T22:08:08.296Z",
    "createdAt": "2026-02-26T22:08:08.298Z",
    "updatedAt": "2026-02-26T22:08:08.298Z"
  },
  {
    "id": 2,
    "userId": 10,
    "subscriptionId": 2,
    "startDate": "2026-02-26T22:15:58.664Z",
    "endDate": "2026-03-05T22:15:58.664Z",
    "createdAt": "2026-02-26T22:15:58.669Z",
    "updatedAt": "2026-02-26T22:15:58.669Z"
  }
]
```

### 2. Get Specific Subscription
**GET** `/api/my/subscription/:id`

**Response:**
```json
{
  "id": 1,
  "userId": 10,
  "subscriptionId": 1,
  "startDate": "2026-02-26T22:08:08.296Z",
  "endDate": "2026-03-05T22:08:08.296Z",
  "createdAt": "2026-02-26T22:08:08.298Z",
  "updatedAt": "2026-02-26T22:08:08.298Z"
}
```

---

## Onboarding / Calls APIs

### Get User Onboarding Calls
**GET** `/api/my/onboardingcalls`

**Response:**
```json
[
  {
    "id": 4,
    "userId": 10,
    "userName": "test",
    "userPhNo": "+91 1234567890",
    "date": "2026-02-28T02:30:00.000Z",
    "status": "SCHEDULED",
    "createdAt": "2026-02-26T22:38:26.388Z",
    "updatedAt": "2026-02-26T22:38:26.388Z"
  }
]
```

---

## Zoom Sessions / Meetings APIs

### Get Meetings by Subscription
**GET** `/api/subscriptions/:subscriptionId/meetings`

**Response:**
```json
[
  {
    "id": 3,
    "subscriptionId": 1,
    "createdBy": 2,
    "zoomMeetingId": "81603939618",
    "topic": "Test-Topic-1",
    "startTime": "2026-02-27T17:30:00.000Z",
    "duration": 10,
    "joinUrl": "https://us05web.zoom.us/j/81603939618?pwd=xyz",
    "startUrl": "https://us05web.zoom.us/s/81603939618?zak=xyz",
    "status": "waiting",
    "createdAt": "2026-02-26T23:03:29.306Z",
    "updatedAt": "2026-02-26T23:03:29.306Z"
  }
]
```
> Use `joinUrl` for users to join.

---

## Dietician APIs

### Get User Assigned Dieticians
**GET** `/api/my/assigned-dieticians`

**Response:**
```json
[
  {
    "id": 1,
    "subscriptionId": null,
    "dieticianId": 8,
    "userId": 10,
    "createdAt": "2026-02-26T23:27:25.175Z",
    "updatedAt": "2026-02-26T23:27:25.175Z"
  }
]
```

### Get User Diet Plans
**GET** `/api/my/dietplans`

**Response:**
```json
[
  {
    "id": 3,
    "subscriptionId": null,
    "assignedTo": 10,
    "assignedBy": 2,
    "title": "Weight Loss plan 1",
    "description": "",
    "startDate": "2026-02-27T00:00:00.000Z",
    "endDate": "2026-02-28T00:00:00.000Z",
    "caloriesPerDay": 10,
    "proteinPerDay": 100,
    "carbsPerDay": 50,
    "fatPerDay": 10,
    "meals": {
      "morning": [{"item": "milk", "quantity": "100ml"}],
      "afternoon": [{"item": "egg", "quantity": "2"}],
      "evening": [{"item": "roti", "quantity": "2"}],
      "night": [{"item": "rice", "quantity": "200g"}],
      "snacks": [{"item": "Chips", "quantity": "1"}]
    },
    "notes": "",
    "isActive": true,
    "createdAt": "2026-02-26T23:36:13.137Z",
    "updatedAt": "2026-02-26T23:36:13.137Z"
  }
]
```

---

## Chat APIs

### Send Message
**POST** `/api/messages`

**Request Body:**
```json
{
  "text": "hi",
  "dieticianId": 8
}
```

### Get Messages Between User and Dietician
**GET** `/api/messages/by`

**Request Body:**
```json
{
  "id": 8
}
```

**Response:**
```json
[
  {
    "id": 1,
    "subscriptionId": null,
    "userId": 1,
    "dieticianId": 8,
    "message": "Hi",
    "createdAt": "2026-02-26T19:10:20.286Z",
    "updatedAt": "2026-02-26T19:10:20.286Z"
  },
  {
    "id": 2,
    "subscriptionId": null,
    "userId": 10,
    "dieticianId": 8,
    "message": "hi",
    "createdAt": "2026-02-26T23:44:15.448Z",
    "updatedAt": "2026-02-26T23:44:15.448Z"
  }
]
```

---

## Ticket APIs

### Create Ticket
**POST** `/api/tickets`

**Request Body:**
```json
{
  "subscriptionId": 1,
  "message": "issue in course"
}
```

**Response:**
```json
{
  "id": 1,
  "subscriptionId": 1,
  "userId": 10,
  "message": "issue in course",
  "status": "OPEN",
  "createdAt": "2026-02-27T00:19:18.192Z",
  "updatedAt": "2026-02-27T00:19:18.192Z"
}
```

### Get User Tickets
**GET** `/api/my/tickets`

**Response:**
```json
[
  {
    "id": 1,
    "subscriptionId": 1,
    "userId": 10,
    "message": "issue in course",
    "status": "OPEN",
    "createdAt": "2026-02-27T00:19:18.192Z",
    "updatedAt": "2026-02-27T00:19:18.192Z"
  }
]
```

