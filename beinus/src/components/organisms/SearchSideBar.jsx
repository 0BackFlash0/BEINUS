import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
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
import {
    requestAnalysis,
    requestMaintenance,
} from "../../services/additional_api";
import { useCaution } from "../../hooks/useCaution";

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
    gap: 7px;
`;

const StyledMenuButton = styled.button`
    width: 100%;
    padding: 0;
    margin: 2px 0;
    display: flex;
    flex-direction: row;
    align-items: center;

    border-style: none;
    border-radius: 10px;
    background: none;

    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.hover_color || "#ebebeb"};
    }
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

const SearchSideBar = ({
    className = "", // class
    battery_id,
    handle_scroll,
}) => {
    const { showCaution } = useCaution();
    const { showBatteryAnalysis, showBatteryMaintain, showMaterialExtract } =
        useModal();

    const handleRequestMaintenance = () => {
        requestMaintenance({
            batteryID: battery_id,
        })
            .then((response) => {
                if (response.status === 200) {
                    showCaution(`유지보수 요청 성공. \n ID: ${battery_id}`);
                } else {
                    showCaution("알수없는 에러가 발생했습니다.");
                }
            })
            .catch((response) => {
                showCaution(`에러가 발생했습니다. \n ${response.data.error}`);
            });
    };

    const handleRequestAnalysis = () => {
        requestAnalysis({
            batteryID: battery_id,
        })
            .then((response) => {
                if (response.status === 200) {
                    showCaution(`분석 요청 성공. \n ID: ${battery_id}`);
                } else {
                    showCaution("알수없는 에러가 발생했습니다.");
                }
            })
            .catch((response) => {
                showCaution(`에러가 발생했습니다. \n ${response.data.error}`);
            });
    };

    return (
        <StyledSideBarContainer>
            <Title>배터리 정보</Title>
            <StyledSideBar className={`SearchSideBar ${className}`}>
                <MenuButton onClick={handleRequestMaintenance}>
                    유지보수 요청
                </MenuButton>
                <MenuButton
                    onClick={() => {
                        showBatteryMaintain(battery_id);
                    }}
                >
                    유지보수 기록 작성
                </MenuButton>
                <MenuButton onClick={handleRequestAnalysis}>
                    분석 요청
                </MenuButton>
                <MenuButton
                    onClick={() => {
                        showBatteryAnalysis(battery_id);
                    }}
                >
                    재활용여부 분석
                </MenuButton>
                <MenuButton
                    onClick={() => {
                        showMaterialExtract(battery_id);
                    }}
                >
                    원자재 추출
                </MenuButton>

                <StyledMenuBar>
                    <StyledMenuButton onClick={() => handle_scroll(0)}>
                        <Menu icon="battery_0_bar">배터리</Menu>
                    </StyledMenuButton>
                    <StyledMenuButton onClick={() => handle_scroll(1)}>
                        <Menu icon="factory">제조</Menu>
                    </StyledMenuButton>
                    <StyledMenuButton onClick={() => handle_scroll(2)}>
                        <Menu icon="data_usage">원자재</Menu>
                    </StyledMenuButton>
                    <StyledMenuButton onClick={() => handle_scroll(3)}>
                        <Menu icon="speed">성능</Menu>
                    </StyledMenuButton>
                    <StyledMenuButton onClick={() => handle_scroll(4)}>
                        <Menu icon="info">요청</Menu>
                    </StyledMenuButton>
                </StyledMenuBar>
            </StyledSideBar>
        </StyledSideBarContainer>
    );
};

export default SearchSideBar;
