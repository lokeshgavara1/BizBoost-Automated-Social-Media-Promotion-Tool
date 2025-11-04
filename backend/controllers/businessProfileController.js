// controllers/businessProfileController.js
const BusinessProfile = require('../models/BusinessProfile');
const { validationResult } = require('express-validator');

// Create business profile
exports.createProfile = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    console.log('Raw request body:', req.body);
    console.log('Files:', req.file);

    let {
      businessName,
      description,
      contactInfo,
      website,
      socialLinks,
      industry,
      foundedYear,
      employeeCount
    } = req.body;

    // Parse JSON fields if they come as strings
    if (typeof contactInfo === 'string') {
      try {
        contactInfo = JSON.parse(contactInfo);
        console.log('Parsed contactInfo:', contactInfo);
      } catch (parseError) {
        console.error('Error parsing contactInfo:', parseError);
        return res.status(400).json({ message: 'Invalid contactInfo format' });
      }
    }
    if (typeof socialLinks === 'string') {
      try {
        socialLinks = JSON.parse(socialLinks);
        console.log('Parsed socialLinks:', socialLinks);
      } catch (parseError) {
        console.error('Error parsing socialLinks:', parseError);
        return res.status(400).json({ message: 'Invalid socialLinks format' });
      }
    }

    console.log('Processed data:', {
      businessName,
      description,
      contactInfo,
      website,
      socialLinks,
      industry,
      foundedYear,
      employeeCount
    });

    // Check if user already has a business profile
    const existingProfile = await BusinessProfile.findOne({ user: req.user.id });
    if (existingProfile) {
      return res.status(400).json({ message: 'Business profile already exists for this user' });
    }

    // Handle logo upload
    let logoPath = null;
    if (req.file) {
      logoPath = req.file.path; // You might want to store the full URL instead
    }

    const businessProfile = new BusinessProfile({
      user: req.user.id,
      businessName,
      description,
      contactInfo,
      logo: logoPath,
      website,
      socialLinks,
      industry,
      foundedYear,
      employeeCount
    });

    await businessProfile.save();

    res.status(201).json({
      success: true,
      message: 'Business profile created successfully',
      data: businessProfile
    });
  } catch (error) {
    console.error('Error creating business profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get business profile
exports.getProfile = async (req, res) => {
  try {
    const businessProfile = await BusinessProfile.findOne({ user: req.user.id });
    
    if (!businessProfile) {
      return res.status(404).json({
        success: false,
        message: 'Business profile not found'
      });
    }

    res.status(200).json({
      success: true,
      data: businessProfile
    });
  } catch (error) {
    console.error('Error fetching business profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update business profile
exports.updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const businessProfile = await BusinessProfile.findOne({ user: req.user.id });
    
    if (!businessProfile) {
      return res.status(404).json({
        success: false,
        message: 'Business profile not found'
      });
    }

    // Handle logo upload
    if (req.file) {
      req.body.logo = req.file.path;
    }

    const updatedProfile = await BusinessProfile.findByIdAndUpdate(
      businessProfile._id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Business profile updated successfully',
      data: updatedProfile
    });
  } catch (error) {
    console.error('Error updating business profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete business profile
exports.deleteProfile = async (req, res) => {
  try {
    const businessProfile = await BusinessProfile.findOne({ user: req.user.id });
    
    if (!businessProfile) {
      return res.status(404).json({
        success: false,
        message: 'Business profile not found'
      });
    }

    await BusinessProfile.findByIdAndDelete(businessProfile._id);

    res.status(200).json({
      success: true,
      message: 'Business profile deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting business profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
