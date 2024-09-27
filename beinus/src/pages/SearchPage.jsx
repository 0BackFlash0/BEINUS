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
import { searchBattery } from "../services/additional_api";
import { useNavigate } from "react-router-dom";

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

    const { battery_id } = useParams();
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
        searchBattery({
            battery_id: battery_id,
        })
            .then((response) => {
                return response.data;
            })
            .then((data) => {
                if (data.success) {
                    setData({
                        ...data,
                        passport: data.passport,
                        information: data.information,
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
        <>
            <GNB></GNB>
            <ModalTemplate
                isModalOpen={maintainModal}
                setIsModalOpen={setMaintainModal}
            >
                <BatteryMaintainModal
                    onSuccess={() => setMaintainModal(false)}
                    onClose={() => setMaintainModal(false)}
                />
            </ModalTemplate>
            <ModalTemplate
                isModalOpen={analysisModal}
                setIsModalOpen={setAnalysisModal}
            >
                <BatteryAnalysisModal
                    onSuccess={() => setAnalysisModal(false)}
                    onClose={() => setAnalysisModal(false)}
                />
            </ModalTemplate>
            <ModalTemplate
                isModalOpen={extractModal}
                setIsModalOpen={setExtractModal}
            >
                <BatteryExtractModal
                    onSuccess={() => setExtractModal(false)}
                    onClose={() => setExtractModal(false)}
                />
            </ModalTemplate>
            <PageTemplate className="register-page">
                <BatteryPassport battery_passport_data={data.passport} />
                <BatteryInformation
                    battery_information_data={data.information}
                    maintain_modal_state={[maintainModal, setMaintainModal]}
                    analysis_modal_state={[analysisModal, setAnalysisModal]}
                    extract_modal_state={[extractModal, setExtractModal]}
                />
            </PageTemplate>
        </>
    );
};

export default SearchPage;
