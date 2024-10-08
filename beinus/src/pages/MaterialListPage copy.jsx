import GNB from "../components/organisms/GNB";
import PageTemplate from "../components/templates/PageTemplate";
import { useState } from "react";
import React from "react";
import Table from "../components/organisms/Table";
import Photo from "../components/atoms/Photo";
import Button from "../components/atoms/Button";
import Topic from "../components/atoms/Topic";
import styled from "styled-components";
import PopupAnchor from "../components/atoms/PopupAnchor";
import ModalTemplate from "../components/templates/ModelTemplate";
import MaterialRegisterModal from "../components/organisms/MaterialRegisterModal";
import { queryAllMaterials } from "../services/additional_api";
import { useEffect } from "react";
import { useCaution } from "../hooks/useCaution";
import MaterialSideBar from "../components/organisms/MaterialSideBar";
import { useNavigate } from "react-router-dom";

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
        cell: ({ getValue }) => (
            <PopupAnchor
                to={`/material_detail/${getValue()}`}
                name={"원자재 상세 정보"}
                feature={"width=640,height=640"}
            >
                {getValue()}
            </PopupAnchor>
        ),
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

const MaterialListPage = () => {
    const navigate = useNavigate();
    const { showCaution } = useCaution();

    const [data, setData] = useState({
        material_list: [
            {
                image: "-",
                id: "-",
                type: "-",
                amount: "-",
                status: "-",
            },
        ],
    });
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        queryAllMaterials()
            .then((response) => {
                setData({
                    ...data,
                    material_list: response.data.map((element) => {
                        return {
                            id: element.materialID,
                            type: element.name,
                            amount: element.quantity,
                            status: element.status,
                        };
                    }),
                });
                setLoading(false);
            })
            .catch((error) => {
                if (error.navigate) {
                    showCaution(`${error.message}`, () => {
                        navigate("/login");
                    });
                } else {
                    showCaution(`${error.message}`);
                }
            });
    }, []);

    if (loading) {
        return <></>;
    }

    return (
        <PageTemplate className="battery-list-page">
            <GNB />
            <ModalTemplate
                ismodalopen={isModalOpen}
                set_ismodalopen={setIsModalOpen}
            >
                <MaterialRegisterModal
                    on_success={() => setIsModalOpen(false)}
                    on_close={() => setIsModalOpen(false)}
                />
            </ModalTemplate>
            <MaterialSideBar handle_modal={setIsModalOpen} />
            <StyledUpperContainer>
                <Topic>원자재 목록</Topic>
                <Button onClick={() => setIsModalOpen(true)}>
                    원자재 등록
                </Button>
            </StyledUpperContainer>
            <Table name="이름" data={data.material_list} columns={column} />
        </PageTemplate>
    );
};

export default MaterialListPage;
