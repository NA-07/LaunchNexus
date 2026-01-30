# 🚀 LaunchNexus - Student Growth & Impact Tracker (India Edition)

> **Empowering school counselors to guide Indian students toward their future with AI-powered insights, comprehensive college planning tools, and smart entrance exam-based matching for IITs, NITs, BITS, AIIMS, and more.**

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.3.0-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🌟 What Makes LaunchNexus Special?

LaunchNexus isn't just another student tracking tool—it's an **AI-powered college counseling platform built specifically for the Indian education system** that helps students make better decisions about IITs, NITs, medical colleges, and avoid costly mistakes.

### 🚀 Breakthrough Features

#### 🤖 **AI-Powered Insights**
- **Comprehensive Profile Analysis**: AI evaluates 40+ data points across academics, extracurriculars, character, and milestones
- **Overall AI Score (0-100)**: Instant assessment of college readiness
- **Personalized Recommendations**: AI-generated college suggestions based on student profile
- **Admission Chance Prediction**: Data-driven probability estimates for target schools
- **Interactive AI Advisor**: Chat with AI to ask questions about student profiles and college planning

#### 🎓 **College & Scholarship Matching (India)**
- **15+ Indian Institutions**: IITs, NITs, BITS, AIIMS, Central Universities, and more
- **50+ Scholarship Programs**: MCM, INSPIRE, KVPY, Central Sector Scheme, and state scholarships
- **Smart Categorization**: Reach, Target, Safety institution recommendations
- **Financial Aid Calculator**: Estimate net costs in INR and scholarship eligibility
- **Match Scoring**: Proprietary algorithm scores fit based on CGPA, JEE/NEET scores, interests, and more

#### ⚠️ **Pre-Mortem Decision Autopsy** (Unique Innovation!)
- **Future Failure Simulation**: Imagine decisions already failed—what went wrong?
- **Risk Assessment (0-100%)**: Calculate probability of regret for major decisions
- **Scenario Generation**: See realistic failure scenarios (debt spiral, academic overwhelm, culture mismatch, etc.)
- **Early Warning Signs**: Red flags to watch for after making a decision
- **Mitigation Strategies**: Actionable steps to reduce risk with pros/cons analysis
- **Decision Types**: College choice, major selection, financial decisions, career paths

#### 📊 **Comprehensive Student Profiles**
- **Academic Evolution**: CGPA tracking (10-point scale), board percentage, JEE/NEET scores, Olympiad achievements
- **Extracurricular Impact**: Activities, leadership roles, hours, impact statements
- **Character & Skills**: Observations, soft skills, teacher feedback
- **Milestones**: Awards, certifications, projects, achievements

#### 🎯 **Smart Dashboard**
- **AI-Powered Analytics**: Overall cohort insights and top performers
- **Progress Tracking**: Visual completion indicators for each student
- **Search & Filter**: Instant student lookup
- **Multi-Sort**: By leadership, community service, academic excellence, or AI score

---

## 🎬 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git
- MongoDB (optional, for data persistence)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/LaunchNexus.git
cd LaunchNexus

# Install dependencies
npm install

