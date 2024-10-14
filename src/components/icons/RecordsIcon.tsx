import { Tooltip } from '@mui/material'
import recordsIcon from '../../images/records.png'
import { clickSound } from '../sounds/clickSXF'

type RecordsIconProps = {
    RecordsScreen: () => void,
}

export function RecordsIcon ({
    RecordsScreen
}: RecordsIconProps) {
    return (
        <div>
            <Tooltip
                title="History"
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
            src={recordsIcon}
            alt="Records"
            onClick={() => {clickSound(),RecordsScreen()}}
            style={{
                position: 'absolute',
                opacity: '0.4',
                bottom: '0px',
                right: '20px',
                width: '100px',
                height: '100px',
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