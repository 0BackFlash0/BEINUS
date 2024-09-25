import styled from "styled-components";
import InputGroup from "../components/molecules/InputGroup";
import Topic from "../components/atoms/Topic";
import Subtitle from "../components/atoms/Subtitle";
import Button from "../components/atoms/Button";
import TabInfo from "../components/molecules/TabInfo";
import Photo from "../components/atoms/Photo";

const StyledBatteryDetailContainer = styled.div`
    position: relative;
    width: 640px;
    height: 480px;
    padding: 60px 40px 0 40px;
    display: flex;
    flex-direction: column;
    align-items: start;
`;

const StyledInfoContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    margin: 10px;
`;

const StyledTabInfo = styled(TabInfo)`
    width: 100%;
    padding: 0 10px 0 0;
    flex-grow: 1 0;
`

const StyledPhoto = styled(Photo)`
    margin: 20px 10px;
`

const MaterialDetailPopup = ({
    className = "",
    onSuccess,
    onClose,
    ...props
}) => {
    return (
        <StyledBatteryDetailContainer
            className={`battery-register-modal ${className}`}
            {...props}
        >
            <StyledPhoto src="./assets/test.png" alt="테스트"/>
            <StyledInfoContainer>
                <StyledTabInfo infoname="원자재 ID" info="ABCD"/>
            </StyledInfoContainer>
            <StyledInfoContainer>
                <StyledTabInfo infoname="종류" info="니켈"/>
                <StyledTabInfo infoname="상태" info="NEW"/>
            </StyledInfoContainer>
            <StyledInfoContainer>
                <StyledTabInfo infoname="검증여부" info="NO"/>
                <StyledTabInfo infoname="공급일자" info="2024/09/24"/>
            </StyledInfoContainer>
        </StyledBatteryDetailContainer>
    );
};

export default MaterialDetailPopup;
