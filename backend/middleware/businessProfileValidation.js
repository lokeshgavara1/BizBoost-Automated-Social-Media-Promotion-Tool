// middleware/businessProfileValidation.js
const { body, validationResult } = require('express-validator');

const validateBusinessProfile = [
  body('businessName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Business name must be between 2 and 100 characters'),
  
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  
  // Handle both direct field access and FormData stringified format
  body('contactInfo.email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  // Alternative validation for when contactInfo comes as stringified JSON
  body('contactInfo')
    .optional()
    .custom((value, { req }) => {
      console.log('Validating contactInfo:', value, 'Type:', typeof value);
      if (typeof value === 'string') {
        try {
          const parsed = JSON.parse(value);
          console.log('Parsed contactInfo:', parsed);
          if (!parsed.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parsed.email)) {
            throw new Error('Please provide a valid email address');
          }
          return true;
        } catch (error) {
          console.error('ContactInfo validation error:', error);
          throw new Error('Invalid contactInfo format');
        }
      }
      return true;
    }),
  
  body('contactInfo.phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  
  body('website')
    .optional()
    .isURL()
    .withMessage('Please provide a valid website URL'),
  
  body('socialLinks.facebook')
    .optional()
    .isURL()
    .withMessage('Please provide a valid Facebook URL'),
  
  body('socialLinks.twitter')
    .optional()
    .isURL()
    .withMessage('Please provide a valid Twitter URL'),
  
  body('socialLinks.instagram')
    .optional()
    .isURL()
    .withMessage('Please provide a valid Instagram URL'),
  
  body('socialLinks.linkedin')
    .optional()
    .isURL()
    .withMessage('Please provide a valid LinkedIn URL'),
  
  body('industry')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Industry must be between 2 and 50 characters'),
  
  body('foundedYear')
    .optional()
    .isInt({ min: 1800, max: new Date().getFullYear() })
    .withMessage('Please provide a valid founding year'),
  
  body('employeeCount')
    .optional()
    .isIn(['1-10', '11-50', '51-200', '201-500', '500+'])
    .withMessage('Please select a valid employee count range')
];

module.exports = validateBusinessProfile;
