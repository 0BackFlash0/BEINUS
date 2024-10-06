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
import SearchingFilter from "../components/molecules/SearchingFilter";
import useInput from "../hooks/useInput";
import MaterialInfoBar from "../components/organisms/MaterialInfoBar";

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
    width: calc(100% - 240px);
    z-index: 3;
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

const MaterialFilter = {
    type: {
        lithium: {
            active: true,
            name: "리튬",
            filtering: (target) => target.type === "Lithium",
        },
        cobalt: {
            active: true,
            name: "코발트",
            filtering: (target) => target.type === "Cobalt",
        },
        manganese: {
            active: true,
            name: "망간",
            filtering: (target) => target.type === "Manganese",
        },
        nickel: {
            active: true,
            name: "니켈",
            filtering: (target) => target.type === "Nickel",
        },
    },
    isVerified: {
        verified: {
            active: true,
            icon: "license",
            color: "#1ED760",
            name: "검증됨",
            filtering: (target) => target.verified === "Verified",
        },
        not_verified: {
            active: true,
            icon: "unlicense",
            color: "red",
            name: "검증되지 않음",
            filtering: (target) => target.verified === "",
        },
    },
    status: {
        new: {
            active: true,
            icon: "fiber_new",
            name: "NEW",
            color: "blue",
            filtering: (target) => target.status === "NEW",
        },
        recycled: {
            active: true,
            icon: "recycling",
            color: "#1ED760",
            name: "RECYCLED",
            filtering: (target) => target.status === "Recycled",
        },
    },
};

const MaterialImage = {
    Lithium: "./assets/lithium.jpg",
    Cobalt: "./assets/cobalt.jpg",
    Manganese: "./assets/manganese.jpg",
    Nickel: "./assets/nickel.jpg",
};

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

    const [filter, setFilter] = useState(MaterialFilter);

    const [inputFilter, setInputFilter] = useInput({
        input_filter: "",
    });

    const [infoMaterial, setInfoMaterial] = useState(null);

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
                                    img: MaterialImage[element.name],
                                    type: element.name,
                                    amount: element.quantity,
                                    verified: element.verified,
                                    status: element.status,
                                    date: element.timestamp.slice(0, 10),
                                };
                            }),
                            ...response.data.recycledMaterials.map(
                                (element) => {
                                    return {
                                        id: element.materialID,
                                        img: MaterialImage[element.name],
                                        type: element.name,
                                        amount: element.quantity,
                                        verified: element.verified,
                                        status: element.status,
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
                set_ismodalopen={setIsModalOpen}
            >
                <MaterialRegisterModal
                    on_success={() => setIsModalOpen(false)}
                    on_close={() => setIsModalOpen(false)}
                />
            </ModalTemplate> */}
            <MaterialSideBar filter={filter} set_filter={setFilter} />

            {infoMaterial && (
                <MaterialInfoBar
                    material_id={infoMaterial.id}
                    handle_close={() => {
                        setInfoMaterial(null);
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
                    {data.material_list.map((element, idx) => {
                        if (
                            isFiltering(element) &&
                            (inputFilter.input_filter === "" ||
                                element.id.indexOf(inputFilter.input_filter) >=
                                    0)
                        ) {
                            return (
                                <MaterialCard
                                    key={idx}
                                    id={element.id}
                                    img={element.img}
                                    type={element.type}
                                    verified={element.verified}
                                    status={element.status}
                                    amount={element.amount}
                                    date={element.date}
                                    onClick={() => setInfoMaterial(element)}
                                />
                            );
                        }
                    })}
                </StyledListContainer>
            </StyledContentContainer>
        </PageTemplate>
    );
};

export default MaterialListPage;
