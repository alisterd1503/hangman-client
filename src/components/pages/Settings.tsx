import { Box, Slider, Stack, Typography } from "@mui/material";
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import muteIcon from '../../images/mute.png';
import unmuteIcon from '../../images/unmute.png';

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
        setMute(!mute);
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "60vh"
        }}>
            <Typography variant="h1" style={{ marginBottom: "40px", fontFamily: "'Indie Flower', cursive", fontWeight: "bold", fontSize: "8rem" }}>
                Settings
            </Typography>

            <Box sx={{ width: 400, display: 'flex', flexDirection: 'column'}}>
                <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 4 }}>
                    <VolumeDown />
                    <Slider
                        aria-label="Volume"
                        value={volume}
                        onChange={handleChange}
                        min={0}
                        max={100}
                    />
                    <VolumeUp />
                </Stack>

                <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
                        <Typography variant="h2" style={{ margin: 0, fontFamily: "'Indie Flower', cursive", fontWeight: "bold" }}>
                            Mute
                        </Typography>
                        <img
                            src={mute ? muteIcon : unmuteIcon}
                            alt={mute ? "Unmute" : "Mute"}
                            onClick={toggleMute}
                            style={{
                                width: '80px',
                                height: '80px',
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
