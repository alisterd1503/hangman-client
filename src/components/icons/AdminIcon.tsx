import { Tooltip } from '@mui/material'
import adminIcon from '../../images/admin.png'
import { clickSound } from '../sounds/clickSXF'

type AdminIconProps = {
    AdminScreen: () => void,
}

export function AdminIcon({
    AdminScreen
}: AdminIconProps) {
    return (
        <div>
            <Tooltip
                title="admin"
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
            src={adminIcon}
            alt="Admin"
            onClick={() => {clickSound(),AdminScreen()}}
            style={{
                position: 'absolute',
                top: '120px',
                left: '5px',
                width: '95px',
                height: '95px',
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