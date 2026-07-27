// Placeholder content shown until real data is added through the admin
// dashboard, or used as illustrative examples. Replace freely.

export const pillars = [
  {
    id: "ideate",
    icon: "Lightbulb",
    title: "Ideate",
    text: "Our vision is to build a space where students from all backgrounds can connect, collaborate, and share ideas through a shared passion for technology and innovation.",
  },
  {
    id: "innovate",
    icon: "GraduationCap",
    title: "Innovate",
    text: "We encourage and inspire individuals to innovate, supporting their growth both mentally and practically while offering opportunities to develop real-world skills.",
  },
  {
    id: "inspire",
    icon: "Users",
    title: "Inspire",
    text: "We create opportunities and motivate talented individuals to participate in competitions where they can turn their innovative ideas into real achievements.",
  },
];

export const activities = [
  {
    icon: "Wrench",
    title: "Develop Technical Skills",
    text: "Learning by doing is how real innovation happens.",
  },
  {
    icon: "Target",
    title: "Learn Professional Tactics",
    text: "Learn how to think, plan, and execute like a pro.",
  },
  {
    icon: "Heart",
    title: "Unveil Your True Passion",
    text: "Discover and work towards your passion.",
  },
  {
    icon: "Users2",
    title: "Insights from Industry Experts",
    text: "Hear directly from the professionals.",
  },
];

export const stats = [
  { label: "Active Members", value: "150+" },
  { label: "Events Hosted", value: "30+" },
  { label: "Years Active", value: "3+" },
];

export const dummyEvents = [
  {
    id: "dummy-1",
    title: "MIC presents Pitch Camp 4.0",
    description:
      "A hands-on bootcamp where teams sharpen a raw idea into a fundable pitch, guided by mentors from the local startup ecosystem.",
    date: "2026-08-14",
    time: "10:00 AM",
    location: "MIST Auditorium",
    category: "Workshop",
    imageUrl: "",
  },
  {
    id: "dummy-2",
    title: "Road to Success: EduTalks featuring Md. John Doe",
    description:
      "An evening talk series bringing alumni and industry leaders back to campus to share what they wish they knew as students.",
    date: "2026-08-28",
    time: "5:00 PM",
    location: "Seminar Hall 2",
    category: "Talk",
    imageUrl: "",
  },
  {
    id: "dummy-3",
    title: "Lorem Ipsum: Dolor Sit Amet, Consectetur",
    description:
      "Placeholder event description. Replace this entry from the admin dashboard once real event details are ready.",
    date: "2026-09-05",
    time: "3:00 PM",
    location: "TBA",
    category: "Competition",
    imageUrl: "",
  },
];

export const dummyNews = [
  {
    id: "dummy-n1",
    title: "Lorem Ipsum Dolor: Sit Amet, Consectetur Adipiscing Elit",
    summary: "Placeholder news summary text goes here.",
    date: "2026-07-01",
  },
  {
    id: "dummy-n2",
    title: "Nunc Vulputate Libero Et Velit Interdum",
    summary: "Placeholder news summary text goes here.",
    date: "2026-06-20",
  },
  {
    id: "dummy-n3",
    title: "Lorem Ipsum: Dolor Sit Amet, Consectetur",
    summary: "Placeholder news summary text goes here.",
    date: "2026-06-10",
  },
];

export const dummyPeople = [
  { id: "p1", name: "Jane Doe", role: "President", category: "Executive Panel", imageUrl: "", bio: "" },
  { id: "p2", name: "John Smith", role: "Vice President", category: "Executive Panel", imageUrl: "", bio: "" },
  { id: "p3", name: "Alex Rahman", role: "General Secretary", category: "Executive Panel", imageUrl: "", bio: "" },
  { id: "p4", name: "Sara Khan", role: "Treasurer", category: "Executive Panel", imageUrl: "", bio: "" },
  { id: "p5", name: "Team Member", role: "Event Coordinator", category: "General Panel", imageUrl: "", bio: "" },
  { id: "p6", name: "Team Member", role: "Design Lead", category: "General Panel", imageUrl: "", bio: "" },
];

export const dummyGallery = Array.from({ length: 8 }).map((_, i) => ({
  id: `g${i + 1}`,
  imageUrl: "",
  caption: `Placeholder gallery image ${i + 1}`,
  category: i % 2 === 0 ? "Events" : "Workshops",
}));
