import React, { useState } from "react";
import styled from "styled-components";
import Label from "../atoms/Label";
import Button from "../atoms/Button";
import Anchor from "../atoms/Anchor";
import Line from "../atoms/Line";
import Icon from "../atoms/Icon";
import { useSelector, useDispatch } from "react-redux";
import { persistor } from "../../";
import Photo from "../atoms/Photo";
import { userLogout } from "../../store/userSlice";
import Subtitle from "../atoms/Subtitle";
import Menu from "../atoms/Menu";
import { useNavigate } from "react-router-dom";
import Filter from "../molecules/Filter";
import Topic from "../atoms/Topic";
import Title from "../atoms/Title";
import MenuButton from "../atoms/MenuButton";
import { useModal } from "../../hooks/useModal";

const StyledSideBarContainer = styled.div`
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 240px;
    height: 100%;
    padding: 90px 20px 0 20px;
    display: flex;
    flex-direction: column;
    align-items: start;
    background-color: white;
    border-right: solid 1px #afafaf;
`;

const StyledSideBar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: space-between; */
    width: 100%;
    height: 100%;
    /* max-width: 1440px; */
    /* min-width: 720px; */
    padding: 20px 0px;
`;

const StyledMenuBar = styled.div`
    width: 100%;
    height: 100%;
    padding: 40px 0px 0 0px;
    display: flex;
    flex-direction: column;
    align-items: start;
    /* margin-left: 30px; */
`;

const BatterySideBar = ({
    className = "", // class
    filter,
    set_filter,
}) => {
    const { showBatteryRegister } = useModal();

    const handleFilter = (option, target) => {
        set_filter({
            ...filter,
            [option]: {
                ...filter[option],
                [target]: {
                    ...filter[option][target],
                    active: !filter[option][target].active,
                },
            },
        });
    };

    return (
        <StyledSideBarContainer>
            <Title>배터리 목록</Title>
            <StyledSideBar className={`BatterySideBar ${className}`}>
                <MenuButton onClick={showBatteryRegister}>
                    배터리 생성
                </MenuButton>

                <StyledMenuBar>
                    <Filter
                        icon="category"
                        name="카테고리"
                        filter={filter.category}
                        handle_filter={(target) =>
                            handleFilter("category", target)
                        }
                    />

                    <Filter
                        icon="info"
                        name="요청"
                        filter={filter.request}
                        handle_filter={(target) =>
                            handleFilter("request", target)
                        }
                    />

                    <Filter
                        icon="license"
                        name="검증 여부"
                        filter={filter.isVerified}
                        handle_filter={(target) =>
                            handleFilter("isVerified", target)
                        }
                    />

                    <Filter
                        icon="raw_on"
                        name="상태"
                        filter={filter.status}
                        handle_filter={(target) =>
                            handleFilter("status", target)
                        }
                    />
                </StyledMenuBar>
            </StyledSideBar>
        </StyledSideBarContainer>
    );
};

export default BatterySideBar;
