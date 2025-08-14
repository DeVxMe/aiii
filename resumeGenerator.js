const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Tab, Table, TableRow, TableCell, WidthType, BorderStyle, Spacing, LineRuleType } = require('docx');

async function generateResume(resumeData) {
  const doc = new Document({
    sections: [{
      properties: {
        page: {
          margin: {
            top: 1440, // 1 inch
            right: 1440,
            bottom: 1440,
            left: 1440,
          },
        },
      },
      children: [
        // Header with name and contact info
        createHeader(resumeData.personal_info),
        
        // Professional Summary
        createSummary(resumeData.summary),
        
        // Work Experience
        createWorkExperience(resumeData.work_experience),
        
        // Education
        createEducation(resumeData.education),
        
        // Skills
        createSkills(resumeData.skills),
        
        // Projects
        createProjects(resumeData.projects),
        
        // Optional sections
        ...(resumeData.certifications ? [createCertifications(resumeData.certifications)] : []),
        ...(resumeData.languages ? [createLanguages(resumeData.languages)] : []),
        ...(resumeData.interests ? [createInterests(resumeData.interests)] : []),
      ],
    }],
  });

  return await Packer.toBuffer(doc);
}

function createHeader(personalInfo) {
  const children = [
    // Name
    new Paragraph({
      text: personalInfo.name,
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: {
        after: 200,
        before: 0,
      },
    }),
    
    // Contact information
    new Paragraph({
      children: [
        new TextRun({
          text: personalInfo.email || '',
          size: 20,
        }),
        new TextRun({
          text: ' • ',
          size: 20,
        }),
        new TextRun({
          text: personalInfo.phone || '',
          size: 20,
        }),
        ...(personalInfo.linkedin ? [
          new TextRun({
            text: ' • ',
            size: 20,
          }),
          new TextRun({
            text: personalInfo.linkedin,
            size: 20,
          }),
        ] : []),
        ...(personalInfo.github ? [
          new TextRun({
            text: ' • ',
            size: 20,
          }),
          new TextRun({
            text: personalInfo.github,
            size: 20,
          }),
        ] : []),
        ...(personalInfo.portfolio ? [
          new TextRun({
            text: ' • ',
            size: 20,
          }),
          new TextRun({
            text: personalInfo.portfolio,
            size: 20,
          }),
        ] : []),
      ],
      alignment: AlignmentType.CENTER,
      spacing: {
        after: 400,
        before: 0,
      },
    }),
  ];

  return children;
}

function createSummary(summary) {
  if (!summary) return [];
  
  return [
    new Paragraph({
      text: 'PROFESSIONAL SUMMARY',
      heading: HeadingLevel.HEADING_2,
      spacing: {
        after: 200,
        before: 200,
      },
    }),
    new Paragraph({
      text: summary,
      spacing: {
        after: 400,
        before: 0,
      },
    }),
  ];
}

function createWorkExperience(workExperience) {
  if (!workExperience || workExperience.length === 0) return [];
  
  const children = [
    new Paragraph({
      text: 'WORK EXPERIENCE',
      heading: HeadingLevel.HEADING_2,
      spacing: {
        after: 200,
        before: 200,
      },
    }),
  ];

  workExperience.forEach((job, index) => {
    // Job title and company
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: job.title,
            bold: true,
            size: 22,
          }),
          new TextRun({
            text: ' at ',
            size: 22,
          }),
          new TextRun({
            text: job.company,
            bold: true,
            size: 22,
          }),
          new TextRun({
            text: ' • ',
            size: 22,
          }),
          new TextRun({
            text: job.duration,
            size: 22,
          }),
        ],
        spacing: {
          after: 100,
          before: index === 0 ? 0 : 200,
        },
      })
    );

    // Responsibilities
    if (job.responsibilities && job.responsibilities.length > 0) {
      job.responsibilities.forEach(responsibility => {
        children.push(
          new Paragraph({
            text: `• ${responsibility}`,
            spacing: {
              after: 100,
              before: 0,
            },
            indent: {
              left: 720, // 0.5 inch
            },
          })
        );
      });
    }
  });

  children.push(
    new Paragraph({
      spacing: {
        after: 400,
        before: 0,
      },
    })
  );

  return children;
}

