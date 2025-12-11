import React, { useState, useEffect, useRef, useMemo } from 'react';
import { generateStoryNode, generateLocationImage, regenerateChapterMetadata } from './services/geminiService';
import PathVisualizer from './components/PathVisualizer';
import { JourneyNode, ThemeConfig } from './types';
import { Sparkles, MapPin, Plus, Briefcase, Tag, Image as ImageIcon, Edit3, User, Trash2, Save, X, RotateCw, CheckCircle, Wrench, Building2, Calendar, ArrowRight, Terminal, Activity, Lock, Unlock, Database, ServerCog, Banknote, Landmark, CreditCard, Truck, Package, Clock, FileSpreadsheet, PieChart, BarChart3, ShieldCheck, Zap, Globe, Mail, Trophy, Play, Pause, Sun, Moon, Upload, Link as LinkIcon, Wheat, Sprout, Factory, Cog, Tractor, Container, Route, Ruler, DraftingCompass, Calculator, PenTool, Utensils, Award, BookOpen, GraduationCap, Cpu, Network, ExternalLink, Code2, Leaf, Power } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'framer-motion';

// --- Initial Data ---
const DEFAULT_THEME: ThemeConfig = {
  primary: '#0f172a',
  secondary: '#cbd5e1',
  background: '#f8fafc',
  text: '#1e293b'
};

