import Autenticacao from "../seg/Autenticacao";

export const getSalasAPI = async () => {
    const response = 
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/salas`,
        {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "x-access-token": Autenticacao.pegaAutenticacao().token
            }
        });
    const data = await response.json();
    return data;
}

export const getSalaPorCodigoAPI = async codigo => {
    const response = 
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/salas/${codigo}`,
        {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "x-access-token": Autenticacao.pegaAutenticacao().token
            }
        });
    const data = await response.json();
    return data;
}

export const deleteSalaPorCodigoAPI = async codigo => {
    const response = 
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/salas/${codigo}`,
        {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "x-access-token": Autenticacao.pegaAutenticacao().token
            }
        });
    const data = await response.json();
    return data;
}

export const cadastraSalasAPI = async (objeto, metodo) => {
    const response = 
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/salas`,
        {
            method : metodo,
            headers : {"Content-Type" : "application/json",
            "x-access-token": Autenticacao.pegaAutenticacao().token},
            body : JSON.stringify(objeto)
        });
    const data = await response.json();
    return data;
}