function createEducation(education) {
  if (!education || education.length === 0) return [];
  
  const children = [
    new Paragraph({
      text: 'EDUCATION',
      heading: HeadingLevel.HEADING_2,
      spacing: {
        after: 200,
        before: 200,
      },
    }),
  ];

  education.forEach((edu, index) => {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: edu.degree,
            bold: true,
            size: 22,
          }),
          new TextRun({
            text: ' • ',
            size: 22,
          }),
          new TextRun({
            text: edu.institution,
            size: 22,
          }),
          new TextRun({
            text: ' • ',
            size: 22,
          }),
          new TextRun({
            text: edu.year,
            size: 22,
          }),
        ],
        spacing: {
          after: index === education.length - 1 ? 400 : 100,
          before: index === 0 ? 0 : 100,
        },
      })
    );
  });

  return children;
}

function createSkills(skills) {
  if (!skills || skills.length === 0) return [];
  
  return [
    new Paragraph({
      text: 'TECHNICAL SKILLS',
      heading: HeadingLevel.HEADING_2,
      spacing: {
        after: 200,
        before: 200,
      },
    }),
    new Paragraph({
      text: skills.join(' • '),
      spacing: {
        after: 400,
        before: 0,
      },
    }),
  ];
}

function createProjects(projects) {
  if (!projects || projects.length === 0) return [];
  
  const children = [
    new Paragraph({
      text: 'PROJECTS',
      heading: HeadingLevel.HEADING_2,
      spacing: {
        after: 200,
        before: 200,
      },
    }),
  ];

  projects.forEach((project, index) => {
    // Project name and tech stack
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: project.name,
            bold: true,
            size: 22,
          }),
          new TextRun({
            text: ' • ',
            size: 22,
          }),
          new TextRun({
            text: project.tech_stack.join(', '),
            size: 22,
          }),
        ],
        spacing: {
          after: 100,
          before: index === 0 ? 0 : 200,
        },
      })
    );

    // Project description
    if (project.description) {
      children.push(
        new Paragraph({
          text: project.description,
          spacing: {
            after: 100,
            before: 0,
          },
          indent: {
            left: 720, // 0.5 inch
          },
        })
      );
    }

    // Project link
    if (project.link) {
      children.push(
        new Paragraph({
          text: `Link: ${project.link}`,
          spacing: {
            after: 100,
            before: 0,
          },
          indent: {
            left: 720, // 0.5 inch
          },
        })
      );
    }
  });

  children.push(
    new Paragraph({
      spacing: {
        after: 400,
        before: 0,
      },
    })
  );

  return children;
}

function createCertifications(certifications) {
  if (!certifications || certifications.length === 0) return [];
  
  const children = [
    new Paragraph({
      text: 'CERTIFICATIONS & ACHIEVEMENTS',
      heading: HeadingLevel.HEADING_2,
      spacing: {
        after: 200,
        before: 200,
      },
    }),
  ];

  certifications.forEach((cert, index) => {
    children.push(
      new Paragraph({
        text: `• ${cert}`,
        spacing: {
          after: index === certifications.length - 1 ? 400 : 100,
          before: index === 0 ? 0 : 100,
        },
        indent: {
          left: 720, // 0.5 inch
        },
      })
    );
  });

  return children;
}

function createLanguages(languages) {
  if (!languages || languages.length === 0) return [];
  
  return [
    new Paragraph({
      text: 'LANGUAGES',
      heading: HeadingLevel.HEADING_2,
      spacing: {
        after: 200,
        before: 200,
      },
    }),
    new Paragraph({
      text: languages.join(' • '),
      spacing: {
        after: 400,
        before: 0,
      },
    }),
  ];
}

function createInterests(interests) {
  if (!interests || interests.length === 0) return [];
  
  return [
    new Paragraph({
      text: 'INTERESTS & HOBBIES',
      heading: HeadingLevel.HEADING_2,
      spacing: {
        after: 200,
        before: 200,
      },
    }),
    new Paragraph({
      text: interests.join(' • '),
      spacing: {
        after: 400,
        before: 0,
      },
    }),
  ];
}

module.exports = { generateResume };