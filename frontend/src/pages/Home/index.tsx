import { ReactComponent as MainImage } from 'assets/images/main-image.svg';
import Navbar from "components/Navbar";
import './styles.css';
import ButonIcon from 'components/ButonIcon';

const Home = () => {
    return (
        <>
            <Navbar />
            <div className="home-container">
                <div className="home-card">
                    <div className="home-content-container">
                        <div>
                            <h1>Conheça o melhor catálago de conteúdo</h1>
                            <p>Ajudaremos você a encontrar os melhores produtos disponíveis no mercado.</p>
                        </div>
                        <ButonIcon />
                    </div>
                    <div className="home-image-container">
                        <MainImage />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;