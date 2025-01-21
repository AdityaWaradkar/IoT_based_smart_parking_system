# IoT-Based Smart Parking System

## Project Overview

The IoT-Based Smart Parking System is a semester 5 project for Computer Engineering, designed to provide a seamless parking experience on a college campus. This system leverages IoT technology to efficiently monitor and manage parking spaces, featuring a user-friendly interface for both students and administrators. It enables real-time booking and management of parking slots.

## Team Members

- **Aditya Waradkar** 
- **Anagha Galagali**
- **Shloka Suvarna**
- **Niha Solkar**


## Features

### User Functionality

- **Registration and Login:** Users can register with their name, email, car number, and password. They can log in using their car number and password.
- **Booking Parking Slots:** View available parking slots and book a slot. A confirmation message with a QR code is sent to the user's email upon successful booking.
- **Booking History:** View past parking bookings.
- **Feedback:** Provide feedback via a Google Form.

### Admin Functionality

- **Admin Login:** Admins can log in using an admin ID and password.
- **Manage Parking Slots:** View and manage the status of parking slots, including blocking any slot if necessary.

### Common Features

- **QR Code Integration:** Users must scan a QR code generated at the time of booking to exit the parking space. The system calculates the total parking time and generates monthly billing accordingly.

## Technologies Used

- **Frontend:** React, Vite
- **Backend:** Node.js, Express
- **Database:** MOngo DB Atlas
- **IoT Integration:** ThingSpeak for data transfer
- **Styling:** Tailwind CSS

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AdityaWaradkar/IoT_based_smart_parking_system.git
