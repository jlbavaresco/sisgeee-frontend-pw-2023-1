import { useState, useEffect } from "react";
import PredioContext from "./PredioContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import { getPrediosAPI, getPredioPorCodigoAPI, deletePredioPorCodigoAPI, cadastraPrediosAPI } from '../../servicos/PredioServico';

function Predio() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "",
        descricao: "", sigla: ""
    });
    const [carregando, setCarrengando] = useState(true);

    const recuperar = async codigo => {
        setObjeto(await getPredioPorCodigoAPI(codigo));
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraPrediosAPI(objeto, metodo);
            setAlerta({status :retornoAPI.status, message : retornoAPI.message});
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch(err){
            console.log(err);
        }
        recuperaPredios();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaPredios = async () => {
        setCarrengando(true);
        setListaObjetos(await getPrediosAPI());
        setCarrengando(false);
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deletePredioPorCodigoAPI(objeto.codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
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
            {!carregando ? <Tabela /> : <Carregando />}
            <Form />
        </PredioContext.Provider>
    )

}

export default Predio;