# Start development server (Vite)
npm run dev
```

The app will automatically open at **http://localhost:5173** 🚀

### Backend Server (Optional)

```bash
# Start the Express backend (requires MongoDB)
cd server
node server.js
```

### Build for Production

```bash
npm run build
```

Optimized production build will be in the `dist/` directory.

---

## 💻 Tech Stack

### Frontend
- **React 18.2** - Modern UI framework
- **Vite 5.0** - Next-generation frontend tooling
- **Tailwind CSS 3.3** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **date-fns** - Date formatting and manipulation

### Backend
- **Express.js** - Node.js web framework
- **MongoDB + Mongoose** - Database and ODM
- **Clerk Authentication** - Secure user management

### Features & Tools
- **jsPDF** - PDF export for student profiles
- **Custom AI Algorithms** - Profile analysis, college matching, pre-mortem decision analysis
- **React Router** - Client-side routing

---

## 📁 Project Structure

```
LaunchNexus/
├── public/
│   └── index.html              # HTML template
├── server/
│   ├── server.js               # Express backend
│   ├── seedData.js             # Database seeder
│   ├── models/
│   │   └── Student.js          # MongoDB schema (Indian format)
│   ├── routes/
│   │   └── students.js         # API routes
│   └── middleware/
│       └── clerkAuth.js        # Authentication middleware
├── src/
│   ├── components/
│   │   ├── Common/             # Shared components
│   │   │   ├── Header.jsx      # Navigation header
│   │   │   ├── Footer.jsx      # Footer component
│   │   │   ├── Hero.jsx        # Landing page hero
│   │   │   ├── Features.jsx    # Feature highlights
│   │   │   ├── HowItWorks.jsx  # How it works section
│   │   │   ├── InputsOutputs.jsx # Input/Output demo
│   │   │   ├── CTA.jsx         # Call to action
│   │   │   ├── ProgressBar.js  # Progress indicator
│   │   │   ├── SearchBar.js    # Student search
│   │   │   ├── AIAssistant.js  # AI chat interface
│   │   │   ├── AIInsightsPanel.js          # AI insights display
│   │   │   ├── CollegeScholarshipFinder.js # College matching UI (INR)
│   │   │   └── PreMortemAnalyzer.js        # Decision autopsy UI
│   │   ├── Dashboard/          # Dashboard components
│   │   │   ├── Dashboard.js    # Main dashboard
│   │   │   └── StudentCard.js  # Student summary cards (CGPA)
│   │   ├── StudentProfile/     # Profile builder
│   │   │   ├── StudentProfile.js         # Main profile container
│   │   │   ├── AcademicSection.js        # CGPA, JEE/NEET, Olympiads
│   │   │   ├── ExtracurricularSection.js # Activities (NSS, NCC, etc.)
│   │   │   ├── CharacterSection.js       # Character traits
│   │   │   └── MilestonesSection.js      # Achievements
│   │   └── ui/                 # Reusable UI components
│   │       ├── Button.jsx
│   │       └── Card.jsx
│   ├── pages/
│   │   ├── Landing.js          # Landing page
│   │   ├── GetStarted.js       # Onboarding
│   │   └── Dashboard.js        # Dashboard page
│   ├── data/
│   │   ├── mockData.js         # Sample Indian students (CGPA, JEE/NEET)
│   │   └── collegeDatabase.js  # 15 Indian institutions + scholarships
│   ├── utils/
│   │   ├── aiInsights.js       # AI analysis engine (Indian recommendations)
│   │   ├── collegeMatching.js  # JEE/NEET-based matching algorithm
│   │   ├── preMortemAnalysis.js # Decision autopsy (Indian context)
│   │   └── pdfExport.js        # PDF generation
│   ├── services/
│   │   └── studentApi.js       # API service layer
│   ├── styles/
│   │   ├── fonts.css
│   │   ├── index.css
│   │   ├── tailwind.css
│   │   └── theme.css
│   ├── App.js                  # Main app logic
│   ├── index.js                # Entry point
│   └── index.css               # Global styles
├── COLLEGE_FINDER_GUIDE.md     # Indian education system guide
├── README.md
├── package.json
├── vite.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## 🎯 How to Use

### For Counselors

1. **Dashboard Overview**
   - View all students with completion percentages
   - See AI-powered analytics (average AI score, top performers, students needing attention)
   - Search and filter students

2. **Student Profiles**
   - Click any student card to open their profile
   - Fill in data across 4 pillars: Academic, Extracurricular, Character, Milestones
   - Add CGPA history and entrance exam scores

3. **AI Insights** (Tab 5)
   - View overall AI score (0-100)
   - See identified strengths and growth opportunities
   - Get college recommendations with admission chances
   - Chat with AI Advisor for personalized advice

4. **College & Scholarship Finder** (Tab 6)
   - See top 5 college matches automatically
   - View reach, target, and safety schools
   - Browse 50+ matching scholarships
   - Calculate net costs with financial aid estimates

5. **Pre-Mortem Decision Autopsy** (Tab 7)
   - Help students analyze major decisions (college choice, major selection, loans, etc.)
   - See realistic failure scenarios and risk scores
   - Get mitigation strategies and alternative options
   - Prevent costly mistakes before they happen!

6. **Export PDFs**
   - Generate professional college resumes
   - Include all profile data in clean format

---

## 🔬 AI Features Explained

### 1. AI Insights Engine (`aiInsights.js`)

**What it does:**
- Analyzes student profile across 40+ data points
- Calculates weighted score: Academic (40%), Extracurricular (30%), Character (20%), Milestones (15%)
- Generates personalized recommendations

**Example Output:**
```javascript
{
  overallScore: 82,
  strengths: ["Strong JEE Main performance", "Consistent leadership roles"],
  growthOpportunities: ["Limited community service", "No Olympiad participation"],
  collegeRecommendations: [
    { name: "IIT Bombay", admissionChance: 45%, fit: 88% },
    { name: "NIT Trichy", admissionChance: 72%, fit: 91% }
  ]
}
```

### 2. College Matching Algorithm (`collegeMatching.js`)