const INITIAL_NODES: JourneyNode[] = [
  {
    id: '1',
    role: 'Officer, Accounts Payable',
    company: 'University of the Fraser Valley',
    location: 'Abbotsford, BC',
    title: 'Coming Full Circle',
    description: `🌟 MY UFV STORY — COMING BACK TO THE PLACE WHERE MY CANADIAN JOURNEY BEGAN

**Walking Back Into UFV, But This Time as a Professional**
Working at the University of the Fraser Valley means more to me than any regular job ever could. This is the same place where I first studied when I arrived in Canada — alone, nervous, and starting from zero. So when I applied internally for the Accounts Payable Officer role, I wasn’t just applying for a job. I felt like I was coming back home, but in a new way… this time as the person I had grown into.

**How I Prepared for the Interview**
I didn’t walk into the interview blindly. I researched everything: UFV’s values, the Finance and AP structure, Banner, FAST, Chrome River, Convera, and how approvals flow in a public sector. I wanted to understand the culture, not just the job. When the first interview happened, I felt calm. I knew what I was talking about. I knew how my experience connected.

**The Final Panel Interview**
Walking into a boardroom with 5–6 interviewers staring at you is not easy. I was nervous for the first few minutes… but then I told myself: “Gagan, relax. Talk to them like humans. This is a conversation, not a test.” And that’s exactly how I handled it. A week later, I received the offer.

**My First Day in Accounts Payable**
AP at UFV is nothing like AP at a private company. Everything comes into one giant shared mailbox: invoices, cheque requisitions, honorariums, student refunds, AR refunds, tax remittances, pension payments, and utilities. Every single thing is processed by our AP team of four.

**What I Actually Do Daily (The Real Work)**
This is the part people don’t see. I validate spending authority signatures using our MS Access database. I correct and return invoices that are missing backup or have incorrect coding. I manage Vendor Creation requests via TDX, ensuring tax compliance. I enter complex data into Banner 9, allocating GST/PST and managing FX considerations. I execute payment runs via EFT, Cheque, and Convera foreign currency wires.

**Things Started Changing**
I naturally started cleaning up overdue invoices, messy coding mistakes, and stale-dated cheques. My supervisor began noticing that I was processing invoices fast, accurately, and catching errors most people ignore.

**The Idea That Changed Everything: My Digital Workflow Proposal**
One thing bothered me: Everything was PAPER-BASED. We printed all invoices, and approvals were buried in emails. So I wrote a detailed suggestion email to the Associate Director. I proposed a shared folder system, organized naming conventions, attaching PDFs directly into Banner, and removing printing. I even offered to create the SOP and train the team. To my surprise, the proposal was well received. It showed I wasn’t just here to "do the job" — I was here to make it better.

**Why UFV Is Special to Me**
I walk through the same campus I once walked as a student… but now I’m part of the team that keeps it running behind the scenes. Coming back to UFV in this way is one of the most fulfilling “full-circle” moments of my life.

**Who I Am Today**
Today, I’m an AP Officer people rely on. I am the "fast and accurate" person, trusted for my technical + accounting hybrid skillset. This job is the bridge between everything I learned and everything I want to become: a future Finance Systems Analyst or Manager.`,
    dateRange: 'May 2025 - Present',
    emoji: '🎓',
    websiteUrl: 'https://www.ufv.ca/',
    tags: ['Higher Education', 'Process Improvement', 'Public Sector'],
    skills: ['Banner ERP', 'Workflow Automation', 'Spending Authority Compliance', 'FAST Finance', 'Vendor Reconciliation', 'GAAP Compliance'],
    tools: ['Banner 9', 'Chrome River', 'MS Access', 'Convera', 'TDX', 'Excel', 'FAST Finance'],
    duties: [
      'I manage full-cycle accounts payable, processing high-volume invoices and reconciling vendor statements.',
      'I validate spending authority signatures and digital certificates (UFV-AD-CA) against budget codes.',
      'I spearheaded the "Digital Workflow" initiative, eliminating paper trails by implementing shared digital structures.',
      'I process complex payments including EFTs, Cheques, and Convera foreign currency wires.',
      'I collaborate with IT and Finance to implement process improvements and train end-users on AP policies.'
    ],
    // Official UFV Branding Colors
    theme: {
      primary: '#00573D', // Official UFV Forest Green
      secondary: '#4D8270', 
      background: '#F0F7F4', 
      text: '#003B29'
    },
    imageUrl: ''
  },
  {
    id: '2',
    role: 'Accounts Payable Specialist & Systems Lead',
    company: 'Friesen Group of Companies',
    location: 'Abbotsford, BC',
    title: 'The Transformational Chapter',
    description: `🌟 THE FRIESEN GROUP STORY — MY MOST TRANSFORMATIONAL PROFESSIONAL CHAPTER
From Accounts Payable → to Systems Innovator → to Assistant Controller’s Right Hand → to Payroll Successor-in-Training

**The Interview I Wasn’t Supposed to Get**
When I first applied to Friesen Group of Companies — a multi-entity, multi-industry organization spanning Clearbrook Grain & Milling Co. Ltd., Excel Feeds Inc., Nature’s Pride Nutrition, Jake Friesen Inc., Jaedel Enterprises Ltd., Starbird Farms, Windemere Farms, Wincrest Pacific Ltd., PFI Holdings, Turner Holdings, and Pacific Pride Chicks — I didn’t know that this would become one of the most important chapters of my career. I walked into the interview nervous, new, eager to learn. What I didn’t know was that within months, I would modernize their AP processes, support AR modernization, implement Papersave Cloud alongside IT, redesign GP invoice templates, and become someone the CFO and Controller depended on. Friesen wasn’t just a job. It was the place where my finance, IT, systems, leadership, and analytical identity truly fused together.

**Walking Into a World of Paper, Processes, and Possibilities**
When I joined, the Accounts Payable environment was heavily paper-based, manually routed, and rich with multi-company complexity. And yet, I felt something instantly: “This is a place where I can make a difference.” My daily workflow involved validating POs against receiving, checking service agreements, verifying GST numbers, and pushing invoices through approval chains. I handled multi-currency transactions, generated cheque batches, performed month-end Convera reconciliation, and cleared backlogs of aged payables. I wasn’t just “doing AP.” I was already learning the entire financial engine of a complex organization.

**The Weekly Rhythm: Mastering Multi-Company Payment Cycles**
Wednesdays were my biggest days. Every Wednesday, I ran Aged Trial Balance Reports and prioritization lists. I worked across 8+ companies, each with separate bank accounts, GP entities, vendor lists, and GL structures. I generated EFT files, uploaded them to the bank, and handled physical cheques. Then posted everything back into GP, ensuring audit trail completeness and proper inter-company balancing entries. This was the period when managers started telling me: “You’re really fast. You’re accurate. You understand the system better than most.”

**The Turning Point: Fixing a Foreign Currency Wire Issue**
One of my proudest contributions was resolving a vendor payment that kept getting rejected. Everyone assumed the bank or Convera was wrong. I dug deeper: cross-comparing vendor banking formats, validating Swift/BIC codes, and studying Convera’s routing documentation. The breakthrough? The vendor’s bank account was set up in a different currency than the invoice, and intermediary bank details were missing. I corrected it, documented the workflow, and the Controller later said: “Gagan, this saved us so much time.”

**Taking Over for the Assistant Controller**
When the Assistant Controller resigned unexpectedly, the Controller called me in. For almost two months, I handled receiving in GP, matching POs to invoices, correcting accrual entries, and assisting with inventory cost adjustments. This was not an AP role anymore. This was an Accounting role. And I didn’t just do it — I excelled. When the new person was hired, I trained him myself. That moment showed me that the Controller trusted me as her technical + accounting bridge.

**Becoming the Bridge Between Finance & IT**
Because of my technical background, I naturally became the Finance–IT translator. Whenever finance struggled with technology, I stepped in. I helped map system logic for Papersave Cloud, create documentation for process flows, and redesign templates in GP using SQL-backed fields. The Controller and IT Manager relied on me to communicate clearly. One leadership moment I will never forget: When the new IT Manager joined, the Controller told him: “If you want to know what’s happening with Papersave Cloud, talk to Gagan. She knows exactly where we left off.”

**Papersave Cloud Implementation**
This was the project that made me realize I was more than an AP clerk. I was becoming a systems analyst. I mapped current-to-future AP processes, created sample workflows for utility invoices and multi-company approval trees, and acted as finance’s representative in technical meetings with PairSoft consultants. This project changed my mindset forever: I learned I had a strong systems brain and that digital transformation excited me.

**Stepping Into Payroll**
When the Payroll Manager decided to retire, I was approached to be the successor. I learned biweekly payroll for hourly and salary employees across multiple entities, TimeClock Plus, overtime rules, ROEs, and tax remittances. I contributed by creating payroll cost reports and analysis sheets using VLOOKUP and Pivot Tables to reduce labor cost inefficiencies. This was the moment the Controller said: “You understand numbers AND systems. That’s rare.”

**My Performance Review: The Confirmation I Needed**
My review highlighted exceptional accuracy, high system adaptability, and the potential to grow into leadership roles. It was validation: “You don’t just do your job — you improve the job.”

**Supporting Year-End & Compliance**
As I grew, I became deeply involved in GST audit preparation, reconciling vendor accounts, clearing stale cheques, and assisting the Controller with financial prep work. This was real accounting. This was real responsibility.

**The Goodbye I Didn't Want to Say**
Friesen Group was where I learned the most, grew the fastest, and was seen as a future leader. Leaving was one of the hardest decisions I ever made, but personal circumstances made it necessary. Still, I left with gratitude, growth, and a skill set that shaped every job that came after.`,
    dateRange: 'Previous Chapter',
    emoji: '🌾',
    websiteUrl: 'https://friesencompanies.com/',
    tags: ['Agri-Business', 'System Implementation', 'Multi-Entity Accounting'],
    skills: ['Papersave Cloud', 'Dynamics GP', 'Payroll Analysis', 'SQL Templates', 'Multi-Currency Recon', 'Inventory Accounting'],
    tools: ['Microsoft Dynamics GP', 'Papersave (Cloud/On-Prem)', 'SQL', 'Excel (Pivot/VLOOKUP)', 'TimeClock Plus', 'Convera'],
    duties: [
      'I acted as the bridge between Finance and IT, leading the migration to Papersave Cloud and redesigning SQL-based invoice templates.',
      'I managed full-cycle payment runs for 8+ distinct entities, handling complex inter-company entries and foreign currency wires.',
      'I developed payroll analysis dashboards to track overtime and labor inefficiencies, preparing to succeed the Payroll Manager.'
    ],
    theme: {
      primary: '#5D4037', // Earthy Brown (Soil/Agriculture)
      secondary: '#C0CA33', // Lime/Olive Green (Crops)
      background: '#EFEBE9', // Light Earth
      text: '#3E2723' // Dark Coffee
    },
    imageUrl: ''
  },
  {
    id: '3',
    role: 'Senior AR & Operations Lead',
    company: 'Triple Eight Transport Inc.',
    location: 'Abbotsford, BC',
    title: 'The Logistics & Operations Journey',
    description: `🌟 THE TRIPLE EIGHT TRANSPORT JOURNEY — MY STORY
How I entered trucking, learned operations end-to-end, built trust, and grew into Accounts Receivable.

**The Beginning: Stepping Into a New Industry**
When I applied to Triple Eight Transport, I didn’t know I was about to enter one of the most fast-paced, unpredictable industries in the world: trucking. My first interview was with HR — over the phone — for an Accounting Clerk role. I prepared like I always do: researching the company, learning about the trucking industry, freight billing, rate sheets, and dispatch systems. When the final interview with the owner came, I learned about their fleet structure and how drivers, dispatch, and accounting connect. I walked into that room prepared not as someone "looking for a job," but as someone ready to understand their world. Within days, I received the offer.

**My First Role: The Face of the Company & The Heart of the Paperwork Flow**
On my very first day, I realized I wasn’t just an Accounting Clerk — I was the front line. Every morning, I punched in and checked the outside mailbox — the goldmine of paperwork: driver timesheets, bills of lading, delivery confirmations, repair slips, and fuel receipts. It was chaos, but the kind I naturally organize. I maintained highway, city, and local driver timesheets, cross-checking mileage vs. hours, ensuring compliance with DOT rules, and entering hours into our Excel master sheet validated by PeopleNet. Drivers trusted me because I was accurate and resolved their issues quickly.

**Expanding My Role: Accounting, AR, and Multi-Entity Operations**
We had one person doing both AP and AR, and it was overwhelming. The Account Manager asked if I could help with AR follow-ups. That “little help” turned into a major impact. I handled overdue invoice follow-ups, remittance confirmations, portal uploads, and clearing backlogs. Our AR aging dropped significantly. I also entered all payments received (EFTs, cheques, wires), managed multi-entity banking deposits, and reconciled 8–9 corporate credit cards for fuel and repairs.

**Mastering TMW & Dynamics GP**
The two main systems were TMW (TruckMate) for fleet/load management and Dynamics GP for financial posting. I had to understand how loads become invoices, how driver miles convert into payroll, and how GL entries flow between systems. It was a learning curve — and I learned fast.

**The Turning Point: The Private Meeting**
One day, the Account Manager and Payroll Manager called me in. I was nervous. Then came the surprise: “We want to train you for the Senior Accounts Receivable role.” They saw my speed, accuracy, organization, and ability to clear backlog. This meant my own private office, direct AR responsibility, handling major accounts (Pepsico, BC Ferries), and full ownership of cash receipts. I said yes immediately.

**Senior AR Responsibility: My Growth Phase**
As the new AR lead, I handled daily cash applications, cleared backlogs to stabilize cash flow, and ensured billing packages were complete with rate confirmations, PODs, and accessorial charges. I supported the billing team with freight bills and fuel surcharge calculations. I became the person they came to when things needed to get done fast.

**The Slowdown & My Decision to Leave**
Eventually, the market slowed, and trucking volumes dropped. I felt disconnected from the pace I was used to, and personal circumstances added pressure. I realized leaving was the right step — not because I wasn’t capable, but because I was ready for something bigger. Everything I learned here — from AR, AP, driver management, payroll support, and high-pressure communication — became the foundation of the powerhouse I would become later.`,
    dateRange: 'Previous Chapter',
    emoji: '🚛',
    websiteUrl: 'https://triple8.ca/',
    tags: ['Logistics', 'Accounts Receivable', 'Operations'],
    skills: ['TMW TruckMate', 'Dynamics GP', 'Driver Payroll', 'Multi-Entity Banking', 'Credit Card Recon', 'Cash Applications'],
    tools: ['TMW Suite', 'Dynamics GP', 'PeopleNet', 'Excel', 'Online Banking Portals', 'Customer Portals'],
    duties: [
      'I managed full-cycle Accounts Receivable, reducing aging significantly by clearing backlogs and managing collections for major clients.',
      'I acted as the operational hub for driver timesheets, validating highway/city hours against PeopleNet data for accurate payroll.',
      'I mastered the integration between TMW TruckMate and Dynamics GP to ensure accurate financial posting and job costing.'
    ],
    theme: {
      primary: '#D32F2F', // Trucking Red
      secondary: '#212121', // Asphalt/Tire Black
      background: '#FAFAFA', // White/Light Grey
      text: '#B71C1C' // Dark Red Text
    },
    imageUrl: ''
  },
  {
    id: '4',
    role: 'Office Administrator & Accounting Assistant',
    company: 'EPro Consultants Ltd.',
    location: 'Surrey, BC',
    title: 'The Foundation: My First Real Office Chapter',
    description: `🌟 THE EPRO CONSULTANTS STORY — MY FIRST REAL OFFICE CHAPTER
Where I learned the foundations of professional life, responsibility, confidence, and technical skills.

**The Interview: The Day Someone Chose Me**
EPro Consultants will always remain special to me because it was the first company that saw potential in me — before I had the chance to prove anything. My future boss told me: “We actually already finalized someone for this position… but then we saw your resume.” For a moment, I didn’t know what to say. But inside, I felt something shift. I prepared for the interview by studying their services (mechanical, electrical, energy advising) and building code compliance. The interview went extremely well, and I followed up with a thank-you email. Two days later: Offer letter. Office Administrator. My first real office job in Canada after McDonald's.

**The Front Desk Era: Learning The Real Foundations**
From day one, I was the front face of the company. I wasn’t “just” an office administrator — I became the center of communication. I handled greeting clients, preparing proposals, coordinating with architects and energy advisors, and managing office supplies. When clients walked through the door, I was the first person they met. Their first impression of EPro was shaped by me.

**Growing Into Accounting: AP, AR, Invoicing, and Proposals**
Within weeks, my responsibilities grew. I became responsible for drafting proposals for mechanical/electrical designs and multi-phase engineering projects. This required understanding project scopes, phases, and deposit requirements. I generated deposit invoices and handled the full Accounts Receivable cycle: sending invoices, receiving payments, tracking balances, and following up with clients. I also managed Accounts Payable, utilities, and subcontractor payments, keeping everything organized.

**Expanding Into Payroll Coordination**
I wasn’t just handling office operations and AP/AR — I was also the bridge between employees and payroll. Every week, I sent timesheets, overtime notes, and project-based work logs to our external accountant, ensuring everyone was paid correctly.

**Social Media, Marketing & Brand Voice**
EPro also trusted me with managing social media posts, creating content, and highlighting completed projects. This taught me design basics, marketing communication, and branding consistency. I enjoyed this part — it allowed me to be creative outside of accounting.

**The Monday Meetings: Learning How Professional Teams Think**
Every Monday, all employees gathered to discuss which clients were in which project phase. I learned how consulting projects move through intake → proposal → deposit → design → revisions → final → permit package. That weekly meeting taught me something priceless: How to think like a team — not just like an employee.

**When the Company Grew — I Grew Too**
As workload increased, my boss realized: “Gagan should focus fully on accounting.” So they planned to hire another office admin for front desk work while I moved into a dedicated AP/AR Office. I still remember the excitement of having my own private cabin — a sign of trust. There, I handled full AR/AP cycles, proposal-to-invoice transitions, and large project billings. I wasn’t just “doing tasks” — I was running the accounting cycle for a consulting firm.

**QuickBooks Implementation: My First Software Project**
As the company grew, we noticed too many spreadsheets and manual errors. That’s when my boss considered implementing QuickBooks. Without being asked, I naturally stepped into the role of assisting with implementation. I mapped out the Chart of Accounts, Vendor lists, Client lists, and Tax coding. This was my first taste of tech implementation in finance — a skill that would later define me at Friesen Group and UFV.

**The Goodbye: Leaving With Gratitude**
I didn’t leave EPro because something was wrong. I left because I wanted to grow further. But EPro Consultants was the first company that truly trusted me. It was there that I learned basic accounting foundations, full-cycle AR/AP, payroll coordination, and professional confidence. It was my first office family. My first “I can do this” moment. And every role after built on the foundation I started here.`,
    dateRange: 'Early Career',
    emoji: '📐',
    websiteUrl: 'https://eproconsultants.ca/',
    tags: ['Engineering Consulting', 'Office Admin', 'Accounting Foundations'],
    skills: ['QuickBooks', 'Proposal Writing', 'AR/AP Cycle', 'Payroll Coordination', 'Project Management', 'Client Communication'],
    tools: ['QuickBooks', 'Excel', 'Social Media Tools', 'Outlook', 'Word'],
    duties: [
      'I managed the full office lifecycle, from greeting clients and drafting engineering proposals to handling courier logistics.',
      'I transitioned into a dedicated accounting role, managing full-cycle AP/AR and implementing QuickBooks to replace manual spreadsheets.',
      'I acted as the bridge between employees and payroll, coordinating timesheets and project logs for accurate processing.'
    ],
    theme: {
      primary: '#00838F', // Teal
      secondary: '#B2EBF2', // Cyan Light
      background: '#E0F7FA', // Very Light Cyan
      text: '#006064' // Dark Cyan
    },
    imageUrl: ''
  },
  {
    id: '5',
    role: 'Shift Manager & Employee of the Year',
    company: 'McDonald\'s Canada',
    location: 'Abbotsford, BC',
    title: 'The Foundation: Leadership & Resilience',
    description: `🌟 THE McDONALD’S STORY — THE PLACE THAT BUILT MY WORK ETHIC, SPEED & LEADERSHIP
Crew Member → Crew Trainer → Team Leader → Shift Manager → Employee of the Year

**The Beginning: My First Real Step Into the Canadian Workforce**
When I first joined McDonald’s, I didn’t know I was walking into the most important foundational chapter of my career. I was new in Canada, adjusting to a completely different environment. McDonald’s became my training ground, my confidence builder, and my first Canadian family. At first, I was quiet and still learning, wondering if I would ever get better. The answer turned out to be yes — far more than I expected.

**The Turning Point: When They Saw My Speed & Work Ethic**
Managers started noticing how fast I worked, how quickly I learned, and how calm I remained under pressure. I went from being "the new girl" to someone reliable. Compliments became regular: "You handle rush hour better than most." That's when I realized McDonald's wasn't just a job — it was shaping who I was becoming.

**The Growth: Promotions That Built My Leadership Path**
My journey wasn't static. I evolved from a Crew Member learning customer service to a Crew Trainer teaching others. Then I became a Team Leader, supervising areas and managing drive-thru timing. Finally, I became a Shift Manager, handling scheduling, delegating tasks, managing cash, and overseeing the entire restaurant floor. This changed everything.

**Recognition: When Hard Work Spoke For Itself**
I earned "Employee of the Month" and "Employee of the Year" — not by asking, but by working with honesty, speed, and efficiency. These awards were proof that even in an entry-level job, your character shows.

**What McDonald’s Taught Me (Skills That Followed Me Into Every Job)**
1. **Pressure Handling:** Staying calm when orders pile up became the backbone of my future roles.
2. **Customer Service:** Speaking confidently even in stressful moments.
3. **Leadership:** How to guide, teach, and keep a team together during chaos.
4. **Time Management:** Prioritizing when 20 tasks come at once.
5. **Work Ethic:** Never being late and taking responsibility.
6. **Confidence:** Every promotion increased my belief in myself.

**The Goodbye: Leaving with Gratitude**
I didn’t leave McDonald’s because I wanted to; I left because I had to grow into my accounting career. But leaving wasn't easy. It was the first place that showed me what I was capable of. It shaped my work ethic, discipline, and leadership style. It prepared me for everything that came after.`,
    dateRange: 'Early Foundation',
    emoji: '🍔',
    websiteUrl: 'https://www.mcdonalds.com/ca/en-ca.html',
    tags: ['Operations Management', 'Team Leadership', 'Customer Service'],
    skills: ['Shift Management', 'Conflict Resolution', 'Staff Training', 'Inventory Control', 'Cash Management'],
    tools: ['POS Systems', 'Scheduling Software', 'Cash Handling', 'Safety Protocols'],
    duties: [
      'I progressed from Crew Member to Shift Manager, leading teams during peak hours and ensuring operational efficiency.',
      'I trained new employees on POS systems and safety standards, building a cohesive and high-performing team.',
      'I was recognized as Employee of the Year for exceptional speed, reliability, and leadership under pressure.'
    ],
    theme: {
      primary: '#DA291C', // McDonald's Red
      secondary: '#FFC72C', // McDonald's Gold
      background: '#FFF8E1', // Warm Light
      text: '#B71C1C' // Dark Red
    },
    imageUrl: ''
  },
  {
    id: '6',
    role: 'Diploma in Computer Information Systems',
    company: 'University of the Fraser Valley',
    location: 'Abbotsford, BC',
    title: 'The Academic Foundation',
    description: `🌟 MY EDUCATION STORY — THE CIS JOURNEY THAT BUILT MY TECH MINDSET & MY CONFIDENCE
From being completely new in Canada → to graduating in a pandemic → to becoming the “technical problem solver” everywhere I worked.

**Landing in Canada Alone: The Beginning of a New Life**
When I started my Computer Information Systems (CIS) Diploma at the University of the Fraser Valley, my life felt like a mix of emotions: I was nervous, completely new in Canada, and alone. But alongside that fear was a deep determination. I promised myself that I would build a strong future here. CIS became the first foundation of that promise.

**My Classroom Became My First Family**
One of the most beautiful parts of my journey was the people. I made real friends—the kind that turn studying into late-night group calls and stress into laughter. We debugged assignments at midnight and survived exams together. The classroom became the first place where I truly felt like I belonged in a foreign country.

**The Courses That Built My Technical Identity**
My CIS diploma wasn’t just theory. It shaped how I think.
*   **Programming (Python, Java, C++):** Taught me logic, patience, and how to break complex tasks into simple steps.
*   **Database & Information Systems:** I learned SQL, ERDs, and data flow. This later helped me master ERP systems like Dynamics GP and Banner.
*   **Networking:** Understanding subnets and Linux commands helped me excel in IT field roles later.
*   **Systems Analysis:** I learned workflows and requirements gathering, which directly empowered my "Digital Workflow" proposal at UFV.
*   **Web Development & HCI:** Where creativity met technology, helping me understand user journeys and UI design.

**The Moment I Became “The Technical One”**
After graduating, people at every job noticed that I understood systems faster. I could troubleshoot problems others couldn't. I could bridge Finance + IT. The reason? CIS rewired my brain to think like a problem solver. Whether it was TMW at Triple Eight, Papersave Cloud at Friesen, or Banner at UFV, my education was the key.

**The Graduation That COVID Took Away**
I worked hard through labs and exams, but when graduation came, COVID arrived. No ceremony, no stage. But my achievement was real. I walked into my next chapter with knowledge, confidence, and a new identity.

**CIS Created the Hybrid Version of Me**
People often ask, "How do you know both IT and finance so well?" My CIS diploma gave me the analytical brain; my accounting roles gave me the experience. Together, they shaped the multi-skilled professional I became.

**Looking Back**
I started that program nervous and alone. I ended it skilled, confident, and ready for growth. My CIS diploma gave me a direction, a mindset, and my first community in Canada. It prepared me for everything that came after.`,
    dateRange: 'Class of 2020',
    emoji: '🎓',
    websiteUrl: 'https://www.ufv.ca/',
    tags: ['Computer Systems', 'Software Development', 'System Analysis'],
    skills: ['Java & C++', 'SQL & Database Design', 'Network Administration', 'Systems Analysis', 'Web Development', 'Technical Troubleshooting'],
    tools: ['Python', 'Linux', 'HTML/CSS', 'UML Diagrams', 'Entity Relationship Diagrams (ERD)', 'Visio'],
    duties: [
      'I mastered core programming logic in Python, Java, and C++, building the foundation for my future technical problem-solving skills.',
      'I learned Database Management and SQL, which became the critical skill allowing me to optimize ERP systems in my finance career.',
      'I studied Systems Analysis and Design, learning to map workflows and identify inefficiencies, a skill I applied to every job thereafter.'
    ],
    theme: {
      primary: '#00573D', // UFV Green
      secondary: '#F2A900', // Academic Gold/Yellow
      background: '#F0F7F4', // Light Mint
      text: '#003B29'
    },
    imageUrl: ''
  }
];

