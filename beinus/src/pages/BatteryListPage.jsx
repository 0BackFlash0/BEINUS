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
import { queryAllBatteries } from "../services/additional_api";
import { useEffect } from "react";
import BatterySideBar from "../components/organisms/BatterySideBar";
import { useCaution } from "../hooks/useCaution";
import BatteryCard from "../components/molecules/BatteryCard";
import SearchingBar from "../components/molecules/SearchingBar";
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
        id: "batteryID",
        header: "ID",
        accessorFn: (row) => row.batteryID,
        cell: ({ getValue }) => (
            <Anchor to={`/search/${getValue()}`}>{getValue()}</Anchor>
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

const BatteryListPage = () => {
    const { showCaution } = useCaution();
    const navigate = useNavigate();

    const [data, setData] = useState({
        battery_list: [
            {
                id: "-", // 배터리 id
                category: "-", // 배터리 type
                status: "-",
                verified: false, // 검증 여부
                isRequestMaintain: false, // 유지보수 요청 여부
                isRequestAnalysis: false, // 분석 요청 여부
                date: "-", // 등록 일자
            },
        ],
    });
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        queryAllBatteries()
            .then((response) => {
                if (response.status === 200) {
                    setData({
                        ...data,
                        battery_list: response.data.map((element, idx) => {
                            console.log(element);
                            return {
                                id: element.batteryID,
                                category: element.category,
                                status: element.status,
                                verified: element.Verified,
                                isRequestMaintain: element.maintenanceRequest,
                                isRequestAnalysis: element.analysisRequest,
                                date: element.manufactureDate.slice(0, 10),
                            };
                        }),
                    });
                    console.log(response);
                    setLoading(false);
                } else {
                    showCaution("알수없는 에러가 발생했습니다.");
                }
            })
            .catch((response) => {
                showCaution(`에러가 발생했습니다. \n ${response.data.error}`);
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
                ismodalopen={isModalOpen}
                set_ismodalopen={() => setIsModalOpen(true)}
            >
                <BatteryRegisterModal
                    on_success={() => setIsModalOpen(false)}
                    on_close={() => setIsModalOpen(false)}
                />
            </ModalTemplate>
            <BatterySideBar handle_modal={setIsModalOpen} />
            <StyledContentContainer>
                <SearchingBar />
                <StyledListContainer>
                    {data.battery_list.map((element, idx) => {
                        console.log(data.battery_list);
                        return (
                            <BatteryCard
                                key={idx}
                                id={element.id}
                                category={element.category}
                                status={element.status}
                                verified={element.verified}
                                isRequestAnalysis={element.isRequestAnalysis}
                                isRequestMaintain={element.isRequestMaintain}
                                date={element.date}
                                onClick={() =>
                                    navigate(`/search/${element.id}`)
                                }
                            />
                        );
                    })}
                </StyledListContainer>
            </StyledContentContainer>
        </PageTemplate>
    );
};

export default BatteryListPage;
