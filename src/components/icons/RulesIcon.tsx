import { Tooltip } from '@mui/material'
import rulesIcon from '../../images/rules.png'
import { clickSound } from '../sounds/clickSXF'

type RulesIconProps = {
    rulesScreen: () => void,
}

export function RulesIcon ({
    rulesScreen
}: RulesIconProps) {
    return (
        <div>
            <Tooltip
                title="Rules"
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
            src={rulesIcon}
            alt="Records"
            onClick={() => {clickSound(),rulesScreen()}}
            style={{
                position: 'absolute',
                opacity: '0.4',
                top: '130px',
                left: '20px',
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