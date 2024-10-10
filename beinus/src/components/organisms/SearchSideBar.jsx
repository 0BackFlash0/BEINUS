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
import DropDown from "../molecules/DropDown";
import FlexCarousel from "../molecules/FlexCarousel";

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
    gap: 20px;
`;

const StyledMenuInfo = styled.div`
    width: 100%;
    padding: 0 10px 0 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const StyledHead = styled.h5`
    margin: 1px 6px;
    font-size: 11pt;
    font-weight: 600;
    color: #666666;
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
    is_verified = false,
    is_requested_maintenance = false,
    is_requested_analysis = false,
    recycle_availability = false,
    maintenance_log,
}) => {
    const { showCaution } = useCaution();
    const { showBatteryAnalysis, showBatteryMaintain, showMaterialExtract } =
        useModal();

    const handleRequestMaintenance = () => {
        requestMaintenance({
            batteryID: battery_id,
        })
            .then((response) => {
                showCaution(
                    `해당 배터리에 대해 유지보수를 요청했습니다. \n ID: ${battery_id}`
                );
            })
            .catch((error) => {
                showCaution(`${error.message}`);
            });
    };

    const handleRequestAnalysis = () => {
        requestAnalysis({
            batteryID: battery_id,
        })
            .then((response) => {
                showCaution(
                    `해당 배터리에 대해 분석을 요청했습니다. \n ID: ${battery_id}`
                );
            })
            .catch((error) => {
                showCaution(`${error.message}`);
            });
    };

    return (
        <StyledSideBarContainer>
            <Title>배터리 정보</Title>
            <StyledSideBar className={`SearchSideBar ${className}`}>
                <DropDown icon="license" name="검증">
                    <StyledMenuInfo>
                        <StyledHead>검증여부</StyledHead>
                        <StyledHead>{is_verified ? "O" : "X"}</StyledHead>
                    </StyledMenuInfo>
                    {is_verified ? (
                        ""
                    ) : (
                        <MenuButton onClick={handleRequestMaintenance}>
                            검증
                        </MenuButton>
                    )}
                </DropDown>
                <DropDown icon="handyman" name="유지보수">
                    <StyledMenuInfo>
                        <StyledHead>유지보수 요청</StyledHead>
                        <StyledHead>
                            {is_requested_maintenance ? "O" : "X"}
                        </StyledHead>
                    </StyledMenuInfo>
                    {is_requested_maintenance ? (
                        ""
                    ) : (
                        <MenuButton onClick={handleRequestMaintenance}>
                            유지보수 요청
                        </MenuButton>
                    )}
                    <DropDown icon="handyman" name="유지보수 기록">
                        <FlexCarousel>
                            <StyledMenuInfo>
                                <StyledHead>일자</StyledHead>
                                <StyledHead>
                                    {recycle_availability ? "O" : "X"}
                                </StyledHead>
                            </StyledMenuInfo>
                        </FlexCarousel>

                        <MenuButton
                            onClick={() => {
                                showBatteryMaintain(battery_id);
                            }}
                        >
                            유지보수 기록 작성
                        </MenuButton>
                    </DropDown>
                </DropDown>
                <DropDown icon="search_insights" name="재활용 / 분석">
                    <StyledMenuInfo>
                        <StyledHead>분석 요청</StyledHead>
                        <StyledHead>
                            {is_requested_analysis ? "O" : "X"}
                        </StyledHead>
                    </StyledMenuInfo>
                    {is_requested_maintenance ? (
                        <MenuButton
                            onClick={() => {
                                showBatteryAnalysis(battery_id);
                            }}
                        >
                            재활용여부 분석
                        </MenuButton>
                    ) : (
                        <MenuButton onClick={handleRequestAnalysis}>
                            분석 요청
                        </MenuButton>
                    )}

                    <StyledMenuInfo>
                        <StyledHead>재활용 가능 여부</StyledHead>
                        <StyledHead>
                            {recycle_availability ? "O" : "X"}
                        </StyledHead>
                    </StyledMenuInfo>
                    {recycle_availability ? (
                        <MenuButton
                            onClick={() => {
                                showMaterialExtract(battery_id);
                            }}
                        >
                            원자재 추출
                        </MenuButton>
                    ) : (
                        ""
                    )}
                </DropDown>
            </StyledSideBar>
        </StyledSideBarContainer>
    );
};

export default SearchSideBar;
