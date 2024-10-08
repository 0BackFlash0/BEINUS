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

const StyledRequestContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: end;
`;

const StyledContentContainer = styled.div`
    display: flex;
    gap: 5px;
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

const StyledSmallButton = styled.button`
    display: inline-block;
    background-color: #ff2600;
    border-style: none;
    border-radius: 4px;
    padding: 2px;
    /* width: 120px; */
    height: auto;
    font-size: 8pt;
    font-weight: 500;
    color: white;

    &:hover {
        background-color: #13c752;
    }
`;

const StyledRow = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 4px 0;
    border-bottom: 1px solid #c9c9c9;
`;

const StyledLabel = styled.div`
    font-size: 11pt;
    color: #666f7c;
    padding: 2px 0;
    margin: 0;
`;

const StyledTitle = styled.div`
    font-size: 11pt;
    color: #1a1a1a;
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
                    <StyledTitle>Category</StyledTitle>
                    <StyledLabel>{battery.category}</StyledLabel>
                </StyledRow>
                <StyledRow>
                    <StyledTitle>Verification</StyledTitle>
                    <StyledLabel>{battery.verified}</StyledLabel>
                </StyledRow>
                <StyledRow>
                    <StyledTitle>Status</StyledTitle>
                    <StyledContentContainer>
                        <StyledLabel>{battery.status}</StyledLabel>
                    </StyledContentContainer>
                </StyledRow>

                <StyledRow>
                    <StyledTitle>Maintenance Request</StyledTitle>
                    <StyledLabel>
                        <StyledContentContainer>
                            {battery.isRequestMaintain ? "O" : "X"}
                            <StyledSmallButton>Req</StyledSmallButton>
                        </StyledContentContainer>
                    </StyledLabel>
                </StyledRow>

                <StyledRow>
                    <StyledTitle>Analysis Request</StyledTitle>
                    <StyledLabel>
                        {battery.isRequestAnalysis ? "O" : "X"}
                    </StyledLabel>
                </StyledRow>
                <StyledRow>
                    <StyledTitle>Created Date</StyledTitle>
                    <StyledLabel>{battery.date}</StyledLabel>
                </StyledRow>
                <StyledRequestContainer>
                    {/* <StyledSmallButton>Maintenance Request</StyledSmallButton> */}
                </StyledRequestContainer>
                <StyledButtonContainer>
                    <Button onClick={() => navigate(`/search/${battery.id}`)}>
                        Detail Inquiry
                    </Button>
                </StyledButtonContainer>
            </StyledInfoBar>
        </StyledInfoBarContainer>
    );
};

export default BatteryInfoBar;
