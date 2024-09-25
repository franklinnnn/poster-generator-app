import { useRouter } from "next/navigation";

export const ResultsCard = ({ item, layout }) => {
  const router = useRouter();

  const handleSelectResult = () => {
    router.push(`/album/${item.id}`);
  };
  return (
    <div onClick={handleSelectResult} className="hover:cursor-pointer">
      {layout ? (
        <div className="relative rounded-none h-24 overflow-hidden group border-2">
          <div className="flex gap-4 absolute top-0 left-0 w-full font-bold z-10">
            <img src={item.images[1].url} alt="Album cover" className="h-24" />
            <div className="p-2 group-hover:pr-6  transition-all">
              <p className="text-2xl">{item.name}</p>
              <p className="text-sm">{item.artists[0].name}</p>
            </div>
          </div>

          {/* <div className="absolute top-0 left-0 w-3/4 h-24 bg-gradient-to-r from-transparent to-base-100 transition-all" /> */}
          <img
            src={item.images[0].url}
            alt="Album cover"
            className="w-3/4 blur-3xl group-hover:w-full opacity-60 transition-all"
          />
        </div>
      ) : (
        <div className="relative rounded-md aspect-square w-full overflow-hidden group">
          <div className="absolute bottom-0 left-0 p-2 w-full bg-base-200 opacity-90 hidden font-bold group-hover:block z-10 transition">
            <p className="text-2xl">{item.name}</p>
            <p className="text-sm">{item.artists[0].name}</p>
          </div>
          <img
            src={item.images[1].url}
            alt="Album cover"
            className="rounded-md"
          />
        </div>
      )}
    </div>
  );
};
