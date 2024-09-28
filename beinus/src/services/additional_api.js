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
                    status: 200,
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
                status: 200,
                data: {
                    success: false,
                    battery_id: battery_id,
                    message: "Battery check failed",
                },
            });
        }, 100);
    });
};

export const queryBatteryDetails = async function (data) {
    const { batteryID } = data;
    // const temp = instance.get(`/queryBatteryDetails/${batteryID}`);

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                status: 200,
                data: {
                    batteryID: batteryID,
                    passport: tempPassport,
                    information: tempInformation,
                },
            });
        }, 100);
    });

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: {
                    success: false,
                    battery_id: batteryID,
                    message: "Battery search failed",
                },
            });
        }, 100);
    });
};

export const queryRawMaterial = (data) => {
    const { material_id } = data;
    // return instance.get(`/queryRawMaterial/${material_id}`, {});

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

export const registerBattery = (data) => {
    const {
        category,
        voltage,
        weight,
        isHardardous,
        capacity,
        lifecycle,
        materialList,
    } = data;

    // console.log(body);

    const body = {
        category: category,
        voltage: voltage,
        weight: weight,
        isHardardous: isHardardous,
        capacity: capacity,
        totalLifeCycle: lifecycle,
        materialList: materialList.map((element, idx) => {
            return {
                materialID: element.materialID,
                materialType: element.type,
                quantity: element.amount,
            };
        }),
    };

    console.log(body);

    // return instance.post("/registerBattery", body);

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                status: 200,
                data: {
                    batteryID: "BATTERY-1234567890123456789",
                },
            });
        }, 100);
    });
};

export const registerRawMaterial = (data) => {
    const { type, amount, vendor } = data;

    // return instance.post("/registerRawMaterial", {
    //     supplierID: vendor,
    //     name: type,
    //     quantity: amount,
    // });

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

export const requestMaintenance = (data) => {
    const { batteryID } = data;

    // return instance.post("/requestMaintenance", {
    //     batteryID: batteryID
    // });

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                status: 200,
                data: {
                    message: "request Maintenance success",
                },
            });
        }, 100);
    });
};

export const addMaintenanceLog = (data) => {
    const { batteryID, name, date, result, others } = data;

    // return instance.post("/addMaintenanceLog", {
    //     batteryID: batteryID,
    //     company: name,
    //     info: result,
    //     maintenanceDate: date,
    // });

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                status: 200,
                data: {
                    message: "Maintenance log added",
                },
            });
        }, 100);
    });
};

export const requestAnalysis = (data) => {
    const { batteryID } = data;

    // return instance.post("/requestAnalysis", {
    //     batteryID: batteryID
    // });

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                status: 200,
                data: {
                    message: "request Analysis success",
                },
            });
        }, 100);
    });
};

export const addAnalysisLog = (data) => {
    const { batteryID, name, date, result, others } = data;

    // return instance.post("/addAnalysisLog", {
    //     batteryID: batteryID,
    //     company: name,
    //     info: result,
    //     maintenanceDate: date,
    // });

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                status: 200,
                data: {
                    message: "Analysis log added",
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

export const extractMaterials = (data) => {
    const { batteryID, materialList } = data;

    const body = {
        batteryID: batteryID,
        materialList: materialList.map((element, idx) => {
            return {
                materialType: element.type,
                quantity: element.amount,
            };
        }),
    };

    console.log(body);

    // return instance.post("/extractMaterials", body);

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                status: 200,
                data: {
                    batteryID: "BATTERY-1234567890123456789",
                },
            });
        }, 100);
    });
};

export const queryAllBatteries = () => {
    // return instance.get(`/queryAllBatteries/`, {});

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

export const queryAllRawMaterials = () => {
    // return instance.get(`/queryAllRawMaterials/`, {});

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                status: 200,
                data: tempMaterials,
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
        batteryID: "BATTERY-123456789",
        rawMaterials: {
            material1: {
                materialID: "MATERIAL-1234",
                materialType: "Lithium",
                quantity: 50,
            },
            material2: {
                materialID: "MATERIAL-5678",
                materialType: "Cobalt",
                quantity: 30,
            },
        },
        manufactureDate: "2024-09-25T06:41:00.045634219Z",
        status: "ORIGINAL",
        Verified: "NOT VERIFIED",
        capacity: 5000,
        soc: 80,
        soh: 90,
        soce: 100,
        totalLifeCycle: 1000,
        remainingLifeCycle: 900,
        maintenanceLogs: [],
        accidentLogs: [],
        maintenanceRequest: false,
        analysisRequest: false,
        recycleAvailability: false,
    },
    {
        batteryID: "BATTERY-987654321",
        rawMaterials: {
            material1: {
                materialID: "MATERIAL-4321",
                materialType: "Nickel",
                quantity: 20,
            },
        },
        manufactureDate: "2024-09-24T05:41:00.045634219Z",
        status: "RECYCLED",
        Verified: "VERIFIED",
        capacity: 3000,
        soc: 60,
        soh: 70,
        soce: 100,
        totalLifeCycle: 800,
        remainingLifeCycle: 400,
        maintenanceLogs: ["Maintenance on 2024-09-23: SOC decreased by 10%"],
        accidentLogs: [],
        maintenanceRequest: false,
        analysisRequest: true,
        recycleAvailability: true,
    },
];

const tempMaterials = [
    {
        materialID: "MATERIAL-1234567890123456789",
        supplierID: "SUPPLIER-001",
        name: "Lithium",
        quantity: 100,
        status: "NEW",
        available: "Available",
        timestamp: "2024-09-25T06:41:00Z",
    },
    {
        materialID: "MATERIAL-9876543210987654321",
        supplierID: "",
        name: "Nickel",
        quantity: 50,
        status: "Recycled",
        available: "Available",
        timestamp: "2024-09-25T06:42:00Z",
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
