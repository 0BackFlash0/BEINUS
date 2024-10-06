import React, { useEffect, useState } from "react";
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
import { queryMaterial } from "../../services/additional_api";

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

const MaterialImage = {
    Lithium: "./assets/lithium.jpg",
    Cobalt: "./assets/cobalt.jpg",
    Manganese: "./assets/manganese.jpg",
    Nickel: "./assets/nickel.jpg",
};

const MaterialInfoBar = ({
    className = "", // class
    material_id,
    handle_close,
}) => {
    const [data, setData] = useState({
        materialID: "-",
        supplierID: "-",
        name: "-",
        quantity: 0,
        status: "-",
        available: "-",
        verified: "-",
        timestamp: "-",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        queryMaterial({
            materialID: material_id,
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log(response);
                    setData({
                        ...data,
                        ...response.data.rawMaterial,
                    });
                    setLoading(false);
                } else {
                    console.log("error");
                }
            })
            .catch((response) => {
                console.log(response);
            });
    }, []);

    if (loading) {
        return <></>;
    }

    return (
        <StyledInfoBarContainer>
            <StyledInfoBar className={`MaterialInfoBar ${className}`}>
                <CloseButton>
                    <Icon icon="close" onClick={handle_close} />
                </CloseButton>
                <StyledImgContainer>
                    <Photo src={MaterialImage[data.name]} height="60px" />
                </StyledImgContainer>
                <Line margin="15px" />
                <StyledRow>
                    <StyledTitle>ID</StyledTitle>
                    <StyledLabel>{data.materialID}</StyledLabel>
                </StyledRow>

                <StyledRow>
                    <StyledTitle>공급자 ID</StyledTitle>
                    <StyledLabel>{data.supplierID}</StyledLabel>
                </StyledRow>
                <StyledRow>
                    <StyledTitle>종류</StyledTitle>
                    <StyledLabel>{data.name}</StyledLabel>
                </StyledRow>
                <StyledRow>
                    <StyledTitle>수량</StyledTitle>
                    <StyledLabel>{data.quantity}</StyledLabel>
                </StyledRow>
                <StyledRow>
                    <StyledTitle>검증여부</StyledTitle>
                    <StyledLabel>{data.verified}</StyledLabel>
                </StyledRow>
                <StyledRow>
                    <StyledTitle>상태</StyledTitle>
                    <StyledLabel>{data.status}</StyledLabel>
                </StyledRow>

                <StyledRow>
                    <StyledTitle>사용가능 여부</StyledTitle>
                    <StyledLabel>{data.available ? "O" : "X"}</StyledLabel>
                </StyledRow>
                <StyledRow>
                    <StyledTitle>생성 날짜</StyledTitle>
                    <StyledLabel>{data.timestamp}</StyledLabel>
                </StyledRow>
                <StyledButtonContainer></StyledButtonContainer>
            </StyledInfoBar>
        </StyledInfoBarContainer>
    );
};

export default MaterialInfoBar;
