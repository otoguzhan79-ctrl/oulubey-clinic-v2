import React, { useState, useEffect, useMemo } from 'react';

const Klinik = () => {
  const [activeTab, setActiveTab] = useState('sacEkimi');
  const [loadVideo, setLoadVideo] = useState(false);
  const [modalInfo, setModalInfo] = useState({ isOpen: false, title: '', message: '' });

  // Veriyi hafızaya alalım ki her render'da hesaplanmasın
  const tabData = useMemo(() => ({
    sacEkimi: {
      id: 'sacEkimi', navTitle: 'Saç Ekimi', video: './sacekimi.mp4', poster: './fue.jpg',
      hero: <><span className="font-normal text-slate-900">Mikroskobik</span> <span className="font-semibold text-blue-600">Hassasiyet.</span></>,
      services: [
        { title: 'FUE Gold Tekniği', desc: 'Altın uçlu mikro motorlar ile dokuya sıfır zarar.', action: 'Ücretsiz Saç Analizi', img: './fue.jpg' },
        { title: 'DHI Implantation', desc: 'Kanal açmadan, doğrudan ekim sağlayan Choi kalemleri.', action: 'Süreci İncele', img: './dhi.jpg' },
        { title: 'İğnesiz Anestezi', desc: 'Özel basınçlı cihazlarla iğne korkusuna son.', action: 'WhatsApp\'tan Sor', img: './anestezi.jpg' }
      ]
    },
    estetik: {
      id: 'estetik', navTitle: 'Medikal Estetik', video: './estetik.mp4', poster: './hydra.jpg',
      hero: <><span className="font-normal text-slate-900">Kusursuz</span> <span className="font-semibold text-blue-600">Zarafet.</span></>,
      services: [
        { title: 'HydraFacial MD', desc: 'Cilt bakımı teknolojisi ile derinlemesine temizlik.', action: 'Randevu Al', img: './hydra.jpg' },
        { title: 'Fransız Askısı', desc: 'Ameliyatsız yüz germe işleminde çığır açan yöntem.', action: 'Detaylı Bilgi', img: './aski.jpg' },
        { title: 'Lazer Epilasyon', desc: 'Buz başlık teknolojisi ile sıfır acı.', action: 'Kampanyayı Gör', img: './lazer.jpg' }
      ]
    },
    uzmanlar: {
      id: 'uzmanlar', navTitle: 'Uzman Kadromuz', video: './uzmanlar.mp4', poster: './oulubey.jpg',
      hero: <><span className="font-normal text-slate-900">Global</span> <span className="font-semibold text-blue-600">Tecrübe.</span></>,
      services: [
        { title: 'Op. Dr. Oulubey', desc: 'Başhekim & Estetik Cerrahi Uzmanı.', action: 'Özgeçmişi İncele', img: './oulubey.jpg' },
        { title: 'Uzm. Dr. Aylin', desc: 'Medikal Dermatoloji Uzmanı.', action: 'Özgeçmişi İncele', img: './aylin.jpg' },
        { title: 'Saç Ekim Ekibi', desc: 'Profesyonel teknisyen ve hemşire kadromuz.', action: 'Ekiple Tanış', img: './ekip.jpg' }
      ]
    }
  }), []);

  const current = tabData[activeTab as keyof typeof tabData];

  // Video yükleme kontrolü
  useEffect(() => {
    setLoadVideo(false);
    const timer = setTimeout(() => setLoadVideo(true), 200);
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <div className="relative min-h-screen font-sans antialiased text-slate-900 bg-slate-50 overflow-x-hidden">
      
      {/* Arka Plan Katmanları */}
      <div className="fixed inset-0 bg-slate-200 -z-30" />
      
      {/* Video: Preload ayarı ve poster ile optimize edildi */}
      {loadVideo && (
        <video 
          key={current.id} 
          autoPlay loop muted playsInline preload="auto"
          poster={current.poster}
          className="fixed inset-0 w-full h-full object-cover -z-20 opacity-50 transition-opacity duration-1000"
        >
          <source src={current.video} type="video/mp4" />
        </video>
      )}

      <div className="fixed inset-0 bg-white/40 backdrop-blur-[3px] -z-10" />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="text-2xl tracking-tighter font-bold text-slate-800">
          OULUBEY <span className="text-blue-600 uppercase font-light tracking-widest text-lg ml-1">Clinic</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          {Object.values(tabData).map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`text-sm font-semibold transition-all pb-1 ${activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {tab.navTitle}
            </button>
          ))}
        </nav>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-slate-900 transition-all shadow-lg shadow-blue-200">
          RANDEVU AL
        </button>
      </header>

      {/* Main Content */}
      <main key={activeTab} className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto z-10 animate-fade-in">
        <h1 className="text-5xl md:text-8xl font-light mb-12 tracking-tighter text-center">{current.hero}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {current.services.map((item, index) => (
            <div 
              key={`${activeTab}-${index}`} 
              className="bg-white/60 backdrop-blur-2xl border border-white p-6 rounded-[2rem] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group"
            >
              {/* Resim Alanı: Lazy Load ve Placeholder eklendi */}
              <div className="h-72 bg-slate-200 rounded-3xl mb-6 overflow-hidden relative">
                <img 
                  src={item.img} 
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                  style={{ opacity: 0, transition: 'opacity 0.5s' }}
                />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-slate-800">{item.title}</h3>
              <p className="text-slate-500 mb-8 text-sm leading-relaxed antialiased">{item.desc}</p>
              <button 
                onClick={() => setModalInfo({ isOpen: true, title: item.title, message: 'VIP Danışmanımız en kısa sürede size dönüş yapacaktır.' })}
                className="w-full py-4 bg-white border border-slate-100 rounded-2xl font-bold text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm"
              >
                {item.action}
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {modalInfo.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-slate-900/20 animate-fade-in">
          <div className="bg-white rounded-[3rem] p-12 max-w-md w-full relative shadow-2xl">
            <h3 className="text-3xl font-bold mb-4 tracking-tighter">{modalInfo.title}</h3>
            <p className="text-slate-500 mb-10 leading-relaxed">{modalInfo.message}</p>
            <button 
              onClick={() => setModalInfo({ ...modalInfo, isOpen: false })}
              className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Klinik;