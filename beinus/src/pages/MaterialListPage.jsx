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
import { useNavigate } from "react-router-dom";
import SearchingBar from "../components/molecules/SearchingBar";
import MaterialCard from "../components/molecules/MaterialCard";
import MaterialSideBar from "../components/organisms/MaterialSideBar";

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

const StyledContentContainer = styled.div`
    padding: 10px 30px;
    margin-left: 240px;
    width: calc(100% - 240px);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
`;

const StyledListContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
`;

const MaterialListPage = () => {
    const { showCaution } = useCaution();
    const navigate = useNavigate();

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
                console.log(response);
                if (response.status === 200) {
                    setData({
                        ...data,
                        material_list: [
                            ...response.data.newMaterials.map((element) => {
                                return {
                                    id: element.materialID,
                                    type: element.name,
                                    amount: element.quantity,
                                    verified: element.verified,
                                    isRecycled: element.status,
                                    date: element.timestamp.slice(0, 10),
                                };
                            }),
                            ...response.data.recycledMaterials.map(
                                (element) => {
                                    return {
                                        id: element.materialID,
                                        type: element.name,
                                        amount: element.quantity,
                                        verified: element.verified,
                                        isRecycled: element.status,
                                        date: element.timestamp.slice(0, 10),
                                    };
                                }
                            ),
                        ],
                    });
                    console.log(response.data);
                    setLoading(false);
                } else {
                    showCaution("알수없는 에러가 발생했습니다.");
                }
            })
            .catch((response) => {
                // showCaution(`에러가 발생했습니다. \n ${response.data.error}`);
                console.log(response);
            });
    }, []);

    const openPopup = (batteryID) => {
        const popupWindow = window.open(
            `/material_detail/${batteryID}`,
            "원자재 상세 정보",
            "width=640,height=640"
        );
        if (popupWindow) {
            popupWindow.focus();
        }
    };

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
            <StyledContentContainer>
                <SearchingBar />
                <StyledListContainer>
                    {data.material_list.map((element, idx) => {
                        console.log(data.material_list);
                        return (
                            <MaterialCard
                                key={idx}
                                id={element.id}
                                type={element.type}
                                verified={element.verified}
                                isRecycled={element.isRecycled}
                                amount={element.amount}
                                date={element.date}
                                onClick={() => openPopup(element.id)}
                            />
                        );
                    })}
                </StyledListContainer>
            </StyledContentContainer>
        </PageTemplate>
    );
};

export default MaterialListPage;
