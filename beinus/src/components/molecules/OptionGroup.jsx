import Label from "../atoms/Label";
import Subtitle from "../atoms/Subtitle";
import styled from "styled-components";

const StyledOptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 0px;
`;

const StyledOptionList = styled.select`
    width: 100%;
    font-size: 16pt;
    padding: 10px;
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

const OptionGroup = ({
    title, // Option 제목
    options,
    id, // id
    name, // Option의 name
    // value, // Option의 value
    is_disabled, // Option의 is_disabled
    selected, // 선행 선택자
    onChange, // Option의 onChange handler
    valid, // 올바른지 여부 (설명 메시지 색 설정)
    description, // 설명 메세지
    className = "",
}) => {
    const titleOptionalProps = { ...(id && { htmlFor: id }) };
    const inputOptionalProps = {
        ...(id && { id: id }),
        ...(name && { name: name }),
        // ...(value && { value: value }),
        ...(is_disabled && "disabled"),
        ...(onChange && { onChange: onChange }),
    };

    return (
        <StyledOptionContainer className={`${className}`}>
            {title ? (
                <Subtitle className="input-title" {...titleOptionalProps}>
                    {title}
                </Subtitle>
            ) : (
                ""
            )}
            <StyledOptionList className="select" {...inputOptionalProps}>
                {options.map((option) => (
                    <option
                        key={option.id}
                        className="option"
                        // onClick={() => {
                        //     handleOpen();
                        //     onClick(option);
                        // }}
                    >
                        {option.name}
                    </option>
                ))}
            </StyledOptionList>
            <Label className={`input-description`} valid={valid}>
                {description ? `${description}` : <br />}
            </Label>
        </StyledOptionContainer>
    );
};

export default OptionGroup;
