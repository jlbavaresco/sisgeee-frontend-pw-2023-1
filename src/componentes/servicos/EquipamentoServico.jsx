import Autenticacao from "../seg/Autenticacao";

export const getEquipamentosDaSalaAPI = async codigosala => {
    const response =
        await
            fetch(`${process.env.REACT_APP_ENDERECO_API}/equipamentos/sala/${codigosala}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": Autenticacao.pegaAutenticacao().token
                    }
                });
    const data = await response.json();
    return data;
}

export const getEquipamentoPorCodigoAPI = async codigo => {
    const response =
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/equipamentos/${codigo}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": Autenticacao.pegaAutenticacao().token
                }
            });
    const data = await response.json();
    return data;
}

export const deleteEquipamentoPorCodigoAPI = async codigo => {
    const response =
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/equipamentos/${codigo}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": Autenticacao.pegaAutenticacao().token
                }
            });
    const data = await response.json();
    return data;
}

export const cadastraEquipamentosAPI = async (objeto, metodo) => {
    const response =
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/equipamentos`,
            {
                method: metodo,
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": Autenticacao.pegaAutenticacao().token
                },
                body: JSON.stringify(objeto)
            });
    const data = await response.json();
    return data;
}
