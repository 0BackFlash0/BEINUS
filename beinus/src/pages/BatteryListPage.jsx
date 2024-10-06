import GNB from "../components/organisms/GNB";
import PageTemplate from "../components/templates/PageTemplate";
import { useState } from "react";
import React from "react";
import Photo from "../components/atoms/Photo";
import styled from "styled-components";
import Anchor from "../components/atoms/Anchor";
import { queryAllBatteries } from "../services/additional_api";
import { useEffect } from "react";
import BatterySideBar from "../components/organisms/BatterySideBar";
import { useCaution } from "../hooks/useCaution";
import BatteryCard from "../components/molecules/BatteryCard";
import SearchingFilter from "../components/molecules/SearchingFilter";
import BatteryInfoBar from "../components/organisms/BatteryInfoBar";
import { useModal } from "../hooks/useModal";
import useInput from "../hooks/useInput";

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

const StyledContentContainer = styled.div`
    padding: 20px 30px 0 30px;
    margin-top: 60px;
    margin-left: 240px;
    width: calc(100% - 240px);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
`;

const StyledSearchingContainer = styled.div`
    position: fixed;
    z-index: 3;
    width: calc(100% - 240px);
    top: 70px;
    left: 240px;
    padding: 10px 20px;
    border-bottom: solid 1px #666f7c;
    background-color: white;
`;

const StyledListContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
`;

const BatteryFilter = {
    category: {
        "Electric Vehicle Battery": {
            active: true,
            name: "전기차",
            icon: "electric_car",
            filtering: (target) =>
                target.category === "Electric Vehicle Battery",
        },
    },
    request: {
        request_maintain: {
            active: true,
            icon: "info",
            color: "red",
            name: "유지보수 요청",
            filtering: (target) => target.isRequestMaintain === true,
        },
        request_analysis: {
            active: true,
            icon: "info",
            color: "blue",
            name: "분석 요청",
            filtering: (target) => target.isRequestAnalysis === true,
        },
        request_none: {
            active: true,
            name: "요청 없음",
            filtering: (target) =>
                target.isRequestMaintain === false &&
                target.isRequestAnalysis === false,
        },
    },
    isVerified: {
        verified: {
            active: true,
            icon: "license",
            color: "#1ED760",
            name: "검증됨",
            filtering: (target) => target.verified === "VERIFIED",
        },
        not_verified: {
            active: true,
            icon: "unlicense",
            color: "red",
            name: "검증되지 않음",
            filtering: (target) => target.verified === "UN-VERIFIED",
        },
    },
    status: {
        original: {
            active: true,
            icon: "raw_on",
            name: "원본",
            filtering: (target) => target.status === "Original",
        },
        disassembled: {
            active: true,
            icon: "raw_off",
            name: "분해됨",
            filtering: (target) => target.status === "Disassembled",
        },
    },
};

const BatteryListPage = () => {
    const { showCaution } = useCaution();

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

    const [filter, setFilter] = useState(BatteryFilter);

    const [inputFilter, setInputFilter] = useInput({
        input_filter: "",
    });

    const [loading, setLoading] = useState(true);

    const [infoBattery, setInfoBattery] = useState(null);

    useEffect(() => {
        queryAllBatteries()
            .then((response) => {
                if (response.status === 200) {
                    setData({
                        ...data,
                        battery_list: response.data.map((element, idx) => {
                            console.log(element);
                            return {
                                img: "./assets/test.png",
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

    const isFiltering = (battery) => {
        let is_valid = true;

        Object.entries(filter).forEach(([category, option]) => {
            let filter_valid = false;
            console.log(option);
            Object.entries(option).forEach(([key, value]) => {
                if (value.active) {
                    filter_valid = filter_valid || value.filtering(battery);
                }
            });
            console.log(battery);
            is_valid = filter_valid && is_valid;
        });

        console.log(is_valid);

        return is_valid;
    };

    if (loading) {
        return <></>;
    }

    return (
        <PageTemplate className="battery-list-page">
            <GNB />
            {/* <ModalTemplate
                ismodalopen={isModalOpen}
                set_ismodalopen={() => setIsModalOpen(true)}
            >
                <BatteryRegisterModal
                    on_success={() => setIsModalOpen(false)}
                    on_close={() => setIsModalOpen(false)}
                />
            </ModalTemplate> */}
            <BatterySideBar filter={filter} set_filter={setFilter} />
            {infoBattery && (
                <BatteryInfoBar
                    battery={infoBattery}
                    handle_close={() => {
                        setInfoBattery(null);
                    }}
                />
            )}

            <StyledSearchingContainer>
                <SearchingFilter
                    id="input_filter"
                    name="input_filter"
                    value={inputFilter.input_filter}
                    onChange={setInputFilter}
                />
            </StyledSearchingContainer>
            <StyledContentContainer>
                <StyledListContainer>
                    {data.battery_list.map((element, idx) => {
                        if (
                            isFiltering(element) &&
                            (inputFilter.input_filter === "" ||
                                element.id.indexOf(inputFilter.input_filter) >=
                                    0)
                        ) {
                            return (
                                <BatteryCard
                                    key={idx}
                                    id={element.id}
                                    img={element.img}
                                    category={element.category}
                                    status={element.status}
                                    verified={element.verified}
                                    isRequestAnalysis={
                                        element.isRequestAnalysis
                                    }
                                    isRequestMaintain={
                                        element.isRequestMaintain
                                    }
                                    date={element.date}
                                    onClick={() => setInfoBattery(element)}
                                />
                            );
                        }
                    })}
                </StyledListContainer>
            </StyledContentContainer>
        </PageTemplate>
    );
};

export default BatteryListPage;
