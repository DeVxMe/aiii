import React, { useState } from 'react';
import { Download, FileText, User, Briefcase, GraduationCap, Code, Award, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    personal_info: {
      name: '',
      email: '',
      phone: '',
      linkedin: '',
      github: '',
      portfolio: ''
    },
    summary: '',
    work_experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    interests: []
  });

  const [loading, setLoading] = useState(false);
  const [currentWorkExp, setCurrentWorkExp] = useState({
    title: '',
    company: '',
    duration: '',
    responsibilities: ['']
  });
  const [currentEducation, setCurrentEducation] = useState({
    degree: '',
    institution: '',
    year: ''
  });
  const [currentProject, setCurrentProject] = useState({
    name: '',
    tech_stack: [''],
    description: '',
    link: ''
  });

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayInputChange = (section, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: value.split(',').map(item => item.trim()).filter(item => item)
    }));
  };

  const addWorkExperience = () => {
    if (currentWorkExp.title && currentWorkExp.company) {
      setFormData(prev => ({
        ...prev,
        work_experience: [...prev.work_experience, { ...currentWorkExp }]
      }));
      setCurrentWorkExp({
        title: '',
        company: '',
        duration: '',
        responsibilities: ['']
      });
      toast.success('Work experience added!');
    } else {
      toast.error('Please fill in title and company');
    }
  };

  const removeWorkExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      work_experience: prev.work_experience.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    if (currentEducation.degree && currentEducation.institution) {
      setFormData(prev => ({
        ...prev,
        education: [...prev.education, { ...currentEducation }]
      }));
      setCurrentEducation({
        degree: '',
        institution: '',
        year: ''
      });
      toast.success('Education added!');
    } else {
      toast.error('Please fill in degree and institution');
    }
  };

  const removeEducation = (index) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addProject = () => {
    if (currentProject.name && currentProject.description) {
      setFormData(prev => ({
        ...prev,
        projects: [...prev.projects, { ...currentProject }]
      }));
      setCurrentProject({
        name: '',
        tech_stack: [''],
        description: '',
        link: ''
      });
      toast.success('Project added!');
    } else {
      toast.error('Please fill in project name and description');
    }
  };

  const removeProject = (index) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const generateResume = async () => {
    if (!formData.personal_info.name) {
      toast.error('Please enter your name');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/generate-resume', formData);
      
      if (response.data.success) {
        // Create download link
        const link = document.createElement('a');
        link.href = response.data.downloadUrl;
        link.download = response.data.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast.success('Resume generated successfully!');
      }
    } catch (error) {
      console.error('Error generating resume:', error);
      toast.error(error.response?.data?.error || 'Failed to generate resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header fade-in">
          <div className="header-content">
            <div className="logo">
              <FileText size={32} />
              <h1>AI Resume Builder</h1>
            </div>
            <p className="subtitle">Create professional resumes for modern tech & Web3 roles</p>
          </div>
        </header>

        <main className="main-content">
          <div className="form-container">
            {/* Personal Information */}
            <div className="card fade-in">
              <div className="card-header">
                <div className="card-title">
                  <User size={20} />
                  Personal Information
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.personal_info.name}
                    onChange={(e) => handleInputChange('personal_info', 'name', e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    value={formData.personal_info.email}
                    onChange={(e) => handleInputChange('personal_info', 'email', e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={formData.personal_info.phone}
                    onChange={(e) => handleInputChange('personal_info', 'phone', e.target.value)}
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">LinkedIn</label>
                  <input
                    type="url"
                    className="form-input"
                    value={formData.personal_info.linkedin}
                    onChange={(e) => handleInputChange('personal_info', 'linkedin', e.target.value)}
                    placeholder="linkedin.com/in/johndoe"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">GitHub</label>
                  <input
                    type="url"
                    className="form-input"
                    value={formData.personal_info.github}
                    onChange={(e) => handleInputChange('personal_info', 'github', e.target.value)}
                    placeholder="github.com/johndoe"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Portfolio</label>
                  <input
                    type="url"
                    className="form-input"
                    value={formData.personal_info.portfolio}
                    onChange={(e) => handleInputChange('personal_info', 'portfolio', e.target.value)}
                    placeholder="johndoe.dev"
                  />
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="card fade-in">
              <div className="card-header">
                <div className="card-title">
                  <FileText size={20} />
                  Professional Summary
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Summary (2-3 concise sentences)</label>
                <textarea
                  className="form-input form-textarea"
                  value={formData.summary}
                  onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                  placeholder="Experienced full-stack developer with expertise in modern web technologies and blockchain development..."
                />
              </div>
            </div>

            {/* Work Experience */}
            <div className="card fade-in">
              <div className="card-header">
                <div className="card-title">
                  <Briefcase size={20} />
                  Work Experience
                </div>
              </div>
              
              {/* Current Work Experience Form */}
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Job Title</label>
                  <input
                    type="text"
                    className="form-input"
                    value={currentWorkExp.title}
                    onChange={(e) => setCurrentWorkExp(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Full Stack Developer"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Company</label>
                  <input
                    type="text"
                    className="form-input"
                    value={currentWorkExp.company}
                    onChange={(e) => setCurrentWorkExp(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Tech Company Inc."
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Duration</label>
                  <input
                    type="text"
                    className="form-input"
                    value={currentWorkExp.duration}
                    onChange={(e) => setCurrentWorkExp(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="Jan 2023 - Present"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Responsibilities (one per line)</label>
                {currentWorkExp.responsibilities.map((resp, index) => (
                  <input
                    key={index}
                    type="text"
                    className="form-input"
                    style={{ marginBottom: '8px' }}
                    value={resp}
                    onChange={(e) => {
                      const newResponsibilities = [...currentWorkExp.responsibilities];
                      newResponsibilities[index] = e.target.value;
                      setCurrentWorkExp(prev => ({ ...prev, responsibilities: newResponsibilities }));
                    }}
                    placeholder="Developed web applications using React and Node.js"
                  />
                ))}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setCurrentWorkExp(prev => ({
                    ...prev,
                    responsibilities: [...prev.responsibilities, '']
                  }))}
                >
                  <Plus size={16} />
                  Add Responsibility
                </button>
              </div>
              
              <button type="button" className="btn btn-primary" onClick={addWorkExperience}>
                <Plus size={16} />
                Add Work Experience
              </button>

              {/* Display Added Work Experience */}
              {formData.work_experience.map((exp, index) => (
                <div key={index} className="added-item">
                  <div className="added-item-content">
                    <h4>{exp.title} at {exp.company}</h4>
                    <p>{exp.duration}</p>
                    <ul>
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => removeWorkExperience(index)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="card fade-in">
              <div className="card-header">
                <div className="card-title">
                  <GraduationCap size={20} />
                  Education
                </div>
              </div>
              
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Degree</label>
                  <input
                    type="text"
                    className="form-input"
                    value={currentEducation.degree}
                    onChange={(e) => setCurrentEducation(prev => ({ ...prev, degree: e.target.value }))}
                    placeholder="Bachelor of Science in Computer Science"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Institution</label>
                  <input
                    type="text"
                    className="form-input"
                    value={currentEducation.institution}
                    onChange={(e) => setCurrentEducation(prev => ({ ...prev, institution: e.target.value }))}
                    placeholder="University of Technology"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Year</label>
                  <input
                    type="text"
                    className="form-input"
                    value={currentEducation.year}
                    onChange={(e) => setCurrentEducation(prev => ({ ...prev, year: e.target.value }))}
                    placeholder="2023"
                  />
                </div>
              </div>
              
              <button type="button" className="btn btn-primary" onClick={addEducation}>
                <Plus size={16} />
                Add Education
              </button>

              {/* Display Added Education */}
              {formData.education.map((edu, index) => (
                <div key={index} className="added-item">
                  <div className="added-item-content">
                    <h4>{edu.degree}</h4>
                    <p>{edu.institution} • {edu.year}</p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => removeEducation(index)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="card fade-in">
              <div className="card-header">
                <div className="card-title">
                  <Code size={20} />
                  Technical Skills
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Skills (comma-separated)</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.skills.join(', ')}
                  onChange={(e) => handleArrayInputChange('skills', e.target.value)}
                  placeholder="React, Node.js, Solidity, Web3.js, TypeScript, AWS"
                />
              </div>
            </div>

            {/* Projects */}
            <div className="card fade-in">
              <div className="card-header">
                <div className="card-title">
                  <Code size={20} />
                  Projects
                </div>
              </div>
              
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Project Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={currentProject.name}
                    onChange={(e) => setCurrentProject(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="NFT Marketplace"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Tech Stack (comma-separated)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={currentProject.tech_stack.join(', ')}
                    onChange={(e) => setCurrentProject(prev => ({
                      ...prev,
                      tech_stack: e.target.value.split(',').map(item => item.trim()).filter(item => item)
                    }))}
                    placeholder="Next.js, Solidity, Web3.js"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-input form-textarea"
                  value={currentProject.description}
                  onChange={(e) => setCurrentProject(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Built a decentralized NFT marketplace with..."
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Project Link</label>
                <input
                  type="url"
                  className="form-input"
                  value={currentProject.link}
                  onChange={(e) => setCurrentProject(prev => ({ ...prev, link: e.target.value }))}
                  placeholder="github.com/username/project"
                />
              </div>
              
              <button type="button" className="btn btn-primary" onClick={addProject}>
                <Plus size={16} />
                Add Project
              </button>

              {/* Display Added Projects */}
              {formData.projects.map((project, index) => (
                <div key={index} className="added-item">
                  <div className="added-item-content">
                    <h4>{project.name}</h4>
                    <p><strong>Tech Stack:</strong> {project.tech_stack.join(', ')}</p>
                    <p>{project.description}</p>
                    {project.link && <p><strong>Link:</strong> {project.link}</p>}
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => removeProject(index)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Optional Sections */}
            <div className="card fade-in">
              <div className="card-header">
                <div className="card-title">
                  <Award size={20} />
                  Additional Information (Optional)
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Certifications (comma-separated)</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.certifications.join(', ')}
                  onChange={(e) => handleArrayInputChange('certifications', e.target.value)}
                  placeholder="AWS Certified Developer, Blockchain Developer Nanodegree"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Languages (comma-separated)</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.languages.join(', ')}
                  onChange={(e) => handleArrayInputChange('languages', e.target.value)}
                  placeholder="English, Spanish, French"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Interests & Hobbies (comma-separated)</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.interests.join(', ')}
                  onChange={(e) => handleArrayInputChange('interests', e.target.value)}
                  placeholder="Open Source, Blockchain, Gaming, Travel"
                />
              </div>
            </div>

            {/* Generate Resume Button */}
            <div className="generate-section fade-in">
              <button
                type="button"
                className="btn btn-primary generate-btn"
                onClick={generateResume}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="loading"></div>
                    Generating Resume...
                  </>
                ) : (
                  <>
                    <Download size={20} />
                    Generate Resume (DOCX)
                  </>
                )}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;