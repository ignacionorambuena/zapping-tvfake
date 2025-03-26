const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e93f6e] to-[#f4e387]">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-24">
          <div>
            <h2 className="text-6xl font-bold text-white mb-6">
              Tu contenido favorito en vivo
            </h2>
            <p className="text-white text-xl mb-8">
              Disfruta del mejor streaming en vivo con la mejor calidad. Series,
              películas, deportes y más contenido exclusivo al alcance de un
              clic.
            </p>
            <div className="space-x-4">
              <a
                href="/signup"
                className="bg-[#f4e387] text-[#e93f6e] px-8 py-3 rounded-full font-bold text-lg hover:bg-opacity-90 transition"
              >
                ¡Comienza Ahora!
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white p-4 rounded-lg shadow-2xl transform rotate-3">
              <img
                src="https://i.ytimg.com/vi/WTWW0vrjS2s/maxresdefault.jpg"
                alt="Streaming Preview"
                className="rounded-lg object-cover h-full w-full"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#f4e387] p-4 rounded-lg shadow-lg">
              <p className="text-[#e93f6e] font-bold">
                ¡Transmisión en vivo 24/7!
              </p>
            </div>
          </div>
        </div>

        <div className="mt-32 text-center">
          <h3 className="text-4xl font-bold text-white mb-12">
            ¿Por qué elegir StreamingTV?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg">
              <h4 className="text-[#e93f6e] text-xl font-bold mb-4">
                Alta Calidad
              </h4>
              <p className="text-gray-600">
                Disfruta de contenido en HD y 4K sin interrupciones
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h4 className="text-[#e93f6e] text-xl font-bold mb-4">
                Contenido Exclusivo
              </h4>
              <p className="text-gray-600">
                Accede a eventos y shows únicos en nuestra plataforma
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h4 className="text-[#e93f6e] text-xl font-bold mb-4">
                Multi-dispositivo
              </h4>
              <p className="text-gray-600">
                Disfruta en cualquier dispositivo, en cualquier momento
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
