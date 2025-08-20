// src/components/BusinessProfileForm.jsx
import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import '../styles/BusinessProfile.css';

const BusinessProfileForm = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [profile, setProfile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [formData, setFormData] = useState({
    businessName: '',
    description: '',
    contactInfo: {
      email: '',
      phone: '',
      address: ''
    },
    website: '',
    socialLinks: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: ''
    },
    industry: '',
    foundedYear: '',
    employeeCount: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/business-profile');
      if (response.data.success) {
        setProfile(response.data.data);
        setFormData({
          businessName: response.data.data.businessName || '',
          description: response.data.data.description || '',
          contactInfo: {
            email: response.data.data.contactInfo?.email || '',
            phone: response.data.data.contactInfo?.phone || '',
            address: response.data.data.contactInfo?.address || ''
          },
          website: response.data.data.website || '',
          socialLinks: {
            facebook: response.data.data.socialLinks?.facebook || '',
            twitter: response.data.data.socialLinks?.twitter || '',
            instagram: response.data.data.socialLinks?.instagram || '',
            linkedin: response.data.data.socialLinks?.linkedin || ''
          },
          industry: response.data.data.industry || '',
          foundedYear: response.data.data.foundedYear || '',
          employeeCount: response.data.data.employeeCount || ''
        });
        if (response.data.data.logo) {
          setImagePreview(`http://localhost:5000/${response.data.data.logo}`);
        }
      }
    } catch (error) {
      if (error.response?.status !== 404) {
        console.error('Error fetching profile:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('Input change:', name, value);
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Log current form data after update
    setTimeout(() => {
      console.log('Current form data:', formData);
    }, 0);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, logo: 'Image size must be less than 5MB' }));
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setErrors(prev => ({ ...prev, logo: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.contactInfo.email.trim()) {
      newErrors['contactInfo.email'] = 'Email is required';
    } else {
      // More standard email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.contactInfo.email.trim())) {
        newErrors['contactInfo.email'] = 'Please enter a valid email address (e.g., example@domain.com)';
      }
    }

    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = 'Please enter a valid website URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form data before validation:', formData);
    
    if (!validateForm()) {
      console.log('Validation failed, errors:', errors);
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const formDataToSend = new FormData();
      
      // Append basic fields
      formDataToSend.append('businessName', formData.businessName);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('industry', formData.industry);
      formDataToSend.append('foundedYear', formData.foundedYear);
      formDataToSend.append('employeeCount', formData.employeeCount);
      formDataToSend.append('website', formData.website);
      
      // Append nested objects as JSON strings
      formDataToSend.append('contactInfo', JSON.stringify(formData.contactInfo));
      formDataToSend.append('socialLinks', JSON.stringify(formData.socialLinks));

      // Append logo if selected
      const logoInput = document.getElementById('logo');
      if (logoInput.files[0]) {
        formDataToSend.append('logo', logoInput.files[0]);
      }

      // Log what's being sent
      console.log('FormData being sent:');
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }

      const endpoint = '/business-profile';
      const method = profile ? 'put' : 'post';

      console.log('Sending request to:', endpoint, 'with method:', method);

      const response = await axios({
        method,
        url: endpoint,
        data: formDataToSend,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Response received:', response.data);

      if (response.data.success) {
        setMessage(profile ? 'Profile updated successfully!' : 'Profile created successfully!');
        setProfile(response.data.data);
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      console.error('Error response:', error.response?.data);
      if (error.response?.data?.errors) {
        const validationErrors = {};
        error.response.data.errors.forEach(err => {
          validationErrors[err.path] = err.msg;
        });
        setErrors(validationErrors);
      } else {
        setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="business-profile-form">
      <h2>{profile ? 'Edit Business Profile' : 'Create Business Profile'}</h2>
      
      {message && (
        <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Basic Information</h3>
          
          <div className="form-group">
            <label htmlFor="businessName">Business Name *</label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              className={errors.businessName ? 'error' : ''}
            />
            {errors.businessName && <span className="error-text">{errors.businessName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="industry">Industry</label>
            <input
              type="text"
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="foundedYear">Founded Year</label>
              <input
                type="number"
                id="foundedYear"
                name="foundedYear"
                value={formData.foundedYear}
                onChange={handleInputChange}
                min="1800"
                max={new Date().getFullYear()}
              />
            </div>

            <div className="form-group">
              <label htmlFor="employeeCount">Employee Count</label>
              <select
                id="employeeCount"
                name="employeeCount"
                value={formData.employeeCount}
                onChange={handleInputChange}
              >
                <option value="">Select range</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201-500">201-500</option>
                <option value="500+">500+</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Contact Information</h3>
          
          <div className="form-group">
            <label htmlFor="contactInfo.email">Email *</label>
            <input
              type="email"
              id="contactInfo.email"
              name="contactInfo.email"
              value={formData.contactInfo.email}
              onChange={handleInputChange}
              className={errors['contactInfo.email'] ? 'error' : ''}
            />
            {errors['contactInfo.email'] && <span className="error-text">{errors['contactInfo.email']}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="contactInfo.phone">Phone</label>
            <input
              type="tel"
              id="contactInfo.phone"
              name="contactInfo.phone"
              value={formData.contactInfo.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactInfo.address">Address</label>
            <textarea
              id="contactInfo.address"
              name="contactInfo.address"
              value={formData.contactInfo.address}
              onChange={handleInputChange}
              rows="3"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Logo & Branding</h3>
          
          <div className="form-group">
            <label htmlFor="logo">Business Logo</label>
            <input
              type="file"
              id="logo"
              name="logo"
              accept="image/*"
              onChange={handleImageChange}
              className={errors.logo ? 'error' : ''}
            />
            {errors.logo && <span className="error-text">{errors.logo}</span>}
            <small>Max size: 5MB. Supported formats: JPG, PNG, GIF</small>
          </div>

          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Logo preview" />
            </div>
          )}
        </div>

        <div className="form-section">
          <h3>Online Presence</h3>
          
          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="https://example.com"
              className={errors.website ? 'error' : ''}
            />
            {errors.website && <span className="error-text">{errors.website}</span>}
          </div>

          <div className="social-links">
            <h4>Social Media Links</h4>
            
            <div className="form-group">
              <label htmlFor="socialLinks.facebook">Facebook</label>
              <input
                type="url"
                id="socialLinks.facebook"
                name="socialLinks.facebook"
                value={formData.socialLinks.facebook}
                onChange={handleInputChange}
                placeholder="https://facebook.com/yourpage"
              />
            </div>

            <div className="form-group">
              <label htmlFor="socialLinks.twitter">Twitter</label>
              <input
                type="url"
                id="socialLinks.twitter"
                name="socialLinks.twitter"
                value={formData.socialLinks.twitter}
                onChange={handleInputChange}
                placeholder="https://twitter.com/yourhandle"
              />
            </div>

            <div className="form-group">
              <label htmlFor="socialLinks.instagram">Instagram</label>
              <input
                type="url"
                id="socialLinks.instagram"
                name="socialLinks.instagram"
                value={formData.socialLinks.instagram}
                onChange={handleInputChange}
                placeholder="https://instagram.com/yourprofile"
              />
            </div>

            <div className="form-group">
              <label htmlFor="socialLinks.linkedin">LinkedIn</label>
              <input
                type="url"
                id="socialLinks.linkedin"
                name="socialLinks.linkedin"
                value={formData.socialLinks.linkedin}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Saving...' : (profile ? 'Update Profile' : 'Create Profile')}
          </button>
          
          {/* Debug button - remove this in production */}
          <button 
            type="button" 
            onClick={() => {
              console.log('Current form data:', formData);
              console.log('Email value:', formData.contactInfo.email);
              console.log('Form errors:', errors);
            }}
            style={{ marginLeft: '10px', padding: '10px', backgroundColor: '#f0f0f0' }}
          >
            Debug Form Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessProfileForm;
