import { Tooltip } from '@mui/material'
import registerIcon from '../../images/register.png'
import { clickSound } from '../sounds/clickSXF'

type RegisterIconProps = {
    RegisterScreen: () => void,
}

export function RegisterIcon ({
    RegisterScreen
}: RegisterIconProps) {
    return (
        <div>
            <Tooltip
                title="Register"
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
            src={registerIcon}
            alt="Home"
            onClick={() => {clickSound(),RegisterScreen()}}
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