import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.css'; // Add styles

const App = () => {
  const [emailTemplate, setEmailTemplate] = useState('');  // Stores HTML from backend
  const [emailData, setEmailData] = useState({
    title: '',
    content: '',
    footer: '',
    imageUrl: ''
  });

  // Fetch email template from backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/template')
      .then(response => setEmailTemplate(response.data))
      .catch(error => console.error('Error fetching template:', error));
  }, []);

  // Handle text changes
  const handleInputChange = (key, value) => {
    setEmailData(prevState => ({ ...prevState, [key]: value }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setEmailData(prevState => ({ ...prevState, imageUrl: reader.result }));
    };
    if (file) reader.readAsDataURL(file);
  };

  return (
    <div className="email-builder">
      {/* Left Panel - Email Preview */}
      <div className="left-panel">
        <div className="email-preview">
          <h2>{emailData.title || 'Default Title'}</h2>
          <img src={emailData.imageUrl || 'https://via.placeholder.com/300'} alt="Uploaded" />
          <div dangerouslySetInnerHTML={{ __html: emailData.content || emailTemplate }} />
          <p>{emailData.footer || 'Default Footer'}</p>
        </div>
      </div>

      {/* Right Panel - Editor */}
      <div className="right-panel">
        <h3>Edit Email</h3>
        <label>Title:</label>
        <input
          type="text"
          value={emailData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
        />

        <label>Content:</label>
        <ReactQuill
          value={emailData.content}
          onChange={(value) => handleInputChange('content', value)}
        />

        <label>Upload Image:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />

        <label>Footer:</label>
        <input
          type="text"
          value={emailData.footer}
          onChange={(e) => handleInputChange('footer', e.target.value)}
        />

        <button onClick={() => console.log(emailData)}>Save Email</button>
      </div>
    </div>
  );
};

export default App;
