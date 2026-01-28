import { IoPerson } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import { BiSolidBellRing } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSunny } from "react-icons/io";
import { GiHospitalCross } from "react-icons/gi";
import { RiShieldCrossFill } from "react-icons/ri";
import { FaExclamation } from "react-icons/fa";
import { FaCarOn } from "react-icons/fa6";
import Kevin from "../public/assets/kevin.png";
import Wanjiku from "../public/assets/wanjiku.png";
import { FaHouse } from "react-icons/fa6";
import { FaHandsWash } from "react-icons/fa";
import { AiFillStop } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { TiTick } from "react-icons/ti";

export const steps = [
  {
    id: 1,
    icon: IoPerson,
    title: "Create Profile",
    description:
      "Sign up specifically for your breed. We support local mixed breeds and purebreds alike.",
  },
  {
    id: 2,
    icon: CgNotes,
    title: "Log Symptoms",
    description:
      "Notice a change in appetite or energy? Log it quickly and check against local ailments.",
  },
  {
    id: 3,
    icon: BiSolidBellRing,
    title: "Get Alerts",
    description:
      "Receive instant red flags if something looks wrond and get directed to the nearest vet.",
  },
];

export const pros = [
  {
    icon: FaLocationDot,
    title: "Location-Based Alerts",
    description:
      "Receive warnings about diseases outbreaks reported in your specif neighborhood in Nairobi, Mombasa or Kisumu.",
  },
  {
    icon: IoIosSunny,
    title: "Climate Adapted",
    description:
      "Tips and health monitoring adjusted for seasonal changes, heat waves, and the rainy season which brings specific parasites",
  },
  {
    icon: GiHospitalCross,
    title: "Verified Vet Network",
    description:
      "Access a directory of KVB-registered vererinarians and 24/7 emergency clinics near you.",
  },
];

export const insights = [
  {
    icon: RiShieldCrossFill,
    title: "Recognize risky symptoms",
    description:
      "Identify potential health threats at the first sign of trouble, giving you a head start on treatment and care.",
  },
  {
    icon: FaExclamation,
    title: "Understand urgency levels",
    description:
      "Know exactly when a symptom is mild or critical, so you can make informed decisions without panic.",
  },
  {
    icon: FaCarOn,
    title: "Act promptly be seeking veterinary care when needed",
    description:
      "Connect instantly with professionals to ensure your pet receives the necessary medical attention right away.",
  },
];

export const testimonials = [
  {
    img: Wanjiku,
    name: "Wanjiku M.",
    location: "Nairobi, Kilimani",
    rating: 5,
    message:
      "Mune helped me catch Simba's tick fever early. The app noticed his lethargy before I did. It really saved his life!.",
  },
  {
    img: Kevin,
    name: "Kevin O.",
    location: "Mombasa, Nyali",
    rating: 5,
    message:
      "Mune helped me catch Simba's tick fever early. The app noticed his lethargy before I did. It really saved his life!.",
  },
];

export const footerLinks = [
  {
    title: "Product",
    links: ["Features", "Pricing", "For Vets"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Use"],
  },
];

export const precautions = [
  {
    icon: FaHouse,
    title: "Keep cats Indoors",
    description:
      "Limit outdoor exposure until outbreak is contained to prevent direct contact.",
  },
  {
    icon: FaHandsWash,
    title: "Practice Hygiene",
    description:
      "Wash hands thouroughly after handling other animals or visiting public pet areas.",
  },
  {
    icon: AiFillStop,
    title: "Avoid Contact",
    description:
      "Keep sick cats isolated from healthy ones immediately if signs appear.",
  },
  {
    icon: FaPhoneAlt,
    title: "Contact Vet",
    description:
      "Call immediately if symptoms appear. Early treatment significantly improves outcomes.",
  },
];

export const RISK_UI = {
  LOW: {
    bg: "bg-green-50",
    text: "text-green-800",
    badge: "text-green-500",
    label: "LOW RISK",
    icon: TiTick,
  },
  MEDIUM: {
    bg: "bg-yellow-50",
    text: "text-yellow-800",
    badge: "text-yellow-500",
    label: "MODERATE RISK",
    icon: IoIosWarning,
  },
  HIGH: {
    bg: "bg-red-50",
    text: "text-red-800",
    badge: "text-red-500",
    label: "HIGH RISK",
    icon: GiHospitalCross,
  },
  CRITICAL: { bg: "bg-red-600", text: "text-white", badge: "text-white", label: "CRITICAL RISK", icon: GiHospitalCross },
} as const;

export const ACTION_UI = {
  HOME_CARE: {
    title: "Monitor at Home",
    actions: [
      "Ensure fresh water is available",
      "Monitor symptoms closely",
      "Contact a vet if symptoms worsen",
    ],
  },
  BOOK_VET: {
    title: "Book a Vet Visit",
    actions: [
      "Schedule an appointment with your vet",
      "Keep your pet comfortable and hydrated",
      "Avoid giving human medication",
    ],
  },
  EMERGENCY: {
    title: "Emergency Care Required",
    actions: [
      "Visit the nearest emergency vet clinic immediately",
      "Do not delay treatment",
      "Keep your pet warm and calm during transport",
    ],
  },
  MONITOR: {
    title: "Monitor at Home",
    actions: [
      "Keep your pet comfortable",
      "Check symptoms regularly",
      "Contact a vet if anything worsens",
    ],
  },
} as const;
