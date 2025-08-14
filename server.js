const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs-extra');
const { generateResume } = require('./resumeGenerator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Create uploads directory if it doesn't exist
fs.ensureDirSync(path.join(__dirname, 'uploads'));

// API Routes
app.post('/api/generate-resume', async (req, res) => {
  try {
    const resumeData = req.body;
    
    // Validate required fields
    if (!resumeData.personal_info || !resumeData.personal_info.name) {
      return res.status(400).json({ error: 'Personal information with name is required' });
    }

    // Generate the DOCX resume
    const docxBuffer = await generateResume(resumeData);
    
    // Create a unique filename
    const timestamp = Date.now();
    const filename = `resume_${resumeData.personal_info.name.replace(/\s+/g, '_')}_${timestamp}.docx`;
    const filepath = path.join(__dirname, 'uploads', filename);
    
    // Save the file
    await fs.writeFile(filepath, docxBuffer);
    
    // Return the download URL
    const downloadUrl = `/api/download/${filename}`;
    
    res.json({
      success: true,
      message: 'Resume generated successfully',
      downloadUrl: downloadUrl,
      filename: filename
    });
    
  } catch (error) {
    console.error('Error generating resume:', error);
    res.status(500).json({ error: 'Failed to generate resume', details: error.message });
  }
});

// Download route
app.get('/api/download/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, 'uploads', filename);
    
    if (!await fs.pathExists(filepath)) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    res.download(filepath, filename, (err) => {
      if (err) {
        console.error('Download error:', err);
      }
      // Clean up the file after download
      fs.remove(filepath).catch(console.error);
    });
    
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Failed to download file' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI Resume Builder is running' });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 AI Resume Builder server running on port ${PORT}`);
  console.log(`📝 Visit http://localhost:${PORT} to start building your resume`);
});