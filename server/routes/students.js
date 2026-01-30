const express = require('express');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const router = express.Router();
const Student = require('../models/Student');

// GET all students for the authenticated user
router.get('/', ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    const students = await Student.find({ userId }).sort({ grade: -1, name: 1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single student by ID (only if it belongs to the user)
router.get('/:id', ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    const student = await Student.findOne({ _id: req.params.id, userId });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new student (automatically tied to authenticated user)
router.post('/', ClerkExpressRequireAuth(), async (req, res) => {
  const student = new Student({
    ...req.body,
    userId: req.auth.userId
  });
  
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update student (only if it belongs to the user)
router.put('/:id', ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { userId: _, ...updateData } = req.body;
    
    const student = await Student.findOneAndUpdate(
      { _id: req.params.id, userId },
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH - Update specific fields (like adding a milestone)
router.patch('/:id/milestones', ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    const student = await Student.findOne({ _id: req.params.id, userId });
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    student.milestones.push(req.body);
    await student.save();
    
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE student (only if it belongs to the user)
router.delete('/:id', ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    const student = await Student.findOneAndDelete({ _id: req.params.id, userId });
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search students (only within user's students)
router.get('/search/:query', ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    const students = await Student.find({
      userId,
      $or: [
        { name: { $regex: req.params.query, $options: 'i' } },
        { email: { $regex: req.params.query, $options: 'i' } }
      ]
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
