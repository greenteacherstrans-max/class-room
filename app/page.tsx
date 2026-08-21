"use client";

import { useState } from "react";

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
}

interface ScheduleDay {
  day: string;
  lessons: string[]; // Өдөрт 7 цагийн хичээл
}

const INITIAL_STUDENTS: Student[] = [
  { id: 1, name: "Амина.Э", code: "STU-001", grade: "A" },
  { id: 2, name: "Аминзаяа.М", code: "STU-002", grade: "B" },
  { id: 3, name: "Амин-Очир.А", code: "STU-003", grade: "A" },
  { id: 4, name: "Ананд.М", code: "STU-004", grade: "B" },
  { id: 5, name: "Ану-Үжин.А", code: "STU-005", grade: "A" },
  { id: 6, name: "Аривдах.Б", code: "STU-006", grade: "C" },
  { id: 7, name: "Ариунтуяа.Э", code: "STU-007", grade: "B" },
  { id: 8, name: "Бадрах.Д", code: "STU-008", grade: "A" },
  { id: 9, name: "Бадрах.Э", code: "STU-009", grade: "B" },
  { id: 10, name: "Буяндэлгэр.Г", code: "STU-010", grade: "B" },
  { id: 11, name: "Билэгт.Б", code: "STU-011", grade: "A" },
  { id: 12, name: "Гообэлэг.О", code: "STU-012", grade: "A" },
  { id: 13, name: "Гэгээнбилэгт.Ч", code: "STU-013", grade: "C" },
  { id: 14, name: "Гэгээн-Энэрэл.О", code: "STU-014", grade: "A" },
  { id: 15, name: "Дүүрэнбилэг.Т", code: "STU-015", grade: "B" },
  { id: 16, name: "Маралгоо.А", code: "STU-016", grade: "A" },
  { id: 17, name: "Мөнхбаатар.Т", code: "STU-017", grade: "B" },
  { id: 18, name: "Мөнхдөл.М", code: "STU-018", grade: "B" },
  { id: 19, name: "Мөнхжаргал.М", code: "STU-019", grade: "A" },
  { id: 20, name: "Мөнх-Од.Г", code: "STU-020", grade: "B" },
  { id: 21, name: "Мустахим.Ж", code: "STU-021", grade: "B" },
  { id: 22, name: "Мягмарбаяр.Ч", code: "STU-022", grade: "C" },
  { id: 23, name: "Нандин.Э", code: "STU-023", grade: "A" },
  { id: 24, name: "Нандин-Эрдэнэ.Л", code: "STU-024", grade: "A" },
  { id: 25, name: "Өнөргэрэлт.Г", code: "STU-025", grade: "B" },
  { id: 26, name: "Өнөржаргал.Э", code: "STU-026", grade: "B" },
  { id: 27, name: "Өрнүүнбилэг.Ө", code: "STU-027", grade: "A" },
  { id: 28, name: "Сайнзаяа.Э", code: "STU-028", grade: "B" },
  { id: 29, name: "Сувд-Эрдэнэ.Э", code: "STU-029", grade: "B" },
  { id: 30, name: "Суутан.Д", code: "STU-030", grade: "A" },
  { id: 31, name: "Сүлд.Э", code: "STU-031", grade: "C" },
  { id: 32, name: "Төгсдуулга.О", code: "STU-032", grade: "B" },
  { id: 33, name: "Төгс-Эрдэнэ.Т", code: "STU-033", grade: "A" },
  { id: 34, name: "Төгөлдөр.З", code: "STU-034", grade: "B" },
  { id: 35, name: "Хадбаатар.А", code: "STU-035", grade: "B" },
  { id: 36, name: "Хулан.Ү", code: "STU-036", grade: "A" },
  { id: 37, name: "Хүслэн.Ц", code: "STU-037", grade: "C" },
  { id: 38, name: "Цэлмэг.Б", code: "STU-038", grade: "A" },
  { id: 39, name: "Чамин-Эрдэнэ.Ц", code: "STU-039", grade: "A" },
  { id: 40, name: "Энх-Учрал.Б", code: "STU-040", grade: "B" },
  { id: 41, name: "Энхжаргал.Д", code: "STU-041", grade: "B" },
  { id: 42, name: "Энхлэн.Д", code: "STU-042", grade: "A" },
  { id: 43, name: "Энэрэл.Б", code: "STU-043", grade: "A" },
  { id: 44, name: "Эрхэмбаяр.Л", code: "STU-044", grade: "B" },
];

