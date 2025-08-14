# AI Resume Builder

A modern, AI-powered resume builder designed specifically for tech and Web3 roles. Create professional DOCX resumes with a beautiful, intuitive interface.

## 🚀 Features

- **Modern UI/UX**: Beautiful dark theme with smooth animations
- **Professional Formatting**: Clean, ATS-friendly DOCX output
- **Tech/Web3 Focused**: Optimized for modern tech roles
- **No Templates**: Everything is created dynamically from user input
- **Real-time Preview**: See your additions as you build
- **Downloadable DOCX**: Get your resume as a properly formatted Word document

## 📋 Required Sections

The resume builder accepts input for all standard resume sections:

### Required Sections:
- **Personal Information**: Name, Email, Phone, LinkedIn, GitHub, Portfolio
- **Professional Summary**: 2-3 concise sentences
- **Work Experience**: Job Title, Company, Duration, Responsibilities/Achievements
- **Education**: Degree, Institution, Year
- **Skills**: Technical, Web3, Soft Skills
- **Projects**: Project Name, Tech Stack, Description, Links

### Optional Sections:
- **Certifications & Achievements**
- **Languages**
- **Interests & Hobbies**

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup
```bash
# Install backend dependencies
npm install

# Start the development server
npm run dev
```

### Frontend Setup
```bash
# Navigate to client directory
cd client

# Install frontend dependencies
npm install

# Start the React development server
npm start
```

### Production Build
```bash
# Build the frontend
cd client && npm run build

# Start production server
npm start
```

## 📝 Usage

1. **Fill in Personal Information**: Start with your name and contact details
2. **Add Professional Summary**: Write 2-3 concise sentences about your background
3. **Add Work Experience**: Include job titles, companies, durations, and responsibilities
4. **Add Education**: Include degrees, institutions, and graduation years
5. **List Skills**: Add technical skills, Web3 technologies, and soft skills
6. **Add Projects**: Include project names, tech stacks, descriptions, and links
7. **Optional Sections**: Add certifications, languages, and interests if desired
8. **Generate Resume**: Click the generate button to create and download your DOCX resume

## 🔧 API Endpoints

### Generate Resume
```
POST /api/generate-resume
```

**Request Body Example:**
```json
{
  "personal_info": {
    "name": "Bimal Chalise",
    "email": "bimal@example.com",
    "phone": "+977 9800000000",
    "linkedin": "linkedin.com/in/bimalchalise",
    "github": "github.com/BiMalxMe",
    "portfolio": "bimalxfolio.vercel.app"
  },
  "summary": "Full-stack Web3 developer experienced in building decentralized applications...",
  "work_experience": [
    {
      "title": "Full Stack Developer",
      "company": "TechLabs",
      "duration": "Jan 2024 - Present",
      "responsibilities": [
        "Developed web3 dApps using Next.js and Solidity",
        "Integrated blockchain APIs and wallets"
      ]
    }
  ],
  "education": [
    {
      "degree": "BSc Computer Science",
      "institution": "Pokhara University",
      "year": "2023"
    }
  ],
  "skills": ["Next.js", "React", "Node.js", "Solidity", "Web3.js", "Tailwind CSS"],
  "projects": [
    {
      "name": "NFT Marketplace",
      "tech_stack": ["Next.js", "Solidity", "Web3.js"],
      "description": "Built a decentralized NFT marketplace",
      "link": "github.com/BiMalxMe/nft-marketplace"
    }
  ],
  "certifications": ["Blockchain Developer Nanodegree"],
  "languages": ["English", "Nepali"],
  "interests": ["Open Source", "Blockchain", "Gaming"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Resume generated successfully",
  "downloadUrl": "/api/download/resume_Bimal_Chalise_1234567890.docx",
  "filename": "resume_Bimal_Chalise_1234567890.docx"
}
```

### Download Resume
```
GET /api/download/:filename
```

### Health Check
```
GET /api/health
```

## 🎨 Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **docx** - DOCX file generation
- **fs-extra** - File system operations
- **cors** - Cross-origin resource sharing

### Frontend
- **React** - UI framework
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **React Hot Toast** - Notifications
- **CSS3** - Styling with modern features

## 📁 Project Structure

```
ai-resume-builder/
├── server.js              # Express server
├── resumeGenerator.js     # DOCX generation logic
├── package.json           # Backend dependencies
├── client/                # React frontend
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Component styles
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Global styles
│   ├── public/
│   │   └── index.html     # HTML template
│   └── package.json       # Frontend dependencies
├── uploads/               # Generated files (auto-created)
└── README.md              # This file
```

## 🔒 Security Features

- Input validation and sanitization
- File cleanup after download
- CORS configuration
- Error handling and logging

## 🚀 Deployment

### Environment Variables
Create a `.env` file in the root directory:
```env
PORT=3000
NODE_ENV=production
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN cd client && npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Built with ❤️ for the modern tech community**
