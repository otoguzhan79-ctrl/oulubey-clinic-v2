import React, { useState, useEffect } from 'react';

const Klinik = () => {
  const [activeTab, setActiveTab] = useState('sacEkimi');
  const [modalInfo, setModalInfo] = useState({ isOpen: false, title: '', message: '' });
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    setLoadVideo(false);
    const timer = setTimeout(() => {
      setLoadVideo(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleButtonClick = (item: any) => {
    if (item.action === 'Randevu Al' || item.action === "WhatsApp'tan Sor") {
      const phoneNumber = "905414109452"; 
      const message = `Merhaba, Oulubey Clinic sitenizden ulaşıyorum. ${item.title} hakkında bilgi almak istiyorum.`;
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    } else {
      setModalInfo({ isOpen: true, title: item.title, message: `${item.title} süreci hazırlanıyor. Detaylar için WhatsApp hattımızdan bilgi alabilirsiniz.` });
    }
  };

  const tabData = {
    sacEkimi: {
      id: 'sacEkimi', navTitle: 'Saç Ekimi', videoDesktop: './sacekimi.mp4',
      heroTitle: <><span className="font-normal text-slate-900">Mikroskobik</span> <span className="font-semibold text-blue-600">Hassasiyet.</span></>,
      services: [
        { title: 'FUE Gold Tekniği', desc: 'Altın uçlu mikro motorlar ile dokuya sıfır zarar.', action: 'Ücretsiz Saç Analizi', img: './fue.jpg' },
        { title: 'DHI Implantation', desc: 'Kanal açmadan, doğrudan ekim sağlayan Choi kalemleri.', action: 'Süreci İncele', img: './dhi.jpg' },
        { title: 'İğnesiz Anestezi', desc: 'Özel basınçlı cihazlarla iğne korkusuna son.', action: 'WhatsApp\'tan Sor', img: './anestezi.jpg' }
      ]
    },
    estetik: {
      id: 'estetik', navTitle: 'Medikal Estetik', videoDesktop: './estetik.mp4',
      heroTitle: <><span className="font-normal text-slate-900">Kusursuz</span> <span className="font-semibold text-blue-600">Zarafet.</span></>,
      services: [
        { title: 'HydraFacial MD', desc: 'Cilt bakımı teknolojisi ile derinlemesine temizlik.', action: 'Randevu Al', img: './hydra.jpg' },
        { title: 'Fransız Askısı', desc: 'Ameliyatsız yüz germe işleminde çığır açan yöntem.', action: 'Detaylı Bilgi', img: './aski.jpg' },
        { title: 'Lazer Epilasyon', desc: 'Buz başlık teknolojisi ile sıfır acı.', action: 'Kampanyayı Gör', img: './lazer.jpg' }
      ]
    },
    uzmanlar: {
      id: 'uzmanlar', navTitle: 'Uzman Kadromuz', videoDesktop: './uzmanlar.mp4',
      heroTitle: <><span className="font-normal text-slate-900">Global</span> <span className="font-semibold text-blue-600">Tecrübe.</span></>,
      services: [
        { title: 'Op. Dr. Oulubey', desc: 'Başhekim & Estetik Cerrahi Uzmanı.', action: 'Özgeçmişi İncele', img: './oulubey.jpg' },
        { title: 'Uzm. Dr. Aylin', desc: 'Medikal Dermatoloji Uzmanı.', action: 'Özgeçmişi İncele', img: './aylin.jpg' },
        { title: 'Saç Ekim Ekibi', desc: 'Profesyonel teknisyen ve hemşire kadromuz.', action: 'Ekiple Tanış', img: './ekip.jpg' }
      ]
    }
  };

  const currentData = tabData[activeTab as keyof typeof tabData];

  return (
    <div className="relative min-h-screen font-sans antialiased text-slate-900 overflow-x-hidden">
      <div className="fixed inset-0 bg-slate-100 -z-30" />
      
      {loadVideo && (
        <video 
          key={`vid-${currentData.id}`} 
          autoPlay loop muted playsInline
          className="fixed inset-0 w-full h-full object-cover -z-20 opacity-60 animate-fade-in"
        >
          <source src={currentData.videoDesktop} type="video/mp4" />
        </video>
      )}

      <div className="fixed inset-0 bg-white/30 backdrop-blur-[2px] -z-10" />

      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 px-6 py-4 flex justify-between items-center">
        <div className="text-2xl tracking-widest font-light text-slate-800">OULUBEY <span className="font-semibold text-blue-600">CLINIC</span></div>
        <nav className="hidden md:flex space-x-10">
          {Object.values(tabData).map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`text-sm font-medium transition-colors ${activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-blue-400'}`}>{tab.navTitle}</button>
          ))}
        </nav>
        <button onClick={() => setModalInfo({ isOpen: true, title: 'VIP Konsültasyon', message: 'Asistanlarımız sizinle iletişime geçecektir.' })} className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-blue-600 transition-all shadow-lg">VIP Konsültasyon</button>
      </header>

      {/* Her sekme değiştiğinde içeriğin yenilenmesi için key ekledik */}
      <main key={activeTab} className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto text-center z-10">
        <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight animate-fade-in">{currentData.heroTitle}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 animate-fade-in">
          {currentData.services.map((item, index) => (
            <div key={`${activeTab}-${index}`} className="bg-white/80 backdrop-blur-md border border-white/50 p-8 rounded-[2.5rem] shadow-xl hover:-translate-y-2 transition-all duration-500 group">
              <div className="h-64 bg-slate-200 rounded-3xl mb-8 overflow-hidden border border-slate-300/30">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
              <p className="text-slate-600 mb-8 h-20 text-sm leading-relaxed">{item.desc}</p>
              <button onClick={() => handleButtonClick(item)} className="w-full py-4 bg-slate-50 border border-slate-200 rounded-2xl font-semibold hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300">{item.action}</button>
            </div>
          ))}
        </div>
      </main>

      {modalInfo.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-black/20">
          <div className="bg-white rounded-[2rem] p-10 max-w-md w-full relative animate-fade-in shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 text-slate-800">{modalInfo.title}</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">{modalInfo.message}</p>
            <button onClick={() => setModalInfo({ ...modalInfo, isOpen: false })} className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-slate-900 transition-colors">Anladım</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Klinik;