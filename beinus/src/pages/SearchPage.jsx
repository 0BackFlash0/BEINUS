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
import Photo from "../components/atoms/Photo";
import TabBar from "../components/molecules/TabBar";
import PassInfo from "../components/molecules/PassInfo";
import FlexCarousel from "../components/molecules/FlexCarousel";
import CardChart from "../components/molecules/CardChart";

const StyledMainContainer = styled.div`
    padding: 20px 20px 10px 20px;
    /* margin-top: 60px; */
    margin-left: 240px;
    width: calc(100% - 240px);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
`;

const StyledContentContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`;

const StyledListContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: start;
    flex-wrap: wrap;
    /* gap: 30px; */
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

const StyledPhotoContainer = styled.div`
    display: flex;
    height: 100%;
    width: 40%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StyledBatteryContainer = styled.div`
    /* flex-shrink: 0; */
    width: 100%;
    /* height: 270px; */
    border: solid 2px;
    border-color: #13c752;
    border-radius: 10px;
    padding: 20px 15px;
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 10px;
    gap: 10px;

    cursor: pointer;
`;

const CardChartContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 5px;
    margin: 3px;

    width: 100%;
    /* height: 176px; */
    padding: 12px 12px 0 12px;
    /* border-radius: 10px; */

    background-color: #edffed;
`;

const StyledCardContainer = styled.div`
    /* flex-shrink: 0; */
    width: 100%;
    /* height: 270px; */
    border: solid 2px;
    border-color: #13c752;
    border-radius: 10px;
    padding: 20px 15px;
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 10px;
    gap: 10px;
`;

const StyledCardTitle = styled.div`
    font-size: 10pt;
    color: #666f7c;
    padding: 2px 0;
    margin: 0;
`;

const StyledBatteryInfoContainer = styled.div`
    /* flex-shrink: 0; */
    width: 100%;
    /* height: 270px; */
    /* border: solid 2px; */
    /* border-color: #13c752; */
    border-radius: 10px;
    /* padding: 20px 15px; */
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 10px;
    gap: 10px;
    border: 1px solid #cacaca;
    box-shadow: 2px 2px 2px gray;

    cursor: pointer;
`;

const StyledTabContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 0 0 10px 10px;
    padding: 15px;
    /* gap: 10px; */
    /* background-color: #edffed; */
`;

const StyledRow = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const StyledColumn = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const StyledLabel = styled.div`
    font-size: 12pt;
    color: #666f7c;
    padding: 2px 0;
    margin: 0;
`;

const StyledTitle = styled.div`
    font-size: 16pt;
    font-weight: 700;
    color: #292929;
    padding: 2px 0;
    /* margin: 5px 0 0 0; */
`;

const tabTitles = [
    {
        key: "manufacture",
        name: "Manufacture",
        icon: "factory",
    },
    {
        key: "performance",
        name: "Performance",
        icon: "speed",
    },
    {
        key: "material",
        name: "Material",
        icon: "data_usage",
    },
];

