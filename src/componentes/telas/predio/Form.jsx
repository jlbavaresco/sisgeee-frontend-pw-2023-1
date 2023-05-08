import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import PredioContext from "./PredioContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta } =
        useContext(PredioContext);

    return (
        <Dialogo id="modalEdicao" titulo="Prédio"
            acaoCadastrar={acaoCadastrar} idform="formulario">
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="Código"
                tipo="number" name="codigo" value={objeto.codigo}
                onchange={handleChange} requerido={false}
                readonly={true} />
            <CampoEntrada id="txtNome" label="Nome"
                tipo="text" name="nome" value={objeto.nome}
                onchange={handleChange} requerido={true}
                readonly={false} maxlength={40}
                msgvalido="Nome OK"
                msginvalido="Informe o nome" />
            <CampoEntrada id="txtDescricao" label="Descrição"
                tipo="text" name="descricao"
                value={objeto.descricao}
                onchange={handleChange} requerido={true}
                readonly={false} maxlength={40}
                msgvalido="Descrição OK"
                msginvalido="Informe a descrição" />
            <CampoEntrada id="txtSigla" label="Sigla"
                tipo="text" name="sigla"
                value={objeto.sigla}
                onchange={handleChange} requerido={true}
                readonly={false} maxlength={4}
                msgvalido="Sigla OK"
                msginvalido="Informe a sigla" />
        </Dialogo>
    )

}

export default Form;