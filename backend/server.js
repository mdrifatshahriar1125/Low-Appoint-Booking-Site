const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

// Initialize OpenAI - will work if API key is available
let openaiClient = null;
try {
  if (process.env.OPENAI_API_KEY) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    console.log('✅ OpenAI API initialized');
  } else {
    console.log('⚠️ OPENAI_API_KEY not found - using fallback chatbot');
  }
} catch (error) {
  console.log('⚠️ OpenAI initialization failed - using fallback chatbot');
}

// Middleware
app.use(cors());
app.use(express.json());

// Mock data storage
const mockLawyers = [
  { _id: '1', name: 'Sarah Johnson', speciality: 'Corporate Law', experience: 12, licenseNumber: 'LAW-001-2024', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop', fee: 150, availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
  { _id: '2', name: 'James Mitchell', speciality: 'Criminal Defense', experience: 15, licenseNumber: 'LAW-002-2024', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', fee: 200, availability: ['Monday', 'Wednesday', 'Friday'] },
  { _id: '3', name: 'Emily Richardson', speciality: 'Family Law', experience: 10, licenseNumber: 'LAW-003-2024', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop', fee: 120, availability: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
  { _id: '4', name: 'Robert Chen', speciality: 'Intellectual Property', experience: 14, licenseNumber: 'LAW-004-2024', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', fee: 180, availability: ['Monday', 'Tuesday', 'Thursday'] },
  { _id: '5', name: 'Maria Garcia', speciality: 'Immigration Law', experience: 11, licenseNumber: 'LAW-005-2024', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', fee: 140, availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'] },
  { _id: '6', name: 'David Thompson', speciality: 'Tax Law', experience: 16, licenseNumber: 'LAW-006-2024', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop', fee: 190, availability: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
  { _id: '7', name: 'Lisa Anderson', speciality: 'Real Estate Law', experience: 9, licenseNumber: 'LAW-007-2024', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop', fee: 110, availability: ['Monday', 'Wednesday', 'Friday'] },
  { _id: '8', name: 'Christopher Lee', speciality: 'Employment Law', experience: 13, licenseNumber: 'LAW-008-2024', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', fee: 160, availability: ['Monday', 'Tuesday', 'Wednesday', 'Friday'] },
  { _id: '9', name: 'Jennifer Martinez', speciality: 'Bankruptcy Law', experience: 10, licenseNumber: 'LAW-009-2024', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', fee: 130, availability: ['Tuesday', 'Thursday', 'Friday'] },
  { _id: '10', name: 'William Davis', speciality: 'Estate Planning', experience: 18, licenseNumber: 'LAW-010-2024', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop', fee: 170, availability: ['Monday', 'Tuesday', 'Thursday'] },
  { _id: '11', name: 'Susan Brown', speciality: 'Contracts', experience: 12, licenseNumber: 'LAW-011-2024', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop', fee: 150, availability: ['Monday', 'Wednesday', 'Thursday', 'Friday'] },
  { _id: '12', name: 'Michael Wilson', speciality: 'Litigation', experience: 14, licenseNumber: 'LAW-012-2024', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', fee: 175, availability: ['Tuesday', 'Wednesday', 'Thursday'] }
];

let mockAppointments = [];

// MongoDB Connection (Optional)
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lawyer-appointment');
    console.log('MongoDB connected');
    return true;
  } catch (error) {
    console.warn('MongoDB not available - using mock data:', error.message);
    return false;
  }
};

let dbConnected = false;
connectDB().then(result => { dbConnected = result; });

// Routes
app.use('/api/lawyers', require('./routes/lawyerRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));

// Intelligent chatbot with comprehensive Q&A
const chatbotResponses = {
  greeting: [
    'Hello! 👋 Welcome to LawBook. How can I assist you today?',
    'Hi there! Welcome to LawBook. What legal service are you looking for?',
    'Welcome! 🎯 I\'m your LawBook assistant. What can I help you with?',
    'Hey! 👋 Welcome! Ask me about lawyers, bookings, features, or anything else!'
  ],
  
  booking: [
    'To book an appointment:\n1️⃣ Browse our lawyers\n2️⃣ Click on their profile\n3️⃣ Fill appointment details (date, time, issue)\n4️⃣ Proceed to secure payment\n5️⃣ Confirmation email sent!',
    'Booking is easy! Find a lawyer → Choose date/time → Pay → Done! It takes just 2 minutes.',
    'Follow these steps:\n• Search for a lawyer\n• View their profile\n• Select appointment date\n• Complete payment\n• Get instant confirmation',
    'Simple 3-step process: 1) Find lawyer 2) Choose time 3) Pay securely'
  ],
  
  specialty: [
    'We have 10 specialties:\n🏢 Corporate Law\n⚖️ Criminal Defense\n👨‍👩‍👧‍👦 Family Law\n🔬 IP Law\n🌍 Immigration Law\n💰 Tax Law\n🏠 Real Estate\n💼 Employment Law\n💔 Bankruptcy\n📋 Estate Planning',
    'Our lawyers specialize in: Corporate, Criminal, Family, IP, Immigration, Tax, Real Estate, Employment, Bankruptcy, and Estate Planning!',
    'All major legal fields covered! From business to family law, we have experts. Use filters to find your specialty!',
    'Criminal, Family, Corporate, Real Estate, Immigration, Tax, Employment, IP, Bankruptcy, Estate Planning - we have them all!'
  ],
  
  payment: [
    '💳 Secure Stripe payment\n✅ Instant confirmation\n🔒 Encrypted transactions\n💰 No hidden fees\n📧 Payment receipt emailed',
    'We use Stripe for security. Pay online → Get confirmation → Chat with lawyer. All safe & secure!',
    'Payment details:\n• Accepted: Credit/Debit cards\n• Security: PCI-DSS compliant\n• Instant booking confirmation\n• No cancellation fees',
    'Safe payment through Stripe. Your information is encrypted. Instant booking after payment!'
  ],
  
  features: [
    'LawBook features:\n🌙 Dark mode\n🔍 Smart search\n💬 Live chat\n💳 Secure payment\n📱 Mobile app\n✨ Real-time updates\n⭐ Ratings & reviews',
    'We offer: Dark mode, advanced search, real-time chat with lawyers, secure payments, booking management, and more!',
    'Features:\n✅ Find lawyers by specialty\n✅ Real-time messaging\n✅ Secure payments\n✅ Manage bookings\n✅ Leave reviews',
    'Everything you need: Search, chat, pay, and manage - all in one app!'
  ],
  
  experience: [
    '👨‍⚖️ Our lawyers have 9-18+ years of experience\n📊 Filter by experience level\n⭐ All certified & licensed\n✅ Qualified professionals',
    'Experience ranges from 9 to 18+ years. Choose based on your preference! All are licensed professionals.',
    'We have:\n• Junior lawyers (9-12 years)\n• Senior lawyers (13-16 years)\n• Expert lawyers (17+ years)',
    'Experience filter available! Find lawyers with exactly the experience level you need.'
  ],
  
  price: [
    '💰 Consultation fees: $110-$200\n📊 Use price slider to filter\n🎯 Transparent pricing\n✅ No hidden charges',
    'Fees vary by specialty and experience. $110-$200 range. Use the price filter to find your budget!',
    'Pricing structure:\n• Junior lawyers: $110-$130\n• Mid-level: $130-$160\n• Senior lawyers: $160-$200',
    'Clear pricing! Filter by your budget and find the right lawyer.'
  ],
  
  search: [
    '🔍 Advanced search:\n1️⃣ Search by name or specialty\n2️⃣ Filter by experience\n3️⃣ Filter by price range\n4️⃣ Toggle to see results instantly!',
    'Our search is powerful! Type to search, then use advanced filters. Real-time results!',
    'Search tips:\n• Search box: Find by name\n• Specialty filter: Choose type\n• Experience slider: Select level\n• Price slider: Set budget',
    'Use the search to find exactly what you need - by name, specialty, experience, and price!'
  ],
  
  cancel: [
    '❌ To cancel appointment:\n1️⃣ Go to "My Bookings"\n2️⃣ Click appointment\n3️⃣ Hit "Cancel"\n4️⃣ Refund processed in 3-5 days\n⚠️ Cancel before appointment time',
    'Cancel anytime before your appointment in "My Bookings". Refund within 3-5 business days!',
    'Cancellation:\n• Must cancel before appointment\n• Full refund processed\n• Takes 3-5 days\n• Confirmation email sent',
    'Need to cancel? Go to bookings and hit cancel. Quick refund guaranteed!'
  ],
  
  reschedule: [
    '📅 To reschedule:\n1️⃣ Open "My Bookings"\n2️⃣ Click appointment\n3️⃣ Select "Reschedule"\n4️⃣ Choose new time\n5️⃣ Confirm\n✅ No extra charges!',
    'Rescheduling is free! Just go to your bookings, pick a new time, and confirm. Easy!',
    'Steps to reschedule:\n• Click appointment\n• Hit reschedule button\n• Pick new date/time\n• Save changes\n• Done!',
    'Simple rescheduling - no fees, no hassle! Change your time anytime.'
  ],
  
  ratings: [
    '⭐ Leave reviews on lawyer profiles\n📝 Rate 1-5 stars\n💬 Write comments\n👥 Help others decide\n🎁 Your feedback matters!',
    'Rate lawyers after your appointment! Your reviews help others find the best lawyer for them.',
    'How to rate:\n1. Open completed appointment\n2. Click "Rate Lawyer"\n3. Choose stars (1-5)\n4. Write review\n5. Submit',
    'Share your experience! Your ratings help build trust in our community.'
  ],
  
  darkmode: [
    '🌙 Dark mode:\n1️⃣ Click sun/moon icon in navbar\n2️⃣ Theme switches instantly\n3️⃣ Preference saved automatically\n✅ Easy on the eyes!',
    'Dark mode toggle in navbar! Click the sun/moon icon to switch. Your choice is saved!',
    'Dark mode features:\n• Easy on eyes\n• Reduces strain\n• Saves battery\n• Auto-saved preference',
    'Click the theme toggle in navbar for dark mode. Perfect for night browsing!'
  ],
  
  account: [
    '👤 Account settings:\n• View profile\n• Manage bookings\n• Payment history\n• Notification settings\n• Change password\n• Logout anytime',
    'Your account dashboard has everything - bookings, payments, settings, and more!',
    'In your account:\n✓ Profile info\n✓ Booking history\n✓ Payment records\n✓ Preferences\n✓ Security settings',
    'Full account control! Manage everything from your profile.'
  ],
  
  notifications: [
    '🔔 Get notified:\n📧 Email confirmations\n📱 App notifications\n⏰ Appointment reminders\n💬 Message alerts\n⚙️ Customize in settings',
    'You\'ll get notified for bookings, messages, and reminders. Adjust in notification settings!',
    'Notification types:\n• Booking confirmed\n• Appointment reminder\n• New message alert\n• Payment receipt\n• Cancellation notice',
    'Stay updated with notifications! Customize which alerts you receive.'
  ],
  
  mobile: [
    '📱 Mobile experience:\n• Fully responsive\n• PWA installable\n• Works offline\n• Touch-optimized\n• All features available',
    'Our app works great on mobile! Install on your home screen for app-like experience. Full functionality!',
    'Mobile features:\n✓ Install as app\n✓ Offline access\n✓ Push notifications\n✓ Quick booking\n✓ Chat on-the-go',
    'Perfect on any device! Responsive design and fully optimized for mobile.'
  ],
  
  emergency: [
    '🚨 Emergency consultation:\n📞 Contact support\n💬 Chat with us\n⏰ We respond within 30 mins\n👨‍⚖️ Urgent appointments available',
    'Need urgent help? Chat with us or browse urgent availability. Same-day appointments possible!',
    'For emergencies:\n• Use urgent filter\n• Chat support online\n• Priority response\n• Quick booking',
    'Urgent consultations available! Chat support can help prioritize your appointment.'
  ],
  
  support: [
    '💬 Need help?\n📧 Email: support@lawbook.com\n💬 Live chat: Always available\n⏰ Response: Within 30 mins\n🎯 We\'re here to help!',
    'Support team available 24/7! Use live chat or email. We respond quickly!',
    'Contact support:\n• Live chat (fastest)\n• Email support\n• In-app help center\n• FAQ section',
    'Having issues? Chat with support right now! We\'re here to help.'
  ],
  
  verification: [
    '✅ Lawyer verification:\n🔍 Licensed professionals\n📋 Credentials checked\n⭐ Background verified\n👨‍⚖️ Bar association certified',
    'All lawyers are verified, licensed, and certified. Trust & safety guaranteed!',
    'Every lawyer:\n✓ Licensed & certified\n✓ Verified credentials\n✓ Background checked\n✓ Professional insurance\n✓ Disciplinary records clear',
    'All professionals verified! We ensure only qualified lawyers on platform.'
  ],
  
  privacy: [
    '🔒 Your privacy:\n🔐 Encrypted data\n📋 GDPR compliant\n✅ No data selling\n🔒 Secure messaging',
    'Your data is secure! Encrypted, private, and never shared with third parties.',
    'Privacy features:\n• End-to-end encryption\n• GDPR compliant\n• Secure payment\n• Private consultations\n• Data protection',
    'Complete privacy protection! Your information stays confidential.'
  ],
  
  refund: [
    '💰 Refund policy:\n⏱️ Cancel before appointment\n💵 Full refund guaranteed\n📅 Processed in 3-5 days\n✅ No questions asked',
    'Cancel anytime before your appointment for full refund. Simple as that!',
    'Refund details:\n• Full amount refunded\n• Auto-processed\n• 3-5 business days\n• No cancellation fee',
    'Money-back guarantee if you cancel! Hassle-free refunds.'
  ],
  
  appointment_status: [
    '📅 Check appointment status:\n1️⃣ Go to "My Bookings"\n2️⃣ See all appointments\n3️⃣ View details\n4️⃣ Track progress',
    'View all appointments in "My Bookings" - pending, confirmed, completed, all in one place!',
    'Appointment statuses:\n• Pending payment\n• Confirmed\n• In progress\n• Completed\n• Cancelled',
    'Track every appointment in your bookings dashboard!'
  ],
  
  payment_history: [
    '💳 Payment history:\n📊 View all transactions\n📧 Download receipts\n📅 Filter by date\n💰 Total spent',
    'All payment records in account! View receipts anytime, download PDFs!',
    'In payment history:\n• All transactions\n• Receipt PDFs\n• Refund history\n• Invoice details\n• Date filters',
    'Full payment records available! Access receipts anytime.'
  ],
  
  lawyer_profile: [
    '👨‍⚖️ Lawyer profile includes:\n👤 Bio & photo\n⭐ Ratings & reviews\n📋 Specialties\n📊 Experience\n💰 Fee\n📅 Availability',
    'Each lawyer profile shows everything - experience, ratings, specialty, availability, and more!',
    'Profile details:\n✓ Qualifications\n✓ Years experience\n✓ Client reviews\n✓ Available times\n✓ Consultation fee',
    'Complete lawyer profiles help you choose the best fit!'
  ],
  
  help: [
    '🆘 I can help with:\n📚 How to use LawBook\n🔍 Finding lawyers\n📅 Booking appointments\n💳 Payments & refunds\n⚙️ Account management\n🔒 Privacy & security\n💬 Real-time support\n\nWhat would you like to know?',
    'Ask me about: Booking, lawyers, features, payments, account, privacy, mobile, or anything LawBook related!',
    'I\'m here for:\n✓ How to book\n✓ Finding lawyers\n✓ Technical help\n✓ Account issues\n✓ Payment questions\n✓ And much more!',
    'Any questions about LawBook? I can help with bookings, lawyers, payments, account, privacy - everything!'
  ]
};

const detectIntent = (message) => {
  const text = message.toLowerCase().trim();
  
  // Greeting patterns
  if (/hello|hi|hey|greetings|howdy|what.*up|sup/.test(text)) return 'greeting';
  
  // Booking patterns
  if (/book|appointment|how.*use|how.*book|tutorial|guide|steps|process/.test(text)) return 'booking';
  
  // Specialty patterns
  if (/specialty|specialize|type.*lawyer|criminal|family|corporate|immigration|tax|real.*estate|employment|bankruptcy|estate|ip.*law/.test(text)) return 'specialty';
  
  // Payment patterns
  if (/payment|pay|price|cost|fee|stripe|secure|credit|card|how.*pay/.test(text)) return 'payment';
  
  // Features patterns
  if (/feature|what.*can|capabilities|what.*do|app|works|available|offer/.test(text)) return 'features';
  
  // Experience patterns
  if (/experience|years|experienced|qualified|senior|junior/.test(text)) return 'experience';
  
  // Price patterns
  if (/price|fee|cost|budget|how.*much|range|charge|consultation/.test(text)) return 'price';
  
  // Search patterns
  if (/search|find|filter|look|browse|discover/.test(text)) return 'search';
  
  // Cancel patterns
  if (/cancel|withdraw|remove|delete|appointment.*cancel/.test(text)) return 'cancel';
  
  // Reschedule patterns
  if (/reschedule|change.*time|reschedule|move.*appointment|different.*time/.test(text)) return 'reschedule';
  
  // Rating patterns
  if (/rate|review|rating|feedback|opinion|comment/.test(text)) return 'ratings';
  
  // Dark mode patterns
  if (/dark.*mode|theme|light.*mode|night.*mode/.test(text)) return 'darkmode';
  
  // Account patterns
  if (/account|profile|settings|password|logout|login|user/.test(text)) return 'account';
  
  // Notification patterns
  if (/notification|alert|reminder|email|message.*alert|notify/.test(text)) return 'notifications';
  
  // Mobile patterns
  if (/mobile|app|ios|android|phone|tablet|responsive/.test(text)) return 'mobile';
  
  // Emergency patterns
  if (/emergency|urgent|asap|immediately|rush|quickly/.test(text)) return 'emergency';
  
  // Support patterns
  if (/support|help|contact|assist|issue|problem|error/.test(text)) return 'support';
  
  // Verification patterns
  if (/verify|verified|license|certified|credentials|licensed/.test(text)) return 'verification';
  
  // Privacy patterns
  if (/privacy|secure|encrypted|data|gdpr|confidential/.test(text)) return 'privacy';
  
  // Refund patterns
  if (/refund|return|money.*back|refund.*policy/.test(text)) return 'refund';
  
  // Appointment status patterns
  if (/status|pending|confirmed|completed|booking.*status/.test(text)) return 'appointment_status';
  
  // Payment history patterns
  if (/payment.*history|transaction|receipt|invoice/.test(text)) return 'payment_history';
  
  // Lawyer profile patterns
  if (/lawyer.*profile|profile.*information|about.*lawyer|lawyer.*details/.test(text)) return 'lawyer_profile';
  
  return 'help'; // Default
};

// AI-powered response generation with OpenAI
const generateAIResponse = async (message) => {
  try {
    if (!openaiClient) {
      // Fallback to hardcoded responses if no OpenAI API
      const intent = detectIntent(message);
      const responses = chatbotResponses[intent] || chatbotResponses.help;
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Use OpenAI GPT to generate intelligent response
    const systemPrompt = `You are a professional and friendly LawBook customer support assistant. 
    LawBook is a lawyer appointment booking platform with features like:
    - Search and filter lawyers by specialty, experience, and price ($110-$200)
    - Specialties: Corporate, Criminal, Family, IP, Immigration, Tax, Real Estate, Employment, Bankruptcy, Estate Planning
    - Secure Stripe payments
    - Real-time chat with lawyers
    - Dark mode and advanced search
    - Mobile responsive PWA app
    - Lawyer verification and ratings
    - Easy booking, rescheduling, and cancellation with full refunds
    
    Answer user questions about the platform in a helpful, conversational way. Keep responses concise but informative.
    If users ask about booking, features, payments, specialties, pricing, account, cancellation, or anything LawBook-related, provide helpful guidance.
    Always be professional and courteous.`;

    const response = await openaiClient.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 200,
      temperature: 0.7
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.log('⚠️ AI response failed, using fallback:', error.message);
    // Fallback to regex-based responses if AI fails
    const intent = detectIntent(message);
    const responses = chatbotResponses[intent] || chatbotResponses.help;
    return responses[Math.floor(Math.random() * responses.length)];
  }
};

// Socket.io connection
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('send-message', async (data) => {
    console.log('Message received:', data.message);
    
    try {
      // Generate AI-powered intelligent response
      const botResponse = await generateAIResponse(data.message);
      
      io.emit('receive-message', {
        sender: 'lawyer',
        text: botResponse,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Error generating response:', error);
      io.emit('receive-message', {
        sender: 'lawyer',
        text: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Fallback mock routes if DB not connected
app.get('/api/lawyers', (req, res) => {
  if (!dbConnected) return res.json(mockLawyers);
});

app.get('/api/lawyers/:id', (req, res) => {
  if (!dbConnected) {
    const lawyer = mockLawyers.find(l => l._id === req.params.id);
    return res.json(lawyer || { error: 'Not found' });
  }
});

app.get('/api/appointments', (req, res) => {
  if (!dbConnected) return res.json(mockAppointments);
});

app.post('/api/appointments', (req, res) => {
  if (!dbConnected) {
    const appointment = { _id: Date.now().toString(), ...req.body, createdAt: new Date() };
    mockAppointments.push(appointment);
    return res.status(201).json(appointment);
  }
});

app.delete('/api/appointments/:id', (req, res) => {
  if (!dbConnected) {
    mockAppointments = mockAppointments.filter(a => a._id !== req.params.id);
    return res.json({ message: 'Appointment deleted' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Database: ${dbConnected ? 'MongoDB Connected' : 'Using Mock Data'}`);
  console.log(`WebSocket ready for real-time chat`);
});
