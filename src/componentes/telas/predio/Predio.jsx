import { useState, useEffect } from "react";
import PredioContext from "./PredioContext";
import Tabela from "./Tabela";

function Predio() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);

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

    useEffect(()=> {
        recuperaPredios();
    },[]);

    return (
        <PredioContext.Provider value={{alerta, setAlerta,
                                        listaObjetos, setListaObjetos, 
                                        recuperaPredios, remover}}>
            <Tabela/>
        </PredioContext.Provider>
    )

}

export default Predio;