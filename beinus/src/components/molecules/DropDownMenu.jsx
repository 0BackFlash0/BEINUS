import styled from "styled-components";
import Menu from "./Menu";
import { useState } from "react";

const StyledDropDownContainaer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const StyledDropDownList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 5px;
`;

const DropDownMenu = ({
    className = "",
    icon = "",
    src = "",
    list = [],
    name = "",
}) => {
    const [isDown, setIsDown] = useState(false);

    const toggleDown = () => {
        setIsDown((prev) => !prev);
    };

    // return <div>{src}</div>;

    return (
        <StyledDropDownContainaer>
            <Menu icon={icon} src={src} onClick={toggleDown}>
                {name}
            </Menu>
            {isDown ? (
                <StyledDropDownList className="select">
                    {list &&
                        list.map((element, idx) => {
                            const menuProps = {
                                ...(element.icon && { icon: element.icon }),
                                ...(element.src && { src: element.src }),
                                ...(element.onClick && {
                                    onClick: element.onClick,
                                }),
                            };

                            if (element.list) {
                                return (
                                    <DropDownMenu
                                        key={idx}
                                        {...menuProps}
                                        list={element.list}
                                    />
                                );
                            }
                            return (
                                <Menu key={idx} {...menuProps}>
                                    {element.name}
                                </Menu>
                            );
                        })}
                </StyledDropDownList>
            ) : (
                ""
            )}
        </StyledDropDownContainaer>
    );
};

export default DropDownMenu;
