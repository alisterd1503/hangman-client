import { Tooltip } from '@mui/material'
import { clickSound } from '../sounds/clickSXF'
import { SetStateAction } from 'react';

type Page = 'home' | 'settings' | 'leaderboard' | 'login' | 'game' | 'register' | 'records' | 'admin' | 'rules';

type UseIconProps = {
    iconImage: string,
    title: Page,
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
    left?: string
    right?: string
    bottom?: string
    top?: string
    size?: string
    name?: string
    setCurrentPage: React.Dispatch<SetStateAction<Page>>
    customFunc?: () => void
}

export function UseIcon({
    iconImage,
    title,
    placement,
    right,
    left,
    bottom,
    top,
    size,
    setCurrentPage,
    name,
    customFunc,
}: UseIconProps) {
    const handleClick = (page: Page) => {
        if (customFunc) {
            customFunc();
        } else {
            setCurrentPage(page);
        }
    };
    return (
        <div>
            <Tooltip
                title={name ? name : title}
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
            draggable={false}
            onClick={() => {clickSound(),handleClick(title)}}
            style={{
                position: 'absolute',
                opacity: '0.4',
                bottom: bottom,
                left: left,
                right: right,
                top: top,
                width: size ? size :  "80px",
                height: size ? size :  "80px",
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