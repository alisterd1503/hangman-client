import { Box, Stack, Typography } from "@mui/material";
import muteIcon from '../../images/mute.png';
import volumeUp from '../../images/volumeUp.png'
import volumeDown from '../../images/volumeDown.png'
import { clickSound } from "../sounds/clickSXF";
import { CustomSlider } from "../functions/customSlider";

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

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "60vh",
            marginBottom: "300px"
        }}>
            <Typography variant="h1" style={{ marginBottom: "100px", fontFamily: "'Indie Flower', cursive", fontWeight: "bold", fontSize: "8rem" }}>
                Settings
            </Typography>
    
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                {/* Volume Slider Stack */}
                <Stack
                    spacing={2}
                    direction="row"
                    sx={{
                        alignItems: 'center',
                        justifyContent: 'center', // Center content in the row
                        mb: 4,
                        padding: '30px',
                        backgroundColor: 'transparent',
                        borderRadius: '50px',
                    }}
                >
                    <img
                        src={volumeDown}
                        alt={'volume Down'}
                        style={{
                            opacity: '0.8',
                            width: '50px',
                            height: '50px',
                            transition: 'transform 0.3s, opacity 0.3s',
                    }}/>
                    <CustomSlider
                        aria-label="Volume"
                        value={volume}
                        onChange={handleChange}
                        min={0}
                        max={100}
                        sx={{ width: 400 }} // Make sure the slider takes up some space
                    />
                    <img
                        src={volumeUp}
                        alt={'volume Up'}
                        style={{
                            opacity: '0.8',
                            width: '50px',
                            height: '50px',
                            transition: 'transform 0.3s, opacity 0.3s',
                    }}/>
                </Stack>
    
                {/* Mute Stack */}
                <Stack 
                    spacing={2} 
                    direction="row" 
                    sx={{ 
                        alignItems: 'center', 
                        justifyContent: 'center', // Center content in the row
                        mb: 1 
                    }}
                >
                    <Typography variant="h2" style={{ margin: 0, fontFamily: "'Indie Flower', cursive", fontWeight: "bold" }}>
                        Mute
                    </Typography>
                    <img
                        src={mute ? volumeUp : muteIcon}
                        alt={mute ? "Mute" : "Unmute"}
                        onClick={toggleMute}
                        style={{
                            width: '60px',
                            height: '60px',
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
            </Box>
        </div>
    );
    
}
