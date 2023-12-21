import './styles.css';
import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';

const ButonIcon = () => {
    return (
        <div className='btn-container'>
            <button className="btn btn-primary">
                <h6>Inicia agora sua busca</h6>
            </button>
            <div className='btn-icon-container'>
                <ArrowIcon />
            </div>
        </div>

    );
}

export default ButonIcon;