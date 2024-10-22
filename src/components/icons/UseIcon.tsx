import { Tooltip } from '@mui/material'
import { clickSound } from '../sounds/clickSXF'

type UseIconProps = {
    navigateTo: () => void,
    iconImage: string,
    title: string,
    placement?: 
        | 'bottom-end' 
        | 'bottom-start' 
        | 'bottom' 
        | 'left-end' 
        | 'left-start' 
        | 'left' 
        | 'right-end' 
        | 'right-start' 
        | 'right' 
        | 'top-end' 
        | 'top-start' 
        | 'top';
    left?: number
    right?: number
    bottom?: number
    top?: number
}

export function UseIcon({
    navigateTo,
    iconImage,
    title,
    placement,
    right,
    left,
    bottom,
    top
}: UseIconProps) {
    return (
        <div>
            <Tooltip
                title={title}
                placement={placement}
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
            src={iconImage}
            alt={title}
            onClick={() => {clickSound(),navigateTo()}}
            style={{
                position: 'absolute',
                opacity: '0.4',
                bottom: bottom,
                left: left,
                right: right,
                top: top,
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