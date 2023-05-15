import { useContext } from "react";
import SalaContext from "./SalaContext";
import Alerta from '../../comuns/Alerta'

function TabelaEquipamentos() {

    const { alerta, setAlerta, listaEquipamentos, removerEquipamento,
        objeto, setEditarEquipamento, setEquipamento, recuperarEquipamento,
        setExibirEquipamentos }
        = useContext(SalaContext);

    return (
        <div style={{ padding: '20px' }}>
            <button className="btn btn-secondary" onClick={() => {
                setExibirEquipamentos(false);
                setAlerta({ status: "", message: "" });
            }}>
               Voltar <i className="bi bi-backspace"></i>
            </button>
            <h1>Equipamentos da Sala : {objeto.numero}</h1>
            <Alerta alerta={alerta} />
            <button type="button" className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalEdicaoEquipamento"
                onClick={() => {
                    setEditarEquipamento(false);
                    setAlerta({ status: "", message: "" });
                    setEquipamento({
                        codigo: 0,
                        descricao: "", numero_serie: "",
                        valor : "", sala: objeto.codigo
                    });
                }}>
                Novo
            </button>
            {listaEquipamentos.length === 0 &&
                <h1>Nenhum equipamento encontrado</h1>}
            {listaEquipamentos.length > 0 && (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"
                                    style={{ textAlign: 'center' }}>Ações</th>
                                <th scope="col">Código</th>
                                <th scope="col">Descrição</th>
                                <th scope="col">Número Série</th>
                                <th scope="col">Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaEquipamentos.map(equipamento => (
                                <tr key={equipamento.codigo}>
                                    <td align="center">
                                        <button className="btn btn-info" title="Editar"
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalEdicaoEquipamento"
                                            onClick={() => {
                                                recuperarEquipamento(equipamento.codigo);
                                                setEditarEquipamento(true);
                                                setAlerta({ status: "", message: "" });
                                            }}>
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                        <button className="btn btn-danger" title="Remover"
                                            onClick={() => removerEquipamento(equipamento)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                    <th scope="row">{equipamento.codigo}</th>
                                    <td>{equipamento.descricao}</td>
                                    <td>{equipamento.numero_serie}</td>
                                    <td>{equipamento.valor}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            )}

        </div>
    )

}

export default TabelaEquipamentos;