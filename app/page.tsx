'use client'

import { useState } from 'react'

export default function Home() {
  // Багшийн эрх & Нэвтрэх хэсэг (Код: 1234)
  const [isTeacher, setIsTeacher] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [pin, setPin] = useState('')

  // Идэвхитэй таб
  const [activeTab, setActiveTab] = useState('news')

  // --- ДҮҮРГЭСЭН ӨГӨГДЛҮҮД (STATE) ---
  // 1. Ангийн ажил
  const [newsList, setNewsList] = useState([
    { id: 1, title: '🌸 Хаврын баяр ба Талархлын өдөр', date: '2026-03-01', desc: 'Сурагчид аав ээждээ зориулж гар урлалын бүтээл хийнэ.' },
    { id: 2, title: '📚 Ном унших сарын аян', date: '2026-03-05', desc: 'Өдөрт 15 минут ном унших дадал хэвшүүлэх уралдаан эхэллээ.' }
  ])
  const [newNewsTitle, setNewNewsTitle] = useState('')
  const [newNewsDesc, setNewNewsDesc] = useState('')

  // 2. Сурагчдын мэдээлэл
  const [students, setStudents] = useState([
    { id: 1, name: 'Б. Бат-Эрдэнэ', code: '2З-01', parentPhone: '99112233' },
    { id: 2, name: 'Г. Халиунаа', code: '2З-02', parentPhone: '88114455' },
    { id: 3, name: 'А. Тэмүүлэн', code: '2З-03', parentPhone: '90001122' },
    { id: 4, name: 'О. Нинжин', code: '2З-04', parentPhone: '91918282' }
  ])
  const [newStudName, setNewStudName] = useState('')
  const [newStudCode, setNewStudCode] = useState('')
  const [newStudPhone, setNewStudPhone] = useState('')

  // 3. Дүнгийн мэдээлэл (Инфографик үзүүлэлт)
  const [grades, setGrades] = useState([
    { id: 1, name: 'Б. Бат-Эрдэнэ', math: 95, reading: 90, art: 100 },
    { id: 2, name: 'Г. Халиунаа', math: 88, reading: 96, art: 92 },
    { id: 3, name: 'А. Тэмүүлэн', math: 100, reading: 85, art: 90 },
    { id: 4, name: 'О. Нинжин', math: 92, reading: 98, art: 95 }
  ])

  // 4. Жижүүрийн хуваарь (Өдөрт 2-4 сурагч)
  const [dutySchedule, setDutySchedule] = useState({
    Даваа: ['Б. Бат-Эрдэнэ', 'Г. Халиунаа'],
    Мягмар: ['А. Тэмүүлэн', 'О. Нинжин'],
    Лхагва: ['Б. Бат-Эрдэнэ', 'А. Тэмүүлэн', 'О. Нинжин'],
    Пүрэв: ['Г. Халиунаа', 'О. Нинжин'],
    Баасан: ['Б. Бат-Эрдэнэ', 'Г. Халиунаа', 'А. Тэмүүлэн', 'О. Нинжин']
  })

  // 5. Ангийн дүрэм
  const [rules] = useState([
    { icon: '🌸', title: 'Хүндэтгэлтэй байх', desc: 'Багш болон найзуудаа сонсож, эелдэг байна.' },
    { icon: '🌼', title: 'Цэвэрч байх', desc: 'Анги танхим болон ширээгээ цэвэр цэгцтэй байлгана.' },
    { icon: '🌺', title: 'Цаг баримтлах', desc: 'Хичээлээс хоцрохгүй, цагтаа ирж суралцана.' },
    { icon: '🌻', title: 'Идэвхитэй оролцох', desc: 'Даалгавраа цагт нь хийж, багтаа тусална.' }
  ])

  // 6. Санал хүсэлт & Чат (Бүх хүн бичих эрхтэй)
  const [chats, setChats] = useState([
    { id: 1, sender: 'Эцэг эх (Бат-Эрдэнэ)', text: 'Сайн байна уу? Маргааш хичээл хэдээс тархах вэ?', time: '10:30' },
    { id: 2, sender: 'Багш', text: 'Сайн байна уу! Маргааш 12:40-өөс хичээл тарна шүү.', time: '10:35' }
  ])
  const [chatSender, setChatSender] = useState('')
  const [chatMessage, setChatMessage] = useState('')

  // Нэвтрэх функц
  function handleLogin(e: any) {
    e.preventDefault()
    if (pin === '1234') {
      setIsTeacher(true)
      setShowLoginModal(false)
      setPin('')
    } else {
      alert('Нууц код буруу байна! (Зөв код: 1234)')
    }
  }

  // Ангийн ажил нэмэх
  function handleAddNews(e: any) {
    e.preventDefault()
    if (!newNewsTitle || !newNewsDesc) return
    setNewsList([...newsList, { id: Date.now(), title: newNewsTitle, date: new Date().toISOString().split('T')[0], desc: newNewsDesc }])
    setNewNewsTitle('')
    setNewNewsDesc('')
  }

  // Сурагч нэмэх
  function handleAddStudent(e: any) {
    e.preventDefault()
    if (!newStudName || !newStudCode) return
    setStudents([...students, { id: Date.now(), name: newStudName, code: newStudCode, parentPhone: newStudPhone }])
    setGrades([...grades, { id: Date.now(), name: newStudName, math: 90, reading: 90, art: 90 }])
    setNewStudName('')
    setNewStudCode('')
    setNewStudPhone('')
  }

  // Чат бичих (Эцэг эх, сурагчид)
  function handleSendChat(e: any) {
    e.preventDefault()
    if (!chatSender || !chatMessage) return alert('Нэр болон зурвасаа оруулна уу!')
    setChats([...chats, { id: Date.now(), sender: chatSender, text: chatMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    setChatMessage('')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-emerald-100 p-4 md:p-8 font-sans text-gray-800">
      {/* Дээд талын гарчиг ба Багш нэвтрэх хэсэг */}
      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 mb-6 border-4 border-pink-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl animate-bounce">🌸</span>
            <div>
              <h1 className="text-3xl font-extrabold text-pink-600 tracking-wide">2З Ангийн Цэцэгхэн Цонх</h1>
              <p className="text-sm font-medium text-emerald-600">Сурагч, Эцэг эх, Багшийн мэдээллийн нэгдсэн систем</p>
            </div>
          </div>

          <div>
            {isTeacher ? (
              <div className="flex items-center gap-3 bg-emerald-100 border border-emerald-300 px-4 py-2 rounded-full">
                <span className="text-sm font-bold text-emerald-700">👩‍🏫 Багшийн эрх идэвхтэй</span>
                <button
                  onClick={() => setIsTeacher(false)}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full transition"
                >
                  Гарахаар бол
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-bold px-5 py-2.5 rounded-full shadow-lg transition transform hover:scale-105 flex items-center gap-2"
              >
                🔒 Багш нэвтрэх
              </button>
            )}
          </div>
        </div>

        {/* Цэс / Навигаци */}
        <div className="flex flex-wrap gap-2 mt-6 border-t border-pink-100 pt-4 justify-center md:justify-start">
          {[
            { key: 'news', label: '📢 Ангийн ажил', color: 'bg-pink-500' },
            { key: 'students', label: '👨‍🎓 Сурагчид', color: 'bg-purple-500' },
            { key: 'grades', label: '⭐ Дүнгийн мэдээлэл', color: 'bg-amber-500' },
            { key: 'duty', label: '🧹 Жижүүрийн хуваарь', color: 'bg-emerald-500' },
            { key: 'rules', label: '📜 Ангийн дүрэм', color: 'bg-sky-500' },
            { key: 'feedback', label: '💬 Санал хүсэлт & Чат', color: 'bg-rose-500' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-sm transition-all duration-200 shadow-sm ${
                activeTab === tab.key
                  ? `${tab.color} text-white scale-105 shadow-md`
                  : 'bg-white hover:bg-pink-50 text-gray-600 border border-pink-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* НҮҮР ХЭСГИЙН АГУУЛГА */}
      <div className="max-w-6xl mx-auto">
        {/* 1. АНГИЙН АЖИЛ */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            {isTeacher && (
              <form onSubmit={handleAddNews} className="bg-white p-5 rounded-3xl border-2 border-pink-200 shadow-sm space-y-3">
                <h3 className="font-bold text-pink-600">✍️ Шинэ мэдээ, ажил нэмэх (Зөвхөн багш)</h3>
                <input
                  type="text"
                  placeholder="Гарчиг..."
                  value={newNewsTitle}
                  onChange={(e) => setNewNewsTitle(e.target.value)}
                  className="w-full p-2.5 border rounded-xl text-sm"
                />
                <textarea
                  placeholder="Нэгдсэн мэдээлэл..."
                  value={newNewsDesc}
                  onChange={(e) => setNewNewsDesc(e.target.value)}
                  className="w-full p-2.5 border rounded-xl text-sm"
                />
                <button type="submit" className="bg-pink-500 text-white font-bold px-4 py-2 rounded-xl text-sm hover:bg-pink-600">
                  + Нэмэх
                </button>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {newsList.map((item) => (
                <div key={item.id} className="bg-white/80 p-5 rounded-3xl border-2 border-pink-100 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-pink-100 text-pink-600 text-xs font-bold px-3 py-1 rounded-bl-xl">
                    {item.date}
                  </div>
                  <h3 className="font-extrabold text-lg text-pink-600 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. СУРАГЧИД */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            {isTeacher && (
              <form onSubmit={handleAddStudent} className="bg-white p-5 rounded-3xl border-2 border-purple-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-3">
                <input
                  type="text"
                  placeholder="Овог Нэр"
                  value={newStudName}
                  onChange={(e) => setNewStudName(e.target.value)}
                  className="p-2.5 border rounded-xl text-sm"
                />
                <input
                  type="text"
                  placeholder="Код (2З-05)"
                  value={newStudCode}
                  onChange={(e) => setNewStudCode(e.target.value)}
                  className="p-2.5 border rounded-xl text-sm"
                />
                <input
                  type="text"
                  placeholder="Аав/Ээжийн утас"
                  value={newStudPhone}
                  onChange={(e) => setNewStudPhone(e.target.value)}
                  className="p-2.5 border rounded-xl text-sm"
                />
                <button type="submit" className="bg-purple-500 text-white font-bold p-2.5 rounded-xl text-sm hover:bg-purple-600">
                  + Сурагч нэмэх
                </button>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {students.map((st) => (
                <div key={st.id} className="bg-white p-5 rounded-3xl border-2 border-purple-100 shadow-md text-center">
                  <div className="w-16 h-16 bg-purple-100 text-purple-600 font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-3">
                    🌸
                  </div>
                  <h4 className="font-bold text-gray-800">{st.name}</h4>
                  <p className="text-xs text-purple-500 font-semibold mt-1">Код: {st.code}</p>
                  <p className="text-xs text-gray-500 mt-2">📞 Утас: {st.parentPhone}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. ДҮНГИЙН МЭДЭЭЛЭЛ (Инфографик) */}
        {activeTab === 'grades' && (
          <div className="bg-white p-6 rounded-3xl border-2 border-amber-200 shadow-md space-y-6">
            <h3 className="text-xl font-bold text-amber-600 text-center">🏆 Сурагчдын Хичээлийн Ахицын Үнэлгээ</h3>
            <div className="space-y-4">
              {grades.map((item) => (
                <div key={item.id} className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-800">{item.name}</span>
                    <span className="text-xs bg-amber-200 text-amber-800 px-3 py-1 rounded-full font-bold">⭐ Амжилттай</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Математик</span>
                        <span className="font-bold">{item.math}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${item.math}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Унших чадвар</span>
                        <span className="font-bold">{item.reading}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${item.reading}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Дүрслэх урлаг</span>
                        <span className="font-bold">{item.art}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-pink-500 h-2 rounded-full" style={{ width: `${item.art}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. ЖИЖҮҮРИЙН ХУВААРЬ */}
        {activeTab === 'duty' && (
          <div className="bg-white p-6 rounded-3xl border-2 border-emerald-200 shadow-md space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-emerald-600">🧹 Долоо Хоногийн Жижүүрийн Хуваарь</h3>
              <p className="text-xs text-gray-500 mt-1">Өдөрт 2-4 сурагч ангийн цэвэрлэгээг хариуцна</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              {Object.entries(dutySchedule).map(([day, list]) => (
                <div key={day} className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 text-center">
                  <h4 className="font-extrabold text-emerald-700 mb-3 bg-emerald-200 py-1 rounded-xl">{day}</h4>
                  <div className="space-y-1.5">
                    {list.map((s, idx) => (
                      <span key={idx} className="block text-xs font-semibold text-gray-700 bg-white p-1.5 rounded-lg border">
                        🌱 {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {isTeacher && (
              <p className="text-xs text-gray-400 text-center italic">💡 Багш код доторх хуваарийг шууд шинэчлэн засах боломжтой.</p>
            )}
          </div>
        )}

        {/* 5. АНГИЙН ДҮРЭМ */}
        {activeTab === 'rules' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rules.map((rule, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border-2 border-sky-100 shadow-md flex items-center gap-4">
                <span className="text-4xl p-3 bg-sky-50 rounded-2xl">{rule.icon}</span>
                <div>
                  <h4 className="font-extrabold text-sky-600 text-lg">{rule.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">{rule.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 6. САНАЛ ХҮСЭЛТ & ЧАТ (Бүгдэд нээлттэй) */}
        {activeTab === 'feedback' && (
          <div className="bg-white p-6 rounded-3xl border-2 border-rose-200 shadow-md space-y-6">
            <h3 className="text-xl font-bold text-rose-600 text-center">💬 Эцэг Эх, Багшийн Харьцах Хана</h3>

            <div className="max-h-80 overflow-y-auto space-y-3 p-3 bg-rose-50/50 rounded-2xl border">
              {chats.map((c) => (
                <div key={c.id} className={`p-3 rounded-2xl max-w-md ${c.sender === 'Багш' ? 'bg-pink-500 text-white ml-auto' : 'bg-white text-gray-800 border'}`}>
                  <div className="flex justify-between items-center text-xs opacity-80 mb-1">
                    <span className="font-bold">{c.sender}</span>
                    <span>{c.time}</span>
                  </div>
                  <p className="text-sm">{c.text}</p>
                </div>
              ))}
            </div>

            {/* Зурвас бичих хэсэг (Эцэг эх, сурагчид бүгд бичих боломжтой) */}
            <form onSubmit={handleSendChat} className="space-y-3">
              <input
                type="text"
                placeholder="Таны нэр (Жишээ нь: Батын аав)..."
                value={chatSender}
                onChange={(e) => setChatSender(e.target.value)}
                className="w-full p-2.5 border rounded-xl text-sm"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Санал хүсэлт эсвэл асуултаа бичнэ үү..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1 p-2.5 border rounded-xl text-sm"
                />
                <button type="submit" className="bg-rose-500 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-rose-600 text-sm">
                  Илгээх
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* БАГШ НЭВТРЭХ МОДАЛ */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-3xl max-w-sm w-full shadow-2xl border-4 border-pink-300 text-center space-y-4 animate-fade-in">
            <span className="text-4xl">🔐</span>
            <h3 className="font-extrabold text-lg text-pink-600">Багшийн код оруулна уу</h3>
            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="password"
                placeholder="Код оруулна уу"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full text-center tracking-widest text-lg font-bold p-3 border-2 border-pink-200 rounded-xl outline-none focus:border-pink-500"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="w-1/2 bg-gray-200 text-gray-700 font-bold py-2.5 rounded-xl text-sm"
                >
                  Цуцлах
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-pink-500 text-white font-bold py-2.5 rounded-xl text-sm hover:bg-pink-600"
                >
                  Нэвтрэх
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}