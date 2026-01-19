import { IoPerson } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import { BiSolidBellRing } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSunny } from "react-icons/io";
import { GiHospitalCross } from "react-icons/gi";
import { RiShieldCrossFill } from "react-icons/ri";
import { FaExclamation } from "react-icons/fa";
import { FaCarOn } from "react-icons/fa6";

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

export const pros  = [
    {
        icon : FaLocationDot,
        title : 'Location-Based Alerts',
        description : 'Receive warnings about diseases outbreaks reported in your specif neighborhood in Nairobi, Mombasa or Kisumu.'
    },
    {
        icon : IoIosSunny,
        title : 'Climate Adapted',
        description : 'Tips and health monitoring adjusted for seasonal changes, heat waves, and the rainy season which brings specific parasites'
    },
    {
        icon : GiHospitalCross,
        title : 'Verified Vet Network',
        description : 'Access a directory of KVB-registered vererinarians and 24/7 emergency clinics near you.'
    }

]

export const insights = [
    {
        icon : RiShieldCrossFill,
        title : 'Recognize risky symptoms',
        description : 'Identify potential health threats at the first sign of trouble, giving you a head start on treatment and care.'
    }, {
        icon : FaExclamation,
        title : "Understand urgency levels",
        description : "Know exactly when a symptom is mild or critical, so you can make informed decisions without panic."
    },
    {
        icon : FaCarOn,
        title : "Act promptly be seeking veterinary care when needed",
        description : 'Connect instantly with professionals to ensure your pet receives the necessary medical attention right away.'
        
    }
]