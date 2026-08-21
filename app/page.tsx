"use client";

import React, { useState, useEffect } from "react";

// --- Икон бүрэлдэхүүн хэсгүүд (Minimalist SVG Icons) ---
const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const AnnouncementIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A2.5 2.5 0 013 11.2V8.8a2.5 2.5 0 012.436-2.483l6.564-.656v9.338l-6.564-.656z" />
  </svg>
);

const BookIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const TaskIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const RuleIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const GradeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002 2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const ChatIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

// --- Дата Интерфэйсүүд ---
interface Student {
  id: number;
  name: string;
  code: string;
  grade: string;
}

interface TaskRecord {
  attendance: "Ирсэн" | "Хоцорсон" | "Чөлөөтэй" | "Тасалсан";
  participation: string;
}

interface Task {
  id: number;
  title: string;
  date: string;
  status: string;
  records: Record<number, TaskRecord>;
}

interface Homework {
  id: number;
  subject: string;
  title: string;
  dueDate: string;
  description: string;
}

interface Announcement {
  id: number;
  title: string;
  date: string;
  content: string;
  important?: boolean;
}

interface ScheduleDay {
  day: string;
  lessons: string[];
}

interface GradeRecord {
  id: number;
  studentId: number;
  subject: string;
  score: string;
  date: string;
  comment: string;
}

interface ChatMessage {
  id: number;
  sender: "teacher" | "parent";
  studentCode?: string;
  text: string;
  time: string;
}

// Эхлэлийн дата
const INITIAL_STUDENTS: Student[] = [
  { id: 1, name: "Амина.Э", code: "STU-001", grade: "A" },
  { id: 2, name: "Аминзаяа.М", code: "STU-002", grade: "B" },
  { id: 3, name: "Бат-Эрдэнэ.Б", code: "STU-003", grade: "A" },
  { id: 4, name: "Билгүүн.Г", code: "STU-004", grade: "A-" },
  { id: 5, name: "Тэмүүлэн.О", code: "STU-005", grade: "B+" },
];

const INITIAL_SCHEDULE: ScheduleDay[] = [
  { day: "Даваа", lessons: ["Математик", "Монгол хэл", "Англи хэл", "Биеийн тамир", "Байгаль шинжлэл", "-", "-"] },
  { day: "Мягмар", lessons: ["Байгаль шинжлэл", "Математик", "Уран зохиол", "Дүрслэх урлаг", "Англи хэл", "-", "-"] },
  { day: "Лхагва", lessons: ["Монгол хэл", "Мэдээлэл технологи", "Математик", "Хөгжим", "Иргэний ёс зүй", "-", "-"] },
  { day: "Пүрэв", lessons: ["Англи хэл", "Математик", "Иргэний ёс зүй", "Биеийн тамир", "Уран зохиол", "-", "-"] },
  { day: "Баасан", lessons: ["Монгол хэл", "Математик", "Дизайн технологи", "Ангийн цаг", "Сонгон хичээл", "-", "-"] },
];

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: "Эцэг эхийн нэгдсэн хурал",
    date: "2026.08.25",
    content: "Ирэх Баасан гарагт 18:00 цагаас 5-р ангийн эцэг эхийн хурал хичээлийн 204 тоотод болно. Та бүхэн идэвхтэй оролцоно уу.",
    important: true,
  },
  {
    id: 2,
    title: "Эрүүл мэндийн үзлэг",
    date: "2026.08.22",
    content: "Маргааш сурагчдын жилийн эхний эрүүл мэндийн урьдчилан сэргийлэх үзлэг явагдана.",
    important: false,
  },
];

const INITIAL_HOMEWORK: Homework[] = [
  {
    id: 1,
    subject: "Математик",
    title: "Дасгал 102-108 бодох",
    dueDate: "2026.08.24",
    description: "Сурах бичгийн 45-р хуудасны 102-оос 108 хүртэлх бодлогуудыг дэвтэрт бодож ирэх.",
  },
  {
    id: 2,
    subject: "Монгол хэл",
    title: "Эссэ бичих (150-200 үг)",
    dueDate: "2026.08.25",
    description: "'Миний зуны амралт' сэдвээр найруулан бичих.",
  },
];

