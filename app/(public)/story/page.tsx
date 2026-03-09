import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Бидний түүх | Зөөлөн хот",
};

export default function StoryPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-stone-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "#c4734a" }}>
            Манай байгууллага
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold">Бидний түүх</h1>
        </div>
      </section>

      {/* Story content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose max-w-none">
            <h2>Зөөлөн хотын шийдэл НҮТББ</h2>
            <p>
              "Зөөлөн хотын шийдэл" нь Монгол улсад хүний хэмжээний, тогтвортой хот байгуулалтыг дэмжих зорилготой иргэний нийгмийн байгууллага юм.
            </p>
            <p>
              Бид 2020 оноос эхлэн хот байгуулалт, нийтийн орон зайн талаар мэдлэг мэдээллийг Монголын нийгэмд дэлгэрүүлж, орон нутгийн оролцоог нэмэгдүүлэх чиглэлд ажиллаж байна.
            </p>
            <h3>Бидний зорилго</h3>
            <p>
              Монголын хот, тосгодыг хүний хэмжээний, амьдрахад таатай, тогтвортой газар болгоход хувь нэмэр оруулах.
            </p>
            <h3>Бидний үнэт зүйл</h3>
            <ul>
              <li><strong>Хүн төвтэй хот:</strong> Хотын дизайн нь хүнд зориулагдсан байх ёстой</li>
              <li><strong>Оролцоо:</strong> Иргэд өөрийн орон зайгаа бүтээхэд оролцох эрхтэй</li>
              <li><strong>Тогтвортой байдал:</strong> Байгаль орчинд ээлтэй, удаан хугацаанд үйлчлэх шийдлүүд</li>
              <li><strong>Мэдлэг дамжуулах:</strong> Дэлхийн шилдэг туршлагыг Монголд нутагшуулах</li>
            </ul>
            <h3>Gehl арга зүй</h3>
            <p>
              Бид Данийн алдарт хот байгуулагч Ян Гэлийн баг болох Gehl Architects-ийн арга зүйг Монголын нөхцөл байдалд тохируулан ашигладаг. "Хүний хэмжээний хот байгуулалт" гэсэн ойлголт нь манай бүх ажлын үндэс суурь юм.
            </p>
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Манай баг</h2>
            <div className="w-12 h-1" style={{ backgroundColor: "#c4734a" }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Баг гишүүн 1", role: "Гүйцэтгэх захирал" },
              { name: "Баг гишүүн 2", role: "Хөтөлбөрийн менежер" },
              { name: "Баг гишүүн 3", role: "Харилцаа холбооны мэргэжилтэн" },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-32 h-32 bg-stone-200 rounded-full mx-auto mb-4" />
                <h3 className="font-bold text-stone-900">{member.name}</h3>
                <p className="text-stone-500 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Хамтрагч байгууллагууд</h2>
            <div className="w-12 h-1 mx-auto" style={{ backgroundColor: "#c4734a" }} />
          </div>
          <div className="flex flex-wrap justify-center gap-12 items-center">
            {["Gehl Architects", "Think Softer", "PPS"].map((p) => (
              <div key={p} className="text-stone-400 font-semibold text-lg">{p}</div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
