import '../../styles.css';

type HangmanWordProps = {
    userGuesses: string[]
    chosenWord: string
    reveal?: boolean
    isWinner?: boolean
}

export function HangmanWord({userGuesses, chosenWord, reveal=false, isWinner=false}:
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
                  display: 'inline-block', // Ensure each letter behaves like a block for consistent sizing
                  borderBottom: '0.1em solid black', // Set the bottom border width
                  width: '2.5ch', // Set a fixed width for the letter space
                  textAlign: 'center', // Center align the letter within the span
                  fontFamily: "'Indie Flower', cursive", // Use the custom font
                  fontSize: '3rem', // Set the font size for visibility
                  lineHeight: '1', // Control line height for alignment
                  marginRight: '0.1em', // Add space between letters
                }}
              >
                    <span
                        style={{
                            visibility: userGuesses.includes(letter) || reveal
                            ? "visible" 
                            : "hidden",
                            color: isWinner ? "black" : (!userGuesses.includes(letter) && reveal ? "red" : "black")
                        }}
                >
                    {letter}</span>
                 </span>
            ))}
        </div>
    )
}