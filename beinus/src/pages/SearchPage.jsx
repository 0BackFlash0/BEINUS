import BatteryAnalysisModal from "../components/organisms/BatteryAnalysisModal";
import BatteryExtractModal from "../components/organisms/BatteryExtractModal";
import BatteryInformation from "../components/organisms/BatteryInformation";
import BatteryMaintainModal from "../components/organisms/BatteryMaintainModal";
import BatteryPassport from "../components/organisms/BatteryPassport";
import ModalTemplate from "../components/templates/ModelTemplate";
import GNB from "../components/organisms/GNB";
import PageTemplate from "../components/templates/PageTemplate";
import { useState } from "react";

const tempPassport = {
    id: "did:web:acme.battery.pass:0226151e-949c-d067-8ef3-162",
    model_number: "M-41698615",
    serial_number: "992356610548948",
    image: "./assets/battery_example.png",
    QR: "./assets/QR.png",
};

const tempInformation = 
    {
        model_name: "EV-BAT085",
        manufacture: "Exide Batteries Auditor",
        // factory: "Berlin",
        category: "전기차",
        status: "Recycled",
        // weight: "400kg",
        manufactured_date: "2024/09/19",
        // rated_capacity: "75 kWh",
        remaining_capacity: "60 kWh",
        maximum_capacity: "100 kwh",
        // minimum_voltage: "3.0 V",
        // maximum_voltage: "4.3 V",
        normal_voltage: "3.7 V",
        // power_20: "120.00 kW",
        // power_80_20: "64.00 %",
        soc: "SOC",
        soh: "SOH",
        material_composition: {
            nickel: 33,
            cobalt: 16,
            lithium: 40,
            lead: 11,
        },
        contain_harzardous: "없음",
        material_recycled: {
            nickel: {
                pre_consumer: 17,
                post_consumer: 7,
                primary: 76,
            },
            cobalt: {
                pre_consumer: 17,
                post_consumer: 7,
                primary: 76,
            },
            lithium: {
                pre_consumer: 17,
                post_consumer: 7,
                primary: 76,
            },
            lead: {
                pre_consumer: 17,
                post_consumer: 7,
                primary: 76,
            },
        },
        maintenance_history: "없음",
    };

const SearchPage = () => {

    const [maintainModal, setMaintainModal] = useState(false);
    const [analysisModal, setAnalysisModal] = useState(false);
    const [extractModal, setExtractModal] = useState(false);

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
                <BatteryPassport battery_passport_data={tempPassport} />
                <BatteryInformation
                    battery_information_data={tempInformation}
                    maintain_modal_state={[maintainModal, setMaintainModal]}
                    analysis_modal_state={[analysisModal, setAnalysisModal]}
                    extract_modal_state={[extractModal, setExtractModal]}
                />
            </PageTemplate>
        </>
    );
};

export default SearchPage;
