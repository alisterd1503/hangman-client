import settingsIcon from '../../images/settings.png'
import { clickSound } from '../sounds/clickSXF'

type SettingsIconProps = {
    settingsScreen: () => void,
}

export function SettingsIcon({
    settingsScreen
}: SettingsIconProps) {
    return (
        <div>
            <img
            src={settingsIcon}
            alt="Settings"
            onClick={() => {clickSound(),settingsScreen()}}
            style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
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
        </div>
    )
}