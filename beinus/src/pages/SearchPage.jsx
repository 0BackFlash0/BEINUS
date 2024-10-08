import BatteryAnalysisModal from "../components/organisms/BatteryAnalysisModal";
import BatteryExtractModal from "../components/organisms/BatteryExtractModal";
import BatteryInformation from "../components/organisms/BatteryInformation";
import BatteryMaintainModal from "../components/organisms/BatteryMaintainModal";
import BatteryPassport from "../components/organisms/BatteryPassport";
import ModalTemplate from "../components/templates/ModelTemplate";
import GNB from "../components/organisms/GNB";
import PageTemplate from "../components/templates/PageTemplate";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
    queryBatteryDetails,
    requestAnalysis,
    requestMaintenance,
} from "../services/additional_api";
import { useNavigate } from "react-router-dom";
import { useCaution } from "../hooks/useCaution";
import BatterySideBar from "../components/organisms/BatterySideBar";
import SearchSideBar from "../components/organisms/SearchSideBar";
import styled from "styled-components";
import TabInfo from "../components/molecules/TabInfo";
import CardInfo from "../components/molecules/CardInfo";
import Line from "../components/atoms/Line";
import CardMultiChart from "../components/molecules/CardMultiChart";
import Icon from "../components/atoms/Icon";

const StyledContentContainer = styled.div`
    padding: 30px 30px 30px 30px;
    margin-top: 60px;
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
    align-items: start;
    /* flex-wrap: wrap; */
    gap: 30px;
`;

const StyledIDContainer = styled.div`
    position: fixed;
    width: calc(100% - 240px);
    z-index: 3;
    top: 70px;
    left: 240px;
    padding: 10px 20px;
    border-bottom: solid 1px #666f7c;
    background-color: white;
`;

const StyledCardContainer = styled.div`
    flex-shrink: 0;
    width: 30%;
    /* height: 270px; */
    border: solid 2px;
    border-color: #13c752;
    border-radius: 10px;
    padding: 20px 15px;
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 0px;
    gap: 10px;

    cursor: pointer;
`;

const StyledRow = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const StyledLabel = styled.div`
    font-size: 12pt;
    color: #666f7c;
    padding: 2px 0;
    margin: 0;
`;

const StyledTitle = styled.div`
    font-size: 18pt;
    font-weight: 700;
    color: #292929;
    padding: 2px 0;
    margin: 0 0 10px 0;
`;

const tempPassport = {
    id: "-",
    model_number: "-",
    serial_number: "-",
    image: "-",
    QR: "-",
};

const tempInformation = {
    model_name: "-",
    manufacture: "-",
    category: "-",
    status: "-",
    manufactured_date: "-",
    remaining_capacity: "-",
    maximum_capacity: "-",
    normal_voltage: "-",
    soc: "-",
    soh: "-H",
    material_composition: {
        nickel: 1,
        cobalt: 1,
        lithium: 1,
        lead: 1,
    },
    contain_harzardous: "-",
    material_recycled: {
        nickel: {
            pre_consumer: 1,
            post_consumer: 1,
            primary: 1,
        },
        cobalt: {
            pre_consumer: 1,
            post_consumer: 1,
            primary: 1,
        },
        lithium: {
            pre_consumer: 1,
            post_consumer: 1,
            primary: 1,
        },
        lead: {
            pre_consumer: 1,
            post_consumer: 1,
            primary: 1,
        },
    },
    maintenance_history: "-",
};

