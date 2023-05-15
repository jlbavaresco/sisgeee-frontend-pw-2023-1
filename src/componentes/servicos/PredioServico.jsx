export const getPrediosAPI = async () => {
    const response = 
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/predios`,
        {
            method : "GET",
            headers : {
                "Content-Type" : "application/json"
            }
        });
    const data = await response.json();
    return data;
}

export const getPredioPorCodigoAPI = async codigo => {
    const response = 
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/predios/${codigo}`,
        {
            method : "GET",
            headers : {
                "Content-Type" : "application/json"
            }
        });
    const data = await response.json();
    return data;
}

export const deletePredioPorCodigoAPI = async codigo => {
    const response = 
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/predios/${codigo}`,
        {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json"
            }
        });
    const data = await response.json();
    return data;
}

export const cadastraPrediosAPI = async (objeto, metodo) => {
    const response = 
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/predios`,
        {
            method : metodo,
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(objeto)
        });
    const data = await response.json();
    return data;
}
