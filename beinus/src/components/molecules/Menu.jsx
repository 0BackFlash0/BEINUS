import styled from "styled-components";
import Icon from "../atoms/Icon";
import Photo from "../atoms/Photo";

const StyledMenuContainer = styled.div`
    width: 100%;
    padding: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;

    cursor: pointer;
`;

const StyledHead = styled.h5`
    margin: 1px 6px;
    font-size: 12pt;
    font-weight: 600;
    color: #666666;
`;

const Menu = ({
    children, // 자식 Component
    className = "", // class
    icon = "",
    src = "",
    ...props
}) => {
    return (
        <StyledMenuContainer>
            {icon ? <Icon icon={icon} size="16pt"></Icon> : ""}
            {src ? <Photo src={src} alt={src} /> : ""}
            <StyledHead className={`menu ${className}`} {...props}>
                {children}
            </StyledHead>
        </StyledMenuContainer>
    );
};

export default Menu;
