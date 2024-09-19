import styled from "styled-components";
import TabBar from "../molecules/TabBar";
import TabInfo from "../molecules/TabInfo";
import React from "react";
import Line from "../atoms/Line";
import TabChart from "../molecules/TabChart";
import TabMultiChart from "../molecules/TabMultiChart";

const StyledBatteryInfoContainer = styled.div`
    width: 100%;
    min-width: 900px;
    max-width: 1440px;
    margin: 30px 0 0 0;
    border-radius: 10px 10px 10px 10px;
    border-width: 1px 1px 0 1px;
    border-style: dashed;
`;

const StyledTabContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 0 0 10px 10px;
    padding: 15px;
    gap: 10px;
    background-color: #edffed;
`;

const tabBars = [
    {
        icon: "./assets/test.png",
        name: "배터리 정보",
        key: "battery_info",
    },
    {
        icon: "./assets/test.png",
        name: "성능",
        key: "performance",
    },
    {
        icon: "./assets/test.png",
        name: "재료",
        key: "materials",
    },
    {
        icon: "./assets/test.png",
        name: "재활용",
        key: "recycling",
    },
    {
        icon: "./assets/test.png",
        name: "정비",
        key: "maintenance",
    }
];

const elementInfo = {
    model_name: {
        type: "text",
        name: "모델명",
    },
    manufacture: {
        type: "text",
        name: "제조사",
    },
    factory: {
        type: "text",
        name: "제조 공장",
    },
    category: {
        type: "text",
        name: "카테고리",
    },
    status: {
        type: "text",
        name: "상태",
    },
    manufactured_date: {
        type: "text",
        name: "제조일자",
    },
    // weight: {
    //     type: "text",
    //     name: "배터리 무게",
    // },
    // rated_capacity: {
    //     type: "text",
    //     name: "Rated Capacity",
    // },
    remaining_capacity: {
        type: "text",
        name: "Remaining Capacity",
    },
    maximum_capacity: {
        type: "text",
        name: "Maximum Capacity",
    },
    // minimum_voltage: {
    //     type: "text",
    //     name: "Minimum Voltage",
    // },
    // maximum_voltage: {
    //     type: "text",
    //     name: "Maximum Voltage",
    // },
    normal_voltage: {
        type: "text",
        name: "Nominal Voltage",
    },
    soc: {
        type: "text",
        name: "State of Charge"
    },
    soh: {
        type: "text",
        name: "State of Health"
    },
    // power_20: {
    //     type: "text",
    //     name: "20% 충전 상태에서의 전력",
    // },
    // power_80_20: {
    //     type: "text",
    //     name: "80%와 20% 충전 상태 간 전력 비율",
    // },
    material_composition: {
        type: "chart",
        name: "재료 구성",
    },
    contain_harzardous: {
        type: "text",
        name: "위험물질 포함여부",
    },
    // material_origin: {
    //     type: "multi-chart",
    //     name: "재료 원산지",
    // },
    material_recycled: {
        type: "multi-chart",
        name: "재활용 원료 사용 비율",
    },
    // supply_chain: {
    //     type: "trace",
    //     name: "공급망 추적",
    // },
    // recycle_chain: {
    //     type: "trace",
    //     name: "용도 변경 및 재활용 이력 추적",
    // },
    // transaction_chain: {
    //     type: "trace",
    //     name: "거래 이력 추적",
    // },
    maintenance_history: {
        type: "text",
        name: "정비 이력"
    }
};

const BatteryInformation = ({ battery_information_data }) => {
    const [activeTab, setActiveTab] = React.useState(0);

    const tabClick = (index) => {
        setActiveTab(index);
    };

    const renderTab = (key, value) => {
        console.log(key)
        if (elementInfo[key].type === "text") {
            return (
                <TabInfo
                    key={key}
                    infoname={elementInfo[key].name}
                    info={value}
                />
            );
        } else if (elementInfo[key].type === "chart") {
            return (
                <TabChart
                    chartname={elementInfo[key].name}
                    data={encodeData(value)}
                />
            );
        } else if (elementInfo[key].type === "multi-chart") {
            return (
                <TabMultiChart
                    chartname={elementInfo[key].name}
                    datas={Object.entries(value).map(([key, value], index) => {
                        return { [key]: encodeData(value) };
                    })}
                />
            );
        }
    };

    const encodeData = (original_data) => {
        return Object.entries(original_data).map(([key, value], index) => {
            return {
                id: key,
                label: key,
                value: value,
            };
        });
    };

    return (
        <StyledBatteryInfoContainer>
            <TabBar
                tabs={tabBars}
                onClick={tabClick}
                actived={activeTab}
            ></TabBar>
            <StyledTabContainer>
                {Object.entries(battery_information_data[activeTab]).map(
                    ([key, value], index) => {
                        return (
                            <React.Fragment key={key}>
                                {index >= 1 && (
                                    <Line
                                        is_horizontal={true}
                                        borderstyle="dashed"
                                        margin="1px"
                                        color="#059669"
                                    />
                                )}
                                {renderTab(key, value)}
                            </React.Fragment>
                        );
                    }
                )}
            </StyledTabContainer>
        </StyledBatteryInfoContainer>
    );
};

export default BatteryInformation;
