import './styles.css';

import { Link, useHistory, useLocation } from 'react-router-dom';
import ButtonIcon from 'components/ButonIcon';
import { useForm } from "react-hook-form"
import { useContext, useState } from 'react';
import { AuthContext } from 'AuthContext';
import { requestBackendLogin } from 'util/requests';
import { saveAuthData } from 'util/storage';
import { getTokenData } from 'util/auth';

type FormData = {
    username: string;
    password: string;
}

type LocationState = {
    from: string;
}

const Login = () => {

    const location = useLocation<LocationState>();

    const {from} = location.state || {from: {pathname: '/admin'}};

    const { setAuthContextData } = useContext(AuthContext);

    const [hasError, setHasError] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const history = useHistory();

    const onSubmit = (formData: FormData) => {
        requestBackendLogin(formData)
            .then(response => {
                saveAuthData(response.data);
                setHasError(false);
                setAuthContextData({
                    authenticate: true,
                    tokenData: getTokenData()
                })
                history.replace(from);
            })
            .catch(error => {
                setHasError(true);
                console.log("Erro: ", error);
            })
    };

    return (
        <div className="base-card login-card">
            <h1>LOGIN</h1>
            {hasError &&
                <div className="alert alert-danger">
                    Erro ao fazer login!
                </div>
            }
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <input
                        {...register("username", {
                            required: "E-mail obrigatório",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "E-mail inválido"
                            }
                        })}
                        type="text"
                        className={`form-control base-input ${errors.username ? 'is-invalid' : ''}`}
                        placeholder="Email"
                        name="username"
                    />
                    <div className="invalid-feedback d-block">{errors.username?.message}</div>
                </div>
                <div className="mb-2">
                    <input
                        {...register("password", { required: "Senha obrigatória" })}
                        type="password"
                        className={`form-control base-input ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="Senha"
                        name="password"
                    />
                    <div className="invalid-feedback d-block">{errors.password?.message}</div>
                </div>
                <Link to="/admin/auth/recover" className="login-link-recover">
                    Esqueci a senha
                </Link>
                <div className="login-submit">
                    <ButtonIcon text="entrar" />
                </div>
                <div className="signup-container">
                    <span className="not-registered">Não tem Cadastro?</span>
                    <Link to="/admin/auth/register" className="login-link-register">
                        CADASTRAR
                    </Link>
                </div>
            </form>
        </div>
    );
};


export default Login;