// --- Text Scramble Component ---
const ScrambleText = ({ text, className, trigger, style }: { text: string, className: string, trigger: boolean, style?: React.CSSProperties }) => {
  const [displayedText, setDisplayedText] = useState(text);
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
  
  useEffect(() => {
    if (!trigger) {
        setDisplayedText(text);
        return;
    }

    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayedText(
        text
          .split('')
          .map((char, index) => {
            if (index < iterations) return char;
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [trigger, text]);

  return <span className={className} style={style}>{displayedText}</span>;
};


// --- Floating Background Elements ---
const FLOATING_ICONS = [
  { Icon: Calculator, color: '#16a34a' },
  { Icon: PieChart, color: '#2563eb' },
  { Icon: FileSpreadsheet, color: '#10b981' }, 
  { Icon: Banknote, color: '#85bb65' },
  { Icon: CreditCard, color: '#f59e0b' },
  { Icon: Landmark, color: '#7c3aed' },
  { Icon: Database, color: '#3b82f6' },
  { Icon: ServerCog, color: '#64748b' },
  { Icon: Terminal, color: '#0f172a' },
  { Icon: Globe, color: '#0ea5e9' },
  { Icon: Code2, color: '#6366f1' },
  { Icon: Cpu, color: '#ef4444' },
  { Icon: Network, color: '#8b5cf6' },
  { Icon: Truck, color: '#dc2626' },
  { Icon: Container, color: '#b91c1c' },
  { Icon: Package, color: '#d97706' },
  { Icon: Route, color: '#f59e0b' },
  { Icon: Mail, color: '#ea580c' },
  { Icon: Zap, color: '#eab308' },
  { Icon: Lock, color: '#334155' },
  { Icon: ShieldCheck, color: '#059669' },
  { Icon: LinkIcon, color: '#64748b' },
  { Icon: Wheat, color: '#eab308' },
  { Icon: Sprout, color: '#84cc16' },
  { Icon: Factory, color: '#57534e' },
  { Icon: Cog, color: '#475569' },
  { Icon: Ruler, color: '#0891b2' },
  { Icon: DraftingCompass, color: '#06b6d4' },
  { Icon: PenTool, color: '#be185d' },
  { Icon: Utensils, color: '#fcd34d' },
  { Icon: Award, color: '#f59e0b' },
  { Icon: GraduationCap, color: '#4f46e5' },
  { Icon: BookOpen, color: '#3b82f6' },
];

const FloatingItem: React.FC<{ theme: 'light' | 'dark', mousePos: React.MutableRefObject<{x: number, y: number}>, onCatch: () => void }> = ({ theme, mousePos, onCatch }) => {
    const IconData = useMemo(() => FLOATING_ICONS[Math.floor(Math.random() * FLOATING_ICONS.length)], []);
    const { Icon, color } = IconData;
    const size = Math.random() * 20 + 20; // 20-40px
    const [isCaught, setIsCaught] = useState(false);
    
    // Physics state
    const x = useMotionValue(Math.random() * (window.innerWidth));
    const y = useMotionValue(Math.random() * (window.innerHeight));
    const vx = useRef((Math.random() - 0.5) * 0.8); // Velocity X
    const vy = useRef((Math.random() - 0.5) * 0.8); // Velocity Y
    
    useAnimationFrame(() => {
        if (isCaught) return;
        let currentX = x.get();
        let currentY = y.get();
        
        currentX += vx.current;
        currentY += vy.current;

        if (currentX <= 0 || currentX >= window.innerWidth - size) vx.current *= -1;
        if (currentY <= 0 || currentY >= window.innerHeight - size) vy.current *= -1;

        const dx = currentX - mousePos.current.x;
        const dy = currentY - mousePos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const repulsionRadius = 150;

        if (distance < repulsionRadius) {
            const force = (repulsionRadius - distance) / repulsionRadius;
            const angle = Math.atan2(dy, dx);
            vx.current += Math.cos(angle) * force * 0.5;
            vy.current += Math.sin(angle) * force * 0.5;
        }

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const boxW = 700;
        const boxH = 400;
        
        const inBoxX = currentX > centerX - boxW/2 && currentX < centerX + boxW/2;
        const inBoxY = currentY > centerY - boxH/2 && currentY < centerY + boxH/2;

        if (inBoxX && inBoxY) {
            const distLeft = Math.abs(currentX - (centerX - boxW/2));
            const distRight = Math.abs(currentX - (centerX + boxW/2));
            const distTop = Math.abs(currentY - (centerY - boxH/2));
            const distBottom = Math.abs(currentY - (centerY + boxH/2));
            
            const minDist = Math.min(distLeft, distRight, distTop, distBottom);
            
            if (minDist === distLeft) vx.current = -Math.abs(vx.current) - 0.5;
            else if (minDist === distRight) vx.current = Math.abs(vx.current) + 0.5;
            else if (minDist === distTop) vy.current = -Math.abs(vy.current) - 0.5;
            else if (minDist === distBottom) vy.current = Math.abs(vy.current) + 0.5;
        }

        vx.current *= 0.99;
        vy.current *= 0.99;
        
        if (Math.abs(vx.current) < 0.2) vx.current += (Math.random() - 0.5) * 0.1;
        if (Math.abs(vy.current) < 0.2) vy.current += (Math.random() - 0.5) * 0.1;

        x.set(currentX);
        y.set(currentY);
    });

    const handleCatch = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isCaught) return;
        setIsCaught(true);
        onCatch();
    };

    return (
        <motion.div
            style={{ x, y }}
            className="absolute cursor-pointer pointer-events-auto z-20"
            initial={{ opacity: 0, scale: 0 }}
            animate={isCaught ? { scale: 1.5, opacity: 0 } : { opacity: theme === 'dark' ? 0.6 : 0.5, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: isCaught ? 0.3 : 1 }}
            onClick={handleCatch}
            whileHover={{ scale: 1.2, rotate: 10 }}
        >
             <div 
               className={`
                 p-2 rounded-xl backdrop-blur-sm shadow-sm
                 ${theme === 'dark' ? 'bg-white/10 shadow-white/5' : 'bg-white/40 shadow-slate-200/50'}
                 flex items-center justify-center
               `}
               style={{ 
                 width: size, 
                 height: size,
                 border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.4)'
               }}
             >
                <Icon size={size * 0.6} color={color} strokeWidth={1.5} />
             </div>
             {isCaught && (
                 <motion.div 
                    initial={{ y: 0, opacity: 1 }} 
                    animate={{ y: -20, opacity: 0 }} 
                    className="absolute -top-6 left-1/2 -translate-x-1/2 font-bold text-green-500 text-sm whitespace-nowrap"
                 >
                    +1 Skill
                 </motion.div>
             )}
        </motion.div>
    );
};

const FloatingBackground = ({ theme, onCatchSkill }: { theme: 'light' | 'dark', onCatchSkill: () => void }) => {
    const mousePos = useRef({ x: -1000, y: -1000 });
    const containerRef = useRef<HTMLDivElement>(null);
    const [items, setItems] = useState<number[]>([]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
             setItems(prev => {
                 const newItem = Date.now();
                 const next = [...prev, newItem];
                 if (next.length > 20) return next.slice(1);
                 return next;
             });
        }, 1500); 
        return () => clearInterval(interval);
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden z-0">
             <AnimatePresence>
                {items.map(id => (
                    <FloatingItem key={id} theme={theme} mousePos={mousePos} onCatch={onCatchSkill} />
                ))}
             </AnimatePresence>
        </div>
    );
};

