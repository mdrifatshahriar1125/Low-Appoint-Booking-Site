// Sample lawyer data to seed the database
// Run this after starting MongoDB to populate initial data

const mongoose = require('mongoose');
const Lawyer = require('./models/Lawyer');
require('dotenv').config();

const seedLawyers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lawyer-appointment');
    
    // Clear existing data
    await Lawyer.deleteMany({});

    const lawyers = [
      {
        name: "Sarah Johnson",
        speciality: "Corporate Law",
        experience: 12,
        licenseNumber: "LAW-001-2024",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        fee: 150,
        availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
      },
      {
        name: "James Mitchell",
        speciality: "Criminal Defense",
        experience: 15,
        licenseNumber: "LAW-002-2024",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        fee: 200,
        availability: ["Monday", "Wednesday", "Friday"]
      },
      {
        name: "Emily Richardson",
        speciality: "Family Law",
        experience: 10,
        licenseNumber: "LAW-003-2024",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
        fee: 120,
        availability: ["Tuesday", "Wednesday", "Thursday", "Friday"]
      },
      {
        name: "Robert Chen",
        speciality: "Intellectual Property",
        experience: 14,
        licenseNumber: "LAW-004-2024",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
        fee: 180,
        availability: ["Monday", "Tuesday", "Thursday"]
      },
      {
        name: "Maria Garcia",
        speciality: "Immigration Law",
        experience: 11,
        licenseNumber: "LAW-005-2024",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        fee: 140,
        availability: ["Monday", "Tuesday", "Wednesday", "Thursday"]
      },
      {
        name: "David Thompson",
        speciality: "Tax Law",
        experience: 16,
        licenseNumber: "LAW-006-2024",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
        fee: 190,
        availability: ["Tuesday", "Wednesday", "Thursday", "Friday"]
      },
      {
        name: "Lisa Anderson",
        speciality: "Real Estate Law",
        experience: 9,
        licenseNumber: "LAW-007-2024",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
        fee: 110,
        availability: ["Monday", "Wednesday", "Friday"]
      },
      {
        name: "Christopher Lee",
        speciality: "Employment Law",
        experience: 13,
        licenseNumber: "LAW-008-2024",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
        fee: 160,
        availability: ["Monday", "Tuesday", "Wednesday", "Friday"]
      },
      {
        name: "Jennifer Martinez",
        speciality: "Bankruptcy Law",
        experience: 10,
        licenseNumber: "LAW-009-2024",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        fee: 130,
        availability: ["Tuesday", "Thursday", "Friday"]
      },
      {
        name: "William Davis",
        speciality: "Estate Planning",
        experience: 18,
        licenseNumber: "LAW-010-2024",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
        fee: 170,
        availability: ["Monday", "Tuesday", "Thursday"]
      },
      {
        name: "Susan Brown",
        speciality: "Contracts",
        experience: 12,
        licenseNumber: "LAW-011-2024",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
        fee: 150,
        availability: ["Monday", "Wednesday", "Thursday", "Friday"]
      },
      {
        name: "Michael Wilson",
        speciality: "Litigation",
        experience: 14,
        licenseNumber: "LAW-012-2024",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
        fee: 175,
        availability: ["Tuesday", "Wednesday", "Thursday"]
      }
    ];

    await Lawyer.insertMany(lawyers);
    console.log("Database seeded with 12 lawyers successfully!");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedLawyers();
