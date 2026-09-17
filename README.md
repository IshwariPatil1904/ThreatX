# ThreatX: Quantum-Resistant Secure Communication Platform

A next-generation secure messaging platform that combines Quantum Key Distribution (QKD), Post-Quantum Cryptography (PQC), and traditional encryption methods to provide quantum-resistant secure communication.

## 🚀 Features

### Security Features
- **Quantum Key Distribution (QKD)**: BB84 protocol simulation for quantum-safe key exchange
- **Post-Quantum Cryptography**: Kyber512 KEM (Key Encapsulation Mechanism) for quantum-resistant encryption
- **Hybrid Encryption**: Combines QKD, PQC, and traditional AES-256 encryption
- **Digital Signatures**: HMAC-based message authentication
- **SSL/TLS Support**: Secure HTTPS communication

### Application Features
- Real-time messaging using WebSocket (Socket.IO)
- User authentication and session management
- MongoDB database integration
- Secure message storage and retrieval
- Multi-user chat rooms
- User profiles and contact management
- Password recovery system

## 🛠️ Technology Stack

- **Backend**: Python Flask
- **Real-time Communication**: Flask-SocketIO
- **Database**: MongoDB
- **Cryptography Libraries**: 
  - `oqs` (Open Quantum Safe)
  - `pqcrypto` (Post-Quantum Cryptography)
  - Native Python cryptographic functions
- **Frontend**: HTML, CSS, JavaScript
- **SSL/TLS**: Self-signed certificates for HTTPS

## 📋 Prerequisites

- Python 3.7+
- MongoDB (local or remote)
- Git

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/IshwariPatil1904/CryptexQ-Quantum-Secure-Chat.git
cd CryptexQ-Quantum-Secure-Chat
```

2. **Install required packages**
```bash
pip install flask flask-cors flask-socketio pymongo oqs pqcrypto python-socketio
```

3. **Set up MongoDB**
- Install MongoDB locally or use MongoDB Atlas
- Update the `MONGO_URI` in `app.py` if using a remote database:
```python
MONGO_URI = "your_mongodb_connection_string"
```

4. **Generate SSL Certificates (if needed)**
```bash
cd EDI/certs
openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365
```

## 🚀 Running the Application

1. **Navigate to the EDI directory**
```bash
cd EDI
```

2. **Run the Flask application**
```bash
python app.py
```

3. **Access the application**
- Open your browser and navigate to: `https://localhost:5000`
- Accept the self-signed certificate warning (for development)

## 📁 Project Structure

```
EDI/
├── app.py              # Main Flask application
├── crypto_utils.py     # Traditional cryptography utilities (AES, HMAC)
├── pqc_utils.py        # Post-Quantum Cryptography (Kyber)
├── qkd.py              # Quantum Key Distribution (BB84 simulation)
├── certs/              # SSL/TLS certificates
│   ├── cert.pem
│   └── key.pem
└── templates/          # HTML templates
    ├── index.html      # Landing page
    ├── home.html       # Home page
    ├── login.html      # Login page
    ├── signup.html     # Registration page
    ├── talkroom.html   # Chat room
    ├── secure_msg.html # Secure messaging
    ├── profile.html    # User profile
    ├── about.html      # About page
    ├── team.html       # Team page
    ├── faq.html        # FAQ page
    ├── contact.html    # Contact page
    └── terms.html      # Terms and conditions
```

## 🔐 Security Implementation

### Three-Layer Encryption Model

1. **QKD Layer**: Generates quantum-safe keys using BB84 protocol simulation
2. **PQC Layer**: Uses Kyber512 for post-quantum secure key encapsulation
3. **AES Layer**: Traditional AES-256 encryption for message content

### Key Features

- **Hybrid Key Derivation**: Combines QKD and PQC keys for maximum security
- **Message Authentication**: HMAC signatures prevent tampering
- **Secure Sessions**: Session management with encrypted storage
- **Forward Secrecy**: New keys generated for each session

## 🌐 API Endpoints

### Main Routes
- `GET /` - Landing page
- `GET /home` - Home page (requires authentication)
- `GET /login` - Login page
- `GET /signup` - Registration page
- `GET /talkroom` - Chat room interface
- `GET /profile` - User profile page

### Socket.IO Events
- `connect` - Client connection
- `send_message` - Send encrypted message
- `receive_message` - Receive encrypted message
- `user_joined` - User joined notification
- `user_left` - User left notification

## 🧪 Testing

The application uses simulated quantum key distribution for demonstration purposes. In a production environment:

1. Replace QKD simulation with actual quantum hardware/protocols
2. Use hardware security modules (HSM) for key storage
3. Implement proper certificate management
4. Add comprehensive logging and monitoring

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is created for educational purposes. Please add an appropriate license file based on your requirements.

## 👥 Authors

- **Ishwari Patil** - [GitHub Profile](https://github.com/IshwariPatil1904)

## 🙏 Acknowledgments

- Open Quantum Safe (OQS) project for quantum-safe cryptography
- Post-Quantum Cryptography Standardization (NIST)
- Flask and Socket.IO communities

## 📧 Contact

For questions or support, please open an issue on GitHub or contact through the repository.

## ⚠️ Disclaimer

This is an educational project demonstrating quantum-resistant cryptography concepts. For production use, consult with security professionals and use production-grade quantum hardware and properly audited cryptographic libraries.

---

**Note**: This application uses simulated QKD and should not be used for actual secure communications without proper quantum hardware integration and security audits.
