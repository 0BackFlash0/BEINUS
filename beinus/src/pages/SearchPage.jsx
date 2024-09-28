import BatteryAnalysisModal from "../components/organisms/BatteryAnalysisModal";
import BatteryExtractModal from "../components/organisms/BatteryExtractModal";
import BatteryInformation from "../components/organisms/BatteryInformation";
import BatteryMaintainModal from "../components/organisms/BatteryMaintainModal";
import BatteryPassport from "../components/organisms/BatteryPassport";
import ModalTemplate from "../components/templates/ModelTemplate";
import GNB from "../components/organisms/GNB";
import PageTemplate from "../components/templates/PageTemplate";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    queryBatteryDetails,
    requestAnalysis,
    requestMaintenance,
} from "../services/additional_api";
import { useNavigate } from "react-router-dom";
import { useCaution } from "../hooks/useCaution";

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
    const [data, setData] = useState({
        passport: tempPassport,
        information: tempInformation,
    });
    const [loading, setLoading] = useState(true);

    const [maintainModal, setMaintainModal] = useState(false);
    const [analysisModal, setAnalysisModal] = useState(false);
    const [extractModal, setExtractModal] = useState(false);

    useEffect(() => {
        // 데이터 fetch 요청
        queryBatteryDetails({
            batteryID: batteryID,
        })
            .then((response) => {
                if (response.status === 200) {
                    setData({
                        ...data,
                        passport: response.data.passport,
                        information: response.data.information,
                    });
                    setLoading(false);
                } else {
                    showCaution("알수없는 에러가 발생했습니다.");
                }
            })
            .catch((response) => {
                showCaution(`에러가 발생했습니다. \n ${response.data.error}`);
            });
    }, []);

    const handleRequestMaintenance = () => {
        requestMaintenance({
            batteryID: batteryID,
        })
            .then((response) => {
                if (response.status === 200) {
                    showCaution(`유지보수 요청 성공. \n ID: ${batteryID}`);
                } else {
                    showCaution("알수없는 에러가 발생했습니다.");
                }
            })
            .catch((response) => {
                showCaution(`에러가 발생했습니다. \n ${response.data.error}`);
            });
    };

    const handleRequestAnalysis = () => {
        requestAnalysis({
            batteryID: batteryID,
        })
            .then((response) => {
                if (response.status === 200) {
                    showCaution(`분석 요청 성공. \n ID: ${batteryID}`);
                } else {
                    showCaution("알수없는 에러가 발생했습니다.");
                }
            })
            .catch((response) => {
                showCaution(`에러가 발생했습니다. \n ${response.data.error}`);
            });
    };

    if (loading) {
        return <></>;
    }

    return (
        <>
            <GNB></GNB>
            <ModalTemplate
                ismodalopen={maintainModal}
                set_ismodalopen={setMaintainModal}
            >
                <BatteryMaintainModal
                    battery_id={batteryID}
                    on_success={() => setMaintainModal(false)}
                    on_close={() => setMaintainModal(false)}
                />
            </ModalTemplate>
            <ModalTemplate
                ismodalopen={analysisModal}
                set_ismodalopen={setAnalysisModal}
            >
                <BatteryAnalysisModal
                    battery_id={batteryID}
                    on_success={() => setAnalysisModal(false)}
                    on_close={() => setAnalysisModal(false)}
                />
            </ModalTemplate>
            <ModalTemplate
                ismodalopen={extractModal}
                set_ismodalopen={setExtractModal}
            >
                <BatteryExtractModal
                    battery_id={batteryID}
                    on_success={() => setExtractModal(false)}
                    on_close={() => setExtractModal(false)}
                />
            </ModalTemplate>
            <PageTemplate className="register-page">
                <BatteryPassport battery_passport_data={data.passport} />
                <BatteryInformation
                    battery_information_data={data.information}
                    on_request_maintenence={handleRequestMaintenance}
                    on_request_analysis={handleRequestAnalysis}
                    maintain_modal_state={[maintainModal, setMaintainModal]}
                    analysis_modal_state={[analysisModal, setAnalysisModal]}
                    extract_modal_state={[extractModal, setExtractModal]}
                />
            </PageTemplate>
        </>
    );
};

export default SearchPage;
