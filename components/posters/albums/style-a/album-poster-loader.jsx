export const AlbumPosterLoader = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row w-full max-w-[1000px]">
        <div className="flex justify-center w-full md:w-2/3">
          <div className="relative w-full max-w-[350px] min-w-[350px] md:min-w-[calc(350px*1.6)] md:max-w-[calc(350px*1.6)] aspect-[2/3] bg-slate-100 border border-base-300 overflow-y-clip">
            <div className="absolute inset-0 flex flex-col p-[5%]">
              {/* Image Container (top half) */}
              <div className="flex-1 flex justify-center items-center pb-[2%]">
                <div className="w-full h-0 pb-[100%] relative">
                  <div className="skeleton absolute inset-0 w-full h-full rounded-none" />
                </div>
              </div>
              {/* BOTTOM HALF */}
              <div className="flex-1 px-[5%] pb-[5%]">
                <div className="flex flex-row justify-between h-full">
                  <div className="flex-1">
                    <div className="flex w-[6.3em] md:w-[10em] h-[0.63em] md:h-[1em] mb-[5%]">
                      <div className="skeleton w-full h-full rounded-none" />
                    </div>
                    <div className="mb-[5%]">
                      <p className="skeleton w-24 md:w-40 h-7 md:h-12 rounded-none mb-2"></p>
                      <p className="skeleton w-24 md:w-40 h-5 md:h-8 rounded-none"></p>
                    </div>
                    <div className="skeleton size-10 md:size-16 rounded-none" />
                  </div>
                  <div className="flex-1 flex">
                    <div className="flex flex-col justify-between uppercase">
                      {Array.from({ length: 7 }, (_, i) => (
                        <div
                          className="skeleton w-32 md:w-56 h-3.5 md:h-6 rounded-none"
                          key={i}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-[5%] pb-[5%]">
                <div className="skeleton w-20 md:w-32 h-3.5 md:-6 rounded-none" />
              </div>
              {/* BOTTOM HALF */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