// --- Specialized Chapter Backgrounds ---

const GreenMapleLeavesBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {Array.from({ length: 35 }).map((_, i) => {
                const size = 15 + Math.random() * 20;
                const duration = 10 + Math.random() * 10;
                const delay = Math.random() * 10;
                const startLeft = Math.random() * 100;
                
                return (
                    <motion.div
                        key={i}
                        initial={{ y: -50, x: 0, opacity: 0, rotate: Math.random() * 360 }}
                        animate={{ 
                            y: '110vh', 
                            x: [0, 50, -50, 0], // Gentle sway
                            rotate: 360 + Math.random() * 180,
                            opacity: [0, 0.8, 0]
                        }}
                        transition={{ 
                            y: { duration: duration, repeat: Infinity, delay: delay, ease: "linear" },
                            x: { duration: 5, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" },
                            rotate: { duration: duration, repeat: Infinity, ease: "linear" },
                            opacity: { duration: duration, repeat: Infinity, delay: delay, times: [0, 0.1, 0.9] }
                        }}
                        className="absolute top-0"
                        style={{ left: `${startLeft}%` }}
                    >
                        <Leaf 
                            size={size} 
                            color="#15803d" // Green-700
                            fill={Math.random() > 0.5 ? "#22c55e" : "#166534"} // Green-500 or Green-800
                            className="opacity-60"
                        />
                    </motion.div>
                )
            })}
        </div>
    );
};