const SearchPage = () => {
    const navigate = useNavigate();
    const { showCaution } = useCaution();

    const { batteryID } = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);

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

    const handleTab = (idx) => {
        setActiveTab(idx);
    };

    const showContent = (idx) => {
        switch (idx) {
            case 0:
                return (
                    <StyledTabContainer ref={manufactureRef}>
                        <CardInfo title="제조사" info={data.ManufacturerName} />
                        <CardInfo
                            title="제조 일자"
                            info={data.manufactureDate.slice(0, 10)}
                        />
                        <CardInfo title="위치" info={data.location} />
                    </StyledTabContainer>
                );
            case 1:
                return (
                    <StyledTabContainer ref={performanceRef}>
                        <StyledRow>
                            <CardInfo title="전압" info={data.voltage} />
                            <CardInfo title="용량" info={data.capacity} />
                        </StyledRow>
                        <StyledRow>
                            <CardInfo
                                title="수명"
                                info={data.remainingLifeCycle}
                            />
                            <CardInfo
                                title="SoH (State of Health)"
                                info={data.soh}
                            />
                        </StyledRow>
                        <StyledRow>
                            <CardInfo
                                title="SoC (State of Charge)"
                                info={data.soc}
                            />
                            <CardInfo
                                title="SoCE (State of CE)"
                                info={data.soh}
                            />
                        </StyledRow>
                    </StyledTabContainer>
                );
            case 2:
                return (
                    <StyledTabContainer ref={materialRef}>
                        <CardChartContainer>
                            <StyledCardTitle>
                                재활용 원료 사용 비율
                            </StyledCardTitle>
                            <FlexCarousel
                                container_width={"100%"}
                                element_width={250}
                                elements={Object.entries(
                                    data.recyclingRatesByMaterial
                                ).map(([key, value], index) => {
                                    return (
                                        // <CardInfo
                                        //     title="SoC (State of Charge)"
                                        //     info={value}
                                        // />

                                        <CardChart
                                            chartname={key}
                                            data={[
                                                {
                                                    id: "Recycled",
                                                    label: "Recycled",
                                                    value:
                                                        Math.round(value * 10) /
                                                        1000,
                                                },
                                                {
                                                    id: "New",
                                                    label: "New",
                                                    value:
                                                        Math.round(
                                                            (100 - value) * 10
                                                        ) / 1000,
                                                },
                                            ]}
                                        />
                                    );
                                })}
                            ></FlexCarousel>
                        </CardChartContainer>
                        <CardInfo
                            title="포함 위험 물질"
                            info={data.containsHazardous}
                        />
                    </StyledTabContainer>
                );
            default:
                return;
        }
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

            {/* <StyledIDContainer>
                <StyledRow>
                    <StyledLabel>배터리 ID</StyledLabel>
                    <StyledLabel>{batteryID}</StyledLabel>
                </StyledRow>
                <StyledRow>
                    <StyledLabel>여권 ID</StyledLabel>
                    <StyledLabel>{data.PassportID}</StyledLabel>
                </StyledRow>
            </StyledIDContainer> */}
            <StyledMainContainer>
                <StyledListContainer>
                    <StyledRow>
                        <StyledBatteryContainer ref={batteryRef}>
                            <StyledContentContainer>
                                <StyledTitle>Battery Information</StyledTitle>
                                <Icon
                                    icon="battery_0_bar"
                                    size="14pt"
                                    weight="600"
                                />
                            </StyledContentContainer>
                            <StyledRow>
                                <StyledPhotoContainer>
                                    <Photo
                                        src="/assets/battery_example.png"
                                        width="auto"
                                    />
                                </StyledPhotoContainer>
                                <StyledColumn>
                                    <PassInfo
                                        title="배터리 ID"
                                        info={batteryID}
                                    />

                                    <PassInfo
                                        title="여권 ID"
                                        info={`${data.PassportID}`}
                                    />
                                    <StyledRow>
                                        <PassInfo
                                            title="카테고리"
                                            info={data.category}
                                        />

                                        <PassInfo
                                            title="무게"
                                            info={`${data.weight} kg`}
                                        />
                                        <PassInfo
                                            title="상태"
                                            info={data.status}
                                        />
                                        {/* <CardInfo
                                            title="검증"
                                            info={data.Verified}
                                        /> */}
                                    </StyledRow>

                                    <StyledRow></StyledRow>
                                </StyledColumn>
                            </StyledRow>
                        </StyledBatteryContainer>
                    </StyledRow>

                    <StyledBatteryInfoContainer>
                        <TabBar
                            tabs={tabTitles}
                            onClick={handleTab}
                            actived={activeTab}
                        ></TabBar>
                        {showContent(activeTab)}
                    </StyledBatteryInfoContainer>
                </StyledListContainer>
            </StyledMainContainer>
        </PageTemplate>
    );
};

export default SearchPage;
