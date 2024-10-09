import { Stack, Typography } from '@mui/material'
import appleIcon from '../../images/apple.png'

type PointsProps = {
    usersPoints: number
}

export function Points({
    usersPoints
}: PointsProps) {
    return (
        <div style={{ bottom: '20px', right: '20px', position: 'absolute' }}>
            <Stack direction="row" justifyContent="center" alignItems="flex-center">
            <Typography
                style={{
                fontSize: "5rem",
                fontFamily: "'Indie Flower', cursive",
                fontWeight: "bold",
                }}
            >
                {usersPoints}
            </Typography>
            <img
                src={appleIcon}
                alt="Points"
                style={{
                width: '80px',
                height: '80px',
                marginTop: '15px',
                }}
            />
            </Stack>
        </div>
    )
}