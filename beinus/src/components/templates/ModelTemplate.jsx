import React, { useState } from "react";
import styled from "styled-components";

const StyledModalContainer = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 500px;
    width: 100%;
`;

const StyledBackdrop = styled.div`
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalTemplate = ({
    isModalOpen,
    setIsModalOpen,
    children,
    className = "",
    ...props
}) => {
    // 모달 열기

    // 모달 닫기
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        isModalOpen && (
            <StyledBackdrop className="modal-backdrop">
                <StyledModalContainer
                    className={`modal ${className}`}
                    {...props}
                >
                    <h2>모달 제목</h2>
                    <p>모달 내용이 여기에 들어갑니다.</p>
                    <button onClick={closeModal}>모달 닫기</button>
                    {children}
                </StyledModalContainer>
            </StyledBackdrop>
        )
    );
};

export default ModalTemplate;
