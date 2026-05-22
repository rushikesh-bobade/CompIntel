import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function normalize(company: string): string {
  return company.toLowerCase().trim().replace(/\s+/g, ' ');
}

const salaries = [
  { company: "Google", role: "Software Engineer", level: "L3", location: "Bangalore", experience_years: 1, base_salary: 1500000, bonus: 200000, stock: 0 },
  { company: "Google", role: "Software Engineer", level: "L4", location: "Bangalore", experience_years: 3, base_salary: 3000000, bonus: 450000, stock: 400000 },
  { company: "Google", role: "Senior Software Engineer", level: "L5", location: "Bangalore", experience_years: 6, base_salary: 5500000, bonus: 800000, stock: 1200000 },
  { company: "Google", role: "Staff Engineer", level: "L6", location: "Bangalore", experience_years: 10, base_salary: 9500000, bonus: 1500000, stock: 3500000 },
  { company: "Google", role: "Engineering Manager", level: "L6", location: "Hyderabad", experience_years: 12, base_salary: 10000000, bonus: 2000000, stock: 4000000 },
  { company: "Google", role: "Senior Staff Engineer", level: "L7", location: "Bangalore", experience_years: 15, base_salary: 16000000, bonus: 3000000, stock: 8000000 },
  { company: "Google", role: "Product Manager", level: "L5", location: "Hyderabad", experience_years: 7, base_salary: 5000000, bonus: 1000000, stock: 1000000 },
  { company: "Microsoft", role: "Software Engineer", level: "L3", location: "Hyderabad", experience_years: 2, base_salary: 1600000, bonus: 150000, stock: 0 },
  { company: "Microsoft", role: "Software Engineer", level: "L4", location: "Hyderabad", experience_years: 4, base_salary: 2800000, bonus: 300000, stock: 300000 },
  { company: "Microsoft", role: "Senior Software Engineer", level: "L5", location: "Bangalore", experience_years: 8, base_salary: 5200000, bonus: 700000, stock: 1000000 },
  { company: "Microsoft", role: "Principal Engineer", level: "L6", location: "Hyderabad", experience_years: 13, base_salary: 9000000, bonus: 1800000, stock: 3000000 },
  { company: "Microsoft", role: "Partner", level: "L7", location: "Bangalore", experience_years: 18, base_salary: 18000000, bonus: 4000000, stock: 10000000 },
  { company: "Amazon", role: "SDE I", level: "L3", location: "Bangalore", experience_years: 1, base_salary: 1400000, bonus: 300000, stock: 0 },
  { company: "Amazon", role: "SDE II", level: "L4", location: "Bangalore", experience_years: 4, base_salary: 3200000, bonus: 500000, stock: 200000 },
  { company: "Amazon", role: "SDE III", level: "L5", location: "Bangalore", experience_years: 7, base_salary: 6000000, bonus: 0, stock: 1500000 },
  { company: "Amazon", role: "Principal SDE", level: "L6", location: "Hyderabad", experience_years: 11, base_salary: 11000000, bonus: 0, stock: 4000000 },
  { company: "Meta", role: "E3", level: "L3", location: "Remote", experience_years: 2, base_salary: 1800000, bonus: 180000, stock: 0 },
  { company: "Meta", role: "E4", level: "L4", location: "Remote", experience_years: 5, base_salary: 3800000, bonus: 380000, stock: 500000 },
  { company: "Meta", role: "E5", level: "L5", location: "Remote", experience_years: 8, base_salary: 7500000, bonus: 1000000, stock: 2000000 },
  { company: "Meta", role: "E6", level: "L6", location: "Remote", experience_years: 14, base_salary: 14000000, bonus: 2500000, stock: 6000000 },
  { company: "Flipkart", role: "SDE I", level: "L3", location: "Bangalore", experience_years: 2, base_salary: 1300000, bonus: 130000, stock: 0 },
  { company: "Flipkart", role: "SDE II", level: "L4", location: "Bangalore", experience_years: 4, base_salary: 2600000, bonus: 260000, stock: 200000 },
  { company: "Flipkart", role: "SDE III", level: "L5", location: "Bangalore", experience_years: 7, base_salary: 4500000, bonus: 450000, stock: 1000000 },
  { company: "Flipkart", role: "Architect", level: "L6", location: "Bangalore", experience_years: 12, base_salary: 8500000, bonus: 1000000, stock: 2500000 },
  { company: "Swiggy", role: "SDE I", level: "L3", location: "Bangalore", experience_years: 1, base_salary: 1200000, bonus: 120000, stock: 0 },
  { company: "Swiggy", role: "SDE II", level: "L4", location: "Bangalore", experience_years: 3, base_salary: 2400000, bonus: 240000, stock: 100000 },
  { company: "Swiggy", role: "SDE III", level: "L5", location: "Bangalore", experience_years: 6, base_salary: 4000000, bonus: 400000, stock: 800000 },
  { company: "Swiggy", role: "Principal Engineer", level: "L6", location: "Bangalore", experience_years: 10, base_salary: 8000000, bonus: 1000000, stock: 2000000 },
  { company: "Razorpay", role: "Frontend Engineer I", level: "L3", location: "Bangalore", experience_years: 2, base_salary: 1400000, bonus: 150000, stock: 0 },
  { company: "Razorpay", role: "Frontend Engineer II", level: "L4", location: "Bangalore", experience_years: 4, base_salary: 2700000, bonus: 300000, stock: 200000 },
  { company: "Razorpay", role: "Senior Frontend Engineer", level: "L5", location: "Bangalore", experience_years: 7, base_salary: 4800000, bonus: 500000, stock: 1200000 },
  { company: "Zepto", role: "Backend Engineer", level: "L3", location: "Mumbai", experience_years: 1, base_salary: 1300000, bonus: 100000, stock: 0 },
  { company: "Zepto", role: "Senior Backend Engineer", level: "L4", location: "Mumbai", experience_years: 4, base_salary: 2800000, bonus: 300000, stock: 150000 },
  { company: "Zepto", role: "Staff Backend Engineer", level: "L5", location: "Mumbai", experience_years: 8, base_salary: 5000000, bonus: 600000, stock: 1000000 },
  { company: "Groww", role: "Software Engineer", level: "L3", location: "Bangalore", experience_years: 2, base_salary: 1500000, bonus: 150000, stock: 0 },
  { company: "Groww", role: "Senior Software Engineer", level: "L4", location: "Bangalore", experience_years: 5, base_salary: 3000000, bonus: 300000, stock: 300000 },
  { company: "Groww", role: "Staff Engineer", level: "L5", location: "Bangalore", experience_years: 9, base_salary: 5500000, bonus: 600000, stock: 1500000 },
  { company: "Paytm", role: "Software Engineer", level: "L3", location: "Delhi", experience_years: 2, base_salary: 1100000, bonus: 100000, stock: 0 },
  { company: "Paytm", role: "Senior Software Engineer", level: "L4", location: "Delhi", experience_years: 5, base_salary: 2200000, bonus: 200000, stock: 100000 },
  { company: "Paytm", role: "Staff Engineer", level: "L5", location: "Delhi", experience_years: 8, base_salary: 3800000, bonus: 400000, stock: 500000 },
  { company: "Atlassian", role: "Software Engineer", level: "L3", location: "Bangalore", experience_years: 2, base_salary: 1900000, bonus: 200000, stock: 0 },
  { company: "Atlassian", role: "Senior Software Engineer", level: "L4", location: "Bangalore", experience_years: 5, base_salary: 3800000, bonus: 400000, stock: 400000 },
  { company: "Atlassian", role: "Principal Engineer", level: "L5", location: "Bangalore", experience_years: 9, base_salary: 7000000, bonus: 800000, stock: 2000000 },
  { company: "Adobe", role: "MTS 1", level: "L3", location: "Delhi", experience_years: 1, base_salary: 1400000, bonus: 100000, stock: 0 },
  { company: "Adobe", role: "MTS 2", level: "L4", location: "Delhi", experience_years: 4, base_salary: 2500000, bonus: 200000, stock: 200000 },
  { company: "Adobe", role: "Computer Scientist", level: "L5", location: "Delhi", experience_years: 8, base_salary: 4500000, bonus: 500000, stock: 1000000 },
  { company: "Salesforce", role: "Software Engineer", level: "L3", location: "Hyderabad", experience_years: 2, base_salary: 1600000, bonus: 150000, stock: 0 },
  { company: "Salesforce", role: "Senior Software Engineer", level: "L4", location: "Hyderabad", experience_years: 5, base_salary: 3200000, bonus: 300000, stock: 300000 },
  { company: "Salesforce", role: "Lead MTS", level: "L5", location: "Hyderabad", experience_years: 9, base_salary: 5800000, bonus: 600000, stock: 1500000 },
  { company: "Oracle", role: "IC 1", level: "L3", location: "Bangalore", experience_years: 2, base_salary: 1200000, bonus: 100000, stock: 0 },
  { company: "Oracle", role: "IC 2", level: "L4", location: "Bangalore", experience_years: 5, base_salary: 2200000, bonus: 200000, stock: 100000 },
  { company: "Oracle", role: "IC 3", level: "L5", location: "Bangalore", experience_years: 9, base_salary: 4000000, bonus: 400000, stock: 800000 },
  { company: "Infosys", role: "Systems Engineer", level: "L3", location: "Pune", experience_years: 2, base_salary: 500000, bonus: 50000, stock: 0 },
  { company: "Infosys", role: "Technology Analyst", level: "L4", location: "Pune", experience_years: 5, base_salary: 1000000, bonus: 100000, stock: 0 },
  { company: "Infosys", role: "Technology Lead", level: "L5", location: "Pune", experience_years: 9, base_salary: 2000000, bonus: 200000, stock: 50000 },
  { company: "TCS", role: "Assistant System Engineer", level: "L3", location: "Chennai", experience_years: 2, base_salary: 450000, bonus: 40000, stock: 0 },
  { company: "TCS", role: "System Engineer", level: "L4", location: "Chennai", experience_years: 5, base_salary: 900000, bonus: 90000, stock: 0 },
  { company: "TCS", role: "IT Analyst", level: "L5", location: "Chennai", experience_years: 9, base_salary: 1800000, bonus: 180000, stock: 0 },
  { company: "Wipro", role: "Project Engineer", level: "L3", location: "Bangalore", experience_years: 2, base_salary: 480000, bonus: 45000, stock: 0 },
  { company: "Wipro", role: "Senior Project Engineer", level: "L4", location: "Bangalore", experience_years: 5, base_salary: 950000, bonus: 90000, stock: 0 },
  { company: "Wipro", role: "Project Manager", level: "L5", location: "Bangalore", experience_years: 9, base_salary: 1900000, bonus: 190000, stock: 0 },
  { company: "Google", role: "Data Scientist", level: "L4", location: "Bangalore", experience_years: 4, base_salary: 2900000, bonus: 400000, stock: 350000 },
  { company: "Google", role: "Data Scientist", level: "L5", location: "Bangalore", experience_years: 8, base_salary: 5200000, bonus: 700000, stock: 1100000 },
  { company: "Microsoft", role: "Product Manager", level: "L4", location: "Hyderabad", experience_years: 5, base_salary: 2900000, bonus: 350000, stock: 250000 },
  { company: "Amazon", role: "Data Scientist", level: "L5", location: "Bangalore", experience_years: 8, base_salary: 5800000, bonus: 0, stock: 1400000 },
  { company: "Meta", role: "Product Manager", level: "L5", location: "Remote", experience_years: 9, base_salary: 7000000, bonus: 1000000, stock: 1800000 },
  { company: "Flipkart", role: "Data Scientist", level: "L4", location: "Bangalore", experience_years: 5, base_salary: 2500000, bonus: 250000, stock: 200000 },
  { company: "Swiggy", role: "Product Manager", level: "L4", location: "Bangalore", experience_years: 4, base_salary: 2300000, bonus: 230000, stock: 100000 },
  { company: "Razorpay", role: "Backend Engineer I", level: "L3", location: "Bangalore", experience_years: 2, base_salary: 1300000, bonus: 150000, stock: 0 },
  { company: "Zepto", role: "Product Manager", level: "L4", location: "Mumbai", experience_years: 5, base_salary: 2700000, bonus: 300000, stock: 150000 },
  { company: "Groww", role: "Data Scientist", level: "L4", location: "Bangalore", experience_years: 5, base_salary: 2900000, bonus: 300000, stock: 300000 },
  { company: "Paytm", role: "Product Manager", level: "L4", location: "Delhi", experience_years: 5, base_salary: 2100000, bonus: 200000, stock: 100000 },
  { company: "Atlassian", role: "Data Scientist", level: "L4", location: "Bangalore", experience_years: 5, base_salary: 3600000, bonus: 400000, stock: 350000 },
  { company: "Adobe", role: "Product Manager", level: "L4", location: "Delhi", experience_years: 5, base_salary: 2400000, bonus: 200000, stock: 200000 },
  { company: "Salesforce", role: "Data Scientist", level: "L4", location: "Hyderabad", experience_years: 5, base_salary: 3100000, bonus: 300000, stock: 250000 },
  { company: "Oracle", role: "Product Manager", level: "L4", location: "Bangalore", experience_years: 5, base_salary: 2100000, bonus: 200000, stock: 100000 },
  { company: "Infosys", role: "Data Scientist", level: "L4", location: "Pune", experience_years: 5, base_salary: 1100000, bonus: 100000, stock: 0 },
  { company: "TCS", role: "Product Manager", level: "L4", location: "Chennai", experience_years: 5, base_salary: 950000, bonus: 90000, stock: 0 },
  { company: "Wipro", role: "Data Scientist", level: "L4", location: "Bangalore", experience_years: 5, base_salary: 1000000, bonus: 90000, stock: 0 },
  { company: "Google", role: "DevOps Engineer", level: "L4", location: "Bangalore", experience_years: 4, base_salary: 2800000, bonus: 400000, stock: 350000 },
  { company: "Microsoft", role: "DevOps Engineer", level: "L4", location: "Hyderabad", experience_years: 5, base_salary: 2700000, bonus: 300000, stock: 250000 },
  { company: "Amazon", role: "DevOps Engineer", level: "L4", location: "Bangalore", experience_years: 5, base_salary: 3000000, bonus: 0, stock: 150000 },
  { company: "Meta", role: "DevOps Engineer", level: "L4", location: "Remote", experience_years: 5, base_salary: 3500000, bonus: 350000, stock: 450000 },
  { company: "Flipkart", role: "DevOps Engineer", level: "L4", location: "Bangalore", experience_years: 5, base_salary: 2400000, bonus: 240000, stock: 180000 },
  { company: "Swiggy", role: "DevOps Engineer", level: "L4", location: "Bangalore", experience_years: 4, base_salary: 2200000, bonus: 220000, stock: 90000 },
  { company: "Razorpay", role: "DevOps Engineer", level: "L4", location: "Bangalore", experience_years: 4, base_salary: 2600000, bonus: 280000, stock: 180000 },
  { company: "Zepto", role: "DevOps Engineer", level: "L4", location: "Mumbai", experience_years: 5, base_salary: 2600000, bonus: 280000, stock: 130000 },
  { company: "Groww", role: "DevOps Engineer", level: "L4", location: "Bangalore", experience_years: 5, base_salary: 2800000, bonus: 280000, stock: 280000 },
  { company: "Paytm", role: "DevOps Engineer", level: "L4", location: "Delhi", experience_years: 5, base_salary: 2000000, bonus: 180000, stock: 90000 },
  { company: "Atlassian", role: "DevOps Engineer", level: "L4", location: "Bangalore", experience_years: 5, base_salary: 3500000, bonus: 380000, stock: 380000 },
  { company: "Adobe", role: "DevOps Engineer", level: "L4", location: "Delhi", experience_years: 5, base_salary: 2300000, bonus: 180000, stock: 180000 },
  { company: "Salesforce", role: "DevOps Engineer", level: "L4", location: "Hyderabad", experience_years: 5, base_salary: 3000000, bonus: 280000, stock: 280000 },
  { company: "Oracle", role: "DevOps Engineer", level: "L4", location: "Bangalore", experience_years: 5, base_salary: 2000000, bonus: 180000, stock: 90000 },
  { company: "Infosys", role: "DevOps Engineer", level: "L4", location: "Pune", experience_years: 5, base_salary: 1050000, bonus: 90000, stock: 0 },
  { company: "TCS", role: "DevOps Engineer", level: "L4", location: "Chennai", experience_years: 5, base_salary: 920000, bonus: 85000, stock: 0 },
  { company: "Wipro", role: "DevOps Engineer", level: "L4", location: "Bangalore", experience_years: 5, base_salary: 960000, bonus: 85000, stock: 0 }
];

async function main() {
  console.log('Clearing existing data...');
  await prisma.salary.deleteMany();
  
  console.log('Seeding salary data...');
  for (const s of salaries) {
    await prisma.salary.create({
      data: {
        company: normalize(s.company),
        role: s.role,
        level: s.level,
        location: s.location,
        experience_years: s.experience_years,
        base_salary: s.base_salary,
        bonus: s.bonus ?? 0,
        stock: s.stock ?? 0,
        total_compensation: s.base_salary + (s.bonus ?? 0) + (s.stock ?? 0),
        confidence_score: +(0.8 + Math.random() * 0.2).toFixed(2),
      },
    });
  }
  
  console.log(`Seeded ${salaries.length} salary records.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
