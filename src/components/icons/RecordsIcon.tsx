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
            <img
            src={recordsIcon}
            alt="Records"
            onClick={() => {clickSound(),RecordsScreen()}}
            style={{
                position: 'absolute',
                bottom: '20px',
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