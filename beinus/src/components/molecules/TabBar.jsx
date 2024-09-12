import styled from "styled-components";
import Photo from "../atoms/Photo";

const StyledBarContainer = styled.div`
    width: 100%;
    /* min-width: 900px; */
    /* max-width: 1440px; */
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: start;
    margin: 0px;
`;

const StyledTab = styled.button`
    flex-grow: 1;
    flex-basis: 225px;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0 10px;

    font-size: 15pt;
    border-width: 0;
    outline: none;

    background-color: ${(props) =>
        props.actived === props.index ? "#EDFFED" : "white"};

    border-radius: ${(props) => {
        return props.index == 0
            ? "10px 0 0 0"
            : props.index == props.length - 1
            ? "0 10px 0 0"
            : "0 0 0 0";
    }};

    &:focus {
        outline: none;
    }
`;

const TabBar = ({ tabs, className = "", onClick, actived }) => {
    return (
        <StyledBarContainer className={`${className}`}>
            {tabs.map((tab, index, array) => (
                <StyledTab
                    key={tab.key}
                    onClick={() => onClick(index)}
                    index={index}
                    length={array.length}
                    actived={actived}
                >
                    <Photo src={tab.icon} width="20px" />
                    {tab.name}
                </StyledTab>
            ))}
        </StyledBarContainer>
    );
};

export default TabBar;
