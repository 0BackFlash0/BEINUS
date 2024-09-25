import GNB from "../components/organisms/GNB";
import PageTemplate from "../components/templates/PageTemplate";
import { useState } from "react";
import React from "react";
import Table from "../components/organisms/Table";
import Photo from "../components/atoms/Photo";
import Button from "../components/atoms/Button";
import Topic from "../components/atoms/Topic";
import styled from "styled-components";
import Anchor from "../components/atoms/Anchor";
import ModalTemplate from "../components/templates/ModelTemplate";
import MaterialRegisterModal from "../components/organisms/MaterialRegisterModal";

const column = [
    {
        id: "image",
        header: "",
        accessorKey: "image",
        cell: ({ getValue }) => (
            <Photo
                src={getValue()}
                alt={getValue()}
                width="50px"
                height="50px"
            />
        ),
        size: 70,
    },
    {
        id: "type",
        header: "종류",
        accessorFn: (row) => {
            return row.type;
        },
        size: 200,
    },
    {
        id: "amount",
        header: "수량",
        accessorFn: (row) => row.amount,
        size: 200,
    },
    {
        id: "status",
        header: "상태",
        accessorFn: (row) => row.status,
        size: 200,
    },
    {
        id: "id",
        header: "ID",
        accessorFn: (row) => row.id,
        cell: ({ getValue }) => <Anchor to={"/search"}>{getValue()}</Anchor>,
        size: 600,
    },
];

const data = [
    {
        image: "./assets/test.png",
        id: "did:web:acme.battery.pass:0226151e-949c-d067-8ef3-162",
        type: "니켈",
        amount: "200",
        status: "NEW",
    },
    {
        image: "./assets/test.png",
        id: "did:web:acme.battery.pass:0226151e-949c-d067-8ef3-163",
        type: "리튬",
        amount: "200",
        status: "NEW",
    },
];

const StyledUpperContainer = styled.div`
    width: 100%;
    background-color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 0 20px 0;
    padding: 0 40px 0 20px;
`;

const MaterialListPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <PageTemplate className="battery-list-page">
            <GNB />
            <ModalTemplate
                isModalOpen={isModalOpen}
                setIsModalOpen={closeModal}
            >
                <MaterialRegisterModal
                    onSuccess={closeModal}
                    onClose={closeModal}
                />
            </ModalTemplate>
            <StyledUpperContainer>
                <Topic>원자재 목록</Topic>
                <Button onClick={openModal}>원자재 등록</Button>
            </StyledUpperContainer>
            <Table name="이름" data={data} columns={column} />
        </PageTemplate>
    );
};

export default MaterialListPage;
