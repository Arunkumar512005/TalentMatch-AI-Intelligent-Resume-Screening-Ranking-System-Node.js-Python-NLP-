🎯 TalentMatch AI – Intelligent Resume Screening & Ranking System

An AI-powered web application that helps students evaluate resumes and allows HR to rank candidates instantly against job descriptions.
Built using Node.js + Express.js (backend & dashboard) and Python + FastAPI (NLP microservice).

🚀 Features

✅ Student Dashboard – Upload resume + JD → get match score & missing keywords
✅ HR Dashboard – Upload multiple resumes + JD → get a ranked candidate list
✅ NLP Service – Python FastAPI handles text cleaning, similarity scoring, keyword extraction
✅ Modern UI – Professional dashboards with clear results & tables
✅ Scalable – Node.js & Python microservice can run independently

🏗️ Tech Stack

Backend (Web App):

Node.js + Express.js

Multer (file upload)

EJS (templating engine)

NLP Service:

Python + FastAPI

SpaCy / scikit-learn / NLTK (text preprocessing & similarity)

Frontend:

HTML5 + CSS3 (responsive design)

EJS templates for dashboards

📂 Project Structure
resume_matcher/
│── server.js              # Node.js entry point
│── package.json
│── src/
│   ├── routes/            # Express routes
│   │   ├── student.js
│   │   └── hr.js
│   ├── controllers/       # Request handlers
│   │   ├── studentcontroller.js
│   │   └── hrcontroller.js
│   ├── services/          # File & NLP service
│   │   ├── fileservice.js
│   │   └── nlpservice.js
│   ├── views/             # EJS templates
│   │   ├── layout.ejs
│   │   ├── student_dashboard.ejs
│   │   └── hr_dashboard.ejs
│   └── public/            # CSS, assets
│       └── style.css
│── nlp_service/           # Python FastAPI microservice
│   ├── main.py
│   ├── nlp_utils.py
│   └── requirements.txt

⚡ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/your-username/resume_matcher.git
cd resume_matcher

2️⃣ Install Node.js Dependencies
npm install

3️⃣ Install Python Dependencies
cd nlp_service
pip install -r requirements.txt

4️⃣ Start NLP Service
uvicorn main:app --reload --port 8000

5️⃣ Start Node.js Server
npm start


Server runs on 👉 http://localhost:3000

NLP service runs on 👉 http://localhost:8000

🎓 Usage

Student Mode → Upload one resume + paste JD → See score + missing keywords

HR Mode → Upload multiple resumes + paste JD → Get ranked candidates table
