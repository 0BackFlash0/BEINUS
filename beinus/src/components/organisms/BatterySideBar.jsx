import React from "react";
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
import Menu from "../molecules/Menu";
import { useNavigate } from "react-router-dom";
import DropDownMenu from "../molecules/DropDownMenu";
import Topic from "../atoms/Topic";
import Title from "../atoms/Title";

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
    border-right: solid 1px black;
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
    gap: 5px;
`;

const CategoryOptions = [
    {
        name: "전기차",
    },
];

const RequestOptions = [
    {
        name: "유지보수 요청",
    },
    {
        name: "분석 요청",
    },
    {
        name: "요청 없음",
    },
];

const BatterySideBar = ({
    className = "", // class
    handle_modal,
}) => {
    return (
        <StyledSideBarContainer>
            <Title>배터리 목록</Title>
            <StyledSideBar className={`BatterySideBar ${className}`}>
                <Button onClick={() => handle_modal(true)}>배터리 생성</Button>

                <StyledMenuBar>
                    <DropDownMenu
                        icon="battery_0_bar"
                        name="카테고리"
                        list={CategoryOptions}
                    />

                    <DropDownMenu
                        icon="info"
                        name="요청"
                        list={RequestOptions}
                    />
                </StyledMenuBar>
            </StyledSideBar>
        </StyledSideBarContainer>
    );
};

export default BatterySideBar;
