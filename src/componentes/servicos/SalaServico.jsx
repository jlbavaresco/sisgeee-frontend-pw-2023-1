export const getSalasAPI = async () => {
    const response = 
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/salas`,
        {
            method : "GET",
            headers : {
                "Content-Type" : "application/json"
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
                "Content-Type" : "application/json"
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
                "Content-Type" : "application/json"
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
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(objeto)
        });
    const data = await response.json();
    return data;
}
