import { Box, IconButton, Slider, Stack, Typography } from "@mui/material";
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { VolumeOff } from "@mui/icons-material";

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

    const handleChange = (_event: Event, newValue: number | number[]) => {
        setVolume(newValue as number);
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "40vh"
        }}>
            <Typography variant="h1" style={{ marginBottom: "40px", fontFamily: "'Indie Flower', cursive", fontWeight: "bold", fontSize: "8rem" }}>
                Settings
            </Typography>

            <Box sx={{ width: 400 }}>
                <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
                    <VolumeDown />
                    <Slider
                        aria-label="Volume"
                        value={volume}
                        onChange={handleChange}
                        min={0}
                        max={100}
                    />
                    <VolumeUp />
                    <IconButton onClick={() => setMute(!mute)}>
                        {mute ? <VolumeOff /> : <VolumeUp />}
                    </IconButton>
                </Stack>
            </Box>
        </div>
    );
}