import styled from "styled-components";
import InputGroup from "../molecules/InputGroup";
import OptionGroup from "../molecules/OptionGroup";
import Topic from "../atoms/Topic";
import Subtitle from "../atoms/Subtitle";
import Button from "../atoms/Button";
import useInput from "../../hooks/useInput";
import { registerBattery } from "../../services/additional_api";
import { useEffect, useState } from "react";

const StyledRowGroupContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
`;

const StyledMaterialOptionContainer = styled.div`
    position: relative;
    width: 100%;
    padding: 15px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: start;
    border: dotted 1px;
    border-radius: 10px;
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

const StyledIDOptionGroup = styled(OptionGroup)`
    width: 100%;
    padding: 0 10px 0 0;
    flex-grow: 1 0;
`;

const StyledSubtitle = styled(Subtitle)`
    margin-bottom: 10px;
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
    index = "",
    type_value = "",
    material_options,
    // statusValue = "",
    material_id_value = "",
    amount_value = "",
    on_change = () => {},
    ...props
}) => {
    return (
        <StyledMaterialOptionContainer
            className={`battery-register-modal ${className}`}
            {...props}
        >
            <StyledSubtitle>원자재 {index + 1}</StyledSubtitle>
            <StyledRowGroupContainer>
                <StyledOptionGroup
                    options={MaterialOptions}
                    id="type"
                    name="type"
                    value={type_value ? type_value : ""}
                    onChange={on_change}
                    title="종류"
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
            </StyledRowGroupContainer>
            <StyledIDOptionGroup
                options={material_options}
                id="materialID"
                name="materialID"
                value={material_id_value ? material_id_value : ""}
                onChange={on_change}
                title="원자재 ID"
                is_description={false}
            />
        </StyledMaterialOptionContainer>
    );
};

export default RegisterMaterialOption;
