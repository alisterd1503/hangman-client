import leaderboardIcon from '../../images/leaderboard.png'
import { clickSound } from '../functions/clickSXF'

type LeaderboardIconProps = {
    LeaderboardScreen: () => void,
}

export function LeaderboardIcon ({
    LeaderboardScreen
}: LeaderboardIconProps) {
    return (
        <div>
            <img
            src={leaderboardIcon}
            alt="Leaderboard"
            onClick={() => {clickSound(),LeaderboardScreen()}}
            style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
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
        </div>
    )
}