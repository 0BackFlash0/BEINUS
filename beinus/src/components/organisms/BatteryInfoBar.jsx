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
import Topic from "../atoms/Topic";
import Title from "../atoms/Title";
import MenuButton from "../atoms/MenuButton";

const StyledInfoBarContainer = styled.div`
    position: fixed;
    z-index: 4;
    top: 0;
    right: 0;
    width: 360px;
    height: 100%;
    padding: 100px 15px 0 15px;
    display: flex;
    flex-direction: column;
    align-items: start;
    background-color: white;
    border-right: solid 1px black;
    box-shadow: 0 14px 14px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

const StyledInfoBar = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: space-between; */
    width: 100%;
    height: 100%;
    /* max-width: 1440px; */
    /* min-width: 720px; */
    padding: 20px 0px;
    gap: 3px;
`;

const StyledImgContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    align-items: center;

    border: dotted 1px #666f7c;
    border-radius: 15px;
`;

const StyledButtonContainer = styled.div`
    flex-grow: 1;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px 30px;
    justify-content: end;
    align-items: center;
`;

const CloseButton = styled.button`
    position: absolute;
    display: flex;
    z-index: 4;
    align-items: center;
    justify-content: center;
    right: 0px;
    top: -30px;
    width: 50px;
    height: 50px;
    background-color: transparent;

    border-width: 0;
`;

const StyledRow = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const StyledLabel = styled.div`
    font-size: 12pt;
    color: #666f7c;
    padding: 2px 0;
    margin: 0;
`;

const StyledTitle = styled.div`
    font-size: 10pt;
    color: #666f7c;
    font-weight: 600;
    padding: 2px 0;
    margin: 0;
`;

const BatteryInfoBar = ({
    className = "", // class
    battery,
    handle_close,
}) => {
    const navigate = useNavigate();

    return (
        <StyledInfoBarContainer>
            <StyledInfoBar className={`BatteryInfoBar ${className}`}>
                <CloseButton>
                    <Icon icon="close" onClick={handle_close} />
                </CloseButton>
                <StyledImgContainer>
                    <Photo src={battery.img} height="60px" />
                </StyledImgContainer>
                <Line margin="15px" />
                <StyledRow>
                    <StyledTitle>ID</StyledTitle>
                    <StyledLabel>{battery.id}</StyledLabel>
                </StyledRow>
                <StyledRow>
                    <StyledTitle>카테고리</StyledTitle>
                    <StyledLabel>{battery.category}</StyledLabel>
                </StyledRow>
                <StyledRow>
                    <StyledTitle>검증여부</StyledTitle>
                    <StyledLabel>{battery.verified}</StyledLabel>
                </StyledRow>
                <StyledRow>
                    <StyledTitle>상태</StyledTitle>
                    <StyledLabel>{battery.status}</StyledLabel>
                </StyledRow>

                <StyledRow>
                    <StyledTitle>유지보수 요청</StyledTitle>
                    <StyledLabel>
                        {battery.isRequestMaintain ? "O" : "X"}
                    </StyledLabel>
                </StyledRow>

                <StyledRow>
                    <StyledTitle>분석 요청</StyledTitle>
                    <StyledLabel>
                        {battery.isRequestAnalysis ? "O" : "X"}
                    </StyledLabel>
                </StyledRow>
                <StyledRow>
                    <StyledTitle>생성 날짜</StyledTitle>
                    <StyledLabel>{battery.date}</StyledLabel>
                </StyledRow>
                <StyledButtonContainer>
                    <Button onClick={() => navigate(`/search/${battery.id}`)}>
                        상세정보 조회
                    </Button>
                </StyledButtonContainer>
            </StyledInfoBar>
        </StyledInfoBarContainer>
    );
};

export default BatteryInfoBar;
