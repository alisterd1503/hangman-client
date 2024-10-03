type HangmanWordProps = {
    guessedLetters: string[]
    chosenWord: string
    reveal?: boolean
    isWinner?: boolean
}

export function HangmanWord({guessedLetters, chosenWord, reveal=false, isWinner=false}:
HangmanWordProps) {
    return (
        <div 
            style={{ 
                display: "flex", 
                gap: ".25rem", 
                fontSize: "3rem", 
                fontWeight: "bold",
                textTransform: "uppercase",
                fontFamily: "monospace",
            }}
        >
            {chosenWord.split("").map((letter, index) => (
                <span style={{ borderBottom: ".1em solid black" }} key={index}>
                    <span
                        style={{
                            visibility: guessedLetters.includes(letter) || reveal
                            ? "visible" 
                            : "hidden",
                            color: isWinner ? "black" : (!guessedLetters.includes(letter) && reveal ? "red" : "black")
                        }}
                >
                    {letter}</span>
                 </span>
            ))}
        </div>
    )
}