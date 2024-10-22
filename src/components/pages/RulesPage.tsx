import { Typography, Stack } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import StyledCard from "../reusable/StyledCard"

const secondaryColor = "#F7F6F2"
const thirdColor =  "#D1BB9E"

const arrowStyles: React.CSSProperties = {
    position: 'absolute',
    zIndex: 2,
    top: '53%',
    fontSize: '4rem',
    color: 'black',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transform: 'translateY(-50%)',
};

export function Rules() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: '100%',
                marginBottom: '40px'
            }}
        >
            <Typography variant="h1" style={{ 
                fontFamily: "'Indie Flower', cursive", 
                fontWeight: "bold", 
                fontSize: "8rem",
                textAlign: "center"
            }}>
                Rules
            </Typography>

            <Stack style={{width: "75%", height: "650px"}}>
                <Carousel
                    showArrows={true}
                    showThumbs={false}
                    infiniteLoop={true}
                    autoPlay={false}
                    interval={5000}
                    showStatus={false}
                    swipeable={true}
                    renderArrowPrev={(onClickHandler, hasPrev) =>
                        hasPrev && (
                            <button type="button" onClick={onClickHandler} style={{ ...arrowStyles, left: 25 }}>
                                &#10094;
                            </button>
                        )
                    }
                    renderArrowNext={(onClickHandler, hasNext) =>
                        hasNext && (
                            <button type="button" onClick={onClickHandler} style={{ ...arrowStyles, right: 25 }}>
                                &#10095;
                            </button>
                        )
                    }
                >
                    <div>
                        <StyledCard title="Game Objective" padding="20px" marginBottom="50px">
                            <Typography style={{ fontSize: "1.5rem", fontFamily: "'Indie Flower', cursive", width:"90%" }}>
                                The objective of Hangman is to guess the secret word by suggesting letters within a certain number of guesses. 
                                Each letter you guess that is not in the word will bring you closer to losing the game, so choose wisely!
                            </Typography>
                        </StyledCard>

                        <StyledCard title="How to Play" padding="20px">
                                <Typography variant="body1" style={{ fontSize: "1.5rem", fontFamily: "'Indie Flower', cursive", textAlign: "left", width: "90%", marginLeft: "150px"}}>
                                    1. A random word is chosen and displayed as dashes.
                                    <br />
                                    2. Guess letters one by one, or try guessing the whole word.
                                    <br />
                                    3. Correct guesses reveal the letters or the entire word.
                                    <br />
                                    4. Incorrect guesses draw parts of the hangman.
                                    <br />
                                    5. Win by guessing the word before the hangman is complete.
                                </Typography>
                        </StyledCard>
                    </div>

                    <div>
                        <StyledCard title="Game Objective" padding="20px" marginBottom="50px">
                            <Stack
                            spacing={2}
                            direction="row"
                            useFlexGap
                            sx={{ flexWrap: 'wrap', width: "100%", justifyContent: "center", alignItems: "center", padding: "20px" }}
                            >
                                <Stack direction="column" spacing={0} style={{border: "solid black 5px", width:"450px", height: "200px", justifyContent: "center", alignItems: "center",borderRadius: "10px", backgroundColor: thirdColor}}>
                                    <Typography style={{fontSize: "2rem", fontFamily: "'Indie Flower', cursive", fontWeight: "bold", borderBottom: "solid black 5px", width: "100%", height: "60px", backgroundColor: secondaryColor }}>For each correct letter:</Typography>
                                    <Stack>
                                        <Typography variant="body1" style={{ fontSize: "1.8rem", fontFamily: "'Indie Flower', cursive", textAlign:"left", backgroundColor: thirdColor, width: "100%"}}>
                                            Easy: 10 points<br/>
                                            Medium: 15 points<br/>
                                            Hard: 20 points
                                        </Typography>
                                    </Stack>
                                </Stack>

                                <Stack direction="column" spacing={0} style={{border: "solid black 5px", width:"450px", height: "200px", justifyContent: "center", alignItems: "center",borderRadius: "10px", backgroundColor: thirdColor}}>
                                    <Typography style={{fontSize: "2rem", fontFamily: "'Indie Flower', cursive", fontWeight: "bold", borderBottom: "solid black 5px", width: "100%", height: "60px", backgroundColor: secondaryColor }}>For each incorrect letter:</Typography>
                                    <Stack>
                                        <Typography variant="body1" style={{ fontSize: "1.8rem", fontFamily: "'Indie Flower', cursive", textAlign:"left", backgroundColor: thirdColor, width: "100%"}}>
                                            Easy: -2 points<br/>
                                            Medium: -4 points<br/>
                                            Hard: -6 points
                                        </Typography>
                                    </Stack>
                                </Stack>

                                <Stack direction="column" spacing={0} style={{border: "solid black 5px", width:"450px", height: "200px", justifyContent: "center", alignItems: "center",borderRadius: "10px", backgroundColor: thirdColor}}>
                                    <Typography style={{fontSize: "2rem", fontFamily: "'Indie Flower', cursive", fontWeight: "bold", borderBottom: "solid black 5px", width: "100%", height: "60px", backgroundColor: secondaryColor }}>Bonus points for word completion:</Typography>
                                    <Stack>
                                        <Typography variant="body1" style={{ fontSize: "1.8rem", fontFamily: "'Indie Flower', cursive", textAlign:"left", backgroundColor: thirdColor, width: "100%"}}>
                                            Easy: 20 points<br/>
                                            Medium: 30 points<br/>
                                            Hard: 40 points
                                        </Typography>
                                    </Stack>
                                </Stack>

                                <Stack direction="column" spacing={0} style={{border: "solid black 5px", width:"450px", height: "200px", justifyContent: "center", alignItems: "center",borderRadius: "10px", backgroundColor: thirdColor}}>
                                    <Typography style={{fontSize: "2rem", fontFamily: "'Indie Flower', cursive", fontWeight: "bold", borderBottom: "solid black 5px", width: "100%", height: "60px", backgroundColor: secondaryColor }}>Penalty for failed word guess:</Typography>
                                    <Stack>
                                        <Typography variant="body1" style={{ fontSize: "1.8rem", fontFamily: "'Indie Flower', cursive", textAlign:"left", backgroundColor: thirdColor, width: "100%"}}>
                                            Easy: -10 points<br/>
                                            Medium: -15 points<br/>
                                            Hard: -20 points
                                        </Typography>
                                    </Stack>
                                </Stack>
                            
                            </Stack>
                        </StyledCard>
                    </div>
                </Carousel>
            </Stack>
        </div>
    );
}
