import styled from "styled-components";
import InputGroup from "../molecules/InputGroup";
import Topic from "../atoms/Topic";
import Subtitle from "../atoms/Subtitle";
import Button from "../atoms/Button";
import OptionGroup from "../molecules/OptionGroup";

const StyledBatteryRegisterContainer = styled.div`
    position: relative;
    width: 480px;
    height: 560px;
    padding: 60px 40px 0 40px;
    display: flex;
    flex-direction: column;
    align-items: start;
`;

const StyledInputGroup = styled(InputGroup)`
    width: 100%;
    padding: 0 10px 0 0;
    flex-grow: 1 0;
`;

const StyledTopic = styled(Topic)`
    margin-bottom: 60px;
`;

const StyledInputGroupContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const StyledOptionGroup = styled(OptionGroup)`
    width: 100%;
    padding: 0 10px 0 0;
    flex-grow: 1 0;
`;

const StyledButtonContainer = styled.div`
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: space-around;
    right: 0;
    bottom: 30px;
`;

const MaterialTypes = [
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
        key: "lead",
        name: "납",
    },
];

const MaterialRegisterModal = ({
    className = "",
    onSuccess,
    onClose,
    ...props
}) => {
    return (
        <StyledBatteryRegisterContainer
            className={`battery-register-modal ${className}`}
            {...props}
        >
            <StyledTopic>원자재 등록</StyledTopic>
            <StyledInputGroupContainer>
                <StyledOptionGroup options={MaterialTypes} title="종류" />
                <StyledInputGroup type="number" title="수량" value="0" />
            </StyledInputGroupContainer>
            <StyledInputGroup type="text" title="공급업체" />
            <StyledInputGroup type="text" title="상태" />
            <StyledButtonContainer>
                <Button onClick={onSuccess}>확인</Button>
                <Button onClick={onClose} color={"red"} hover_color={"#c50000"}>
                    취소
                </Button>
            </StyledButtonContainer>
        </StyledBatteryRegisterContainer>
    );
};

export default MaterialRegisterModal;
