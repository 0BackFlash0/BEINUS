import axios from "axios";
import { getUser } from "./base_api";

export const instance = axios.create({
    baseURL: "http://localhost:3000/",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(async function (config) {
    const token = localStorage.getItem("token");
    console.log(token);
    // console.log(token);
    if (token && token !== "undefined") {
        console.log(token);
        config.headers["Authorization"] = `Bearer ${token}`;
        // config.headers["access"] = `${token}`;
    } else {
        console.log("no token");
    }

    config.headers["org"] = "org1";

    // const user_data = await getUser().then((response) => response.data);
    // console.log(user_data);
    // const user_data =

    // if (user_data && user_data !== "undefined") {
    //     console.log(user_data.role);
    //     config.headers["org"] = `${user_data.role}`;
    // } else {
    //     console.log("no org");
    // }
    return config;
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // localStorage.removeItem("token");
        console.log(error.response);
        return error.response;
    }
);

export const checkBattery = (data) => {
    const { battery_id } = data;

    if (
        battery_id === "did:web:acme.battery.pass:0226151e-949c-d067-8ef3-162"
    ) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: {
                        success: true,
                        battery_id: battery_id,
                        message: "Battery check successful",
                    },
                });
            }, 100);
        });
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: {
                    success: false,
                    battery_id: battery_id,
                    message: "Battery check failed",
                },
            });
        }, 100);
    });
};

export const searchBattery = async function (data) {
    const { battery_id } = data;
    // const temp = instance.get("/");

    if (
        battery_id === "did:web:acme.battery.pass:0226151e-949c-d067-8ef3-162"
    ) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: {
                        success: true,
                        battery_id: battery_id,
                        passport: tempPassport,
                        information: tempInformation,
                        message: "Battery search successful",
                    },
                });
            }, 100);
        });
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: {
                    success: false,
                    battery_id: battery_id,
                    message: "Battery search failed",
                },
            });
        }, 100);
    });
};

export const registerBattery = (data) => {
    const { model, category, nickel, cobalt, lithium, lead, status } = data;

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: {
                    success: true,
                    message: "Battery register success",
                },
            });
        }, 100);
    });
};

export const registerRawMaterial = (data) => {
    const { type, amount, vendor } = data;

    return instance.post("/registerRawMaterial", {
        supplierID: vendor,
        name: type,
        quantity: amount,
    });

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                status: 200,
                data: {
                    success: true,
                    materialID: "temp",
                    message: "Material register success",
                },
            });
        }, 100);
    });
};

export const queryRawMaterial = (data) => {
    const { material_id } = data;
    return instance.get(`/queryRawMaterial/${material_id}`, {});

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                status: 200,
                data: {
                    success: true,
                    material_data: tempMaterial,
                },
            });
        }, 100);
    });
};

export const maintainBattery = (data) => {
    const { name, date, result, others } = data;

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: {
                    success: true,
                    message: "Battery maintain success",
                },
            });
        }, 100);
    });
};

export const analysisBattery = (data) => {
    const { name, date, result, others } = data;

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: {
                    success: true,
                    message: "Battery analysis success",
                },
            });
        }, 100);
    });
};

export const getBatteryList = (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: {
                    success: true,
                    battery_list: tempBatteries,
                    message: "Battery list success",
                },
            });
        }, 100);
    });
};

export const getMaterialList = (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: {
                    success: true,
                    material_list: tempMaterials,
                    message: "Battery list success",
                },
            });
        }, 100);
    });
};

const tempPassport = {
    id: "did:web:acme.battery.pass:0226151e-949c-d067-8ef3-162",
    model_number: "M-41698615",
    serial_number: "992356610548948",
    image: "./assets/battery_example.png",
    QR: "./assets/QR.png",
};

const tempInformation = {
    model_name: "EV-BAT085",
    manufacture: "Exide Batteries Auditor",
    category: "전기차",
    status: "Recycled",
    manufactured_date: "2024/09/19",
    remaining_capacity: "60 kWh",
    maximum_capacity: "100 kwh",
    normal_voltage: "3.7 V",
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

const tempBatteries = [
    {
        image: "./assets/battery_example.png",
        id: "did:web:acme.battery.pass:0226151e-949c-d067-8ef3-162",
        model: "M-41698615",
        category: "전기차",
        status: "NEW",
    },
    {
        image: "./assets/battery_example.png",
        id: "did:web:acme.battery.pass:0226151e-949c-d067-8ef3-163",
        model: "M-41698615",
        category: "전기차",
        status: "NEW",
    },
];

const tempMaterials = [
    {
        image: "./assets/test.png",
        id: "did:web:acme.battery.pass:0226151e-949c-d067-8ef3-162",
        type: "니켈",
        amount: "200",
        status: "NEW",
    },
    {
        image: "./assets/test.png",
        id: "did:web:acme.battery.pass:0226151e-949c-d067-8ef3-163",
        type: "리튬",
        amount: "200",
        status: "NEW",
    },
];

const tempMaterial = {
    materialID: "MATERIAL-1234567890123456789",
    supplierID: "SUPPLIER-001",
    name: "Lithium",
    quantity: 100,
    status: "NEW",
    available: "Available",
    verifiedBy: "",
    timestamp: "2024-09-25T06:41:00Z",
};
