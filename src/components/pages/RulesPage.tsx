import { Typography, Stack } from "@mui/material";
//import background from '../../images/rulesbg.png';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const arrowStyles: React.CSSProperties = {
    position: 'absolute',
    zIndex: 2,
    top: '48%',
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
                marginBottom: '90px'
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

            <Stack style={{width: "75%", height: "600px"}}>
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
                    <div style={{height: "650px"}}>
                    <Stack
                        direction="column"
                        spacing={0}
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: "30px",
                            border: "dashed black 10px", 
                            borderStyle: "dashed", 
                            borderRadius: "10px", 
                            backgroundColor: '#F0E5CF'
                        }}
                    >
                            <Typography variant="h3" style={{ padding: "5px", borderBottom:"solid black 5px", width: "100%", height: "70px",fontWeight: "bold", fontFamily: "'Indie Flower', cursive", marginBottom: "20px", backgroundColor: "#F7F6F2"}}>
                                Game Objective
                            </Typography>
                            <Typography style={{ marginBottom: "20px", fontSize: "1.5rem", fontFamily: "'Indie Flower', cursive", width:"90%" }}>
                                The objective of Hangman is to guess the secret word by suggesting letters within a certain number of guesses. 
                                Each letter you guess that is not in the word will bring you closer to losing the game, so choose wisely!
                            </Typography>
                        </Stack>

                        <Stack   
                            direction="column"
                            spacing={2}
                            sx={{
                                justifyContent: "center",
                                alignItems: "center",
                                marginBottom: "10px",
                                border: "dashed black 10px", 
                                borderStyle: "dashed", 
                                borderRadius: "10px", 
                                backgroundColor: '#F0E5CF'
                            }}
                        >
                            <Typography variant="h3" style={{ padding: "5px", borderBottom:"solid black 5px", width: "100%", height: "70px",fontWeight: "bold", fontFamily: "'Indie Flower', cursive", marginBottom: "10px", backgroundColor: "#F7F6F2"}}>
                                How to Play
                            </Typography>
                            <Typography variant="body1" style={{ marginBottom: "20px", fontSize: "1.5rem", fontFamily: "'Indie Flower', cursive", textAlign: "left", width: "70%", marginLeft: "150px"}}>
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
                        </Stack>
                    </div>

                    <div style={{height: "650px"}}>
                        <Stack
                            direction="column"
                            spacing={2}
                            sx={{
                                justifyContent: "center",
                                alignItems: "center",
                                fontFamily: "'Indie Flower', cursive",
                                marginBottom: "10px",
                                border: "dashed black 10px", 
                                borderStyle: "dashed", 
                                borderRadius: "10px", 
                                backgroundColor: '#F0E5CF',
                                paddingBottom: "20px"
                            }}
                        >
                            <Typography variant="h3" style={{ padding: "5px", borderBottom:"solid black 5px", width: "100%", height: "70px",fontWeight: "bold", fontFamily: "'Indie Flower', cursive", backgroundColor: "#F7F6F2"}}>
                                Scoring System
                            </Typography>
                            <Stack
                            spacing={2}
                            direction="row"
                            useFlexGap
                            sx={{ flexWrap: 'wrap', width: "100%", justifyContent: "center", alignItems: "center", padding: "20px" }}
                            >
                                <Stack direction="column" spacing={0} style={{border: "solid black 5px", width:"450px", height: "200px", justifyContent: "center", alignItems: "center",borderRadius: "10px", backgroundColor: "#D1BB9E"}}>
                                    <Typography style={{fontSize: "2rem", fontFamily: "'Indie Flower', cursive", fontWeight: "bold", borderBottom: "solid black 5px", width: "100%", height: "60px", backgroundColor: "#F7F6F2" }}>For each correct letter:</Typography>
                                    <Stack>
                                        <Typography variant="body1" style={{ fontSize: "1.8rem", fontFamily: "'Indie Flower', cursive", textAlign:"left", backgroundColor: "#D1BB9E", width: "100%"}}>
                                            Easy: 10 points<br/>
                                            Medium: 15 points<br/>
                                            Hard: 20 points
                                        </Typography>
                                    </Stack>
                                </Stack>

                                <Stack direction="column" spacing={0} style={{border: "solid black 5px", width:"450px", height: "200px", justifyContent: "center", alignItems: "center",borderRadius: "10px", backgroundColor: "#D1BB9E"}}>
                                    <Typography style={{fontSize: "2rem", fontFamily: "'Indie Flower', cursive", fontWeight: "bold", borderBottom: "solid black 5px", width: "100%", height: "60px", backgroundColor: "#F7F6F2" }}>For each incorrect letter:</Typography>
                                    <Stack>
                                        <Typography variant="body1" style={{ fontSize: "1.8rem", fontFamily: "'Indie Flower', cursive", textAlign:"left", backgroundColor: "#D1BB9E", width: "100%"}}>
                                            Easy: -2 points<br/>
                                            Medium: -4 points<br/>
                                            Hard: -6 points
                                        </Typography>
                                    </Stack>
                                </Stack>

                                <Stack direction="column" spacing={0} style={{border: "solid black 5px", width:"450px", height: "200px", justifyContent: "center", alignItems: "center",borderRadius: "10px", backgroundColor: "#D1BB9E"}}>
                                    <Typography style={{fontSize: "2rem", fontFamily: "'Indie Flower', cursive", fontWeight: "bold", borderBottom: "solid black 5px", width: "100%", height: "60px", backgroundColor: "#F7F6F2" }}>Bonus points for word completion:</Typography>
                                    <Stack>
                                        <Typography variant="body1" style={{ fontSize: "1.8rem", fontFamily: "'Indie Flower', cursive", textAlign:"left", backgroundColor: "#D1BB9E", width: "100%"}}>
                                            Easy: 20 points<br/>
                                            Medium: 30 points<br/>
                                            Hard: 40 points
                                        </Typography>
                                    </Stack>
                                </Stack>

                                <Stack direction="column" spacing={0} style={{border: "solid black 5px", width:"450px", height: "200px", justifyContent: "center", alignItems: "center",borderRadius: "10px", backgroundColor: "#D1BB9E"}}>
                                    <Typography style={{fontSize: "2rem", fontFamily: "'Indie Flower', cursive", fontWeight: "bold", borderBottom: "solid black 5px", width: "100%", height: "60px", backgroundColor: "#F7F6F2" }}>Penalty for failed word guess:</Typography>
                                    <Stack>
                                        <Typography variant="body1" style={{ fontSize: "1.8rem", fontFamily: "'Indie Flower', cursive", textAlign:"left", backgroundColor: "#D1BB9E", width: "100%"}}>
                                            Easy: -10 points<br/>
                                            Medium: -15 points<br/>
                                            Hard: -20 points
                                        </Typography>
                                    </Stack>
                                </Stack>
                            
                            </Stack>


                        </Stack>
                    </div>
                </Carousel>
            </Stack>
        </div>
    );
}
