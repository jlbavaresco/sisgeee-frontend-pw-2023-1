import { useState, useEffect } from "react";
import PredioContext from "./PredioContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import { getPrediosAPI, getPredioPorCodigoAPI, deletePredioPorCodigoAPI, cadastraPrediosAPI } from '../../servicos/PredioServico';
import WithAuth from "../../seg/WithAuth";
import { useNavigate } from "react-router-dom";

function Predio() {

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "",
        descricao: "", sigla: ""
    });
    const [carregando, setCarrengando] = useState(true);

    const recuperar = async codigo => {
        try {
            setObjeto(await getPredioPorCodigoAPI(codigo));
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraPrediosAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.log(err);
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperaPredios();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaPredios = async () => {
        try {
            setCarrengando(true);
            setListaObjetos(await getPrediosAPI());
            setCarrengando(false);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deletePredioPorCodigoAPI(objeto.codigo);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            } catch (err) {
                window.location.reload();
                navigate("/login", { replace: true });
            }
        }
        recuperaPredios();
    }

    useEffect(() => {
        recuperaPredios();
    }, []);

    return (
        <PredioContext.Provider value={{
            alerta, setAlerta,
            listaObjetos, setListaObjetos,
            recuperaPredios, remover,
            objeto, setObjeto,
            editar, setEditar,
            recuperar, acaoCadastrar, handleChange
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Form />
        </PredioContext.Provider>
    )

}

export default WithAuth(Predio);