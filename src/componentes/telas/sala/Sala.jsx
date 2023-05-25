import { useState, useEffect } from "react";
import SalaContext from "./SalaContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import { getPrediosAPI } from '../../servicos/PredioServico';
import { getSalasAPI, getSalaPorCodigoAPI, deleteSalaPorCodigoAPI, cadastraSalasAPI } from '../../servicos/SalaServico'
import {
    getEquipamentosDaSalaAPI, getEquipamentoPorCodigoAPI,
    deleteEquipamentoPorCodigoAPI, cadastraEquipamentosAPI
} from '../../servicos/EquipamentoServico';
import FormEquipamento from "./FormEquipamento";
import TabelaEquipamentos from "./TabelaEquipamentos";
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
    const [listaPredios, setListaPredios] = useState([]);
    const [editarEquipamento, setEditarEquipamento] = useState(false);
    const [equipamento, setEquipamento] = useState({
        codigo: "", descricao: "", numero_serie: "", valor: "", sala: ""
    })
    const [listaEquipamentos, setListaEquipamentos] = useState([]);
    const [exibirEquipamentos, setExibirEquipamentos] = useState(false);

    const recuperarEquipamentos = async codigosala => {
        try {
            setObjeto(await getSalaPorCodigoAPI(codigosala));
            setListaEquipamentos(await getEquipamentosDaSalaAPI(codigosala));
            setExibirEquipamentos(true);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const recuperarEquipamento = async codigo => {
        try {
            setEquipamento(await getEquipamentoPorCodigoAPI(codigo));
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const removerEquipamento = async equipamento => {
        if (window.confirm('Deseja remover este equipamento?')) {
            let retornoAPI =
                await deleteEquipamentoPorCodigoAPI(equipamento.codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setListaEquipamentos(await getEquipamentosDaSalaAPI(objeto.codigo));
        }
    }

    const acaoCadastrarEquipamento = async e => {
        e.preventDefault();
        const metodo = editarEquipamento ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraEquipamentosAPI(equipamento, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editarEquipamento) {
                setEditarEquipamento(true);
            }
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperarEquipamentos(objeto.codigo);
    }

    const handleChangeEquipamento = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setEquipamento({ ...equipamento, [name]: value });
    }

    const recuperar = async codigo => {
        try {
            setObjeto(await getSalaPorCodigoAPI(codigo));
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraSalasAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperaSalas();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaSalas = async () => {
        try {
            setCarrengando(true);
            setListaObjetos(await getSalasAPI());
            setCarrengando(false);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const recuperaPredios = async () => {
        setListaPredios(await getPrediosAPI());
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deleteSalaPorCodigoAPI(objeto.codigo);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            } catch (err) {
                console.log(err);
                window.location.reload();
                navigate("/login", { replace: true });
            }
        }
        recuperaSalas();
    }

    useEffect(() => {
        recuperaSalas();
        recuperaPredios();
    }, []);

    return (
        <SalaContext.Provider value={{
            alerta, setAlerta,
            listaObjetos, setListaObjetos,
            recuperaPredios, remover,
            objeto, setObjeto,
            editar, setEditar,
            recuperar, acaoCadastrar, handleChange, listaPredios,
            listaEquipamentos, equipamento, setEquipamento, handleChangeEquipamento,
            removerEquipamento, recuperarEquipamento, acaoCadastrarEquipamento,
            setEditarEquipamento, editarEquipamento, recuperarEquipamentos,
            setExibirEquipamentos
        }}>
            <Carregando carregando={carregando}>
                {!exibirEquipamentos ? <Tabela /> : <TabelaEquipamentos />}
            </Carregando>
            <Form />
            <FormEquipamento />
        </SalaContext.Provider>
    )

}

export default WithAuth(Predio);