const FarmingScene = ({ primaryColor, secondaryColor }: { primaryColor: string, secondaryColor: string }) => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Swaying Wheat at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32 flex justify-around items-end opacity-20">
                {Array.from({length: 40}).map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ rotate: [-5, 5] }}
                        transition={{ duration: 2 + Math.random(), repeat: Infinity, repeatType: 'mirror', delay: Math.random() }}
                        className="origin-bottom"
                    >
                        <Wheat size={40 + Math.random() * 40} color={secondaryColor} />
                    </motion.div>
                ))}
            </div>
            {/* Tractor passing by */}
            <motion.div
                initial={{ x: '-20vw' }}
                animate={{ x: '120vw' }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute bottom-10"
            >
                <Tractor size={64} color={primaryColor} className="opacity-10" />
            </motion.div>
        </div>
    )
};

const HighwayScene = ({ primaryColor }: { primaryColor: string }) => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
             {/* Trucks moving across */}
             {[10, 40, 70].map((top, i) => (
                 <motion.div
                    key={i}
                    initial={{ x: i % 2 === 0 ? '-20vw' : '120vw' }}
                    animate={{ x: i % 2 === 0 ? '120vw' : '-20vw' }}
                    transition={{ duration: 15 + i * 5, repeat: Infinity, ease: 'linear' }}
                    className="absolute opacity-10"
                    style={{ top: `${top}%` }}
                 >
                     <Truck size={48 + i * 10} color={primaryColor} style={{ transform: i % 2 !== 0 ? 'scaleX(-1)' : 'none' }} />
                 </motion.div>
             ))}
        </div>
    )
};

