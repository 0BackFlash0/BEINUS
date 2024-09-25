import styled from "styled-components";
import InputGroup from "../molecules/InputGroup";
import Topic from "../atoms/Topic";
import Subtitle from "../atoms/Subtitle";
import Button from "../atoms/Button";

const StyledBatteryRegisterContainer = styled.div`
    position: relative;
    width: 480px;
    height: 640px;
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

const BatteryAnalysisModal = ({
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
            <StyledTopic>배터리 제조</StyledTopic>
            <StyledInputGroupContainer>
                <StyledInputGroup type="text" title="모델" />
                <StyledInputGroup type="text" title="카테고리" />
            </StyledInputGroupContainer>
            <StyledSubtitle>원자재 함량 </StyledSubtitle>
            <StyledInputGroupContainer>
                <StyledInputGroup type="text" title="니켈" />
                <StyledInputGroup type="text" title="코발트" />
                <StyledInputGroup type="text" title="리튬" />
                <StyledInputGroup type="text" title="납" />
            </StyledInputGroupContainer>
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

export default BatteryAnalysisModal;
