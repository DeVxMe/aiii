const axios = require('axios');
const fs = require('fs');

// Example resume data from README
const resumeData = {
  "personal_info": {
    "name": "Bimal Chalise",
    "email": "bimal@example.com",
    "phone": "+977 9800000000",
    "linkedin": "linkedin.com/in/bimalchalise",
    "github": "github.com/BiMalxMe",
    "portfolio": "bimalxfolio.vercel.app"
  },
  "summary": "Full-stack Web3 developer experienced in building decentralized applications with expertise in blockchain technology, smart contracts, and modern web development frameworks.",
  "work_experience": [
    {
      "title": "Full Stack Developer",
      "company": "TechLabs",
      "duration": "Jan 2024 - Present",
      "responsibilities": [
        "Developed web3 dApps using Next.js and Solidity",
        "Integrated blockchain APIs and wallets",
        "Implemented smart contracts for DeFi applications"
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
      "description": "Built a decentralized NFT marketplace with minting, trading, and auction features",
      "link": "github.com/BiMalxMe/nft-marketplace"
    }
  ],
  "certifications": ["Blockchain Developer Nanodegree"],
  "languages": ["English", "Nepali"],
  "interests": ["Open Source", "Blockchain", "Gaming"]
};

async function testResumeGeneration() {
  try {
    console.log('🚀 Testing AI Resume Builder...\n');
    
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get('http://localhost:3001/api/health');
    console.log('✅ Health check passed:', healthResponse.data.message);
    
    // Test resume generation
    console.log('\n2. Testing resume generation...');
    const response = await axios.post('http://localhost:3001/api/generate-resume', resumeData);
    
    if (response.data.success) {
      console.log('✅ Resume generated successfully!');
      console.log('📄 Filename:', response.data.filename);
      console.log('🔗 Download URL:', response.data.downloadUrl);
      
      // Test download
      console.log('\n3. Testing file download...');
      const downloadResponse = await axios.get(`http://localhost:3001${response.data.downloadUrl}`, {
        responseType: 'stream'
      });
      
      console.log('✅ File download successful!');
      console.log('📊 File size:', downloadResponse.headers['content-length'], 'bytes');
      console.log('📋 Content-Type:', downloadResponse.headers['content-type']);
      
    } else {
      console.log('❌ Resume generation failed:', response.data.error);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data?.error || error.message);
  }
}

// Run the test
testResumeGeneration();