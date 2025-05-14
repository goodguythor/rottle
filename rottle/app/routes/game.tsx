export default function Game() {
  return (
    <div className="h-screen flex flex-col items-center">
        <h1 className="text-[64px] font-bold">Rottle</h1>
        <hr className="w-full border-gray-300" />
        <div className="grid grid-cols-5 gap-4 items-center mt-8 mb-8">
            {Array.from({ length: 25 }).map((_, i) => (
                <div
                    key={i}
                    className="box-border size-32 bg-white-500 border-2 rounded flex items-center justify-center text-4xl"
                >
                    {
                        <h1 className="text-[16px] font-light">Alomani {i%5+1}</h1>
                    }
                </div>
            ))}
        </div>
        <hr className="w-full border-gray-300" />
    </div>
  );
}