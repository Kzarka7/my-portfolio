import { FaGraduationCap, FaAward, FaSchool } from "react-icons/fa";

export const educationData = [
  {
    category: "Academic",
    items: [
      {
        id: "001",
        type: "DEGREE",
        year: "2023 — Present",
        title: "BS Computer Engineering",
        institution: "Cebu Technological University — Danao Campus",
        desc: "Pursuing a Bachelor of Science in Computer Engineering with a focus on software development and embedded systems.",
        icon: FaGraduationCap,
        status: "ONGOING",
      },
      {
        id: "002",
        type: "SENIOR HIGH",
        year: "2021 — 2023",
        title: "GAS Strand",
        institution: "COMPOSTELA NATIONAL HIGH SCHOOL",
        desc: "General Academic Strand. Graduated with honors.",
        icon: FaSchool,
        status: "COMPLETED",
      },
    ],
  },
  {
    category: "Certificates",
    items: [
      {
        id: "C001",
        type: "CERTIFICATE",
        year: "2024",
        title: "Responsive Web Design",
        institution: "freeCodeCamp",
        icon: FaAward,
        status: "VERIFIED",
      },
      {
        id: "C002",
        type: "CERTIFICATE",
        year: "2024",
        title: "Your Certificate Here",
        institution: "Issuing Organization",
        icon: FaAward,
        status: "ONGOING",
      },
      {
        id: "C003",
        type: "CERTIFICATE",
        year: "2023",
        title: "Your Certificate Here",
        institution: "Issuing Organization",
        icon: FaAward,
        status: "VERIFIED",
      },
    ],
  },
];
