import styled from "styled-components";
import InputGroup from "../molecules/InputGroup";
import Topic from "../atoms/Topic";
import Subtitle from "../atoms/Subtitle";
import Button from "../atoms/Button";

const StyledBatteryExtractContainer = styled.div`
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

const BatteryExtractModal = ({
    className = "",
    onSuccess,
    onClose,
    ...props
}) => {
    return (
        <StyledBatteryExtractContainer
            className={`battery-extract-modal ${className}`}
            {...props}
        >
            <StyledTopic>원자재 추출</StyledTopic>
            {/* <StyledInputGroupContainer>
                <StyledInputGroup type="text" title="정비자" />
                <StyledInputGroup type="text" title="정비일자" />
            </StyledInputGroupContainer>
            <StyledInputGroup type="text" title="정비결과" />
            <StyledInputGroup type="text" title="특이사항" />
            <StyledButtonContainer>
                <Button onClick={onSuccess}>확인</Button>
                <Button onClick={onClose} color={"red"} hover_color={"#c50000"}>
                    취소
                </Button>
            </StyledButtonContainer> */}
        </StyledBatteryExtractContainer>
    );
};

export default BatteryExtractModal;
