import { IoPerson } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import { BiSolidBellRing } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSunny } from "react-icons/io";
import { GiHospitalCross } from "react-icons/gi";


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