import jsPDF from 'jspdf';
import { format } from 'date-fns';

export const generatePDF = async (student) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  // Helper function to add text with wrapping
  const addText = (text, x, y, maxWidth, fontSize = 10, isBold = false) => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, x, y);
    return y + (lines.length * fontSize * 0.35);
  };

  // Helper function to check if we need a new page
  const checkNewPage = (requiredSpace) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Header with student name
  pdf.setFillColor(14, 165, 233); // Primary color
  pdf.rect(0, 0, pageWidth, 35, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text(student.name || 'Student Profile', margin, 20);
  
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Grade ${student.grade} | ${student.email}`, margin, 28);

  yPosition = 45;
  pdf.setTextColor(0, 0, 0);

  // Academic Section
  pdf.setFillColor(240, 240, 240);
  pdf.rect(margin, yPosition, pageWidth - 2 * margin, 8, 'F');
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('📚 ACADEMIC EVOLUTION', margin + 2, yPosition + 6);
  yPosition += 12;

  if (student.academic?.cgpa) {
    yPosition = addText(`Current CGPA: ${student.academic.cgpa.toFixed(1)}/10`, margin, yPosition, pageWidth - 2 * margin, 11, true);
    yPosition += 3;
  }

  if (student.academic?.boardPercentage) {
    yPosition = addText(`Board Percentage: ${student.academic.boardPercentage.toFixed(1)}%`, margin, yPosition, pageWidth - 2 * margin, 10);
    yPosition += 3;
  }

  if (student.academic?.testScores) {
    const scores = [];
    if (student.academic.testScores.jeeMain?.percentile) scores.push(`JEE Main: ${student.academic.testScores.jeeMain.percentile}%ile`);
    if (student.academic.testScores.jeeAdvanced?.rank) scores.push(`JEE Advanced Rank: ${student.academic.testScores.jeeAdvanced.rank}`);
    if (student.academic.testScores.neet?.score) scores.push(`NEET: ${student.academic.testScores.neet.score}/720`);
    if (scores.length > 0) {
      yPosition = addText(`Entrance Exam Scores: ${scores.join(', ')}`, margin, yPosition, pageWidth - 2 * margin, 10);
      yPosition += 3;
    }
  }

  if (student.academic?.courses && student.academic.courses.length > 0) {
    yPosition = addText('Current Courses:', margin, yPosition, pageWidth - 2 * margin, 10, true);
    yPosition += 3;
    student.academic.courses.forEach(course => {
      checkNewPage(8);
      yPosition = addText(
        `• ${course.name} (${course.rigor}) - ${course.grade}`,
        margin + 5,
        yPosition,
        pageWidth - 2 * margin - 5,
        9
      );
      yPosition += 2;
    });
  }

  yPosition += 5;
  checkNewPage(20);

  // Extracurricular Section
  pdf.setFillColor(240, 240, 240);
  pdf.rect(margin, yPosition, pageWidth - 2 * margin, 8, 'F');
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('⭐ EXTRACURRICULAR IMPACT', margin + 2, yPosition + 6);
  yPosition += 12;

  if (student.extracurricular && student.extracurricular.length > 0) {
    student.extracurricular.forEach((activity, index) => {
      checkNewPage(25);
      
      yPosition = addText(
        `${activity.activity} - ${activity.role}`,
        margin,
        yPosition,
        pageWidth - 2 * margin,
        11,
        true
      );
      yPosition += 2;
      
      yPosition = addText(
        `${activity.hours} hours | ${activity.yearsInvolved} years`,
        margin + 5,
        yPosition,
        pageWidth - 2 * margin - 5,
        9
      );
      yPosition += 2;
      
      if (activity.impact) {
        yPosition = addText(
          `Impact: ${activity.impact}`,
          margin + 5,
          yPosition,
          pageWidth - 2 * margin - 5,
          9
        );
      }
      yPosition += 5;
    });
  }

  checkNewPage(20);

  // Character Section
  pdf.setFillColor(240, 240, 240);
  pdf.rect(margin, yPosition, pageWidth - 2 * margin, 8, 'F');
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('❤️ CHARACTER & SOFT SKILLS', margin + 2, yPosition + 6);
  yPosition += 12;

  if (student.character?.traits && student.character.traits.length > 0) {
    yPosition = addText(
      `Key Traits: ${student.character.traits.join(', ')}`,
      margin,
      yPosition,
      pageWidth - 2 * margin,
      10
    );
    yPosition += 5;
  }

  if (student.character?.teacherObservations && student.character.teacherObservations.length > 0) {
    yPosition = addText('Teacher Observations:', margin, yPosition, pageWidth - 2 * margin, 10, true);
    yPosition += 3;
    
    student.character.teacherObservations.forEach(obs => {
      checkNewPage(20);
      yPosition = addText(`${obs.teacher}:`, margin + 5, yPosition, pageWidth - 2 * margin - 5, 9, true);
      yPosition += 2;
      yPosition = addText(`"${obs.observation}"`, margin + 5, yPosition, pageWidth - 2 * margin - 5, 9);
      yPosition += 5;
    });
  }

  checkNewPage(20);

  // Milestones Section
  pdf.setFillColor(240, 240, 240);
  pdf.rect(margin, yPosition, pageWidth - 2 * margin, 8, 'F');
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('🏆 MILESTONES & ACHIEVEMENTS', margin + 2, yPosition + 6);
  yPosition += 12;

  if (student.milestones && student.milestones.length > 0) {
    const sortedMilestones = [...student.milestones].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );

    sortedMilestones.forEach(milestone => {
      checkNewPage(15);
      
      const dateStr = milestone.date ? format(new Date(milestone.date), 'MMMM yyyy') : 'Date TBD';
      yPosition = addText(
        `${dateStr} - ${milestone.title}`,
        margin,
        yPosition,
        pageWidth - 2 * margin,
        10,
        true
      );
      yPosition += 2;
      
      if (milestone.description) {
        yPosition = addText(
          milestone.description,
          margin + 5,
          yPosition,
          pageWidth - 2 * margin - 5,
          9
        );
      }
      yPosition += 5;
    });
  }

  // Footer
  const totalPages = pdf.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(128, 128, 128);
    pdf.text(
      `Student Profile | Generated ${format(new Date(), 'MMMM dd, yyyy')} | Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  // Save the PDF
  pdf.save(`${student.name.replace(/\s+/g, '_')}_Student_Profile.pdf`);
};