const INITIAL_RULES = [
  "1. Хичээлээс хоцрохгүй, цагтаа ирэх",
  "2. Багш болон бусдын яриаг анхааралтай сонсох",
  "3. Анги танхимын цэвэр цэмцгэр байдлыг сахих",
  "4. Бусдыг хүндэтгэх, нөхөрсөг байх",
  "5. Хичээлийн хэрэглэгдэхүүнээ бүрэн бэлдэх",
];

const INITIAL_GRADES: GradeRecord[] = [
  { id: 1, studentId: 1, subject: "Математик", score: "98 (A)", date: "2026.08.20", comment: "Бодлогыг маш цэгцтэй бодсон" },
  { id: 2, studentId: 1, subject: "Монгол хэл", score: "92 (A)", date: "2026.08.19", comment: "Цэвэр сайхан бичсэн" },
  { id: 3, studentId: 2, subject: "Математик", score: "85 (B)", date: "2026.08.20", comment: "Бодлогын зарчим зөв" },
];

// --- ДИЖИТАЛ ХУАНЛИ ВЕДЖЕТ (ЗҮҮН ДЭЭД ХЭСЭГТ) ---
function DigitalCalendarWidget() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!now) {
    return (
      <div className="bg-blue-900/40 border border-blue-700/40 rounded-2xl p-4 text-white animate-pulse">
        <div className="h-6 bg-blue-800/50 rounded mb-2"></div>
        <div className="h-4 bg-blue-800/30 rounded"></div>
      </div>
    );
  }

  const timeStr = now.toLocaleTimeString("mn-MN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  const dayNames = ["Ням", "Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба"];
  const dayOfWeek = dayNames[now.getDay()];
  const monthNames = ["1-р сар", "2-р сар", "3-р сар", "4-р сар", "5-р сар", "6-р сар", "7-р сар", "8-р сар", "9-р сар", "10-р сар", "11-р сар", "12-р сар"];

  // Сарын өдрүүдийн сүлжээ бодох
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  return (
    <div className="bg-gradient-to-br from-blue-900/80 to-slate-900 border border-blue-700/50 rounded-2xl p-4 text-white shadow-lg backdrop-blur-md mb-6">
      {/* Дижитал цаг ба Огноо */}
      <div className="text-center pb-3 border-b border-blue-800/60">
        <div className="text-2xl font-mono font-bold tracking-widest text-cyan-300 drop-shadow-sm">
          {timeStr}
        </div>
        <div className="text-xs font-medium text-blue-200 mt-1">
          {year} оны {monthNames[month]} {day} | <span className="text-cyan-400 font-semibold">{dayOfWeek}</span>
        </div>
      </div>

      {/* Дижитал Сарын Хуанли */}
      <div className="mt-3">
        <div className="grid grid-cols-7 gap-1 text-[10px] text-center font-medium text-blue-300 mb-1">
          <span className="text-blue-400 font-semibold">Ня</span>
          <span className="text-blue-400 font-semibold">Да</span>
          <span className="text-blue-400 font-semibold">Мя</span>
          <span className="text-blue-400 font-semibold">Лх</span>
          <span className="text-blue-400 font-semibold">Пү</span>
          <span className="text-blue-400 font-semibold">Ба</span>
          <span className="text-blue-400 font-semibold">Бя</span>
        </div>
        <div className="grid grid-cols-7 gap-1 text-[11px] text-center">
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <span key={`empty-${i}`} className="py-0.5" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const d = i + 1;
            const isToday = d === day;
            return (
              <span
                key={d}
                className={`py-0.5 rounded-md font-mono transition-all ${
                  isToday
                    ? "bg-cyan-400 text-slate-950 font-extrabold shadow-md shadow-cyan-500/30 scale-105"
                    : "text-blue-200 hover:bg-blue-800/40"
                }`}
              >
                {d}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --- НҮҮР ҮНДСЭН АПП ---
export default function MinimalistSchoolApp() {
  const [role, setRole] = useState<"teacher" | "parent">("teacher");
  const [activeTab, setActiveTab] = useState<
    "schedule" | "announcements" | "homework" | "tasks" | "students" | "grades" | "rules" | "chat"
  >("schedule");

  // Дата төлвүүд
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [schedule, setSchedule] = useState<ScheduleDay[]>(INITIAL_SCHEDULE);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [homework, setHomework] = useState<Homework[]>(INITIAL_HOMEWORK);
  const [rules, setRules] = useState<string[]>(INITIAL_RULES);
  const [grades, setGrades] = useState<GradeRecord[]>(INITIAL_GRADES);

  // Эцэг эхийн хувийн код
  const [parentCode, setParentCode] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Хичээлийн хуваарь засах
  const [isEditingSchedule, setIsEditingSchedule] = useState(false);
  const [tempSchedule, setTempSchedule] = useState<ScheduleDay[]>(INITIAL_SCHEDULE);

  // Маягтуудын төлөв
  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", content: "", important: false });
  const [newHomework, setNewHomework] = useState({ subject: "Математик", title: "", dueDate: "", description: "" });
  const [newStudent, setNewStudent] = useState({ name: "", code: "" });
  const [newGrade, setNewGrade] = useState({ studentId: 1, subject: "Математик", score: "", comment: "" });
  const [newRule, setNewRule] = useState("");

  // Чат
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, sender: "teacher", text: "Сайн байна уу? Хичээлийн хоцрогдлын талаар асуух зүйл байна уу?", time: "14:20" },
  ]);
  const [chatInput, setChatInput] = useState("");

  // Эцэг эхийн пин кодыг шалгах
  useEffect(() => {
    if (role === "parent" && parentCode.trim() !== "") {
      const found = students.find((s) => s.code.toLowerCase() === parentCode.trim().toLowerCase());
      setSelectedStudent(found || null);
    } else {
      setSelectedStudent(null);
    }
  }, [role, parentCode, students]);

  // Хичээлийн хуваарь хадгалах
  const handleSaveSchedule = () => {
    setSchedule(tempSchedule);
    setIsEditingSchedule(false);
  };

  // Шинэ зар нэмэх
  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncement.title || !newAnnouncement.content) return;
    const item: Announcement = {
      id: Date.now(),
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      important: newAnnouncement.important,
      date: new Date().toISOString().slice(0, 10).replace(/-/g, "."),
    };
    setAnnouncements([item, ...announcements]);
    setNewAnnouncement({ title: "", content: "", important: false });
  };

  // Шинэ гэрийн даалгавар нэмэх
  const handleAddHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHomework.title || !newHomework.dueDate) return;
    const item: Homework = {
      id: Date.now(),
      ...newHomework,
    };
    setHomework([item, ...homework]);
    setNewHomework({ subject: "Математик", title: "", dueDate: "", description: "" });
  };

  // Шинэ сурагч нэмэх
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.code) return;
    const st: Student = {
      id: Date.now(),
      name: newStudent.name,
      code: newStudent.code,
      grade: "A",
    };
    setStudents([...students, st]);
    setNewStudent({ name: "", code: "" });
  };

  // Шинэ дүн нэмэх
  const handleAddGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGrade.score) return;
    const g: GradeRecord = {
      id: Date.now(),
      studentId: Number(newGrade.studentId),
      subject: newGrade.subject,
      score: newGrade.score,
      date: new Date().toISOString().slice(0, 10).replace(/-/g, "."),
      comment: newGrade.comment,
    };
    setGrades([g, ...grades]);
    setNewGrade({ studentId: 1, subject: "Математик", score: "", comment: "" });
  };

  // Мессеж илгээх
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const msg: ChatMessage = {
      id: Date.now(),
      sender: role,
      text: chatInput,
      time: new Date().toLocaleTimeString("mn-MN", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([...messages, msg]);
    setChatInput("");
  };

  const menuItems = [
    { id: "schedule", label: "Хичээлийн хуваарь", icon: <CalendarIcon /> },
    { id: "announcements", label: "Зар мэдээ", icon: <AnnouncementIcon /> },
    { id: "homework", label: "Гэрийн даалгавар", icon: <BookIcon /> },
    { id: "tasks", label: "Хийгдэх ажлууд & Ирц", icon: <TaskIcon /> },
    { id: "students", label: "Сурагчийн жагсаалт", icon: <UsersIcon /> },
    { id: "grades", label: "Дүнгийн мэдээ", icon: <GradeIcon /> },
    { id: "rules", label: "Ангийн дүрэм", icon: <RuleIcon /> },
    { id: "chat", label: "Чат & Холбоо", icon: <ChatIcon /> },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      {/* ================= ЗҮҮН ТАЛЫН БОСОО ЦЭС (SIDEBAR) ================= */}
      <aside className="w-72 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-slate-100 flex flex-col justify-between p-5 border-r border-blue-900/40 shadow-2xl shrink-0">
        <div>
          {/* Лого & Гарчиг */}
          <div className="flex items-center space-x-3 mb-6 px-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/30">
              Э
            </div>
            <div>
              <h1 className="font-bold text-lg text-white tracking-wide">ЭДҮ-СИСТЕМ</h1>
              <p className="text-[11px] text-blue-300 font-medium">Сургуулийн удирдлага</p>
            </div>
          </div>

          {/* ДЭЭД ХЭСЭГТ: ДИЖИТАЛ ХУАНЛИ ВЕДЖЕТ */}
          <DigitalCalendarWidget />

          {/* ДООШОО ЦУВСАН СИСТЕМИЙН ЦЭСНҮҮД */}
          <nav className="space-y-1.5">
            <div className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider px-3 mb-2">
              Системийн Цэс
            </div>
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 border-l-4 border-cyan-300 font-semibold"
                      : "text-blue-100/80 hover:bg-blue-900/40 hover:text-white"
                  }`}
                >
                  <span className={isActive ? "text-cyan-200" : "text-blue-300"}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Нэвтэрсэн хэрэглэгч & Горим солих */}
        <div className="pt-4 border-t border-blue-900/60 mt-6">
          <div className="bg-blue-900/30 border border-blue-800/40 rounded-xl p-3">
            <div className="text-xs text-blue-300 mb-1">Горим сонгох:</div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setRole("teacher")}
                className={`py-1.5 text-xs font-semibold rounded-lg transition ${
                  role === "teacher"
                    ? "bg-cyan-400 text-slate-950 shadow"
                    : "bg-blue-950 text-blue-200 hover:bg-blue-900"
                }`}
              >
                Багш
              </button>
              <button
                onClick={() => setRole("parent")}
                className={`py-1.5 text-xs font-semibold rounded-lg transition ${
                  role === "parent"
                    ? "bg-cyan-400 text-slate-950 shadow"
                    : "bg-blue-950 text-blue-200 hover:bg-blue-900"
                }`}
              >
                Эцэг эх
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* ================= ҮНДСЭН АГУУЛГЫН ХЭСЭГ (RIGHT CONTENT) ================= */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Толгой хэсэг (Header) */}
        <header className="bg-white border-b border-slate-200/80 px-8 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {menuItems.find((m) => m.id === activeTab)?.label}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Минималист сургуулийн удирдлагын платформ
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {role === "parent" && (
              <div className="flex items-center space-x-2 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl">
                <span className="text-xs text-blue-700 font-medium">Сурагчийн код:</span>
                <input
                  type="text"
                  placeholder="Жишээ: STU-001"
                  value={parentCode}
                  onChange={(e) => setParentCode(e.target.value)}
                  className="w-28 text-xs bg-white border border-blue-300 rounded-md px-2 py-1 text-slate-800 uppercase focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono font-bold"
                />
              </div>
            )}

            <div className="flex items-center space-x-3 bg-slate-100/80 px-3 py-1.5 rounded-xl border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                {role === "teacher" ? "БАГ" : "ЭЦЭ"}
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-800">
                  {role === "teacher" ? "Багш: Д.Батбаяр" : selectedStudent ? `${selectedStudent.name}-н эцэг эх` : "Эцэг эх"}
                </div>
                <div className="text-[10px] text-blue-600 font-semibold">
                  {role === "teacher" ? "5-А Анги удирдсан багш" : selectedStudent ? `Код: ${selectedStudent.code}` : "Кодоо оруулна уу"}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Агуулга */}
        <div className="p-8 max-w-7xl mx-auto w-full">
          {/* ---------------- 1. ХИЧЭЭЛИЙН ХУВААРЬ ---------------- */}
          {activeTab === "schedule" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">5-А Ангийн Хичээлийн Хуваарь</h3>
                  <p className="text-xs text-slate-500">Долоо хоногийн 5 өдөр, өдөрт 7 хичээлийн цаг</p>
                </div>
                {role === "teacher" && (
                  <div>
                    {!isEditingSchedule ? (
                      <button
                        onClick={() => {
                          setTempSchedule(JSON.parse(JSON.stringify(schedule)));
                          setIsEditingSchedule(true);
                        }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition shadow-sm"
                      >
                        Хуваарь засах
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSaveSchedule}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition shadow-sm"
                        >
                          Хадгалах
                        </button>
                        <button
                          onClick={() => setIsEditingSchedule(false)}
                          className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-xl transition"
                        >
                          Цуцлах
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-white text-xs uppercase tracking-wider">
                        <th className="p-4 border-b border-slate-800 font-bold w-20 text-center">Цаг</th>
                        {schedule.map((s) => (
                          <th key={s.day} className="p-4 border-b border-slate-800 font-semibold text-center border-l border-slate-800">
                            {s.day}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-sm">
                      {[0, 1, 2, 3, 4, 5, 6].map((periodIndex) => (
                        <tr key={periodIndex} className="hover:bg-blue-50/30 transition-colors">
                          <td className="p-3 text-center font-mono font-bold text-blue-900 bg-slate-50/80 border-r border-slate-200">
                            {periodIndex + 1}-р цаг
                          </td>
                          {schedule.map((dayData, dayIdx) => (
                            <td key={dayData.day} className="p-3 text-center border-l border-slate-200">
                              {isEditingSchedule ? (
                                <input
                                  type="text"
                                  value={tempSchedule[dayIdx].lessons[periodIndex] || ""}
                                  onChange={(e) => {
                                    const updated = [...tempSchedule];
                                    updated[dayIdx].lessons[periodIndex] = e.target.value;
                                    setTempSchedule(updated);
                                  }}
                                  className="w-full text-center text-xs border border-blue-300 rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                                />
                              ) : (
                                <span
                                  className={`inline-block px-3 py-1 rounded-lg text-xs font-medium ${
                                    dayData.lessons[periodIndex] && dayData.lessons[periodIndex] !== "-"
                                      ? "bg-blue-50 text-blue-900 border border-blue-100"
                                      : "text-slate-400 font-light"
                                  }`}
                                >
                                  {dayData.lessons[periodIndex] || "-"}
                                </span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ---------------- 2. ЗАР МЭДЭЭ ---------------- */}
          {activeTab === "announcements" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Сүүлийн үеийн зар сонордуулга</h3>
                {announcements.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition relative overflow-hidden"
                  >
                    {item.important && (
                      <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-sm">
                        Чухал зар
                      </div>
                    )}
                    <div className="flex items-center space-x-2 text-xs font-semibold text-blue-600 mb-2">
                      <span>📢</span>
                      <span>Огноо: {item.date}</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.content}</p>
                  </div>
                ))}
              </div>

              {role === "teacher" && (
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm h-fit">
                  <h4 className="text-base font-bold text-slate-900 mb-4">Шинэ зар нийтлэх</h4>
                  <form onSubmit={handleAddAnnouncement} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Гарчиг</label>
                      <input
                        type="text"
                        value={newAnnouncement.title}
                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                        className="w-full text-sm border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Зар мэдээний гарчиг..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Агуулга</label>
                      <textarea
                        rows={4}
                        value={newAnnouncement.content}
                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                        className="w-full text-sm border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Дэлгэрэнгүй мэдээлэл..."
                      ></textarea>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="imp"
                        checked={newAnnouncement.important}
                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, important: e.target.checked })}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <label htmlFor="imp" className="text-xs text-slate-700 font-medium">
                        Чухал зар болгох
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-sm"
                    >
                      Нийтлэх
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* ---------------- 3. ГЭРИЙН ДААЛГАВАР ---------------- */}
          {activeTab === "homework" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Гэрийн даалгаврын жагсаалт</h3>
                {homework.map((hw) => (
                  <div key={hw.id} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 font-bold text-xs rounded-lg">
                        {hw.subject}
                      </span>
                      <span className="text-xs text-amber-600 font-semibold bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md">
                        Дуусах: {hw.dueDate}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-2">{hw.title}</h4>
                    <p className="text-sm text-slate-600">{hw.description}</p>
                  </div>
                ))}
              </div>

              {role === "teacher" && (
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm h-fit">
                  <h4 className="text-base font-bold text-slate-900 mb-4">Даалгавар нэмэх</h4>
                  <form onSubmit={handleAddHomework} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Хичээл</label>
                      <select
                        value={newHomework.subject}
                        onChange={(e) => setNewHomework({ ...newHomework, subject: e.target.value })}
                        className="w-full text-sm border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option>Математик</option>
                        <option>Монгол хэл</option>
                        <option>Англи хэл</option>
                        <option>Байгаль шинжлэл</option>
                        <option>Уран зохиол</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Сэдэв/Даалгавар</label>
                      <input
                        type="text"
                        value={newHomework.title}
                        onChange={(e) => setNewHomework({ ...newHomework, title: e.target.value })}
                        className="w-full text-sm border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Жишээ: 45-р хуудас Дасгал 2"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Хүлээлгэн өгөх огноо</label>
                      <input
                        type="date"
                        value={newHomework.dueDate}
                        onChange={(e) => setNewHomework({ ...newHomework, dueDate: e.target.value })}
                        className="w-full text-sm border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Тайлбар</label>
                      <textarea
                        rows={3}
                        value={newHomework.description}
                        onChange={(e) => setNewHomework({ ...newHomework, description: e.target.value })}
                        className="w-full text-sm border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Дэлгэрэнгүй заавар..."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-sm"
                    >
                      Даалгавар оруулах
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* ---------------- 4. ХИЙГДЭХ АЖЛУУД & ИРЦ ---------------- */}
          {activeTab === "tasks" && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Өнөөдрийн ирцийн бүртгэл</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-blue-900 text-white text-xs uppercase">
                        <th className="p-3 font-semibold">Сурагч</th>
                        <th className="p-3 font-semibold">Код</th>
                        <th className="p-3 font-semibold text-center">Ирцийн төлөв</th>
                        <th className="p-3 font-semibold">Оролцоо / Тэмдэглэл</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-sm">
                      {students.map((st) => (
                        <tr key={st.id} className="hover:bg-slate-50">
                          <td className="p-3 font-bold text-slate-800">{st.name}</td>
                          <td className="p-3 font-mono text-xs text-slate-500">{st.code}</td>
                          <td className="p-3 text-center">
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                              Ирсэн
                            </span>
                          </td>
                          <td className="p-3 text-xs text-slate-600">Идэвхтэй оролцсон</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ---------------- 5. СУРАГЧИД ---------------- */}
          {activeTab === "students" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Ангийн сурагчид ({students.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {students.map((st) => (
                    <div
                      key={st.id}
                      className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
                          {st.name[0]}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">{st.name}</h4>
                          <p className="text-xs font-mono text-slate-500">Код: {st.code}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-slate-100 font-mono text-xs font-bold text-slate-700 rounded-lg">
                        Голч: {st.grade}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {role === "teacher" && (
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm h-fit">
                  <h4 className="text-base font-bold text-slate-900 mb-4">Сурагч бүртгэх</h4>
                  <form onSubmit={handleAddStudent} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Овог Нэр</label>
                      <input
                        type="text"
                        value={newStudent.name}
                        onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                        className="w-full text-sm border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Жишээ: Амина.Э"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Хувийн код</label>
                      <input
                        type="text"
                        value={newStudent.code}
                        onChange={(e) => setNewStudent({ ...newStudent, code: e.target.value })}
                        className="w-full text-sm border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none uppercase font-mono"
                        placeholder="STU-006"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-sm"
                    >
                      Сурагч нэмэх
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* ---------------- 6. ДҮНГИЙН МЭДЭЭ ---------------- */}
          {activeTab === "grades" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Дүнгийн жагсаалт</h3>
                <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-blue-950 text-white text-xs uppercase">
                        <th className="p-3">Сурагч</th>
                        <th className="p-3">Хичээл</th>
                        <th className="p-3 text-center">Дүн/Оноо</th>
                        <th className="p-3">Огноо</th>
                        <th className="p-3">Тайлбар</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-sm">
                      {grades.map((g) => {
                        const st = students.find((s) => s.id === g.studentId);
                        return (
                          <tr key={g.id} className="hover:bg-slate-50">
                            <td className="p-3 font-bold text-slate-800">{st?.name || "Сурагч"}</td>
                            <td className="p-3 text-xs font-semibold text-blue-700">{g.subject}</td>
                            <td className="p-3 text-center font-bold text-emerald-600 font-mono">{g.score}</td>
                            <td className="p-3 text-xs text-slate-500">{g.date}</td>
                            <td className="p-3 text-xs text-slate-600">{g.comment}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {role === "teacher" && (
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm h-fit">
                  <h4 className="text-base font-bold text-slate-900 mb-4">Дүн оруулах</h4>
                  <form onSubmit={handleAddGrade} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Сурагч сонгох</label>
                      <select
                        value={newGrade.studentId}
                        onChange={(e) => setNewGrade({ ...newGrade, studentId: Number(e.target.value) })}
                        className="w-full text-sm border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        {students.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} ({s.code})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Хичээл</label>
                      <select
                        value={newGrade.subject}
                        onChange={(e) => setNewGrade({ ...newGrade, subject: e.target.value })}
                        className="w-full text-sm border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option>Математик</option>
                        <option>Монгол хэл</option>
                        <option>Англи хэл</option>
                        <option>Байгаль шинжлэл</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Дүн / Оноо</label>
                      <input
                        type="text"
                        value={newGrade.score}
                        onChange={(e) => setNewGrade({ ...newGrade, score: e.target.value })}
                        className="w-full text-sm border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Жишээ: 95 (A)"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Тайлбар</label>
                      <input
                        type="text"
                        value={newGrade.comment}
                        onChange={(e) => setNewGrade({ ...newGrade, comment: e.target.value })}
                        className="w-full text-sm border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Жишээ: Бие даалт сайн хийсэн"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-sm"
                    >
                      Дүн хадгалах
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* ---------------- 7. АНГИЙН ДҮРЭМ ---------------- */}
          {activeTab === "rules" && (
            <div className="max-w-3xl space-y-6">
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Ангийн дагаж мөрдөх дүрэм журмууд</h3>
                <div className="space-y-3">
                  {rules.map((rule, idx) => (
                    <div key={idx} className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl text-slate-800 font-medium text-sm">
                      {rule}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ---------------- 8. ЧАТ & ХОЛБОО ---------------- */}
          {activeTab === "chat" && (
            <div className="max-w-3xl bg-white border border-slate-200/80 rounded-2xl shadow-sm flex flex-col h-[600px] overflow-hidden">
              <div className="p-4 bg-slate-900 text-white font-bold text-sm flex items-center justify-between">
                <span>Багш болон Эцэг эхийн харилцах чат</span>
                <span className="text-xs text-cyan-300 font-normal">Онлайн</span>
              </div>

              <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50">
                {messages.map((m) => {
                  const isMe = m.sender === role;
                  return (
                    <div key={m.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-md rounded-2xl px-4 py-3 text-sm shadow-sm ${
                          isMe
                            ? "bg-blue-600 text-white rounded-br-none"
                            : "bg-white text-slate-800 border border-slate-200 rounded-bl-none"
                        }`}
                      >
                        <p>{m.text}</p>
                        <div className={`text-[10px] mt-1 text-right ${isMe ? "text-blue-200" : "text-slate-400"}`}>
                          {m.time}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 bg-white flex space-x-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Зурвас бичих..."
                  className="flex-1 border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-sm"
                >
                  Илгээх
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}