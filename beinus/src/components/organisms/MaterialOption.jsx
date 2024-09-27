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

const StyledTopic = styled(Topic)`
    margin-bottom: 60px;
`;

const StyledButtonContainer = styled.div`
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: space-around;
    right: 0;
    bottom: 30px;
`;

const StyledSubtitle = styled(Subtitle)`
    margin-bottom: 10px;
`;

const MaterialOptions = [
    {
        key: "nickel",
        name: "니켈",
    },
    {
        key: "cobalt",
        name: "코발트",
    },
    {
        key: "lithium",
        name: "리튬",
    },
    {
        key: "manganese",
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

const MaterialOption = ({
    className = "",
    typeValue = "",
    statusValue = "",
    materialIDValue = "",
    numberValue = "",
    onChange = () => {},
    ...props
}) => {
    return (
        <StyledMaterialOptionContainer
            className={`battery-register-modal ${className}`}
            {...props}
        >
            <StyledOptionGroup
                options={MaterialOptions}
                id="type"
                name="type"
                value={typeValue ? typeValue : ""}
                onChange={onChange}
                title="종류"
                is_description={false}
            />

            <StyledOptionGroup
                options={StatusOptions}
                id="status"
                name="status"
                value={statusValue ? statusValue : ""}
                onChange={onChange}
                title="종류"
                is_description={false}
            />
            <StyledInputGroup
                type="text"
                id="materialID"
                name="materialID"
                value={materialIDValue ? materialIDValue : ""}
                onChange={onChange}
                title="원자재 ID"
                is_description={false}
            />
            <StyledInputGroup
                type="number"
                id="number"
                name="number"
                value={numberValue ? numberValue : ""}
                onChange={onChange}
                title="개수"
                is_description={false}
            />
        </StyledMaterialOptionContainer>
    );
};

export default MaterialOption;
