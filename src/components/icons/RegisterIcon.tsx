import registerIcon from '../../images/register.png'
import { clickSound } from '../functions/clickSXF'

type RegisterIconProps = {
    RegisterScreen: () => void,
}

export function RegisterIcon ({
    RegisterScreen
}: RegisterIconProps) {
    return (
        <div>
            <img
            src={registerIcon}
            alt="Home"
            onClick={() => {clickSound(),RegisterScreen()}}
            style={{
                position: 'absolute',
                bottom: '0px',
                right: '20px',
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