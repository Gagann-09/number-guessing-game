# 🎯 Number Guessing Dashboard

<p align="center">

<img src="docs/images/banner.svg" alt="Number Guessing Dashboard Banner" width="100%"/>

</p>

<p align="center">

![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge\&logo=python\&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge\&logo=fastapi\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge\&logo=html5\&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge\&logo=css3\&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

</p>

---

## 📖 Overview

**Number Guessing Dashboard** is a modern browser-based implementation of the classic Number Guessing Game.

The project transforms a traditional console application into an interactive web dashboard using **FastAPI**, **Vanilla JavaScript**, **HTML**, and **CSS**, while preserving the original game logic.

It is designed as a clean learning project demonstrating:

* Backend API development
* Frontend and backend communication
* RESTful architecture
* Modern UI principles
* Progressive project development

---

## ✨ Features

* 🎮 Interactive browser gameplay
* ⚡ FastAPI backend
* 🌐 REST API communication
* 🎯 Real-time guess evaluation
* 🔢 Input validation
* 📊 Attempt tracking
* 🔄 Restart game functionality
* 🧩 Lightweight architecture
* 📱 Responsive layout
* 🎨 Modern UI foundation

---

## 📷 Preview

### Dashboard

<p align="center">

<img src="docs/images/dashboard.png" width="90%">

</p>

### Gameplay

<p align="center">

<img src="docs/images/gameplay.gif" width="90%">

</p>

---

## 🏗 Architecture

```text
┌─────────────────────────────┐
│         Browser UI          │
│ HTML • CSS • JavaScript     │
└──────────────┬──────────────┘
               │ Fetch API
               ▼
┌─────────────────────────────┐
│          FastAPI            │
│       REST Endpoints        │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│       Game Logic Engine     │
│ Random Number • Validation  │
│ Attempts • Win/Lose Rules   │
└─────────────────────────────┘
```

---

# 📂 Project Structure

```text
number_guessing_dashboard/

├── backend/
│   ├── app.py
│   ├── game_logic.py
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── docs/
│   └── images/
│
├── README.md
└── LICENSE
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/<username>/number_guessing_dashboard.git
```

```bash
cd number_guessing_dashboard
```

---

## Install Dependencies

```bash
pip install -r backend/requirements.txt
```

---

## Run Application

```bash
uvicorn backend.app:app --reload
```

Open your browser:

```
http://127.0.0.1:8000
```

---

# 🔌 API Endpoints

| Method | Endpoint   | Description    |
| ------ | ---------- | -------------- |
| GET    | `/`        | Load dashboard |
| POST   | `/start`   | Start new game |
| POST   | `/guess`   | Submit guess   |
| POST   | `/restart` | Restart game   |

---

# 🛠 Technology Stack

| Category        | Technologies            |
| --------------- | ----------------------- |
| Backend         | Python, FastAPI         |
| Frontend        | HTML5, CSS3, JavaScript |
| API             | REST                    |
| Version Control | Git, GitHub             |

---

# 📌 Development Roadmap

* ✅ Phase 1 — Project Foundation
* ✅ Phase 2 — Browser Integration
* ⏳ Phase 3 — Modern Dashboard UI
* ⏳ Phase 4 — Statistics
* ⏳ Phase 5 — Enhanced User Experience
* ⏳ Phase 6 — Deployment

---

# 📸 Assets

Create the following folder:

```text
docs/
└── images/
```

Recommended files:

```
banner.svg
dashboard.png
gameplay.gif
architecture.svg
logo.svg
```

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

# 📄 License

This project is released under the MIT License.

---

# 👨‍💻 Author

**Gagan Narendra**

Computer Science Engineering • AI & Machine Learning

GitHub: https://github.com/<your-username>

---

<p align="center">

Made with ❤️ using Python, FastAPI and JavaScript

</p>
