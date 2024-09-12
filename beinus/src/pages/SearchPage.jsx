import BatteryInformation from "../components/organisms/BatteryInformation";
import BatteryPassport from "../components/organisms/BatteryPassport";
import GNB from "../components/organisms/GNB";
import PageTemplate from "../components/templates/PageTemplate";

const tempPassport = {
    id: "did:web:acme.battery.pass:0226151e-949c-d067-8ef3-162",
    model_number: "M-41698615",
    serial_number: "992356610548948",
    image: "./assets/battery_example.png",
    QR: "./assets/QR.png",
};

const tempInformation = [
    {
        model_name: "EV-BAT085",
        manufacture: "Exide Batteries Auditor",
        factory: "Berlin",
        category: "전기차",
        status: "Recycled",
        weight: "400kg",
    },
    {
        rated_capacity: "75 kWh",
        remaining_capacity: "60 kWh",
        minimum_voltage: "3.0 V",
        maximum_voltage: "4.3 V",
        normal_voltage: "3.7 V",
        power_20: "120.00 kW",
        power_80_20: "64.00 %",
    },
    {
        material_composition: {
            nickel: 33,
            cobalt: 16,
            lithium: 40,
            lead: 11,
        },
        material_origin: {
            nickel: {
                china: 95,
                other: 5,
            },
            cobalt: {
                china: 95,
                other: 5,
            },
            lithium: {
                china: 95,
                other: 5,
            },
            lead: {
                china: 95,
                other: 5,
            },
        },
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
    },
    {
        supply_chain: "",
        recycle_chain: "",
        transaction_chain: "",
    },
];

const SearchPage = () => {
    return (
        <>
            <GNB></GNB>
            <PageTemplate className="register-page">
                <BatteryPassport battery_passport_data={tempPassport} />
                <BatteryInformation
                    battery_information_data={tempInformation}
                />
            </PageTemplate>
        </>
    );
};

export default SearchPage;
