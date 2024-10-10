import logoutIcon from '../../images/logout.png';

export function LogoutIcon() {

    const clearLocalStorage = () => {
        localStorage.removeItem('currentUser');
        window.location.href = window.location.href;
    };

    return (
        <>
            <div>
                <img
                    src={logoutIcon}
                    alt="Logout"
                    onClick={clearLocalStorage}
                    style={{
                        position: 'absolute',
                        bottom: '20px',
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
                        e.currentTarget.style.opacity = '1';
                    }}
                />
            </div>
        </>
    );
}
