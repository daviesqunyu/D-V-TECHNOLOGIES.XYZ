import type { LucideIcon } from "lucide-react";
import {
  Monitor,
  Wrench,
  Wifi,
  Building2,
  Shield,
  Globe,
  Camera,
  BarChart3,
  CircuitBoard,
  Cloud,
  Brain,
  LineChart,
} from "lucide-react";

export type ServiceItem = {
  slug: string;
  title: string;
  description: string;
  features: string[];
  color: string;
  icon: LucideIcon;
  category: string;
};

export const servicesData: ServiceItem[] = [
  {
    slug: "it-support-maintenance",
    title: "IT Support & Maintenance",
    description:
      "24/7 remote & on-site support to keep your business running smoothly. Troubleshooting to system optimization.",
    color: "from-primary to-primary/60",
    icon: Monitor,
    category: "IT Support",
    features: [
      "24/7 Remote & On-site Support",
      "System Monitoring & Optimization",
      "Software Updates & Patches",
      "Help Desk Services",
    ],
  },
  {
    slug: "hardware-repair-solutions",
    title: "Hardware Repair & Solutions",
    description:
      "Expert repair and maintenance for computers, servers, printers, and all peripherals with fast turnaround.",
    color: "from-accent to-accent/60",
    icon: Wrench,
    category: "Hardware",
    features: [
      "Computer & Laptop Repairs",
      "Server Maintenance",
      "Printer & Peripheral Setup",
      "Hardware Upgrades",
    ],
  },
  {
    slug: "networking-internet",
    title: "Networking & Internet",
    description:
      "Network design, Wi-Fi deployment, VPN setup, and reliable internet connectivity for homes and businesses.",
    color: "from-primary to-accent",
    icon: Wifi,
    category: "Networking",
    features: [
      "Network Design & Installation",
      "Wi-Fi Solutions (Home & Business)",
      "Internet Connectivity Setup",
      "VPN & Security Configuration",
    ],
  },
  {
    slug: "business-solutions-erp",
    title: "Business Solutions & ERP",
    description:
      "End-to-end digital transformation — ERP implementation, custom software, and business process automation.",
    color: "from-accent to-primary",
    icon: Building2,
    category: "Software",
    features: [
      "ERP Implementation",
      "Custom Software Development",
      "Business Process Automation",
      "Digital Strategy Consulting",
    ],
  },
  {
    slug: "cloud-services",
    title: "Cloud Services",
    description:
      "Cloud migration, SaaS implementation, data backup & recovery, and full infrastructure management.",
    color: "from-blue-500 to-cyan-500",
    icon: Cloud,
    category: "Cloud",
    features: [
      "Cloud Migration",
      "SaaS Implementation",
      "Data Backup & Recovery",
      "Cloud Infrastructure Management",
    ],
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    description:
      "Security audits, firewall configuration, anti-malware solutions, and staff cybersecurity training.",
    color: "from-red-500 to-orange-500",
    icon: Shield,
    category: "Security",
    features: [
      "Security Audits & Penetration Testing",
      "Firewall & VPN Configuration",
      "Anti-virus & Anti-malware",
      "Staff Security Training",
    ],
  },
  {
    slug: "web-app-development",
    title: "Web & App Development",
    description:
      "Custom websites, e-commerce platforms, mobile apps (React Native, Flutter), and progressive web apps.",
    color: "from-green-500 to-emerald-500",
    icon: Globe,
    category: "Software",
    features: [
      "Custom Websites & Landing Pages",
      "E-commerce Platforms",
      "Mobile Apps (React Native, Flutter)",
      "Progressive Web Apps (PWAs)",
    ],
  },
  {
    slug: "cctv-surveillance",
    title: "CCTV & Surveillance",
    description:
      "Security camera installation, remote monitoring systems, and smart home & office surveillance solutions.",
    color: "from-yellow-500 to-amber-500",
    icon: Camera,
    category: "Hardware",
    features: [
      "IP Camera Installation",
      "Remote Monitoring Setup",
      "Smart Home Security",
      "Office Surveillance Systems",
    ],
  },
  {
    slug: "data-analytics-bi",
    title: "Data Analytics & BI",
    description:
      "Business intelligence dashboards, data visualization, KPI reporting, and actionable insights for decision-making.",
    color: "from-violet-500 to-purple-500",
    icon: BarChart3,
    category: "AI",
    features: [
      "BI Dashboard Development",
      "Data Visualization",
      "Custom Reports & Analytics",
      "KPI Dashboards",
    ],
  },
  {
    slug: "data-science",
    title: "Data Science",
    description:
      "Statistical modeling, predictive analytics, data pipelines, A/B testing, and ML-driven insights for growth and operations.",
    color: "from-indigo-500 to-violet-500",
    icon: LineChart,
    category: "AI",
    features: [
      "Statistical Modeling & A/B Testing",
      "Data Pipelines & ETL",
      "Predictive Analytics",
      "ML for Business Insights",
    ],
  },
  {
    slug: "iot-solutions",
    title: "IoT Solutions",
    description:
      "Smart office & home automation, sensor networks, and industrial IoT solutions for East African businesses.",
    color: "from-teal-500 to-cyan-500",
    icon: CircuitBoard,
    category: "IoT",
    features: [
      "Smart Office/Home Automation",
      "Sensor Networks & Monitoring",
      "Industrial IoT Integration",
      "Asset Tracking Systems",
    ],
  },
  {
    slug: "ai-machine-learning",
    title: "AI & Machine Learning",
    description:
      "Deep learning, NLP for Swahili & English, predictive analytics, and intelligent automation bots.",
    color: "from-primary to-pink-500",
    icon: Brain,
    category: "AI",
    features: [
      "Deep Learning & Neural Networks",
      "NLP (Swahili & English)",
      "Predictive Analytics",
      "Intelligent Automation Bots",
    ],
  },
];
