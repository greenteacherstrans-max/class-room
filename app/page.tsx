"use client";

import { useState } from "react";

interface Student {
  id: number;
  name: string;
  code: string;
}

const INITIAL_STUDENTS: Student[] = [
  { id: 1, name: "Амина.Э", code: "STU-001" },
  { id: 2, name: "Аминзаяа.М", code: "STU-002" },
  { id: 3, name: "Амин-Очир.А", code: "STU-003" },
  { id: 4, name: "Ананд.М", code: "STU-004" },
  { id: 5, name: "Ану-Үжин.А", code: "STU-005" },
  { id: 6, name: "Аривдах.Б", code: "STU-006" },
  { id: 7, name: "Ариунтуяа.Э", code: "STU-007" },
  { id: 8, name: "Бадрах.Д", code: "STU-008" },
  { id: 9, name: "Бадрах.Э", code: "STU-009" },
  { id: 10, name: "Буяндэлгэр.Г", code: "STU-010" },
  { id: 11, name: "Билэгт.Б", code: "STU-011" },
  { id: 12, name: "Гообэлэг.О", code: "STU-012" },
  { id: 13, name: "Гэгээнбилэгт.Ч", code: "STU-013" },
  { id: 14, name: "Гэгээн-Энэрэл.О", code: "STU-014" },
  { id: 15, name: "Дүүрэнбилэг.Т", code: "STU-015" },
  { id: 16, name: "Маралгоо.А", code: "STU-016" },
  { id: 17, name: "Мөнхбаатар.Т", code: "STU-017" },
  { id: 18, name: "Мөнхдөл.М", code: "STU-018" },
  { id: 19, name: "Мөнхжаргал.М", code: "STU-019" },
  { id: 20, name: "Мөнх-Од.Г", code: "STU-020" },
  { id: 21, name: "Мустахим.Ж", code: "STU-021" },
  { id: 22, name: "Мягмарбаяр.Ч", code: "STU-022" },
  { id: 23, name: "Нандин.Э", code: "STU-023" },
  { id: 24, name: "Нандин-Эрдэнэ.Л", code: "STU-024" },
  { id: 25, name: "Өнөргэрэлт.Г", code: "STU-025" },
  { id: 26, name: "Өнөржаргал.Э", code: "STU-026" },
  { id: 27, name: "Өрнүүнбилэг.Ө", code: "STU-027" },
  { id: 28, name: "Сайнзаяа.Э", code: "STU-028" },
  { id: 29, name: "Сувд-Эрдэнэ.Э", code: "STU-029" },
  { id: 30, name: "Суутан.Д", code: "STU-030" },
  { id: 31, name: "Сүлд.Э", code: "STU-031" },
  { id: 32, name: "Төгсдуулга.О", code: "STU-032" },
  { id: 33, name: "Төгс-Эрдэнэ.Т", code: "STU-033" },
  { id: 34, name: "Төгөлдөр.З", code: "STU-034" },
  { id: 35, name: "Хадбаатар.А", code: "STU-035" },
  { id: 36, name: "Хулан.Ү", code: "STU-036" },
  { id: 37, name: "Хүслэн.Ц", code: "STU-037" },
  { id: 38, name: "Цэлмэг.Б", code: "STU-038" },
  { id: 39, name: "Чамин-Эрдэнэ.Ц", code: "STU-039" },
  { id: 40, name: "Энх-Учрал.Б", code: "STU-040" },
  { id: 41, name: "Энхжаргал.Д", code: "STU-041" },
  { id: 42, name: "Энхлэн.Д", code: "STU-042" },
  { id: 43, name: "Энэрэл.Б", code: "STU-043" },
  { id: 44, name: "Эрхэмбаяр.Л", code: "STU-044" },
];