// Өдөр бүр 7 цагийн хичээлийн анхны хуваарь
const INITIAL_SCHEDULE: ScheduleDay[] = [
  { day: "Даваа", lessons: ["Математик", "Монгол хэл", "Англи хэл", "Биеийн тамир", "Байгаль шинжлэл", "", ""] },
  { day: "Мягмар", lessons: ["Байгаль шинжлэл", "Математик", "Уран зохиол", "Дүрслэх урлаг", "Англи хэл", "", ""] },
  { day: "Лхагва", lessons: ["Монгол хэл", "Мэдээлэл технологи", "Математик", "Хөгжим", "Иргэний ёс зүй", "", ""] },
  { day: "Пүрэв", lessons: ["Англи хэл", "Математик", "Иргэний ёс зүй", "Биеийн тамир", "Уран зохиол", "", ""] },
  { day: "Баасан", lessons: ["Монгол хэл", "Математик", "Дизайн технологи", "Ангийн цаг", "Сонгон хичээл", "", ""] },
];

export default function ClassroomSystem() {
  const [role, setRole] = useState<"teacher" | "parent">("teacher");
  const [activeTab, setActiveTab] = useState<
    "announcements" | "homework" | "tasks" | "students" | "schedule" | "rules" | "grades" | "chat"
  >("schedule");

  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [newStudentName, setNewStudentName] = useState("");

  // Эцэг эхийн нэвтрэлт
  const [parentCodeInput, setParentCodeInput] = useState("");
  const [loggedInStudent, setLoggedInStudent] = useState<Student | null>(null);

  // 1. Зар мэдээ
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 1,
      title: "Эцэг эхийн хуралын зар",
      date: "2026-03-01",
      content: "Ирэх Даваа гарагийн 18:00 цагт 302 тоот танхимд эцэг эхийн хуралтай тул идэвхтэй оролцоно уу.",
    },
    {
      id: 2,
      title: "Хаврын амралт ба сургуулийн арга хэмжээ",
      date: "2026-03-10",
      content: "Урлагийн үзлэг болон сургуулийн аварга шалгаруулах тэмцээний хуваарийг удахгүй хүргэх болно.",
    },
  ]);
  const [newAnnTitle, setNewAnnTitle] = useState("");
  const [newAnnContent, setNewAnnContent] = useState("");

  // 2. Гэрийн даалгавар
  const [homeworks, setHomeworks] = useState<Homework[]>([
    {
      id: 1,
      subject: "Математик",
      title: "Хуудас 45, Бодлого 1-10",
      dueDate: "Маргааш",
      description: "Тэгшитгэл бодох аргыг ашиглан бодолтыг дэвтэрт тэмдэглэж ирэх.",
    },
    {
      id: 2,
      subject: "Монгол хэл",
      title: "Эссэ бичих",
      dueDate: "Баасан гараг",
      description: "'Эх дэлхий бидний гэр' сэдвээр 150-200 үгэнд багтаан бичнэ үү.",
    },
  ]);
  const [newHwSubject, setNewHwSubject] = useState("");
  const [newHwTitle, setNewHwTitle] = useState("");
  const [newHwDueDate, setNewHwDueDate] = useState("");
  const [newHwDesc, setNewHwDesc] = useState("");

  // 3. Хийгдэх ажлууд & Ирц, Оролцоо
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Ангийн цэвэрлэгээ ба тохижилт", date: "Баасан гараг", status: "Идэвхтэй", records: {} },
    { id: 2, title: "Математикийн нээлттэй хичээл", date: "Ирэх Даваа гараг", status: "Төлөвлөсөн", records: {} },
  ]);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(1);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  // 4. Хичээлийн хуваарь (5 өдөр, өдөрт 7 цаг)
  const [schedule, setSchedule] = useState<ScheduleDay[]>(INITIAL_SCHEDULE);

  // Чат
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // Эцэг эхийн горимд ЗӨВХӨН тухайн хүүхдийн мэдээллийг шүүж харуулах
  const displayStudents =
    role === "parent" && loggedInStudent
      ? students.filter((s) => s.id === loggedInStudent.id)
      : students;

  // Шинэ сурагч нэмэх
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;
    const nextId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;
    const codeNumber = String(nextId).padStart(3, "0");
    const newStudent: Student = {
      id: nextId,
      name: newStudentName.trim(),
      code: `STU-${codeNumber}`,
      grade: "B",
    };
    setStudents([...students, newStudent]);
    setNewStudentName("");
  };

  // Зар нэмэх
  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle || !newAnnContent) return;
    setAnnouncements([
      { id: Date.now(), title: newAnnTitle, content: newAnnContent, date: new Date().toISOString().slice(0, 10) },
      ...announcements,
    ]);
    setNewAnnTitle("");
    setNewAnnContent("");
  };

  // Даалгавар нэмэх
  const handleAddHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHwSubject || !newHwTitle) return;
    setHomeworks([
      {
        id: Date.now(),
        subject: newHwSubject,
        title: newHwTitle,
        dueDate: newHwDueDate || "Ойрын үед",
        description: newHwDesc,
      },
      ...homeworks,
    ]);
    setNewHwSubject("");
    setNewHwTitle("");
    setNewHwDueDate("");
    setNewHwDesc("");
  };

  // Ажил нэмэх
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      date: "Ойрын өдрүүдэд",
      status: "Идэвхтэй",
      records: {},
    };
    setTasks([...tasks, newTask]);
    setSelectedTaskId(newTask.id);
    setNewTaskTitle("");
  };

  // Ирц ба оролцоо
  const handleTaskAttendanceChange = (taskId: number, studentId: number, attendance: TaskRecord["attendance"]) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const currentRecord = task.records[studentId] || { attendance: "Ирсэн", participation: "Идэвхтэй" };
          return { ...task, records: { ...task.records, [studentId]: { ...currentRecord, attendance } } };
        }
        return task;
      })
    );
  };

  const handleTaskParticipationChange = (taskId: number, studentId: number, participation: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const currentRecord = task.records[studentId] || { attendance: "Ирсэн", participation: "Идэвхтэй" };
          return { ...task, records: { ...task.records, [studentId]: { ...currentRecord, participation } } };
        }
        return task;
      })
    );
  };

  // Хичээлийн хуваарийн тухайн өдөр ба цагийн хичээлийг засах
  const handleLessonChange = (dayIdx: number, periodIdx: number, value: string) => {
    const updatedSchedule = schedule.map((item, dIdx) => {
      if (dIdx === dayIdx) {
        const newLessons = [...item.lessons];
        newLessons[periodIdx] = value;
        return { ...item, lessons: newLessons };
      }
      return item;
    });
    setSchedule(updatedSchedule);
  };

  // Эцэг эхийн нэвтрэлт
  const handleParentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const found = students.find((s) => s.code.toUpperCase() === parentCodeInput.trim().toUpperCase());
    if (found) {
      setLoggedInStudent(found);
    } else {
      alert("Давтагдашгүй код олдсонгүй! (Жишээ нь: STU-001) шалгана уу.");
    }
  };

  // Чат
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const sender = role === "teacher" ? "Багш" : `${loggedInStudent?.name || "Эцэг эх"}`;
    setMessages([...messages, { sender, text: newMessage }]);
    setNewMessage("");
  };

  const selectedTask = tasks.find((t) => t.id === selectedTaskId);
  const isPrivateTab = ["tasks", "students", "grades"].includes(activeTab);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans p-2 md:p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
        
        {/* Толгой хэсэг */}
        <div className="bg-slate-900 text-white p-4 md:p-6 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">🏫 23-р сургууль - Цэцэгхэн Цонх</h1>
            <p className="text-xs text-slate-400 mt-1">
              {role === "teacher"
                ? "👨‍🏫 Багшийн удирдлагын хэсэг"
                : `👨‍👩‍👧 Эцэг эхийн хэсэг ${loggedInStudent ? `(${loggedInStudent.name})` : "(Нэвтрээгүй)"}`}
            </p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => { setRole("teacher"); }}
              className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition ${
                role === "teacher" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Багшийн хэсэг
            </button>
            <button
              onClick={() => setRole("parent")}
              className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition ${
                role === "parent" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Эцэг эхийн хэсэг
            </button>
          </div>
        </div>

        {/* НАВИГАЦИ ЦЭС */}
        <div className="flex overflow-x-auto bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
          {[
            { id: "announcements", label: "📢 Зар мэдээ" },
            { id: "homework", label: "📚 Гэрийн даалгавар" },
            { id: "tasks", label: "📋 Хийгдэх ажлууд & Ирц" },
            { id: "students", label: "👨‍🎓 Сурагчид" },
            { id: "schedule", label: "📅 Хичээлийн хуваарь" },
            { id: "rules", label: "📜 Ангийн дүрэм" },
            { id: "grades", label: "📊 Дүнгийн мэдээ" },
            { id: "chat", label: "💬 Чат & Холбоо" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 text-xs md:text-sm font-bold whitespace-nowrap border-b-2 transition ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600 bg-white"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* АГУУЛГА ХЭСЭГ */}
        <div className="p-4 md:p-6">

          {/* Нууцлал шаардах цэс дээр код шалгах */}
          {role === "parent" && !loggedInStudent && isPrivateTab ? (
            <div className="p-8 max-w-md mx-auto text-center my-8 space-y-4 bg-slate-50 border rounded-2xl">
              <span className="text-4xl">🔐</span>
              <h2 className="text-xl font-bold">Хүүхдийн мэдээлэл харах</h2>
              <p className="text-xs text-slate-500">
                Та хүүхдийнхээ дүн, ирцийн мэдээллийг харахын тулд багшаас авсан кодоо оруулна уу. (Жишээ нь: STU-001)
              </p>
              <form onSubmit={handleParentLogin} className="space-y-3">
                <input
                  type="text"
                  placeholder="Код оруулна уу (жишээ нь: STU-001)"
                  value={parentCodeInput}
                  onChange={(e) => setParentCodeInput(e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl text-center font-mono font-bold uppercase tracking-widest focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition">
                  Нэвтрэх
                </button>
              </form>
            </div>
          ) : (
            <>
              {/* 1. ЗАР МЭДЭЭ */}
              {activeTab === "announcements" && (
                <div className="space-y-6 max-w-3xl">
                  <h2 className="text-xl font-bold">📢 Ангийн зар мэдээ</h2>

                  {role === "teacher" && (
                    <form onSubmit={handleAddAnnouncement} className="p-4 border rounded-xl bg-slate-50 space-y-3">
                      <h3 className="font-bold text-sm">Шинэ зар мэдээ оруулах</h3>
                      <input
                        type="text"
                        placeholder="Зар мэдээний гарчиг..."
                        value={newAnnTitle}
                        onChange={(e) => setNewAnnTitle(e.target.value)}
                        className="w-full border px-3 py-2 rounded-lg text-sm outline-none"
                      />
                      <textarea
                        placeholder="Зар мэдээний дэлгэрэнгүй агуулга..."
                        value={newAnnContent}
                        onChange={(e) => setNewAnnContent(e.target.value)}
                        className="w-full border px-3 py-2 rounded-lg text-sm outline-none h-20"
                      />
                      <button type="submit" className="bg-blue-600 text-white font-bold px-4 py-2 rounded-lg text-sm">
                        + Зар нийтлэх
                      </button>
                    </form>
                  )}

                  <div className="space-y-4">
                    {announcements.map((a) => (
                      <div key={a.id} className="p-5 border rounded-xl bg-white shadow-sm space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-bold text-base text-blue-700">{a.title}</h3>
                          <span className="text-xs bg-slate-100 text-slate-500 px-2.5 py-1 rounded font-mono">{a.date}</span>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">{a.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. ГЭРИЙН ДААЛГАВАР */}
              {activeTab === "homework" && (
                <div className="space-y-6 max-w-3xl">
                  <h2 className="text-xl font-bold">📚 Гэрийн даалгавар</h2>

                  {role === "teacher" && (
                    <form onSubmit={handleAddHomework} className="p-4 border rounded-xl bg-slate-50 space-y-3">
                      <h3 className="font-bold text-sm">Шинэ даалгавар өгөх</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <input
                          type="text"
                          placeholder="Хичээл (Математик...)"
                          value={newHwSubject}
                          onChange={(e) => setNewHwSubject(e.target.value)}
                          className="border px-3 py-2 rounded-lg text-sm outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Даалгаврын гарчиг..."
                          value={newHwTitle}
                          onChange={(e) => setNewHwTitle(e.target.value)}
                          className="border px-3 py-2 rounded-lg text-sm outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Хугацаа (Баасан гараг...)"
                          value={newHwDueDate}
                          onChange={(e) => setNewHwDueDate(e.target.value)}
                          className="border px-3 py-2 rounded-lg text-sm outline-none"
                        />
                      </div>
                      <textarea
                        placeholder="Даалгаврын тайлбар..."
                        value={newHwDesc}
                        onChange={(e) => setNewHwDesc(e.target.value)}
                        className="w-full border px-3 py-2 rounded-lg text-sm outline-none h-16"
                      />
                      <button type="submit" className="bg-blue-600 text-white font-bold px-4 py-2 rounded-lg text-sm">
                        + Даалгавар нэмэх
                      </button>
                    </form>
                  )}

                  <div className="grid grid-cols-1 gap-4">
                    {homeworks.map((hw) => (
                      <div key={hw.id} className="p-4 border rounded-xl bg-white shadow-sm flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className="bg-blue-100 text-blue-800 font-bold text-xs px-2.5 py-1 rounded">
                            {hw.subject}
                          </span>
                          <span className="text-xs text-red-600 font-semibold">Хугацаа: {hw.dueDate}</span>
                        </div>
                        <h3 className="font-bold text-slate-800">{hw.title}</h3>
                        <p className="text-xs text-slate-600">{hw.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. ХИЙГДЭХ АЖЛУУД & ИРЦ, ОРОЛЦОО */}
              {activeTab === "tasks" && (
                <div className="space-y-6">
                  <div className="flex flex-wrap justify-between items-center gap-4 border-b pb-4">
                    <div>
                      <h2 className="text-xl font-bold">📋 Хийгдэх ажлууд & Ирц, оролцооны бүртгэл</h2>
                      <p className="text-xs text-slate-500">
                        {role === "parent"
                          ? `Зөвхөн ${loggedInStudent?.name}-ийн ирц ба оролцоо харагдаж байна.`
                          : "Ажил бүрээр сурагчдын ирц, оролцоог бүртгэх хэсэг."}
                      </p>
                    </div>

                    {role === "teacher" && (
                      <form onSubmit={handleAddTask} className="flex gap-2 w-full md:w-auto">
                        <input
                          type="text"
                          placeholder="Шинэ ажил/арга хэмжээ..."
                          value={newTaskTitle}
                          onChange={(e) => setNewTaskTitle(e.target.value)}
                          className="px-4 py-2 border rounded-lg text-sm outline-none"
                        />
                        <button type="submit" className="bg-blue-600 text-white font-bold px-4 py-2 rounded-lg text-sm">
                          + Ажил нэмэх
                        </button>
                      </form>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => setSelectedTaskId(task.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition ${
                          selectedTaskId === task.id ? "bg-blue-50 border-blue-600 shadow-sm" : "bg-slate-50 hover:bg-slate-100"
                        }`}
                      >
                        <h3 className="font-bold text-sm">{task.title}</h3>
                        <p className="text-xs text-slate-500 mt-1">Огноо: {task.date}</p>
                      </div>
                    ))}
                  </div>

                  {selectedTask && (
                    <div className="mt-6 border rounded-xl p-4 bg-white shadow-sm space-y-4">
                      <h3 className="font-bold text-base bg-slate-900 text-white p-3 rounded-lg">
                        📌 "{selectedTask.title}" - Ирц & Оролцоо
                      </h3>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs md:text-sm">
                          <thead>
                            <tr className="bg-slate-100 text-slate-600 border-b">
                              <th className="p-3">№</th>
                              <th className="p-3">Нэр</th>
                              <th className="p-3">Код</th>
                              <th className="p-3">Ирц</th>
                              <th className="p-3">Оролцоо</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {displayStudents.map((student, index) => {
                              const record = selectedTask.records[student.id] || {
                                attendance: "Ирсэн",
                                participation: "Идэвхтэй",
                              };
                              return (
                                <tr key={student.id} className="hover:bg-slate-50">
                                  <td className="p-3 font-semibold text-slate-400">{index + 1}</td>
                                  <td className="p-3 font-bold">{student.name}</td>
                                  <td className="p-3 font-mono text-xs">{student.code}</td>
                                  <td className="p-3">
                                    {role === "teacher" ? (
                                      <select
                                        value={record.attendance}
                                        onChange={(e) =>
                                          handleTaskAttendanceChange(selectedTask.id, student.id, e.target.value as any)
                                        }
                                        className="border rounded px-2 py-1 text-xs"
                                      >
                                        <option value="Ирсэн">Ирсэн</option>
                                        <option value="Хоцорсон">Хоцорсон</option>
                                        <option value="Чөлөөтэй">Чөлөөтэй</option>
                                        <option value="Тасалсан">Тасалсан</option>
                                      </select>
                                    ) : (
                                      <span className="font-bold text-blue-700">{record.attendance}</span>
                                    )}
                                  </td>
                                  <td className="p-3">
                                    {role === "teacher" ? (
                                      <input
                                        type="text"
                                        value={record.participation}
                                        onChange={(e) => handleTaskParticipationChange(selectedTask.id, student.id, e.target.value)}
                                        className="border rounded px-2 py-1 text-xs w-full max-w-xs"
                                      />
                                    ) : (
                                      <span>{record.participation}</span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 4. СУРАГЧИД */}
              {activeTab === "students" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">
                      {role === "parent" ? "Хүүхдийн мэдээлэл" : `Нийт сурагчид: ${students.length}`}
                    </h2>
                    {role === "teacher" && (
                      <form onSubmit={handleAddStudent} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Шинэ сурагчийн нэр..."
                          value={newStudentName}
                          onChange={(e) => setNewStudentName(e.target.value)}
                          className="px-3 py-1.5 border rounded-lg text-sm"
                        />
                        <button type="submit" className="bg-green-600 text-white font-bold px-3 py-1.5 rounded-lg text-sm">
                          + Нэмэх
                        </button>
                      </form>
                    )}
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs md:text-sm">
                      <thead>
                        <tr className="bg-slate-100 border-b">
                          <th className="p-3">№</th>
                          <th className="p-3">Нэр</th>
                          <th className="p-3">Давтагдашгүй код</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {displayStudents.map((student, index) => (
                          <tr key={student.id}>
                            <td className="p-3 text-slate-400">{index + 1}</td>
                            <td className="p-3 font-bold">{student.name}</td>
                            <td className="p-3 font-mono font-bold">{student.code}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 5. ХИЧЭЭЛИЙН ХУВААРЬ (ХҮСНЭГТЭН БАЙДЛААР, ӨДӨРТ 7 ЦАГ) */}
              {activeTab === "schedule" && (
                <div className="space-y-4">
                  <div className="flex flex-wrap justify-between items-center gap-2 border-b pb-3">
                    <div>
                      <h2 className="text-xl font-bold">📅 Долоо хоногийн хичээлийн хуваарь</h2>
                      <p className="text-xs text-slate-500 mt-1">
                        {role === "teacher"
                          ? "✍️ Багш нүд тус бүрт хичээлийн нэрийг бичиж, шууд засах боломжтой."
                          : "👀 Багшийн шинэчилсэн 7 цагийн хичээлийн хуваарь."}
                      </p>
                    </div>
                    {role === "teacher" && (
                      <span className="text-xs bg-green-100 text-green-800 font-bold px-3 py-1 rounded-full border border-green-300">
                        ✏️ Шууд засах боломжтой
                      </span>
                    )}
                  </div>

                  <div className="overflow-x-auto border rounded-xl shadow-sm bg-white">
                    <table className="w-full text-left border-collapse text-xs md:text-sm">
                      <thead>
                        <tr className="bg-slate-900 text-white text-center font-bold">
                          <th className="p-3 border-r border-slate-700 w-24">Цаг</th>
                          {schedule.map((dayItem, idx) => (
                            <th key={idx} className="p-3 border-r border-slate-700 min-w-[130px]">
                              {dayItem.day}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {Array.from({ length: 7 }).map((_, periodIndex) => (
                          <tr key={periodIndex} className={periodIndex % 2 === 0 ? "bg-slate-50/50" : "bg-white"}>
                            {/* Цагийн дугаар */}
                            <td className="p-3 font-bold text-center bg-slate-100 text-slate-700 border-r border-slate-200">
                              {periodIndex + 1}-р цаг
                            </td>

                            {/* 5 өдрийн тухайн цагийн хичээлүүд */}
                            {schedule.map((dayItem, dayIdx) => (
                              <td key={dayIdx} className="p-2 border-r border-slate-200">
                                {role === "teacher" ? (
                                  <input
                                    type="text"
                                    value={dayItem.lessons[periodIndex] || ""}
                                    onChange={(e) => handleLessonChange(dayIdx, periodIndex, e.target.value)}
                                    placeholder={`${periodIndex + 1}-р цаг...`}
                                    className="w-full px-2 py-1.5 text-xs md:text-sm border rounded border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                                  />
                                ) : (
                                  <div className="px-2 py-1 text-center font-semibold text-slate-800">
                                    {dayItem.lessons[periodIndex] || (
                                      <span className="text-slate-300 font-normal italic">-</span>
                                    )}
                                  </div>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 6. АНГИЙН ДҮРЭМ */}
              {activeTab === "rules" && (
                <div className="space-y-4 max-w-2xl">
                  <h2 className="text-xl font-bold">📜 Ангийн дүрэм</h2>
                  <div className="space-y-2 text-sm">
                    {["1. Хичээлээс хоцрохгүй байх", "2. Бусдыг хүндэтгэх", "3. Анги цэвэр байлгах", "4. Гар утас оролдохгүй байх"].map((r, i) => (
                      <div key={i} className="p-3 bg-slate-50 border rounded-lg font-medium">{r}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. ДҮНГИЙН МЭДЭЭ */}
              {activeTab === "grades" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">📊 Дүнгийн мэдээ</h2>
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="bg-slate-100 border-b">
                        <th className="p-3">№</th>
                        <th className="p-3">Нэр</th>
                        <th className="p-3">Код</th>
                        <th className="p-3">Ерөнхий дүн</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {displayStudents.map((s, idx) => (
                        <tr key={s.id}>
                          <td className="p-3">{idx + 1}</td>
                          <td className="p-3 font-bold">{s.name}</td>
                          <td className="p-3 font-mono">{s.code}</td>
                          <td className="p-3 font-bold text-blue-600">{s.grade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* 8. ЧАТ */}
              {activeTab === "chat" && (
                <div className="space-y-4 max-w-2xl">
                  <h2 className="text-xl font-bold">💬 Чат & Холбоо</h2>
                  <div className="bg-slate-100 p-4 rounded-xl h-64 overflow-y-auto space-y-2 border">
                    {messages.length === 0 ? (
                      <p className="text-slate-400 text-center text-sm my-auto">Энд мессеж бичиж харилцана уу.</p>
                    ) : (
                      messages.map((m, i) => (
                        <div key={i} className="bg-white p-3 rounded-lg shadow-sm text-sm">
                          <span className="font-bold text-blue-600">{m.sender}: </span>
                          <span>{m.text}</span>
                        </div>
                      ))
                    )}
                  </div>
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Мессеж бичих..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 border px-4 py-2 rounded-lg text-sm outline-none"
                    />
                    <button type="submit" className="bg-blue-600 text-white font-bold px-4 py-2 rounded-lg text-sm">
                      Илгээх
                    </button>
                  </form>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
