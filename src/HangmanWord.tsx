type HangmanWordProps = {
    guessedLetters: string[]
    chosenWord: string
    reveal?: boolean
}

export function HangmanWord({guessedLetters, chosenWord, reveal=false}:
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
                            color: !guessedLetters.includes(letter) && reveal ? "red" : "black"
                        }}
                >
                    {letter}</span>
                 </span>
            ))}
        </div>
    )
}