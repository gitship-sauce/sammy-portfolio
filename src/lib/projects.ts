export type Project = {
  id: string;
  title: string;
  whatItDoes: string;
  whatIDid: string;
  link: string | null;
  picture: string | null;
};

// Sample projects, until the admin page can add real ones.
export const projects: Project[] = [
  {
    id: "study-room-booker",
    title: "Study-room booker",
    whatItDoes: "Students book a library study room for an hour, without emailing the front desk.",
    whatIDid: "I built the calendar that shows which rooms are free.",
    link: null,
    picture: "/projects/study-room-booker.png",
  },
  {
    id: "bus-time-bot",
    title: "Bus-time bot",
    whatItDoes: "A chat bot that tells you when the next bus leaves campus.",
    whatIDid: "I wrote the code that asks the city's bus service for live times.",
    link: null,
    picture: "/projects/bus-time-bot.png",
  },
];
