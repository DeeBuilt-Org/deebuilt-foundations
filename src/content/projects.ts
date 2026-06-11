import opsette from "@/assets/project-opsette.jpg";
import midterm from "@/assets/project-midterm.jpg";
import ezii from "@/assets/project-ezii.jpg";
import petkarma from "@/assets/project-petkarma.jpg";

export type Project = {
  title: string;
  description: string;
  href: string;
  image: string;
};

export const projects: Project[] = [
  {
    title: "Opsette",
    description:
      "An all-in-one workspace for managing clients, tasks, scheduling, and internal operations.",
    href: "https://opsette.io/",
    image: opsette,
  },
  {
    title: "The Midterm Project",
    description:
      "A voter resource hub for finding elections, checking registration, and understanding the ballot.",
    href: "https://themidtermproject.org/",
    image: midterm,
  },
  {
    title: "Ezii Quote Builder",
    description:
      "A quote builder for service businesses to create clients, define services, and generate clear estimates.",
    href: "https://www.ezii.io/home",
    image: ezii,
  },
  {
    title: "Pet Karma",
    description:
      "Coordinate vacation pet care with friends through a simple scheduling app.",
    href: "https://petkarma.app/",
    image: petkarma,
  },
];

export const BOOKING_URL =
  "https://opsette.io/booking/deebuilt/discovery-call";
export const YOUTUBE_URL = "https://www.youtube.com/@DeeBuiltSystems";
export const CONTACT_EMAIL = "hello@deebuilt.co";
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/PLACEHOLDER";
