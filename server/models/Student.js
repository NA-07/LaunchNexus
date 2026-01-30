const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  // Clerk user ID - ties each student to a specific authenticated user
  userId: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  grade: {
    type: Number,
    required: true,
    min: 9,
    max: 12
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  photo: {
    type: String,
    default: null
  },
  academic: {
    cgpa: {
      type: Number,
      min: 0,
      max: 10
    },
    boardPercentage: {
      type: Number,
      min: 0,
      max: 100
    },
    boardType: {
      type: String,
      enum: ['CBSE', 'ICSE', 'State Board', 'IB', 'Cambridge']
    },
    cgpaHistory: [{
      semester: String,
      cgpa: Number
    }],
    courses: [{
      name: String,
      grade: String,
      rigor: {
        type: String,
        enum: ['Regular', 'Science Stream', 'Commerce Stream', 'Humanities', 'Core']
      }
    }],
    testScores: {
      jeeMain: {
        percentile: Number,
        score: Number
      },
      jeeAdvanced: {
        rank: Number,
        score: Number
      },
      neet: {
        score: Number,
        percentile: Number
      },
      bitsat: Number,
      cuet: Number,
      olympiads: [{
        subject: String,
        level: {
          type: String,
          enum: ['School', 'Regional', 'State', 'National', 'International']
        },
        rank: Number,
        qualified: Boolean
      }]
    }
  },
  extracurricular: [{
    activity: String,
    role: String,
    hours: Number,
    yearsInvolved: Number,
    impact: String
  }],
  character: {
    teacherObservations: [{
      teacher: String,
      observation: String,
      date: {
        type: Date,
        default: Date.now
      }
    }],
    peerFeedback: [{
      context: String,
      feedback: String,
      date: {
        type: Date,
        default: Date.now
      }
    }],
    traits: [String]
  },
  milestones: [{
    date: {
      type: Date,
      required: true
    },
    type: {
      type: String,
      enum: ['Award', 'Certification', 'Project', 'Achievement', 'Competition', 'Other']
    },
    title: String,
    description: String
  }],
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Index for faster searches
studentSchema.index({ name: 'text', email: 'text' });

module.exports = mongoose.model('Student', studentSchema);
