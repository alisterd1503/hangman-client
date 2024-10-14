import { Tooltip } from '@mui/material'
import leaderboardIcon from '../../images/leaderboard.png'
import { clickSound } from '../sounds/clickSXF'

type LeaderboardIconProps = {
    LeaderboardScreen: () => void,
}

export function LeaderboardIcon ({
    LeaderboardScreen
}: LeaderboardIconProps) {
    return (
        <div>
            <Tooltip
                title="leaderboard"
                placement="left"
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
            src={leaderboardIcon}
            alt="Leaderboard"
            onClick={() => {clickSound(),LeaderboardScreen()}}
            style={{
                position: 'absolute',
                opacity: '0.4',
                top: '0px',
                right: '20px',
                width: '110px',
                height: '110px',
                cursor: 'pointer',
                transition: 'transform 0.3s, opacity 0.3s',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.opacity = '0.4';
            }}
            />
            </Tooltip>
        </div>
    )
}