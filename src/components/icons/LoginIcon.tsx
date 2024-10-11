import { Tooltip } from '@mui/material'
import personIcon from '../../images/person.png'
import { clickSound } from '../sounds/clickSXF'

type LoginIconProps = {
    LoginScreen: () => void,
}

export function LoginIcon({
    LoginScreen
}: LoginIconProps) {
    return (
        <div>
            <Tooltip
                title="login"
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
            src={personIcon}
            alt="Home"
            onClick={() => {clickSound(),LoginScreen()}}
            style={{
                position: 'absolute',
                bottom: '0px',
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
            </Tooltip>
        </div>
    )
}