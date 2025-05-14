import { useState } from "react";

export default function Game() {
    const [boxImages, setBoxImages] = useState(Array(5).fill(null));
    const [draggedImage, setDraggedImage] = useState<number|null>(null);
    let [imgCnt, setImgCnt] = useState(0);
    let [guessCnt, setGuessCnt] = useState(0);

    const handleDrop = (i: number) => {
        if(draggedImage && i>=guessCnt*5) {
            const newBoxImages = [...boxImages];
            if(newBoxImages[i] === null) setImgCnt(val => val+1);
            newBoxImages[i] = draggedImage;
            setBoxImages(newBoxImages);
            setDraggedImage(null);
        }
        // console.log(imgCnt);
    }

    const handleGuess = () => {
        if(imgCnt === 5) {
            setBoxImages(prev => [...prev, ...Array(5).fill(null)]);
            // console.log(boxImages.le)
            setImgCnt(0);
            setGuessCnt(val => val+1);
            if(guessCnt === 5) {
                alert("You won");
                setBoxImages(Array(5).fill(null));
                setDraggedImage(null);
                setGuessCnt(0);
            }
        }
        else {
            alert(`Insert ${5-imgCnt} more image to the guess box`);
        }
        // console.log(guessCnt);
    } 

    return (
        <div className="h-screen flex flex-col items-center">
            <h1 className="text-[64px] font-bold">Rottle</h1>
            <hr className="w-full border-gray-300" />
            <div className="grid grid-cols-5 gap-4 items-center mt-8 mb-8">
                {boxImages.map((img, i) => (
                    <div
                        key={i}
                        className="box-border h-32 w-32 bg-white-500 border-2 rounded flex items-center justify-center"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(i)}
                    >
                        {
                            img?(<img className="object-stretch" src={`img/brainrot/${img}.jpg`} />):(<span className="text-[16px] font-light">Alomani {i%5+1}</span>)
                        }
                    </div>
                ))}
                <button className="bg-gray-500 h-12 w-24 border-2 rounded flex items-center justify-center text-[16px] font-light" onClick={() => handleGuess()} >Guess</button>
            </div>
            <hr className="w-full border-gray-300" />
            <div className="grid grid-cols-8 gap-4">
                {Array.from({ length: 8 }).map((_, i) => {
                    const imgSrc=`img/brainrot/${i+1}.jpg`;
                    return (
                        <img key={i} className="h-32 w-32" src={imgSrc} alt={`Alomani ${i+1}`} draggable onDragStart={() => setDraggedImage(i+1)} />
                    )
                })}
            </div>
        </div>
    );
}