const FastFoodScene = ({ primaryColor, secondaryColor }: { primaryColor: string, secondaryColor: string }) => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Burgers and Fries floating on sides */}
             {Array.from({length: 10}).map((_, i) => (
                 <motion.div
                    key={i}
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: '100vh', opacity: [0, 0.4, 0] }}
                    transition={{ duration: 8 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5, ease: 'linear' }}
                    className="absolute"
                    style={{ 
                        left: i % 2 === 0 ? `${Math.random() * 10}%` : undefined, 
                        right: i % 2 !== 0 ? `${Math.random() * 10}%` : undefined 
                    }}
                 >
                    {i % 2 === 0 ? (
                        <div className="text-2xl">🍔</div>
                    ) : (
                        <div className="text-2xl">🍟</div>
                    )}
                 </motion.div>
             ))}
        </div>
    )
};

const ChapterBackground = ({ company, theme }: { company: string, theme: ThemeConfig }) => {
    if (company.includes('UFV') || company.includes('University')) {
        return <GreenMapleLeavesBackground />;
    }
    if (company.includes('Friesen')) {
        return <FarmingScene primaryColor={theme.primary} secondaryColor={theme.secondary} />;
    }
    if (company.includes('Triple Eight') || company.includes('Transport')) {
        return <HighwayScene primaryColor={theme.primary} />;
    }
    if (company.includes('McDonald')) {
        return <FastFoodScene primaryColor={theme.primary} secondaryColor={theme.secondary} />;
    }
    // Default
    return null;
}

// --- Professional Woman Silhouette Icon ---
const ProfessionalAvatarSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    {/* Woman Silhouette with Laptop - Stylized */}
    <path d="M100 20C75 20 60 40 60 70C60 90 50 100 40 110V140H160V110C150 100 140 90 140 70C140 40 125 20 100 20Z" opacity="0.9" />
    {/* Shoulders */}
    <path d="M40 140L20 200H180L160 140H40Z" opacity="0.95"/>
    {/* Laptop Screen (Open) */}
    <path d="M50 120H150V160H50V120Z" fillOpacity="0.5"/> 
    {/* Laptop Base */}
    <path d="M40 160H160L170 170H30L40 160Z" opacity="0.8"/>
  </svg>
);

