import img1 from './images/img1.png';
import img2 from './images/img2.png';
import img3 from './images/img3.png';
import img4 from './images/img4.png';
import img5 from './images/img5.png';
import img6 from './images/img6.png';
import img7 from './images/img7.png';
import img8 from './images/img8.png';
import img9 from './images/img9.png';
import img10 from './images/img10.png';

type HangmanDrawingProps = {
    numOfGuesses: number
}

const IMAGES = [
    img1,img2,img3,img4,img5,img6,img7,img8,img9,img10
]

export function HangmanDrawing({ numOfGuesses }: HangmanDrawingProps) {
    return (
        <div 
            style={{ 
                position: "relative", 
                height: "400px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            {IMAGES.slice(0, numOfGuesses).map((imgSrc, index) => (
                <img 
                    key={index} 
                    src={imgSrc} 
                    alt={`hangman-stage-${index}`} 
                    style={{ 
                        position: 'absolute',
                        maxWidth: "200px",
                        left: "50%",
                        transform: "translateX(-50%)" 
                    }}
                />
            ))}
        </div>
    )
}
