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

const StyledNavationContainer = styled.div`
    position: fixed;
    z-index: 1;
    top: 0;
    width: 240px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledNavigationBar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: space-between; */
    width: 100%;
    height: 100%;
    /* max-width: 1440px; */
    /* min-width: 720px; */
    padding: 20px 0px;
    background-color: #f7f7f5;
`;

const StyledUpperBar = styled.div`
    flex-grow: 1;
    width: 100%;
    height: 100%;
    padding: 20px 10px 0 10px;
    flex-grow: 0;
    display: flex;
    flex-direction: column;
    align-items: start;
`;

const StyledLowerBar = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
`;

const StyledMenuBar = styled.div`
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: start;
    /* margin-left: 30px; */
    gap: 15px;
`;

const GNB = ({
    className = "", // class
}) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const puerge = async () => {
        await persistor.purge();
    };
    return (
        <StyledNavationContainer>
            <StyledNavigationBar className={`GNB ${className}`}>
                <Anchor to="/">
                    <Photo
                        src="/assets/logo.png"
                        alt="로고"
                        objectfit="cover"
                        width="220px"
                    />
                </Anchor>
                <StyledUpperBar className={`Left-GNB`}>
                    <StyledMenuBar>
                        <Anchor to="/battery">
                            <Subtitle>배터리</Subtitle>
                        </Anchor>
                        {/* <Line is_horizontal={false} margin="20px" /> */}
                        <Anchor to="/material">
                            <Subtitle>원자재</Subtitle>
                        </Anchor>
                    </StyledMenuBar>
                </StyledUpperBar>
                <StyledLowerBar className={`Right-GNB`}>
                    <Anchor to="/login">
                        <Menu icon="login">로그인</Menu>
                    </Anchor>
                    {/* {user.isLogin ? (
                        <>
                            <Label className="d-block pe-2">
                                {user.user}님{" "}
                            </Label>
                            <Button
                                className="bg-transparent"
                                onClick={async () => {
                                    dispatch(userLogout());
                                    setTimeout(() => puerge(), 200);
                                    localStorage.removeItem("token");
                                }}
                            >
                                로그아웃
                            </Button>
                        </>
                    ) : (
                        <Anchor className="fw-bold" to="/login">
                            로그인
                        </Anchor>
                    )} */}
                </StyledLowerBar>
            </StyledNavigationBar>
        </StyledNavationContainer>
    );
};

export default GNB;
