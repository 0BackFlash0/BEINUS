import styled from "styled-components";
import Subtitle from "../atoms/Subtitle";
import MainContent from "../atoms/MainContent";

const StyledInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 5px;
    margin: 2px;

    width: 100%;
    padding: 10px;
    /* border-radius: 10px; */

    background-color: #edffed;
`;

const StyledTitle = styled.div`
    font-size: 10pt;
    color: #666f7c;
    padding: 2px 0;
    margin: 0;
`;

const StyledInfo = styled.div`
    font-size: 18pt;
    font-weight: 700;
    color: black;
    padding: 2px 0;
    margin: 0;
`;

const CardInfo = ({ className = "", title = "-", info = "-" }) => {
    return (
        <StyledInfoContainer className={`${className}`}>
            <StyledTitle>{title}</StyledTitle>
            <StyledInfo>{info || "-"}</StyledInfo>
        </StyledInfoContainer>
    );
};

export default CardInfo;
