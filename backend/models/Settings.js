const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    default: 'RenewCred CMS'
  },
  siteDescription: {
    type: String,
    default: 'A modern Headless CMS'
  },
  logo: String,
  favicon: String,
  socialLinks: {
    type: Map,
    of: String
  },
  navigation: [{
    label: String,
    url: String,
    order: Number
  }],
  footerText: String,
  theme: {
    primaryColor: { type: String, default: '#3b82f6' },
    secondaryColor: { type: String, default: '#10b981' },
    fontFamily: { type: String, default: 'Inter' }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Settings', settingsSchema);