const SearchPage = () => {
    const navigate = useNavigate();
    const { showCaution } = useCaution();

    const { batteryID } = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const batteryRef = useRef(null);
    const manufactureRef = useRef(null);
    const materialRef = useRef(null);
    const performanceRef = useRef(null);
    const requestRef = useRef(null);

    const handleScroll = (n) => {
        const scroll_array = [
            batteryRef,
            manufactureRef,
            materialRef,
            performanceRef,
            requestRef,
        ];

        scroll_array[n].current.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    };

    useEffect(() => {
        // 데이터 fetch 요청
        queryBatteryDetails({
            batteryID: batteryID,
        })
            .then((response) => {
                setData({
                    ...data,
                    ...response.data.batteryDetails,
                });
                setLoading(false);
            })
            .catch((error) => {
                showCaution(`${error.message}`);
            });
    }, []);

    if (loading) {
        return <></>;
    }

    return (
        <PageTemplate className="register-page">
            <GNB></GNB>
            <SearchSideBar
                battery_id={batteryID}
                handle_scroll={handleScroll}
            />
            {/* <BatteryPassport battery_passport_data={data.passport} /> */}

            <StyledIDContainer>
                <StyledRow>
                    <StyledLabel>배터리 ID</StyledLabel>
                    <StyledLabel>{batteryID}</StyledLabel>
                </StyledRow>
                <StyledRow>
                    <StyledLabel>여권 ID</StyledLabel>
                    <StyledLabel>{data.PassportID}</StyledLabel>
                </StyledRow>
            </StyledIDContainer>
            <StyledContentContainer>
                <StyledListContainer>
                    <StyledCardContainer ref={batteryRef}>
                        <StyledRow>
                            <StyledTitle>배터리</StyledTitle>
                            <Icon icon="battery_0_bar" size="23pt" />
                        </StyledRow>
                        <StyledRow>
                            <CardInfo title="카테고리" info={data.category} />

                            <CardInfo title="무게" info={data.weight} />
                        </StyledRow>

                        <CardInfo title="상태" info={data.status} />
                        <CardInfo title="검증" info={data.Verified} />
                    </StyledCardContainer>

                    <StyledCardContainer ref={manufactureRef}>
                        <StyledRow>
                            <StyledTitle>제조</StyledTitle>
                            <Icon icon="factory" size="23pt" />
                        </StyledRow>
                        <CardInfo title="제조사" info={data.ManufacturerName} />
                        <CardInfo
                            title="제조 일자"
                            info={data.manufactureDate}
                        />
                        <CardInfo title="위치" info={data.location} />
                    </StyledCardContainer>

                    <StyledCardContainer ref={materialRef}>
                        <StyledRow>
                            <StyledTitle>원자재</StyledTitle>
                            <Icon icon="data_usage" size="23pt" />
                        </StyledRow>
                        <CardMultiChart
                            chartname={"재활용 원료 사용 비율"}
                            datas={Object.entries(
                                data.recyclingRatesByMaterial
                            ).map(([key, value], index) => {
                                return {
                                    [key]: [
                                        {
                                            id: "Recycled",
                                            label: "Recycled",
                                            value:
                                                Math.round(value * 10) / 1000,
                                        },
                                        {
                                            id: "New",
                                            label: "New",
                                            value:
                                                Math.round((100 - value) * 10) /
                                                1000,
                                        },
                                    ],
                                };
                            })}
                        />
                        <CardInfo
                            title="포함 위험 물질"
                            info={data.containsHazardous}
                        />
                    </StyledCardContainer>

                    <StyledCardContainer ref={performanceRef}>
                        <StyledRow>
                            <StyledTitle>성능</StyledTitle>
                            <Icon icon="speed" size="23pt" />
                        </StyledRow>

                        <CardInfo title="전압" info={data.voltage} />
                        <CardInfo title="용량" info={data.capacity} />
                        <CardInfo title="수명" info={data.remainingLifeCycle} />
                        <CardInfo
                            title="SoC (State of Charge)"
                            info={data.soc}
                        />
                        <CardInfo title="SoCE (State of CE)" info={data.soh} />
                        <CardInfo
                            title="SoH (State of Health)"
                            info={data.soh}
                        />
                    </StyledCardContainer>
                    <StyledCardContainer ref={requestRef}>
                        <StyledRow>
                            <StyledTitle>요청</StyledTitle>
                            <Icon icon="info" size="23pt" />
                        </StyledRow>
                        <CardInfo
                            title="유지보수 요청"
                            info={data.maintenanceRequest ? "O" : "X"}
                        />
                        <CardInfo
                            title="분석 요청"
                            info={data.analysisRequest ? "O" : "X"}
                        />
                        <CardInfo
                            title="재활용 가능 여부"
                            info={data.recycleAvailability ? "O" : "X"}
                        />
                    </StyledCardContainer>
                </StyledListContainer>
            </StyledContentContainer>
        </PageTemplate>
    );
};

export default SearchPage;
