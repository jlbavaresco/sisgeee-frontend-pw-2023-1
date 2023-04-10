import { useState, useEffect } from "react";
import PredioContext from "./PredioContext";
import Tabela from "./Tabela";
import Form from "./Form";

function Predio() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "",
        descricao: "", sigla: ""
    });

    const recuperar = async codigo => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/predios/${codigo}`)
            .then(response => response.json())
            .then(json => setObjeto(json))
            .catch(err => setAlerta({ status: "error", message: err }))
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/predios`,
            {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(objeto)
            }).then(response => response.json())
            .then(json => {
                setAlerta({ status: json.status, message: json.message });
                setObjeto(json.objeto);
                if (!editar) {
                    setEditar(true);
                }
            })
        recuperaPredios();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [name] : value});
    }

    const recuperaPredios = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/predios`)
            .then(response => response.json())
            .then(json => setListaObjetos(json))
            .catch(err => setAlerta({ status: "error", message: err }))
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {

            await
                fetch(`${process.env.REACT_APP_ENDERECO_API}/predios/${objeto.codigo}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json => setAlerta({
                        status: json.status,
                        message: json.message
                    }))
                    .catch(err => setAlerta({ status: "error", message: err }))

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
            recuperar, acaoCadastrar,  handleChange
        }}>
            <Tabela />
            <Form/>
        </PredioContext.Provider>
    )

}

export default Predio;