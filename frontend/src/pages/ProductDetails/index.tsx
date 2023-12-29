import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import ProductPrice from 'components/ProductPrice';

import './styles.css';
import { Link } from 'react-router-dom';

const ProductDetails = () => {
    return (
        <div className="product-details-content">
            <div className="base-card product-details-card">
                <Link to="/products">
                    <div className="goback-container">
                        <ArrowIcon />
                        <h2>VOLTAR</h2>
                    </div>
                </Link>
                <div className="row">
                    <div className="col-xl-6">
                        <div className="img-container">
                            <img src="https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/1-big.jpg" alt="Nome do produto" />
                        </div>
                        <div className="name-price-container">
                            <h1>Nome do produto</h1>
                            <ProductPrice price={222.22} />
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="description-container">
                            <h2>Descroção do produto</h2>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum voluptas iusto aperiam sit consectetur maiores aspernatur. Rem reprehenderit voluptate dolorem odit ipsa culpa dolores eos! Mollitia id ab suscipit aut.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;