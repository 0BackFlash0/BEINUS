import React, { useEffect } from "react";
import styled from "styled-components";
import Label from "../atoms/Label";
import Button from "../atoms/Button";
import Anchor from "../atoms/Anchor";
import Line from "../atoms/Line";
import Title from "../atoms/Title";
import Icon from "../atoms/Icon";
import { useSelector, useDispatch } from "react-redux";
import { persistor } from "../../";
import Photo from "../atoms/Photo";
import { userLogout } from "../../store/userSlice";
import Subtitle from "../atoms/Subtitle";

const StyledNavationContainer = styled.div`
    position: fixed;
    z-index: 5;
    top: 0;
    width: 100%;
    height: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: solid 1px #afafaf;
`;

const StyledNavigationBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    /* max-width: 1440px; */
    min-width: 720px;
    height: 100%;
    padding: 0 40px;
    background-color: white;
`;

const StyledLeftBar = styled.div`
    height: 100%;
    flex-grow: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const StyledRightBar = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 30px;
`;

const StyledMenuBar = styled.div`
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 30px;
    gap: 15px;
`;

const StyledLogout = styled(Icon)`
    cursor: pointer;
`;

const StyledUserName = styled.div`
    display: inline;
    margin: 0;
    padding: 0;
    color: blue;
`;

const GNB = ({
    className = "", // class
}) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const puerge = async () => {
        await persistor.purge();
    };

    const loginTime = useSelector((state) => state.user.time);
    const isLogin = useSelector((state) => state.user.isLogin);

    useEffect(() => {
        if (isLogin && loginTime) {
            const currentTime = new Date();
            const diff = currentTime.getTime() - new Date(loginTime).getTime();
            if (diff > 3600000) {
                // 1시간 = 3600000밀리초
                dispatch(userLogout());
                localStorage.removeItem("token");
            }
        }
    }, [isLogin, loginTime, dispatch]);

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
                    <StyledMenuBar>
                        <Anchor to="/battery">
                            <Title>배터리</Title>
                        </Anchor>
                        {/* <Line is_horizontal={false} margin="20px" /> */}
                        <Anchor to="/material">
                            <Title>원자재</Title>
                        </Anchor>
                    </StyledMenuBar>
                </StyledLeftBar>
                <StyledRightBar className={`Right-GNB`}>
                    {user.isLogin ? (
                        <>
                            <Title>
                                <StyledUserName>{user.user}</StyledUserName>님
                            </Title>
                            <StyledLogout
                                icon="logout"
                                size="40px"
                                onClick={async () => {
                                    dispatch(userLogout());
                                    setTimeout(() => puerge(), 200);
                                    localStorage.removeItem("token");
                                }}
                            />
                            {/* <Button
                                className="bg-transparent"
                                onClick={async () => {
                                    dispatch(userLogout());
                                    setTimeout(() => puerge(), 200);
                                    localStorage.removeItem("token");
                                }}
                            >
                                로그아웃
                            </Button> */}
                        </>
                    ) : (
                        <Anchor to="/login">
                            <Icon icon="login" size="40px" />
                        </Anchor>
                    )}
                </StyledRightBar>
            </StyledNavigationBar>
        </StyledNavationContainer>
    );
};

export default GNB;
