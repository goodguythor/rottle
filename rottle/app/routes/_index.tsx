import { type MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Rottle" },
    { name: "description", content: "Welcome to Rottle!" },
  ];
};

export default function Game() {
    const [boxImages, setBoxImages] = useState(Array(5));
    const [answers, setAnswers] = useState(Array(5));
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
            const newBoxImages = [...boxImages];
            const start = guessCnt * 5;
            const end = start + 5;
            let correctCnt = 0;

            const updatedGuess = newBoxImages.slice(start, end).map((img, i) => {
                // console.log(`${img} & ${answers[i]}`)    
                if (img === answers[i]){
                    correctCnt++;
                    return img + 20; 
                }
                else if (answers.includes(img)) return img + 10;
                return img;
            });

            const updatedImages = [...newBoxImages.slice(0, start), ...updatedGuess, ...newBoxImages.slice(end)];
            setBoxImages([...updatedImages, ...Array(5).fill(null)]);
            // console.log(boxImages.le)
            if(correctCnt === 5) {
                alert("You won");
                setTimeout(() => startGame(), 200);
            }
            setImgCnt(0);
            setGuessCnt(val => val+1);
            if(guessCnt === 5) {
                alert("Game Over");
                setTimeout(() => startGame(), 200);
            }
        }
        else {
            alert(`Insert ${5-imgCnt} more image to the guess box`);
        }
        // console.log(guessCnt);
    } 

    const startGame = () => {
        const used = new Set<number>();
        const updatedAnswer = Array.from({ length: 5 }, () => {
            let j;
            do {
                j = Math.floor(Math.random() * 8) + 1;
            } while (used.has(j));
            used.add(j);
            // console.log(j);
            return j;
        });
        setAnswers([...updatedAnswer]);
        // for(let i=0;i<5;i++) alert(updatedAnswer[i]);
        setBoxImages(Array(5).fill(null));
        setDraggedImage(null);
        setGuessCnt(0);
        setImgCnt(0);
    }

    useEffect(() => {
        startGame();
    }, []);

    return (
        <div className="h-screen flex flex-col items-center">
            <h1 className="text-[64px] font-bold">Rottle</h1>
            <hr className="w-full border-gray-300" />
            <div className="grid grid-cols-5 gap-4 mt-8 mb-8">
                {boxImages.map((img, i) => (
                    <div
                        key={i}
                        className={`box-border h-32 w-32 ${img>=20?"bg-green-500":img>=10?"bg-yellow-500":"bg-white"} border-2 rounded flex items-center justify-center`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(i)}
                    >
                        {
                            img?(<img className="h-24 w-24" src={`img/brainrot/${img%10}.jpg`} />):(<span className="text-[16px] font-light">Alomani {i%5+1}</span>)
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
                        <img key={i} className="h-32 w-32 object-stretch" src={imgSrc} alt={`Alomani ${i+1}`} draggable onDragStart={() => setDraggedImage(i+1)} />
                    )
                })}
            </div>
        </div>
    );
}