import { Stack, Typography } from '@mui/material'
import appleIcon from '../../images/apple.png'

type PointsProps = {
    usersPoints: number,
    pointsToShow: number | null,
}

export function Points({
    usersPoints,
    pointsToShow
}: PointsProps) {
    return (
        <div style={{ bottom: '20px', right: '20px', position: 'absolute' }}>
            <Stack direction="row" justifyContent="center" alignItems="flex-center">

                {pointsToShow !== null && (
                    <div
                    style={{
                        fontSize: "3rem",
                        fontFamily: "'Indie Flower', cursive",
                        fontWeight: "bold",
                        color: pointsToShow > 0 ? 'green' : 'red',
                        transition: 'opacity 1s ease, transform 1s ease',
                        opacity: pointsToShow !== null ? 1 : 0,
                        transform: pointsToShow !== null ? 'translateY(-20px)' : 'translateY(0)',
                    }}
                    >
                    {pointsToShow > 0 ? '+' : null}{pointsToShow}
                    </div>
                )}

                <Typography
                    style={{
                    fontSize: "5rem",
                    fontFamily: "'Indie Flower', cursive",
                    fontWeight: "bold",
                    marginTop: "20px"
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