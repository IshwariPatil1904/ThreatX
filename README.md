# ThreatX: Quantum-Resistant Secure Communication Platform

A next-generation secure messaging platform that combines Quantum Key Distribution (QKD), Post-Quantum Cryptography (PQC) with Kyber512, X25519 key exchange, and AES-256 encryption to provide quantum-resistant secure communication.

## 🚀 Features

### Security Features
- **Quantum Key Distribution (QKD)**: Simulated BB84 protocol for quantum-safe key exchange
- **Post-Quantum Cryptography**: Kyber512 KEM (Key Encapsulation Mechanism) — via `oqs` (liboqs) or `pqcrypto`, with graceful simulated fallback if native libraries are unavailable
- **Hybrid Key Derivation**: XOR-combines QKD and Kyber shared secrets into a 32-byte AES-256 key
- **Hybrid Encryption Modes**: Two session modes — Kyber512 Hybrid (PQC) and QKD-AES (simulated)
- **End-to-End Encryption**: AES-GCM with fresh keys per session (IV-per-message)
- **X25519 ECDH**: Browser-side key agreement paired with the Kyber shared secret
- **Message Authentication**: HMAC-SHA256 signatures prevent tampering
- **SSL/TLS Support**: Secure HTTPS communication with self-signed certificates

### Application Features
- Real-time messaging using WebSocket (Socket.IO)
- User authentication (login/signup by username or email) and session management
- MongoDB database integration
- Multi-user chat rooms with live online-user tracking
- User profiles, team page, FAQ, contact, terms, and about pages
- Password recovery page

## 🛠️ Technology Stack

- **Backend**: Python Flask
- **Real-time Communication**: Flask-SocketIO (threading async mode)
- **Database**: MongoDB (`cryptexq_db` — collections: `messages`, `users`, `sessions`)
- **Cryptography**:
  - `oqs` (Open Quantum Safe / liboqs) — native Kyber512 KEM
  - `pqcrypto` — optional Kyber512 provider
  - Python `hmac` / `hashlib` — integrity and key derivation
  - Browser WebCrypto — AES-GCM and X25519 ECDH on the client
- **Frontend**: HTML, CSS, JavaScript (no framework)
- **SSL/TLS**: Self-signed certificates for HTTPS

## 📋 Prerequisites

- Python 3.7+
- MongoDB (local or remote)
- Git

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/IshwariPatil1904/ThreatX.git
cd ThreatX
```

2. **Install required packages**
```bash
pip install flask flask-cors flask-socketio pymongo
pip install oqs            # native Kyber512 (recommended)
pip install pqcrypto       # optional alternative Kyber provider
```

> If `oqs`/`pqcrypto` are not installed, the server automatically runs in **simulated mode** so development is still possible.

3. **Set up MongoDB**
- Install MongoDB locally or use MongoDB Atlas
- Update the `MONGO_URI` environment variable if using a remote database:
```powershell
$env:MONGO_URI = "mongodb://localhost:27017/"
```

4. **Generate SSL Certificates**
```bash
cd ThreatX/certs
openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365
```

## 🚀 Running the Application

```bash
cd ThreatX
python app.py
```

Open your browser and navigate to `https://localhost:5000` (accept the self-signed certificate warning for development).

## 📁 Project Structure

```
ThreatX/
├── app.py              # Main Flask application + Socket.IO events
├── crypto_utils.py     # AES + HMAC-SHA256 utilities (and simulation fallback)
├── pqc_utils.py        # Post-Quantum (Kyber512) helpers + hybrid key derivation
├── qkd.py              # Quantum Key Distribution (BB84 simulation)
├── certs/              # SSL/TLS certificates
│   ├── cert.pem
│   └── key.pem
├── static/             # Frontend assets
│   ├── css/threatx.css
│   └── js/threatx.js
└── templates/          # HTML templates
    ├── index.html      # Landing page
    ├── home.html       # Home page
    ├── login.html      # Login page
    ├── signup.html     # Registration page
    ├── forgetpg.html   # Password recovery page
    ├── talkroom.html   # Chat room / secure messaging
    ├── profile.html    # User profile
    ├── about.html      # About page
    ├── team.html       # Team page
    ├── faq.html        # FAQ page
    ├── demo.html       # Demo page
    ├── contact.html    # Contact page
    ├── terms.html      # Terms and conditions
    └── logout.html     # Logout page
```

## 🔐 Security Implementation

### Encryption Modes

1. **PQC Hybrid Mode** (`request_start_session`)
   - Kyber512 KEM encapsulates a shared secret with the recipient's public key
   - Both sides independently derive the same 32-byte shared secret
   - Combined with browser X25519 ECDH keys for forward secrecy

2. **QKD-AES Mode** (`start_qkd_session`)
   - Simulated BB84 protocol generates shared key bits (512 bits)
   - Bits are sifted, error-corrected, and hashed with SHA-256 into a 32-byte AES-256 key

3. **Hybrid Key Derivation** (`pqc_utils.derive_hybrid_aes_key`)
   - SHA-256 hashes the QKD and PQC components separately
   - XOR-combines both 32-byte hashes into the final AES-256 key

### Message Flow

- Client encrypts the message with AES-GCM (WebCrypto) using the session key
- HMAC-SHA256 signatures protect message integrity
- Ciphertext, IV, and metadata are forwarded only to the intended recipient
- Delivery acknowledgements are returned to the sender

## 🌐 API Endpoints

### Main Routes
- `GET /` - Landing page
- `GET /home` - Home page
- `GET /login` - Login page
- `GET /signup` - Registration page
- `GET /logout` - Logout page
- `GET /forgetpg` - Password recovery
- `GET /talkroom` - Chat room interface
- `GET /profile` - User profile page
- `GET /about`, `/team`, `/faq`, `/contact`, `/term`, `/demo` - Static info pages

### Socket.IO Events
- `connect` / `disconnect` - Client connection lifecycle
- `register` - Register a socket with a username + X25519 public key
- `request_start_session` - Begin a Kyber512 hybrid session
- `start_qkd_session` - Begin a simulated QKD session
- `send_encrypted_message` - Forward an encrypted message to a recipient
- `online_users` - Broadcast the live list of connected users
- `registered`, `kyber_shared_for_initiator`, `kyber_ready_peer`, `qkd_shared_key`, `new_encrypted_message`, `message_delivered`, `session_initiated` - Session and delivery events

## 🧪 Testing / Production Notes

The application uses simulated quantum key distribution for demonstration purposes. In a production environment:

1. Replace QKD simulation with actual quantum hardware/protocols
2. Swap the simulated AES utilities for a vetted library (e.g. `cryptography`)
3. Use hardware security modules (HSM) for key storage
4. Implement proper certificate management (not self-signed)
5. Add comprehensive logging and monitoring
6. Add real password hashing (e.g. bcrypt/argon2) instead of plaintext storage

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is created for educational purposes. Please add an appropriate license file based on your requirements.

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
