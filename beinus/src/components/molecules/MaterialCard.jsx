import Icon from "../atoms/Icon";
import Label from "../atoms/Label";
import Photo from "../atoms/Photo";
import Subtitle from "../atoms/Subtitle";
import styled from "styled-components";

const StyledCardContainer = styled.div`
    width: 300px;
    height: 240px;
    border: solid 2px;
    border-color: #b6b6b6;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 0px;

    cursor: pointer;
`;

const StyledUpperContent = styled.div`
    flex-grow: 1;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const StyledMainContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
`;

const StyledLowerContent = styled.div`
    border-top: solid 1px black;
    padding-top: 5px;
    margin-top: 5px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
`;

const StyledRow = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const StyledContentContainer = styled.div`
    display: flex;
    gap: 5px;
`;

const StyledLabel = styled.div`
    font-size: 12pt;
    color: #666f7c;
    padding: 2px 0;
    margin: 0;
`;

const StyledName = styled.div`
    font-size: 13pt;
    color: black;
    padding: 2px 0;
    margin: 0;
`;

const MaterialCard = ({
    id, // 원자재 id
    img,
    type, // 원자재 type
    verified, // 검증 여부
    status, // 재활용 여부
    amount, // 개수
    date, // 등록 일자
    className = "",
    ...props
}) => {
    return (
        <StyledCardContainer className={`battery-card ${className}`} {...props}>
            <StyledUpperContent>
                <StyledLabel>{type}</StyledLabel>
            </StyledUpperContent>
            <StyledMainContent>
                <Photo src={img} width="50px" height="60px" />
                <StyledName>{id}</StyledName>
            </StyledMainContent>
            <StyledLowerContent>
                <StyledRow>
                    <StyledLabel>검증여부</StyledLabel>
                    <StyledContentContainer>
                        <StyledLabel>{verified}</StyledLabel>
                        {verified === "Verified" ? (
                            <Icon
                                icon={"license"}
                                size="16pt"
                                color={"#1ED760"}
                            ></Icon>
                        ) : (
                            <Icon
                                icon={"unlicense"}
                                size="16pt"
                                color={"red"}
                            ></Icon>
                        )}
                    </StyledContentContainer>
                </StyledRow>

                <StyledRow>
                    <StyledLabel>개수</StyledLabel>
                    <StyledLabel>{amount}</StyledLabel>
                </StyledRow>
                <StyledRow>
                    <StyledLabel>상태</StyledLabel>

                    <StyledContentContainer>
                        <StyledLabel>{status}</StyledLabel>
                        {status === "NEW" ? (
                            <Icon
                                icon={"fiber_new"}
                                color="blue"
                                size="16pt"
                            ></Icon>
                        ) : (
                            <Icon
                                icon={"recycling"}
                                color="#1ED760"
                                size="16pt"
                            ></Icon>
                        )}
                    </StyledContentContainer>
                </StyledRow>
                <StyledLabel>Created at {date}</StyledLabel>
            </StyledLowerContent>
        </StyledCardContainer>
    );
};

export default MaterialCard;