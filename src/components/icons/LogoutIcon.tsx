import { Tooltip } from '@mui/material';
import logoutIcon from '../../images/logout.png';
import { clickSound } from '../sounds/clickSXF'

export function LogoutIcon() {

    const clearLocalStorage = () => {
        clickSound()
        localStorage.removeItem('token');
        window.location.href = window.location.href;
    };

    return (
        <>
            <div>
                <Tooltip
                    title="logout"
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
                    src={logoutIcon}
                    alt="Logout"
                    onClick={clearLocalStorage}
                    style={{
                        position: 'absolute',
                        opacity: 0.4,
                        bottom: '0px',
                        left: '20px',
                        width: '90px',
                        height: '90px',
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
        </>
    );
}
