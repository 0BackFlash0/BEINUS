import axios from "axios";

export const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    // console.log(token);
    if (token && token !== "undefined") {
        console.log(token);
        config.headers["Authorization"] = `Bearer ${token}`;
        config.headers["access"] = `${token}`;
    } else {
        console.log("no token");
    }
    return config;
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // localStorage.removeItem("token");
        return error.response;
    }
);

// export const register = (data) => {
//     const { email, password, username } = data;
//     return instance.post("/join", {
//         email: email,
//         password: password,
//         username: username,
//     });
// };

export const login = (data) => {
    const { username, password } = data;
    return instance.post("/login", {
        username: username,
        password: password,
    });
};

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

export const searchBattery = (data) => {
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
