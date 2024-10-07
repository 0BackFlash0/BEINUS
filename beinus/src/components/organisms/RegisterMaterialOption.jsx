import styled from "styled-components";
import InputGroup from "../molecules/InputGroup";
import OptionGroup from "../molecules/OptionGroup";
import Topic from "../atoms/Topic";
import Subtitle from "../atoms/Subtitle";
import Button from "../atoms/Button";
import useInput from "../../hooks/useInput";
import { registerBattery } from "../../services/additional_api";
import { useState } from "react";

const StyledMaterialOptionContainer = styled.div`
    position: relative;
    width: 100%;
    padding: 5px;
    display: flex;
    flex-direction: row;
    align-items: start;
`;

const StyledInputGroup = styled(InputGroup)`
    width: 100%;
    padding: 0 10px 0 0;
    flex-grow: 1 0;
`;

const StyledOptionGroup = styled(OptionGroup)`
    width: 100%;
    padding: 0 10px 0 0;
    flex-grow: 1 0;
`;

const MaterialOptions = [
    {
        key: "Nickel",
        name: "니켈",
    },
    {
        key: "Cobalt",
        name: "코발트",
    },
    {
        key: "Lithium",
        name: "리튬",
    },
    {
        key: "Manganese",
        name: "망간",
    },
];

const StatusOptions = [
    {
        key: "new",
        name: "NEW",
    },
    {
        key: "recycled",
        name: "RECYCLED",
    },
];

const RegisterMaterialOption = ({
    className = "",
    type_value = "",
    material_options,
    // statusValue = "",
    material_id_value = "",
    amount_value = "",
    on_change = () => {},
    ...props
}) => {
    console.log(material_options);
    return (
        <StyledMaterialOptionContainer
            className={`battery-register-modal ${className}`}
            {...props}
        >
            <StyledOptionGroup
                options={MaterialOptions}
                id="type"
                name="type"
                value={type_value ? type_value : ""}
                onChange={on_change}
                title="종류"
                is_description={false}
            />

            {/* <StyledOptionGroup
                options={StatusOptions}
                id="status"
                name="status"
                value={statusValue ? statusValue : ""}
                on_change={on_change}
                title="상태"
                is_description={false}
            /> */}
            <StyledOptionGroup
                options={material_options}
                id="materialID"
                name="materialID"
                value={material_id_value ? material_id_value : ""}
                onChange={on_change}
                title="원자재 ID"
                is_description={false}
            />
            <StyledInputGroup
                type="number"
                id="amount"
                name="amount"
                value={amount_value ? amount_value : ""}
                onChange={on_change}
                title="개수"
                is_description={false}
            />
        </StyledMaterialOptionContainer>
    );
};

export default RegisterMaterialOption;