// --- Main App Component ---
export const App = () => {
  const [nodes, setNodes] = useState<JourneyNode[]>(INITIAL_NODES);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [profile, setProfile] = useState({ 
    name: 'Gagandeep Dhaliwal', 
    role: 'Bridging the gap between Finance & IT' 
  });
  
  // Interactive Intro State
  const [capturedSkills, setCapturedSkills] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Auto-Play State
  const [isPlaying, setIsPlaying] = useState(false);
  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeNode = useMemo(() => 
    nodes.find(n => n.id === activeNodeId) || null
  , [nodes, activeNodeId]);

  // Computed Theme
  const appTheme = useMemo(() => {
    if (!hasStarted) {
       // Intro Theme
       return isDarkMode ? {
          primary: '#38bdf8', // Light Sky Blue
          secondary: '#94a3b8',
          background: '#0f172a', // Slate 900
          text: '#f1f5f9'
       } : {
          primary: '#0f172a', 
          secondary: '#64748b',
          background: '#fcfaf8', // Original Journey Light
          text: '#1e293b'
       };
    }
    
    if (activeNode?.theme) {
        // If dark mode is on, we adapt the node's theme to be dark-compatible
        if (isDarkMode) {
            return {
                primary: activeNode.theme.primary, // Keep brand color
                secondary: '#94a3b8',
                background: '#0f172a', // Override background to dark
                text: '#e2e8f0' // Override text to light
            };
        }
        return activeNode.theme;
    }
    
    return isDarkMode ? { ...DEFAULT_THEME, background: '#0f172a', text: '#f1f5f9' } : DEFAULT_THEME;
  }, [activeNode, isDarkMode, hasStarted]);

  // Auto-Play Logic
  useEffect(() => {
    if (isPlaying && hasStarted) {
      autoPlayTimerRef.current = setInterval(() => {
        setNodes(prev => {
           // Determine next node index
           const currentIndex = activeNodeId ? prev.findIndex(n => n.id === activeNodeId) : -1;
           const nextIndex = (currentIndex + 1) % prev.length;
           setActiveNodeId(prev[nextIndex].id);
           return prev; // Nodes don't change, just active ID
        });
      }, 5000); // 5 seconds per slide
    } else {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    }
    return () => { if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current); };
  }, [isPlaying, hasStarted, activeNodeId]);

  const handleStart = () => {
      setHasStarted(true);
      // Auto select first node
      if (nodes.length > 0) setActiveNodeId(nodes[0].id);
      setIsPlaying(true); // Start auto-play by default
  };

  const toggleEditMode = () => setIsEditMode(!isEditMode);

  // --- Render Helpers ---
  const renderDescription = (text: string) => {
    // Basic Markdown-like parsing for bolding and line breaks
    const paragraphs = text.split('\n\n');
    return paragraphs.map((para, idx) => {
       // Check for Header-like lines (Start with ** or 🌟)
       if (para.trim().startsWith('**') || para.trim().startsWith('🌟') || para.trim().startsWith('PART')) {
           return <h3 key={idx} className="text-xl font-serif font-bold mt-6 mb-2">{para.replace(/\*\*/g, '')}</h3>;
       }
       // Process bold text inside paragraph
       const parts = para.split(/(\*\*.*?\*\*)/g);
       return (
         <p key={idx} className="mb-4 leading-relaxed text-lg opacity-90">
           {parts.map((part, i) => 
              part.startsWith('**') && part.endsWith('**') 
                ? <strong key={i} className="font-semibold text-current opacity-100">{part.slice(2, -2)}</strong> 
                : part
           )}
         </p>
       );
    });
  };

  return (
    <div 
      className={`min-h-screen transition-colors duration-1000 ease-in-out font-sans overflow-hidden`}
      style={{ 
        backgroundColor: appTheme.background,
        color: appTheme.text 
      }}
    >
      {/* --- Intro Screen --- */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div 
            className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
            style={{
                background: isDarkMode 
                  ? 'radial-gradient(circle at center, #172554 0%, #0f172a 100%)'
                  : 'linear-gradient(135deg, #bfdbfe 0%, #e9d5ff 100%)'
            }}
          >
            {/* IT Context Header */}
             <div className="absolute top-0 left-0 w-full p-6 flex justify-between text-xs font-mono tracking-widest opacity-60 z-30 pointer-events-none">
                <div className="flex gap-6 pointer-events-auto">
                    <span className="flex items-center gap-2">
                        <Activity size={14} className="animate-pulse text-green-500"/> FIN_SYSTEMS: ONLINE
                    </span>
                    <span className="flex items-center gap-2">
                         <Terminal size={14} className="text-blue-500"/> >_ DEV_OPS: ACTIVE
                    </span>
                    <span className="hidden md:flex items-center gap-2 text-indigo-400">
                         <User size={14}/> USER: {profile.name.toUpperCase()}
                    </span>
                </div>
                <div className="flex gap-4 pointer-events-auto">
                    <span className="flex items-center gap-2 font-bold text-amber-500"><Trophy size={14}/> SKILLS_CAPTURED: {capturedSkills}</span>
                    <span className="mx-2">|</span>
                    <button onClick={() => setIsDarkMode(!isDarkMode)} className="hover:text-sky-400 transition-colors">
                        {isDarkMode ? <Moon size={14} /> : <Sun size={14} />}
                    </button>
                    <button onClick={toggleEditMode}><Lock size={14} /></button>
                </div>
            </div>

            <FloatingBackground theme={isDarkMode ? 'dark' : 'light'} onCatchSkill={() => setCapturedSkills(prev => prev + 1)} />

            {/* Main Content with Physics Collision */}
            {/* NOTE: We set pointer-events-none on the container so clicks pass through to the floating icons behind */}
            <div className="relative z-10 text-center p-10 max-w-4xl w-full pointer-events-none">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5 }}
               >
                   <h2 className="text-sm font-bold tracking-[0.3em] uppercase mb-6 opacity-70">Professional Portfolio</h2>
                   
                   {/* Name & Title */}
                   <div className={`relative inline-block pointer-events-auto ${isEditMode ? 'border border-dashed border-blue-400 p-4 rounded-lg' : ''}`}>
                       {isEditMode ? (
                           <input 
                             value={profile.name} 
                             onChange={(e) => setProfile({...profile, name: e.target.value})}
                             className="text-6xl font-serif text-center bg-transparent border-b border-current outline-none mb-2 w-full"
                           />
                       ) : (
                          // 3D Metallic Text Effect
                           <h1 className="text-8xl md:text-9xl font-serif font-black mb-4 relative perspective-500 select-none">
                              <span className="block" style={{
                                  background: isDarkMode 
                                    ? 'linear-gradient(to bottom, #ffffff 0%, #e2e8f0 50%, #94a3b8 100%)' 
                                    : 'linear-gradient(to bottom, #334155 0%, #1e293b 50%, #0f172a 100%)',
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                  filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.3))'
                              }}>
                                {profile.name}
                              </span>
                           </h1>
                       )}

                       {isEditMode ? (
                           <input 
                             value={profile.role} 
                             onChange={(e) => setProfile({...profile, role: e.target.value})}
                             className="text-2xl font-light italic text-center bg-transparent border-b border-current outline-none w-full"
                           />
                       ) : (
                           <div className="h-8 flex justify-center items-center">
                              <ScrambleText 
                                text={profile.role} 
                                className="text-3xl md:text-4xl font-light italic opacity-90 select-none" 
                                trigger={true}
                              />
                              <motion.span 
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="inline-block w-0.5 h-8 bg-current ml-1"
                              />
                           </div>
                       )}
                   </div>

                   {/* Hold to Start Interaction */}
                   <div className="mt-20 flex flex-col items-center gap-4 pointer-events-auto">
                       <div className="relative group cursor-pointer select-none" 
                            onMouseDown={() => setIsHolding(true)}
                            onMouseUp={() => setIsHolding(false)}
                            onMouseLeave={() => setIsHolding(false)}
                            onTouchStart={() => setIsHolding(true)}
                            onTouchEnd={() => setIsHolding(false)}
                       >
                           {/* Spinner Ring */}
                           <svg className="w-24 h-24 transform -rotate-90 overflow-visible" viewBox="0 0 100 100">
                               {/* Background track */}
                               <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2" fill="transparent" className="opacity-20" />
                               {/* Progress indicator */}
                               <motion.circle 
                                 cx="50" cy="50" r="46" 
                                 stroke="currentColor" 
                                 strokeWidth="3" 
                                 fill="transparent"
                                 strokeLinecap="round"
                                 initial={{ pathLength: 0 }}
                                 animate={{ pathLength: isHolding ? 1 : 0 }}
                                 transition={{ duration: 2, ease: "linear" }}
                                 onUpdate={(latest) => {
                                     if (typeof latest.pathLength === 'number' && latest.pathLength >= 0.99 && isHolding && !hasStarted) {
                                         handleStart();
                                     }
                                 }}
                               />
                           </svg>
                           <div className="absolute inset-0 flex items-center justify-center">
                               <ArrowRight size={32} className={`transition-transform duration-500 ${isHolding ? 'scale-125 translate-x-1' : 'group-hover:translate-x-1'}`} />
                           </div>
                       </div>
                       <span className="text-xs font-bold tracking-widest opacity-50 flex items-center gap-2">
                           {isHolding ? "HOLDING..." : "HOLD TO REVEAL JOURNEY"}
                           {isHolding && <div className="w-2 h-2 bg-current rounded-full animate-ping" />}
                       </span>
                   </div>
               </motion.div>
            </div>

            {/* Footer with Full Name */}
            <div className="absolute bottom-6 left-0 w-full text-center opacity-30 text-[10px] font-mono tracking-widest pointer-events-none">
                LAT: 34.0522 N &nbsp;&nbsp;&nbsp; LON: 118.2437 W &nbsp;&nbsp;&nbsp; SECURE_CONNECTION: TRUE
                <div className="mt-2 text-xs font-bold">{profile.name.toUpperCase()}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Main App Layout --- */}
      {hasStarted && (
        <div className="relative flex flex-col h-screen overflow-hidden">
          
          {/* Global Chapter Background (Spanning Full Width) */}
          <div className="absolute inset-0 z-0">
             <AnimatePresence mode="wait">
               {activeNode && (
                 <motion.div
                   key={activeNode.id}
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   transition={{ duration: 1 }}
                   className="absolute inset-0"
                 >
                    <ChapterBackground company={activeNode.company} theme={appTheme} />
                 </motion.div>
               )}
             </AnimatePresence>
          </div>

          {/* Top Navigation */}
          <header className="h-16 border-b flex items-center justify-between px-8 bg-opacity-80 backdrop-blur-md z-40 sticky top-0" style={{ borderColor: `${appTheme.primary}20` }}>
            <div className="flex items-center gap-4">
               {/* Professional Avatar in Header */}
               <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg overflow-hidden`} style={{ backgroundColor: appTheme.primary }}>
                  <ProfessionalAvatarSVG className="w-6 h-6" />
               </div>
               <div>
                 <h1 className="font-serif font-bold text-lg leading-tight">{profile.name}</h1>
                 <p className="text-xs uppercase tracking-wider opacity-70">{profile.role}</p>
               </div>
            </div>

            <div className="flex items-center gap-6">
                <button 
                  onClick={() => {
                    setHasStarted(false);
                    setIsPlaying(false);
                  }}
                  className="group flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all hover:bg-red-500 hover:text-white hover:border-red-500 opacity-60 hover:opacity-100"
                  style={{ borderColor: appTheme.primary, color: appTheme.text }}
                  title="Return to System Start"
                >
                    <Power size={14} className="group-hover:animate-pulse" />
                    <span className="hidden md:inline">SYSTEM REBOOT</span>
                </button>
                
                <div className="h-4 w-px bg-current opacity-20 hidden md:block" />

                <button onClick={() => setIsDarkMode(!isDarkMode)} className="hover:scale-110 transition-transform">
                   {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
                </button>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                  {isPlaying ? 'PAUSE' : 'AUTO-PLAY'}
                </button>
                <button 
                  onClick={toggleEditMode}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-white shadow-md hover:shadow-lg`}
                  style={{ backgroundColor: isEditMode ? '#ef4444' : appTheme.primary }}
                >
                   {isEditMode ? <X size={16} /> : <Plus size={16} />}
                   {isEditMode ? 'Close Editor' : 'New Role'}
                </button>
            </div>
          </header>

          <div className="flex flex-1 overflow-hidden relative z-10">
             
             {/* Left: Timeline Sidebar */}
             <div className="w-[450px] flex-shrink-0 border-r overflow-y-auto hide-scrollbar relative z-10 bg-opacity-50" style={{ borderColor: `${appTheme.primary}10` }}>
                <PathVisualizer 
                   nodes={nodes} 
                   activeId={activeNodeId} 
                   onNodeClick={(id) => { setActiveNodeId(id); setIsPlaying(false); }} // Pause on interaction
                   currentTheme={appTheme}
                />
             </div>

             {/* Right: Content Area */}
             <main className="flex-1 overflow-y-auto relative p-12">
                
                {activeNode ? (
                   <div className="max-w-5xl mx-auto relative z-20 pb-20">
                      {/* Header Section */}
                      <motion.div
                        key={activeNode.id + "header"}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                      >
                         <div className="flex items-center gap-4 mb-6">
                            <span className="text-4xl">{activeNode.emoji}</span>
                            <div className="h-px flex-1 bg-current opacity-20" />
                            <span className="font-mono text-sm tracking-widest opacity-60 uppercase">{activeNode.dateRange}</span>
                         </div>
                         
                         <h2 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight text-transparent bg-clip-text"
                             style={{ 
                               backgroundImage: `linear-gradient(45deg, ${appTheme.primary}, ${appTheme.secondary})`
                             }}
                         >
                            {activeNode.title}
                         </h2>

                         <div className="flex flex-wrap gap-3">
                            {activeNode.tags?.map(tag => (
                               <span key={tag} className="px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wide" style={{ borderColor: appTheme.primary, color: appTheme.primary }}>
                                  {tag}
                               </span>
                            ))}
                         </div>
                      </motion.div>

                      {/* Content Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                         
                         {/* Left Column: Narrative */}
                         <div className="lg:col-span-8">
                            <motion.div
                               key={activeNode.id + "body"}
                               initial={{ opacity: 0 }}
                               animate={{ opacity: 1 }}
                               transition={{ delay: 0.2 }}
                               className="prose prose-lg max-w-none"
                               style={{ color: appTheme.text }}
                            >
                               {renderDescription(activeNode.description)}
                            </motion.div>

                            {/* Duties List */}
                            {activeNode.duties && activeNode.duties.length > 0 && (
                                <motion.div 
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.4 }}
                                  className="mt-12 p-8 rounded-2xl bg-white bg-opacity-50 border shadow-sm backdrop-blur-sm"
                                  style={{ borderColor: `${appTheme.primary}20` }}
                                >
                                   <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                      <CheckCircle size={20} style={{ color: appTheme.primary }} />
                                      Key Achievements
                                   </h3>
                                   <ul className="space-y-4">
                                      {activeNode.duties.map((duty, i) => (
                                         <li key={i} className="flex gap-4 items-start group">
                                            <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0 transition-all group-hover:scale-150" style={{ backgroundColor: appTheme.secondary }} />
                                            <span className="leading-relaxed opacity-90">{duty}</span>
                                         </li>
                                      ))}
                                   </ul>
                                </motion.div>
                            )}
                         </div>

                         {/* Right Column: Visuals & Meta */}
                         <div className="lg:col-span-4 space-y-8">
                            
                            {/* Skills Card */}
                            <motion.div 
                               initial={{ x: 20, opacity: 0 }}
                               animate={{ x: 0, opacity: 1 }}
                               transition={{ delay: 0.3 }}
                               className="p-6 rounded-xl shadow-sm border bg-white/60 backdrop-blur-md"
                            >
                               <h4 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 opacity-70">
                                  <Briefcase size={14} /> My Competencies
                               </h4>
                               <div className="flex flex-wrap gap-2">
                                  {activeNode.skills?.map(skill => (
                                     <span key={skill} className="px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm" style={{ backgroundColor: appTheme.primary }}>
                                        {skill}
                                     </span>
                                  ))}
                               </div>
                            </motion.div>

                             {/* Tools Card */}
                             <motion.div 
                               initial={{ x: 20, opacity: 0 }}
                               animate={{ x: 0, opacity: 1 }}
                               transition={{ delay: 0.4 }}
                               className="p-6 rounded-xl shadow-sm border bg-white/60 backdrop-blur-md"
                            >
                               <h4 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 opacity-70">
                                  <Wrench size={14} /> Stack & Tools
                               </h4>
                               <div className="flex flex-wrap gap-2">
                                  {activeNode.tools?.map(tool => (
                                     <span key={tool} className="px-2 py-1 rounded border text-[10px] font-medium opacity-80" style={{ borderColor: appTheme.secondary }}>
                                        {tool}
                                     </span>
                                  ))}
                               </div>
                            </motion.div>

                             {/* Website Button */}
                             {activeNode.websiteUrl && (
                                <motion.a 
                                  href={activeNode.websiteUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white shadow-sm border font-bold text-sm hover:shadow-md transition-all group"
                                  style={{ color: appTheme.primary, borderColor: `${appTheme.primary}30` }}
                                >
                                    <ExternalLink size={16} className="group-hover:rotate-45 transition-transform" />
                                    Visit Website
                                </motion.a>
                             )}

                         </div>
                      </div>
                   </div>
                ) : (
                   <div className="h-full flex flex-col items-center justify-center opacity-30">
                       <Sparkles size={48} className="mb-4" />
                       <p className="text-xl font-serif">Select a chapter to begin</p>
                   </div>
                )}
             </main>
          </div>
        </div>
      )}
    </div>
  );
};