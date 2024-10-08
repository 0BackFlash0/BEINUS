import { useEffect, useRef } from "react";
import Label from "../atoms/Label";
import Subtitle from "../atoms/Subtitle";
import styled, { keyframes } from "styled-components";

const StyledOptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 0px;
`;

const StyledOptionList = styled.select`
    width: 100%;
    font-size: 16pt;
    padding: 10px 0 13px 0;
    border-style: solid;
    border-color: #d4d4d4;
    border-width: 0 0 1px 0;

    &:focus {
        outline: none;
        border-color: #383838;
    }

    &::is_disabled {
        font-size: 14pt;
        color: #b3b3b3;
    }
`;

// const StyledOption = styled.option`
//     width: 100%;
//     max-width: 50px;
//     padding: "10px";
//     /* whitespace: "nowrap"; */
//     overflow: "hidden";
//     /* textoverflow: "ellipsis"; */
//     cursor: "pointer";
//     position: "relative";
// `;

const OptionGroup = ({
    title, // Option 제목
    options,
    id, // id
    name, // Option의 name
    value, // Option의 value
    is_disabled, // Option의 is_disabled
    onChange, // Option의 onChange handler
    valid, // 올바른지 여부 (설명 메시지 색 설정)
    is_description = true,
    description, // 설명 메세지
    className = "",
}) => {
    const titleOptionalProps = { ...(id && { htmlFor: id }) };
    const optionOptionalProps = {
        ...(id && { id: id }),
        ...(name && { name: name }),
        ...(value && { value: value }),
        ...(is_disabled && "disabled"),
        ...(onChange && { onChange: onChange }),
    };

    const prevValueRef = useRef(value);
    const optionRef = useRef(options);

    useEffect(() => {
        // const prevValue = prevValueRef.current;
        console.log("change");
        if (
            optionRef.current.length > 0 &&
            value !== optionRef.current[0].key
        ) {
            onChange({
                target: {
                    name: name,
                    value: optionRef.current[0].key,
                },
            });
        }

        // prevValueRef.current = value;
    }, [optionRef, name, onChange]);

    return (
        <StyledOptionContainer className={`${className}`}>
            {title ? (
                <Subtitle className="option-title" {...titleOptionalProps}>
                    {title}
                </Subtitle>
            ) : (
                ""
            )}
            <StyledOptionList className="select" {...optionOptionalProps}>
                {options.map((option, index) => (
                    <option
                        key={option.key}
                        value={option.key}
                        className="option"
                    >
                        {option.name}
                    </option>
                ))}
            </StyledOptionList>
            {is_description ? (
                <Label
                    className={`input-description`}
                    valid={valid ? "success" : "fail"}
                >
                    {description ? `${description}` : <br />}
                </Label>
            ) : (
                ""
            )}
        </StyledOptionContainer>
    );
};

export default OptionGroup;
