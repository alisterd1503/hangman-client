
type PlayAgainProps = {
    resetGame: () => void,
}

export function PlayAgain({
    resetGame
}: PlayAgainProps) {
    return (
        <span
            onClick={resetGame}
            style={{
            display: "inline-block",
            color: "green",
            fontSize: "4rem",
            height: "65px",
            fontFamily: "'Indie Flower', cursive",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "transform 0.3s, background-color 0.3s",
            }}
            onMouseEnter={(e) => {
            e.currentTarget.style.color = 'darkgreen';
            e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
            e.currentTarget.style.color = 'green';
            e.currentTarget.style.transform = 'scale(1)';
            }}
        >
            PLAY AGAIN
        </span>
    )
}