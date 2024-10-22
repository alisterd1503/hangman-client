import '../../styles.css';

type HangmanWordProps = {
    letterGuesses: string[]
    chosenWord: string
    reveal?: boolean
    isWinner?: boolean
}

export function HangmanWord({letterGuesses, chosenWord, reveal=false, isWinner=false}:
HangmanWordProps) {
    return (
        <div 
            style={{ 
                display: "flex", 
                gap: "1rem", 
                fontSize: "4rem", 
                fontWeight: "bold",
                textTransform: "uppercase",
                fontFamily: "'Indie Flower', cursive",
            }}
        >
            {chosenWord.split("").map((letter, index) => (
                <span
                key={index}
                style={{
                  display: 'inline-block',
                  borderBottom: '0.1em solid black',
                  width: '2.5ch',
                  textAlign: 'center',
                  fontFamily: "'Indie Flower', cursive",
                  fontSize: '3rem',
                  lineHeight: '1',
                  marginRight: '0.1em',
                }}
              >
                    <span
                        style={{
                            visibility: letterGuesses.includes(letter) || reveal
                            ? "visible" 
                            : "hidden",
                            color: isWinner ? "black" : (!letterGuesses.includes(letter) && reveal ? "red" : "black")
                        }}
                >
                    {letter}</span>
                 </span>
            ))}
        </div>
    )
}