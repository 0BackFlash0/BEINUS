import React from "react";
import styled from "styled-components";
import Label from "../atoms/Label";
import Button from "../atoms/Button";
import Anchor from "../atoms/Anchor";
import Line from "../atoms/Line";
import Icon from "../atoms/Icon";
// import { useSelector, useDispatch } from "react-redux";
// import { persistor } from "../../App";
import Photo from "../atoms/Photo";

const StyledNavationContainer = styled.div`
    position: fixed;
    z-index: 1;
    top: 0;
    width: 100%;
    height: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledNavigationBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1440px;
    height: 100%;
    padding: 0 40px;
    background-color: white;
`;

const StyledLeftBar = styled.div`
    flex-grow: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const StyledRightBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const GNB = ({
    className = "", // class
}) => {
    // const user = useSelector((state) => state.user);
    // const dispatch = useDispatch();

    // const puerge = async () => {
    //     await persistor.purge();
    // };
    return (
        <StyledNavationContainer>
            <StyledNavigationBar className={`GNB ${className}`}>
                <StyledLeftBar className={`Left-GNB`}>
                    <Anchor to="/">
                        <Photo
                            src="/assets/logo.png"
                            alt="로고"
                            objectfit="cover"
                            height="50px"
                        />
                    </Anchor>
                </StyledLeftBar>
                <StyledRightBar className={`Right-GNB`}>
                    <Anchor to="/login">
                        <Icon className="fs-1" icon="login" size="40px" />
                    </Anchor>
                    {/* {user.isLogin ? (
                    <>
                        <Label className="d-block pe-2">{user.user}님 </Label>
                        <Button
                            className="bg-transparent"
                            onClick={async () => {
                                // dispatch(userLogout());
                                // setTimeout(() => puerge(), 200);
                                // localStorage.removeItem("token");
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
                </StyledRightBar>
            </StyledNavigationBar>
        </StyledNavationContainer>
    );
};

export default GNB;