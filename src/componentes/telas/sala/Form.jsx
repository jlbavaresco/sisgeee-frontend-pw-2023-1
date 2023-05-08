import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import SalaContext from "./SalaContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, listaPredios } =
        useContext(SalaContext);

    return (
        <Dialogo id="modalEdicao" titulo="Sala"
            acaoCadastrar={acaoCadastrar} idform="formulario">
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="Código"
                tipo="number" name="codigo" value={objeto.codigo}
                onchange={handleChange} requerido={false}
                readonly={true} />
            <CampoEntrada id="txtNumero" label="Número"
                tipo="number" name="numero" value={objeto.numero}
                onchange={handleChange} requerido={true}
                readonly={false} maxlength={10}
                msgvalido="Número OK"
                msginvalido="Informe o Número" />
            <CampoEntrada id="txtDescricao" label="Descrição"
                tipo="text" name="descricao"
                value={objeto.descricao}
                onchange={handleChange} requerido={true}
                readonly={false} maxlength={40}
                msgvalido="Descrição OK"
                msginvalido="Informe a descrição" />
            <CampoEntrada id="txtCapacidade" label="Capacidade"
                tipo="number" name="capacidade" value={objeto.capacidade}
                onchange={handleChange} requerido={true}
                readonly={false} maxlength={10}
                msgvalido="Capacidade OK"
                msginvalido="Informe a capacidade" />
            <div class="mb-3">
                <label htmlFor="selectPredio"
                    className="form-label">Prédio</label>
                <select className="form-control"
                    required
                    value={objeto.predio}
                    name="predio" onChange={handleChange}>
                    <option disabled="true" value="">
                        Selecione o prédio
                    </option>
                    {
                        listaPredios.map((predio) => (
                            <option key={predio.codigo} value={predio.codigo}>
                                {predio.nome}
                            </option>
                        ))
                    }
                </select>
                <div class="valid-feedback">
                    Prédio OK
                </div>
                <div class="invalid-feedback">
                    Informe o prédio
                </div>
            </div>
        </Dialogo>
    )

}

export default Form;