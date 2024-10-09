type WrongGuessesProps = {
    incorrectGuesses: string[]
}

export function WrongGuesses({
    incorrectGuesses
}: WrongGuessesProps) {
    return (
        <div className="guessed-letters">
            {incorrectGuesses.map((letter, index) => (
            <span key={index} style={{ marginRight: '1rem' }}>
                {letter}
            </span>
            ))}
        </div>
    )

}
