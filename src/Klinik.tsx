import React, { useState, useMemo } from 'react';

const Klinik = () => {
  const [activeTab, setActiveTab] = useState('sacEkimi');
  const [modalInfo, setModalInfo] = useState({ isOpen: false, title: '', message: '' });

  const tabData = useMemo(() => ({
    sacEkimi: {
      id: 'sacEkimi', navTitle: 'Saç Ekimi', video: '/sacekimi.mp4',
      hero: <><span className="font-normal text-slate-900">Mikroskobik</span> <span className="font-semibold text-blue-600">Hassasiyet.</span></>,
      services: [
        { title: 'FUE Gold Tekniği', desc: 'Altın uçlu mikro motorlar ile dokuya sıfır zarar.', action: 'Ücretsiz Saç Analizi', img: '/fue.jpg' },
        { title: 'DHI Implantation', desc: 'Kanal açmadan, doğrudan ekim sağlayan Choi kalemleri.', action: 'Süreci İncele', img: '/dhi.jpg' },
        { title: 'İğnesiz Anestezi', desc: 'Özel basınçlı cihazlarla iğne korkusuna son.', action: 'WhatsApp\'tan Sor', img: '/anestezi.jpg' }
      ]
    },
    estetik: {
      id: 'estetik', navTitle: 'Medikal Estetik', video: '/estetik.mp4',
      hero: <><span className="font-normal text-slate-900">Kusursuz</span> <span className="font-semibold text-blue-600">Zarafet.</span></>,
      services: [
        { title: 'HydraFacial MD', desc: 'Cilt bakımı teknolojisi ile derinlemesine temizlik.', action: 'Randevu Al', img: '/hydra.jpg' },
        { title: 'Fransız Askısı', desc: 'Ameliyatsız yüz germe işleminde çığır açan yöntem.', action: 'Detaylı Bilgi', img: '/aski.jpg' },
        { title: 'Lazer Epilasyon', desc: 'Buz başlık teknolojisi ile sıfır acı.', action: 'Kampanyayı Gör', img: '/lazer.jpg' }
      ]
    },
    uzmanlar: {
      id: 'uzmanlar', navTitle: 'Uzman Kadromuz', video: '/uzmanlar.mp4',
      hero: <><span className="font-normal text-slate-900">Global</span> <span className="font-semibold text-blue-600">Tecrübe.</span></>,
      services: [
        { title: 'Op. Dr. Oulubey', desc: 'Başhekim & Estetik Cerrahi Uzmanı.', action: 'Özgeçmişi İncele', img: '/oulubey.jpg' },
        { title: 'Uzm. Dr. Aylin', desc: 'Medikal Dermatoloji Uzmanı.', action: 'Özgeçmişi İncele', img: '/aylin.jpg' },
        { title: 'Saç Ekim Ekibi', desc: 'Profesyonel teknisyen ve hemşire kadromuz.', action: 'Ekiple Tanış', img: '/ekip.jpg' }
      ]
    }
  }), []);

  const current = tabData[activeTab as keyof typeof tabData];

  return (
    <div className="relative min-h-screen font-sans antialiased text-slate-900 bg-slate-100 overflow-x-hidden">
      
      {/* 1. KATMAN: Sabit Arka Plan */}
      <div className="fixed inset-0 bg-slate-200 -z-30" />
      
      {/* 2. KATMAN: Video (En Garanti Ayarlarla) */}
      <video 
        key={current.video} 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="fixed inset-0 w-full h-full object-cover -z-20 opacity-60 transition-opacity duration-700"
      >
        <source src={current.video} type="video/mp4" />
      </video>

      {/* 3. KATMAN: Cam Efekti */}
      <div className="fixed inset-0 bg-white/30 backdrop-blur-[2px] -z-10" />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/50 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="text-2xl tracking-tighter font-bold text-slate-800">
          OULUBEY <span className="text-blue-600 uppercase font-light tracking-widest text-lg ml-1">Clinic</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          {Object.values(tabData).map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`text-sm font-semibold transition-all ${activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {tab.navTitle}
            </button>
          ))}
        </nav>
        <button className="bg-slate-900 text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-blue-600 transition-all">
          VIP RANDEVU
        </button>
      </header>

      {/* İçerik */}
      <main className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto z-10">
        <h1 className="text-5xl md:text-8xl font-light mb-12 tracking-tighter text-center animate-fade-in">
          {current.hero}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {current.services.map((item, index) => (
            <div 
              key={`${activeTab}-${index}`} 
              className="bg-white/70 backdrop-blur-xl border border-white/50 p-6 rounded-[2.5rem] shadow-xl hover:-translate-y-1 transition-all duration-500 group"
            >
              <div className="h-72 bg-slate-200 rounded-3xl mb-6 overflow-hidden border border-slate-300/20">
                <img 
                  src={item.img} 
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-slate-800">{item.title}</h3>
              <p className="text-slate-500 mb-8 text-sm leading-relaxed">{item.desc}</p>
              <button 
                onClick={() => setModalInfo({ isOpen: true, title: item.title, message: 'VIP Danışmanımız en kısa sürede size dönüş yapacaktır.' })}
                className="w-full py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
              >
                {item.action}
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {modalInfo.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-black/20">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full relative shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">{modalInfo.title}</h3>
            <p className="text-slate-600 mb-8">{modalInfo.message}</p>
            <button 
              onClick={() => setModalInfo({ ...modalInfo, isOpen: false })}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-slate-900 transition-all"
            >
              Anladım
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Klinik;