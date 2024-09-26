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
import BatteryRegisterModal from "../components/organisms/BatteryRegisterModal";
import { getBatteryList } from "../services/api";
import { useEffect } from "react";

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
        id: "model",
        header: "모델",
        accessorFn: (row) => {
            return row.model;
        },
        size: 200,
    },
    {
        id: "category",
        header: "카테고리",
        accessorFn: (row) => row.category,
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
        cell: ({ getValue }) => <Anchor to={`/search/${getValue()}`}>{getValue()}</Anchor>,
        size: 600,
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

const BatteryListPage = () => {

    const [data, setData] = useState({
        battery_list: [
            {
                image: "-",
                id: "-",
                model: "-",
                category: "-",
                status: "-",
            }
        ]
    });
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        getBatteryList()
            .then((response) => {
                return response.data;
            })
            .then((data) => {
                if (data.success) {
                    setData({
                        ...data,
                        battery_list: data.battery_list,
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
        <PageTemplate className="battery-list-page">
            <GNB />
            <ModalTemplate
                isModalOpen={isModalOpen}
                setIsModalOpen={closeModal}
            >
                <BatteryRegisterModal
                    onSuccess={closeModal}
                    onClose={closeModal}
                />
            </ModalTemplate>
            <StyledUpperContainer>
                <Topic>배터리 목록</Topic>
                <Button onClick={openModal}>배터리 생성</Button>
            </StyledUpperContainer>
            <Table name="이름" data={data.battery_list} columns={column} />
        </PageTemplate>
    );
};

export default BatteryListPage;
