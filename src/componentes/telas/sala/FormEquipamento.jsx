import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import SalaContext from "./SalaContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";

function FormEquipamento() {

    const { equipamento, handleChangeEquipamento,
        acaoCadastrarEquipamento, alerta } = useContext(SalaContext);

    return (
        <Dialogo id="modalEdicaoEquipamento" titulo="Equipamento"
            acaoCadastrar={acaoCadastrarEquipamento}
            idform="formularioEquipamento">
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="Código"
                tipo="number" name="codigo" value={equipamento.codigo}
                onchange={handleChangeEquipamento} requerido={false}
                readonly={true} />
            <CampoEntrada id="txtDescricao" label="Descrição"
                tipo="text" name="descricao"
                value={equipamento.descricao}
                onchange={handleChangeEquipamento} requerido={true}
                readonly={false} maxlength={40}
                msgvalido="Descrição OK"
                msginvalido="Informe a descrição" />
            <CampoEntrada id="txtNumeroSerie" label="Número de série"
                tipo="text" name="numero_serie"
                value={equipamento.numero_serie}
                onchange={handleChangeEquipamento} requerido={true}
                readonly={false} maxlength={40}
                msgvalido="Número de série OK"
                msginvalido="Informe o número de série" />
            <CampoEntrada id="txtValor" label="Valor"
                tipo="number" name="valor" value={equipamento.valor}
                onchange={handleChangeEquipamento} requerido={true}
                readonly={false} maxlength={10}
                msgvalido="Valor OK"
                msginvalido="Informe o valor" />           
        </Dialogo>
    )

}

export default FormEquipamento;