export default function ClassRoomApp() {
  const [role, setRole] = useState<"teacher" | "parent">("teacher");
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [newStudentName, setNewStudentName] = useState("");
  
  // Эцэг эхийн нэвтрэх хэсэг
  const [parentCodeInput, setParentCodeInput] = useState("");
  const [loggedInStudent, setLoggedInStudent] = useState<Student | null>(null);
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // Сурагч нэмэх
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;
    const nextId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;
    const codeNumber = String(nextId).padStart(3, "0");
    const newStudent: Student = {
      id: nextId,
      name: newStudentName,
      code: `STU-${codeNumber}`,
    };
    setStudents([...students, newStudent]);
    setNewStudentName("");
  };

  // Сурагч хасах
  const handleDeleteStudent = (id: number) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  // Эцэг эхийн нэвтрэлт
  const handleParentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const found = students.find((s) => s.code.toUpperCase() === parentCodeInput.trim().toUpperCase());
    if (found) {
      setLoggedInStudent(found);
    } else {
      alert("Код олдсонгүй! Багшаас авсан хүүхдийн кодоо зөв оруулна уу.");
    }
  };

  // Мессеж илгээх
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const senderName = role === "teacher" ? "Багш" : `${loggedInStudent?.name}-ийн эцэг эх`;
    setChatMessages([...chatMessages, { sender: senderName, text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Горим сонгох цэс */}
        <div className="bg-slate-900 text-white p-4 flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-xl font-bold">🏫 23-р сургууль - Ангийн систем</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setRole("teacher")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                role === "teacher" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Багшийн хэсэг
            </button>
            <button
              onClick={() => setRole("parent")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                role === "parent" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Эцэг эхийн хэсэг
            </button>
          </div>
        </div>

        {/* БАГШИЙН УДАРДАЖ БУЙ ХЭСЭГ */}
        {role === "teacher" && (
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h2 className="text-xl font-bold">Ангийн сурагчдын жагсаалт</h2>
                <p className="text-sm text-slate-500">Нийт: {students.length} сурагч</p>
              </div>
            </div>

            {/* Сурагч нэмэх форм */}
            <form onSubmit={handleAddStudent} className="flex gap-2 max-w-md">
              <input
                type="text"
                placeholder="Шинэ сурагчийн нэр оруулах..."
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                + Нэмэх
              </button>
            </form>

            {/* Сурагчдын хүснэгт */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 border-b text-sm">
                    <th className="p-3">№</th>
                    <th className="p-3">Сурагчийн нэр</th>
                    <th className="p-3">Эцэг эх нэвтрэх код</th>
                    <th className="p-3 text-right">Үйлдэл</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {students.map((student, index) => (
                    <tr key={student.id} className="hover:bg-slate-50">
                      <td className="p-3 font-medium text-slate-500">{index + 1}</td>
                      <td className="p-3 font-semibold">{student.name}</td>
                      <td className="p-3">
                        <span className="bg-slate-200 text-slate-800 px-2.5 py-1 rounded text-xs font-mono font-bold">
                          {student.code}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Хасах
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Багшийн чат харах хэсэг */}
            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-bold mb-4">💬 Эцэг эхчүүдийн чат</h3>
              <div className="bg-slate-100 p-4 rounded-xl h-48 overflow-y-auto mb-4 space-y-2">
                {chatMessages.length === 0 ? (
                  <p className="text-slate-400 text-sm text-center">Одоогоор мессеж ирээгүй байна.</p>
                ) : (
                  chatMessages.map((msg, i) => (
                    <div key={i} className="bg-white p-2 rounded shadow-sm text-sm">
                      <span className="font-bold text-blue-600">{msg.sender}: </span>
                      <span>{msg.text}</span>
                    </div>
                  ))
                )}
              </div>
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Багшийн хариу бичих..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
                  Илгээх
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ЭЦЭГ ЭХИЙН НЭВТРЭХ & ЧАТЛАХ ХЭСЭГ */}
        {role === "parent" && (
          <div className="p-6">
            {!loggedInStudent ? (
              <div className="max-w-md mx-auto py-12 text-center space-y-4">
                <h2 className="text-2xl font-bold">Эцэг эхийн нэвтрэх хэсэг</h2>
                <p className="text-sm text-slate-500">Багшаас авсан хүүхдийнхээ тусгай кодыг оруулна уу.</p>
                <form onSubmit={handleParentLogin} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Dэшийн код (Жишээ нь: STU-001)"
                    value={parentCodeInput}
                    onChange={(e) => setParentCodeInput(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg text-center uppercase font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold">
                    Нэвтрэх
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b pb-4">
                  <div>
                    <h2 className="text-xl font-bold">{loggedInStudent.name}-ийн хуудас</h2>
                    <p className="text-sm text-green-600 font-medium">● Багштай холбогдсон</p>
                  </div>
                  <button
                    onClick={() => setLoggedInStudent(null)}
                    className="text-xs text-slate-500 underline"
                  >
                    Гарах
                  </button>
                </div>

                {/* Багштай чатлах */}
                <div>
                  <h3 className="text-lg font-bold mb-2">💬 Ангийн багштай чатлах</h3>
                  <div className="bg-slate-100 p-4 rounded-xl h-64 overflow-y-auto mb-4 space-y-2">
                    {chatMessages.length === 0 ? (
                      <p className="text-slate-400 text-sm text-center">Асуух зүйлээ багш руу бичээрэй.</p>
                    ) : (
                      chatMessages.map((msg, i) => (
                        <div key={i} className="bg-white p-2 rounded shadow-sm text-sm">
                          <span className="font-bold text-blue-600">{msg.sender}: </span>
                          <span>{msg.text}</span>
                        </div>
                      ))
                    )}
                  </div>
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Багшид мессеж бичих..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
                      Илгээх
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}