**Matching Criteria:**
- Academic match (CGPA, JEE/NEET scores, board percentage)
- Entrance exam alignment (JEE Main, JEE Advanced, NEET, CUET, BITSAT)
- Interest alignment (branch/specialization, extracurriculars)
- Financial fit (fees in INR, scholarships like MCM/INSPIRE)
- Category-based reservations

**Categorization:**
- **Reach**: JEE/NEET rank significantly higher than typical admits
- **Target**: Profile matches typical admitted students
- **Safety**: Strong profile for reliable admission

### 3. Pre-Mortem Decision Analyzer (`preMortemAnalysis.js`)

**How Pre-Mortem Works:**
Instead of asking "What could go right?" we ask: **"Imagine this decision failed. What went wrong?"**

**Example: Private vs Government Institution**
```
Decision: "Attend BITS Pilani (₹20L total) vs. NIT Trichy (₹5L total)"

Analysis:
- Overall Risk: 65% (YELLOW LIGHT)
- Top Failure: Financial Strain (70% probability)
  "You graduate with ₹15L education loan. EMI of ₹18,000/month for 7 years.
   Starting salary of ₹8L/year after tax leaves ₹45,000/month. After EMI,
   rent in Bangalore (₹15,000), and expenses, you struggle to save."

Warning Signs:
- "Private college = better placement" assumption
- Ignoring NIT's equally strong placement record
- Parents using retirement savings

Recommendation: Choose NIT Trichy - similar CS education, 1/4 the cost, strong placements
```

---

## 📊 Key Metrics & Data

### College Database (India)
- **15+ Institutions**: IIT Bombay, IIT Delhi, IIT Madras, NIT Trichy, NIT Surathkal, NIT Warangal, BITS Pilani, BITS Goa, AIIMS Delhi, CMC Vellore, Delhi University, JNU, Anna University, Jadavpur University, Manipal
- **Real Admission Data**: CGPA requirements, JEE/NEET cutoffs, board percentage requirements
- **50+ Scholarships**: MCM (Merit-cum-Means), INSPIRE, KVPY, Central Sector Scheme, state-specific scholarships, category-based scholarships

### AI Scoring Breakdown (India)
```
Overall Score (0-100):
├── Academic (40%)
│   ├── CGPA (out of 10, weighted by stream)
│   ├── Board Percentage (CBSE/ICSE/State)
│   ├── Entrance Exams (JEE Main/Advanced, NEET, CUET, BITSAT)
│   └── Olympiad achievements (RMO, INPhO, NSEC, etc.)
├── Extracurricular (30%)
│   ├── Leadership positions (NSS, NCC, clubs)
│   ├── Time commitment
│   ├── Impact & achievements
│   └── Variety of activities
├── Character (20%)
│   ├── Soft skills
│   ├── Teacher feedback
│   └── Personal qualities
└── Milestones (15%)
    ├── Awards & honors (NTSE, KVPY, state-level)
    ├── Certifications
    └── Notable projects
```

---

## 🎨 Screenshots

*(Add screenshots here when available)*

1. **Landing Page** - Beautiful hero section with feature highlights
2. **Dashboard** - Student cards with AI analytics showing CGPA
3. **Student Profile** - Comprehensive data entry (CGPA, JEE/NEET, Olympiads)
4. **AI Insights** - Profile analysis with Indian college recommendations
5. **College Finder** - IIT/NIT/BITS matches with scholarships (INR)
6. **Pre-Mortem** - Decision risk analysis for Indian education choices

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with ❤️ by the LaunchNexus team
- Designed specifically for Indian students and counselors
- Special thanks to all educators who guide students toward their dreams

---

## 📞 Support & Contact

- **GitHub Issues**: Report bugs or request features
- **Documentation**: See [COLLEGE_FINDER_GUIDE.md](COLLEGE_FINDER_GUIDE.md) for detailed Indian education system info

---

## 🚀 Roadmap

### Coming Soon
- [ ] MongoDB integration for data persistence
- [ ] Real-time collaboration for counselor teams
- [ ] Parent portal for family involvement
- [ ] Mobile app (React Native)
- [ ] Integration with JoSAA counseling system
- [ ] NEET counseling integration for medical admissions
- [ ] Advanced analytics dashboard
- [ ] Email notifications and reminders
- [ ] Document upload (marksheets, admit cards)

---

<div align="center">

**Made with 💙 to help every Indian student find their path to IITs, NITs, AIIMS, and beyond**

[Get Started](#-quick-start) • [Features](#-what-makes-launchnexus-special) • [Documentation](#-how-to-use)

</div>
