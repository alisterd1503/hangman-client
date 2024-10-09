import homeIcon from '../../images/home.png'

type HomeIconProps = {
    homeScreen: () => void,
}

export function HomeIcon({
    homeScreen
}: HomeIconProps) {
    return (
        <div>
            <img
            src={homeIcon}
            alt="Home"
            onClick={homeScreen}
            style={{
                position: 'absolute',
                bottom: '40px',
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
    )
}