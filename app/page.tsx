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
  records: Record<number, TaskRecord>; // Сурагчийн ID -> Ирц, оролцоо
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

export default function ClassroomSystem() {
  const [role, setRole] = useState<"teacher" | "parent">("teacher");
  const [activeTab, setActiveTab] = useState<"students" | "tasks" | "schedule" | "rules" | "grades" | "chat">("tasks");
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [newStudentName, setNewStudentName] = useState("");

  // Эцэг эхийн нэвтрэх хэсэг
  const [parentCodeInput, setParentCodeInput] = useState("");
  const [loggedInStudent, setLoggedInStudent] = useState<Student | null>(null);

  // Хийгдэх ажлууд ба тэдгээрийн ирц, оролцооны мэдээлэл
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Ангийн цэвэрлэгээ ба тохижилт", date: "Баасан гараг", status: "Идэвхтэй", records: {} },
    { id: 2, title: "Математикийн нээлттэй хичээл", date: "Ирэх Даваа гараг", status: "Төлөвлөсөн", records: {} },
    { id: 3, title: "Хаврын баярын урлагийн үзлэг", date: "2026-03-20", status: "Төлөвлөсөн", records: {} },
  ]);

  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(1);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  // Чат
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // Шинэ сурагч нэмэх (Дараагийн код автоматаар үүснэ)
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

  // Сурагч хасах
  const handleDeleteStudent = (id: number) => {
    setStudents(students.filter((s) => s.id !== id));
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

  // Ажил дээрх ирц өөрчлөх
  const handleTaskAttendanceChange = (taskId: number, studentId: number, attendance: TaskRecord["attendance"]) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const currentRecord = task.records[studentId] || { attendance: "Ирсэн", participation: "Идэвхтэй" };
          return {
            ...task,
            records: {
              ...task.records,
              [studentId]: { ...currentRecord, attendance },
            },
          };
        }
        return task;
      })
    );
  };

  // Ажил дээрх оролцоо өөрчлөх
  const handleTaskParticipationChange = (taskId: number, studentId: number, participation: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const currentRecord = task.records[studentId] || { attendance: "Ирсэн", participation: "Идэвхтэй" };
          return {
            ...task,
            records: {
              ...task.records,
              [studentId]: { ...currentRecord, participation },
            },
          };
        }
        return task;
      })
    );
  };

  // Эцэг эхийн нэвтрэлт
  const handleParentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const found = students.find((s) => s.code.toUpperCase() === parentCodeInput.trim().toUpperCase());
    if (found) {
      setLoggedInStudent(found);
    } else {
      alert("Давтагдашгүй код олдсонгүй! Багшаас авсан кодоо шалгана уу.");
    }
  };

  // Чат илгээх
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const sender = role === "teacher" ? "Багш" : `${loggedInStudent?.name}-ийн эцэг эх`;
    setMessages([...messages, { sender, text: newMessage }]);
    setNewMessage("");
  };

  const selectedTask = tasks.find((t) => t.id === selectedTaskId);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans p-2 md:p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
        
        {/* Толгойн хэсэг */}
        <div className="bg-slate-900 text-white p-4 md:p-6 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">🏫 23-р сургууль - Цэцэгхэн Цонх</h1>
            <p className="text-xs text-slate-400 mt-1">Ангийн удирдлага & Эцэг эхийн холбоо</p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => { setRole("teacher"); setLoggedInStudent(null); }}
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

        {/* ЭЦЭГ ЭХИЙН НЭВТРЭХ ХЭСЭГ */}
        {role === "parent" && !loggedInStudent ? (
          <div className="p-8 max-w-md mx-auto text-center my-8 space-y-4">
            <h2 className="text-2xl font-bold">Эцэг эхийн нэвтрэх хэсэг</h2>
            <p className="text-sm text-slate-500">Багшаас олгосон хүүхдийнхээ давтагдашгүй кодоо оруулна уу.</p>
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
            {/* Цэсүүд */}
            <div className="flex overflow-x-auto bg-slate-50 border-b border-slate-200">
              {[
                { id: "tasks", label: "📋 Хийгдэх ажлууд & Ирц, Оролцоо" },
                { id: "students", label: "👨‍🎓 Сурагчдын жагсаалт" },
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

            <div className="p-4 md:p-6">

              {/* 1. ХИЙГДЭХ АЖЛУУД & ИРЦ, ОРОЛЦОО (ЗӨВХӨН ЭНД БҮРТГЭНЭ) */}
              {activeTab === "tasks" && (
                <div className="space-y-6">
                  <div className="flex flex-wrap justify-between items-center gap-4 border-b pb-4">
                    <div>
                      <h2 className="text-xl font-bold">📋 Хийгдэх ажлууд & Ирц, оролцооны бүртгэл</h2>
                      <p className="text-xs text-slate-500">Ажил/арга хэмжээ бүрээр сурагчдын ирц, оролцоог энд тэмдэглэнэ.</p>
                    </div>

                    {role === "teacher" && (
                      <form onSubmit={handleAddTask} className="flex gap-2 w-full md:w-auto">
                        <input
                          type="text"
                          placeholder="Шинэ ажил/арга хэмжээ..."
                          value={newTaskTitle}
                          onChange={(e) => setNewTaskTitle(e.target.value)}
                          className="px-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-sm">
                          + Ажил нэмэх
                        </button>
                      </form>
                    )}
                  </div>

                  {/* Ажлуудын жагсаалт */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => setSelectedTaskId(task.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition ${
                          selectedTaskId === task.id
                            ? "bg-blue-50 border-blue-600 shadow-sm"
                            : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <h3 className="font-bold text-sm text-slate-800">{task.title}</h3>
                        <p className="text-xs text-slate-500 mt-1">Огноо: {task.date}</p>
                        <div className="mt-3 flex justify-between items-center">
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">
                            {task.status}
                          </span>
                          <span className="text-xs font-bold text-blue-600">
                            {selectedTaskId === task.id ? "Сонгогдсон ●" : "Ирц харах ➔"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Сонгосон ажил дээрх ирц ба оролцооны хүснэгт */}
                  {selectedTask && (
                    <div className="mt-6 border rounded-xl p-4 bg-white shadow-sm space-y-4">
                      <div className="bg-slate-900 text-white p-3 rounded-lg flex justify-between items-center">
                        <h3 className="font-bold text-sm md:text-base">
                          📌 "{selectedTask.title}" - Сурагчдын ирц & Оролцоо
                        </h3>
                        <span className="text-xs bg-slate-800 px-3 py-1 rounded">
                          Нийт: {students.length} сурагч
                        </span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs md:text-sm">
                          <thead>
                            <tr className="bg-slate-100 text-slate-600 border-b">
                              <th className="p-3">№</th>
                              <th className="p-3">Нэр</th>
                              <th className="p-3">Код</th>
                              <th className="p-3">Энэ ажил дээрх ирц</th>
                              <th className="p-3">Оролцооны тэмдэглэл</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {students.map((student, index) => {
                              const record = selectedTask.records[student.id] || {
                                attendance: "Ирсэн",
                                participation: "Идэвхтэй",
                              };

                              // Эцэг эхийн горимд зөвхөн өөрийн хүүхдийг онцлох
                              const isMyChild = role === "parent" && loggedInStudent?.id === student.id;

                              return (
                                <tr key={student.id} className={isMyChild ? "bg-yellow-50 font-bold" : "hover:bg-slate-50"}>
                                  <td className="p-3 font-semibold text-slate-400">{index + 1}</td>
                                  <td className="p-3 font-bold">
                                    {student.name} {isMyChild && <span className="text-xs text-blue-600">(Манай хүүхэд)</span>}
                                  </td>
                                  <td className="p-3">
                                    <span className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-mono text-xs font-bold">
                                      {student.code}
                                    </span>
                                  </td>

                                  {/* ИРЦ БҮРТГЭХ ХЭСЭГ */}
                                  <td className="p-3">
                                    {role === "teacher" ? (
                                      <select
                                        value={record.attendance}
                                        onChange={(e) =>
                                          handleTaskAttendanceChange(
                                            selectedTask.id,
                                            student.id,
                                            e.target.value as any
                                          )
                                        }
                                        className="border rounded px-2 py-1 text-xs font-semibold outline-none focus:ring-1 focus:ring-blue-500"
                                      >
                                        <option value="Ирсэн">Ирсэн</option>
                                        <option value="Хоцорсон">Хоцорсон</option>
                                        <option value="Чөлөөтэй">Чөлөөтэй</option>
                                        <option value="Тасалсан">Тасалсан</option>
                                      </select>
                                    ) : (
                                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                                        record.attendance === "Ирсэн" ? "bg-green-100 text-green-700" :
                                        record.attendance === "Хоцорсон" ? "bg-yellow-100 text-yellow-700" :
                                        record.attendance === "Чөлөөтэй" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"
                                      }`}>
                                        {record.attendance}
                                      </span>
                                    )}
                                  </td>

                                  {/* ОРОЛЦОО БҮРТГЭХ ХЭСЭГ */}
                                  <td className="p-3">
                                    {role === "teacher" ? (
                                      <input
                                        type="text"
                                        value={record.participation}
                                        onChange={(e) =>
                                          handleTaskParticipationChange(selectedTask.id, student.id, e.target.value)
                                        }
                                        placeholder="Оролцоо бичих..."
                                        className="border rounded px-2 py-1 text-xs w-full max-w-xs outline-none focus:ring-1 focus:ring-blue-500"
                                      />
                                    ) : (
                                      <span className="text-slate-700 font-medium">{record.participation}</span>
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

              {/* 2. СУРАГЧДЫН ЖАГСААЛТ (ДАВАГДАШГҮЙ КОДТОЙ) */}
              {activeTab === "students" && (
                <div className="space-y-6">
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <h2 className="text-xl font-bold">Нийт сурагчид: {students.length}</h2>
                      <p className="text-xs text-slate-500">Код нь дахин өөрчлөгдөхгүй, шинэ сурагчдад автоматаар дараалах болно.</p>
                    </div>

                    {role === "teacher" && (
                      <form onSubmit={handleAddStudent} className="flex gap-2 w-full md:w-auto">
                        <input
                          type="text"
                          placeholder="Шинэ сурагчийн нэр..."
                          value={newStudentName}
                          onChange={(e) => setNewStudentName(e.target.value)}
                          className="px-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg text-sm">
                          + Сурагч нэмэх
                        </button>
                      </form>
                    )}
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs md:text-sm">
                      <thead>
                        <tr className="bg-slate-100 text-slate-600 border-b">
                          <th className="p-3">№</th>
                          <th className="p-3">Сурагчийн Нэр</th>
                          <th className="p-3">Давтагдашгүй код</th>
                          {role === "teacher" && <th className="p-3 text-right">Үйлдэл</th>}
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {students.map((student, index) => (
                          <tr key={student.id} className="hover:bg-slate-50">
                            <td className="p-3 font-semibold text-slate-400">{index + 1}</td>
                            <td className="p-3 font-bold">{student.name}</td>
                            <td className="p-3">
                              <span className="bg-slate-200 text-slate-800 px-2.5 py-1 rounded font-mono text-xs font-bold">
                                {student.code}
                              </span>
                            </td>
                            {role === "teacher" && (
                              <td className="p-3 text-right">
                                <button
                                  onClick={() => handleDeleteStudent(student.id)}
                                  className="text-red-500 hover:text-red-700 font-bold"
                                >
                                  Устгах
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 3. ХИЧЭЭЛИЙН ХУВААРЬ */}
              {activeTab === "schedule" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">📅 Долоо хоногийн хичээлийн хуваарь</h2>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {[
                      { day: "Даваа", list: ["1. Математик", "2. Монгол хэл", "3. Англи хэл", "4. Биеийн тамир"] },
                      { day: "Мягмар", list: ["1. Байгаль шинжлэл", "2. Математик", "3. Уран зохиол", "4. Дүрслэх урлаг"] },
                      { day: "Лхагва", list: ["1. Монгол хэл", "2. Мэдээлэл технологи", "3. Математик", "4. Хөгжим"] },
                      { day: "Пүрэв", list: ["1. Англи хэл", "2. Математик", "3. Иргэний ёс зүй", "4. Биеийн тамир"] },
                      { day: "Баасан", list: ["1. Монгол хэл", "2. Математик", "3. Дизайн технологи", "4. Ангийн цаг"] },
                    ].map((item, idx) => (
                      <div key={idx} className="border rounded-xl p-4 bg-slate-50">
                        <h3 className="font-bold text-blue-600 border-b pb-2 mb-2">{item.day}</h3>
                        <ul className="space-y-1 text-xs md:text-sm">
                          {item.list.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. АНГИЙН ДҮРЭМ */}
              {activeTab === "rules" && (
                <div className="space-y-4 max-w-2xl">
                  <h2 className="text-xl font-bold">📜 Ангийн мөрдөх дүрэм</h2>
                  <div className="grid gap-3">
                    {[
                      "1. Хичээлээс хоцрохгүй, цагтаа бэлэн байх",
                      "2. Бусдын үзэл бодлыг хүндэтгэн сонсох",
                      "3. Анги танхимын цэвэр цэмцгэр байдлыг сахих",
                      "4. Гар утас болон бусад зүйлийг хичээлийн цагаар ашиглахгүй байх",
                      "5. Даалгавраа заасан хугацаанд чанартай гүйцэтгэх",
                    ].map((rule, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-sm">
                        {rule}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. ДҮНГИЙН МЭДЭЭ */}
              {activeTab === "grades" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">📊 Сурагчдын дүнгийн нэгтгэл</h2>
                  <div className="overflow-x-auto">
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
                        {students.map((s, idx) => (
                          <tr key={s.id}>
                            <td className="p-3">{idx + 1}</td>
                            <td className="p-3 font-bold">{s.name}</td>
                            <td className="p-3"><span className="font-mono bg-slate-100 px-2 py-1 rounded">{s.code}</span></td>
                            <td className="p-3">
                              <span className={`font-bold px-2.5 py-1 rounded text-xs ${
                                s.grade === "A" ? "bg-green-100 text-green-700" :
                                s.grade === "B" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
                              }`}>
                                {s.grade}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 6. ЧАТ */}
              {activeTab === "chat" && (
                <div className="space-y-4 max-w-2xl">
                  <h2 className="text-xl font-bold">💬 Багш - Эцэг эхийн харилцах хэсэг</h2>
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

            </div>
          </>
        )}
      </div>
    </div>
  );
}