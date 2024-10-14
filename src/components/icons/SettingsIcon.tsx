import { Tooltip } from '@mui/material'
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
            <Tooltip
                title="Settings"
                placement="right"
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
            src={settingsIcon}
            alt="Settings"
            onClick={() => {clickSound(),settingsScreen()}}
            style={{
                position: 'absolute',
                opacity: '0.4',
                top: '20px',
                left: '20px',
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
                e.currentTarget.style.opacity = '0.4';
            }}
            />
            </Tooltip>
        </div>
    )
}