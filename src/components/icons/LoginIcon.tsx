import { Tooltip } from '@mui/material'
import loginIcon from '../../images/login.png'
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
            src={loginIcon}
            alt="Home"
            onClick={() => {clickSound(),LoginScreen()}}
            style={{
                position: 'absolute',
                opacity: '0.4',
                bottom: '0px',
                right: '20px',
                width: '120px',
                height: '120px',
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