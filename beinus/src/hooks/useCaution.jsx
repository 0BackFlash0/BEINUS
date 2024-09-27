import Button from "../components/atoms/Button";
import React, { createContext, useState, useContext } from "react";
import styled from "styled-components";
import Topic from "../components/atoms/Topic";
import Content from "../components/atoms/Content";
import Subtitle from "../components/atoms/Subtitle";

// Context 생성
const ModalContext = createContext();

const StyledBackdrop = styled.div`
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledCautionContainer = styled.div`
    z-index: 3;
    position: relative;
    border-radius: 20px;
    /* width: 480px; */
    /* height: 240px; */
    padding: 40px 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    background-color: white;
`;

// ModalProvider: 모달 상태를 관리하는 컴포넌트
export const ModalProvider = ({ children }) => {
    const [modalContent, setModalContent] = useState(null);

    const showCaution = (content) => {
        setModalContent(content);
    };

    const hideCaution = () => {
        setModalContent(null);
    };

    return (
        <ModalContext.Provider
            value={{ modalContent, showCaution, hideCaution }}
        >
            {children}
            {modalContent && (
                <StyledBackdrop className="modal-backdrop">
                    <StyledCautionContainer className="caution">
                        <Subtitle>{modalContent}</Subtitle>
                        <Button onClick={hideCaution}>확인</Button>
                    </StyledCautionContainer>
                </StyledBackdrop>
            )}
        </ModalContext.Provider>
    );
};

// 커스텀 hook으로 쉽게 context 사용
export const useCaution = () => {
    return useContext(ModalContext);
};
