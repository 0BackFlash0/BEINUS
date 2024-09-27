import styled from "styled-components";
import InputGroup from "../molecules/InputGroup";
import Topic from "../atoms/Topic";
import Subtitle from "../atoms/Subtitle";
import Button from "../atoms/Button";
import useInput from "../../hooks/useInput";
import OptionGroup from "../molecules/OptionGroup";
import { analysisBattery } from "../../services/additional_api";

const StyledBatteryRegisterContainer = styled.div`
    position: relative;
    width: 480px;
    height: 240px;
    padding: 60px 40px 0 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledCautionContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const CautionWindow = ({
    className = "",
    caution,
    message,
    isOpen,
    onClose,
    ...props
}) => {
    return (
        <StyledBatteryRegisterContainer
            className={`battery-register-modal ${className}`}
            {...props}
        >
            {/* <Topic>{caution}</Topic> */}
            <StyledCautionContainer>message</StyledCautionContainer>
            <Button onClick={onClose}>확인</Button>
        </StyledBatteryRegisterContainer>
    );
};

export default CautionWindow;
