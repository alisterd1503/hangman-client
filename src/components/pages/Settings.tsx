import { Stack, Tooltip, Typography } from "@mui/material";
import muteIcon from '../../images/mute.png';
import volumeUp from '../../images/volumeUp.png'
import volumeDown from '../../images/volumeDown.png'
import { clickSound } from "../sounds/clickSXF";
import { CustomSlider } from "../functions/customSlider";
import { getCountryByTimeZone } from "../functions/getLocation";
import { SetStateAction, useEffect, useState } from "react";
import { updateName } from "../../api/updateName";
import { updatePassword } from "../../api/updatePassword";
import nameIcon from "../../images/name.png"
import passwordIcon from "../../images/password.png"
import { getUserId } from "../../api/getUserId";

const location: string = getCountryByTimeZone();
const primaryColour = "#FF8343";

type NewName = {
    id: number,
    newName: string,
}

type NewPassword = {
    id: number,
    newPassword: string,
}


type SettingsProps = {
    volume: number;
    mute: boolean;
    setVolume: (volume: number) => void;
    setMute: (mute: boolean) => void;
}

export function Settings({
    volume,
    mute,
    setVolume,
    setMute
}: SettingsProps) {

    const [currentUser, setCurrentUser] = useState<string | null>(null)
    const [currentUserId, setCurrentUserId] = useState<number | null>(null)
    const [input, setInput] = useState("");
    const [inputType, setInputType] = useState<"username" | "password" | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('currentUser');
        if (currentUser) {
            setCurrentUser(savedUser);
            const fetchUserId = async () => {
                const data = await getUserId(currentUser);
                setCurrentUserId(data);
            };
    
        fetchUserId();
        }
      }, []);

    // Handle volume change
    const handleChange = (_event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setVolume(newValue);
        }
    };

    // Toggle mute state
    const toggleMute = () => {
        clickSound()
        setMute(!mute);
    }

    const handleInputChange = (event: { target: { value: SetStateAction<string> } }) => {
        setInput(event.target.value);
    };

    // Handle updating username
    const updateUsername = async () => {
        if (currentUserId !== null && input) {
            const body: NewName = { newName: input, id: currentUserId };
            await updateName(body);
            setInput("");
            setInputType(null);
        }
    };

    // Handle updating password
    const updateUserPassword = async () => {
        if (currentUserId !== null && input) {
            const body: NewPassword = { newPassword: input, id: currentUserId };
            await updatePassword(body);
            setInput("");
            setInputType(null);
        }
    };

    const handleUpdateClick = () => {
        clickSound()
        if (inputType === "username") updateUsername();
        if (inputType === "password") updateUserPassword();
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            marginBottom: "30px",
        }}>
            <Typography variant="h1" style={{ marginBottom: "60px", fontFamily: "'Indie Flower', cursive", fontWeight: "bold", fontSize: "8rem" }}>
                Settings
            </Typography>

            <Stack
                direction="column"
                spacing={4}
                sx={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                }}
            >
                {/* Profile section */}
                {currentUser && (
                    <Stack
                        direction="column"
                        spacing={1}
                        sx={{
                            justifyContent: "center",
                            alignItems: "flex-start",
                            border: "solid black 5px",
                            borderStyle: "dashed",
                            padding: "20px",
                            borderRadius: "10px",
                        }}
                    >
                        <Typography variant="h2" style={{ fontFamily: "'Indie Flower', cursive", fontWeight: "bold" }}>
                            Profile
                        </Typography>
                        <hr style={{ border: 'none', height: '2px', backgroundColor: 'black', width: '100%', marginTop: -10, marginBottom: 10 }} />
                        <Typography variant="h3" style={{ fontFamily: "'Indie Flower', cursive", fontWeight: "bold" }}>
                                username: {currentUser}
                        </Typography>
                        <Typography variant="h3" style={{ fontFamily: "'Indie Flower', cursive", fontWeight: "bold" }}>
                                location: {location}
                        </Typography>

                        <Stack
                        direction="row"
                        spacing={3}
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: "30px"
                        }}
                    >
                        <Tooltip
                            title="edit name"
                            placement="bottom"
                            slotProps={{
                                tooltip: {
                                    sx: {
                                        color: 'black',
                                        backgroundColor: 'transparent',
                                        fontSize:'30px',
                                        fontWeight: 'bold',
                                        fontFamily: "'Indie Flower', cursive"
                                    },
                                },
                            }}
                        >
                        <img
                        src={nameIcon}
                        alt="Home"
                        onClick={() => {clickSound(),setInputType("username")}}
                        style={{
                            width: '50px',
                            height: '50px',
                            cursor: 'pointer',
                            transition: 'transform 0.3s, opacity 0.3s',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                            e.currentTarget.style.opacity = '0.8';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.opacity = '1';
                        }}
                        />
                        </Tooltip>

                        <Tooltip
                            title="edit password"
                            placement="bottom"
                            slotProps={{
                                tooltip: {
                                    sx: {
                                        color: 'black',
                                        backgroundColor: 'transparent',
                                        fontSize:'30px',
                                        fontWeight: 'bold',
                                        fontFamily: "'Indie Flower', cursive"
                                    },
                                },
                            }}
                        >
                        <img
                        src={passwordIcon}
                        alt="Home"
                        onClick={() => {clickSound(),setInputType("password")}}
                        style={{
                            width: '50px',
                            height: '50px',
                            cursor: 'pointer',
                            transition: 'transform 0.3s, opacity 0.3s',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                            e.currentTarget.style.opacity = '0.8';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.opacity = '1';
                        }}
                        />
                        </Tooltip>

                        <div style={{height:"55px", width: "335px"}}>
                        {inputType && (
                            <Stack direction="row" spacing={2} sx={{ justifyContent: "center", alignItems: "center", height: "55px" }}>
                                <input
                                    onChange={handleInputChange}
                                    value={input}
                                    type={"text"}
                                    id="standard-basic"
                                    placeholder={
                                        inputType === "username"
                                            ? "New Username"
                                            : "New Password"
                                    }
                                    autoComplete="off"
                                    style={{
                                        width: '200px',
                                        height: '50px',
                                        border: 'none',
                                        borderBottom: '2px solid black',
                                        fontFamily: "'Indie Flower', cursive",
                                        fontSize: "2rem",
                                        fontWeight: "bold",
                                        background: 'none',
                                        textAlign: 'center',
                                    }}
                                    onFocus={(event) => {
                                        event.target.style.outline = `none`;
                                        event.target.style.borderBottom = `2px solid ${primaryColour}`;
                                        event.target.placeholder = '';
                                    }}
                                    onBlur={(event) => {
                                        event.target.style.borderBottom = '2px solid black';
                                        event.target.placeholder = 'Enter Value';
                                    }}
                                />

                                <span
                                    onClick={handleUpdateClick}
                                    style={{
                                        color: "green",
                                        display: "inline-block",
                                        fontSize: "2rem",
                                        height: "65px",
                                        fontFamily: "'Indie Flower', cursive",
                                        fontWeight: "bold",
                                        cursor: "pointer",
                                        transition: "transform 0.3s, background-color 0.3s",
                                        marginTop: "40px"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = 'darkgreen',
                                        e.currentTarget.style.transform = 'scale(1.1)'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = 'green',
                                        e.currentTarget.style.transform = 'scale(1)'
                                    }}
                                    >
                                    UPDATE
                                </span>
                            </Stack>
                        )}
                        </div>
                        </Stack>
                    </Stack>
                )}

                {/* Volume section */}
                <Stack
                    direction="column"
                    spacing={0.5}
                    sx={{
                        justifyContent: "center",
                        alignItems: "flex-start",
                        border: "solid black 5px",
                        borderStyle: "dashed",
                        padding: "20px",
                        borderRadius: "10px"
                    }}
                >
                    {/* Volume Slider Stack */}

                    <Typography variant="h2" style={{ fontFamily: "'Indie Flower', cursive", fontWeight: "bold" }}>
                        Volume Control
                    </Typography>
                    <hr style={{ border: 'none', height: '2px', backgroundColor: 'black', width: '100%', marginTop: -10, marginBottom: 10 }} />
                    <Stack
                        spacing={2}
                        direction="row"
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 4,
                            backgroundColor: 'transparent',
                            borderRadius: '50px',
                        }}
                    >
                        <Typography variant="h2" style={{ fontFamily: "'Indie Flower', cursive", fontWeight: "bold" }}>
                            volume
                        </Typography>
                        <img
                            src={volumeDown}
                            alt={'volume Down'}
                            style={{
                                opacity: '0.8',
                                width: '30px',
                                height: '30px',
                                transition: 'transform 0.3s, opacity 0.3s',
                        }}/>
                        <CustomSlider
                            aria-label="Volume"
                            value={volume}
                            onChange={handleChange}
                            min={0}
                            max={100}
                            sx={{ width: 200 }}
                        />
                        <img
                            src={volumeUp}
                            alt={'volume Up'}
                            style={{
                                opacity: '0.8',
                                width: '30px',
                                height: '30px',
                                transition: 'transform 0.3s, opacity 0.3s',
                        }}/>
                    </Stack>
        
                    {/* Mute Stack */}
                    <Stack 
                        spacing={2} 
                        direction="row" 
                        sx={{ 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            mb: 1 
                        }}
                    >
                        <Typography variant="h2" style={{ margin: 0, fontFamily: "'Indie Flower', cursive", fontWeight: "bold" }}>
                            mute
                        </Typography>
                        <img
                            src={mute ? volumeUp : muteIcon}
                            alt={mute ? "mute" : "unmute"}
                            onClick={toggleMute}
                            style={{
                                width: '40px',
                                height: '40px',
                                cursor: 'pointer',
                                transition: 'transform 0.3s, opacity 0.3s',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.1)';
                                e.currentTarget.style.opacity = '0.8';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.opacity = '1';
                            }}
                        />
                    </Stack>

                </Stack>
            </Stack>

        </div>
    );
    
}
