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
    console.log(token);
    // console.log(token);
    if (token && token !== "undefined") {
        console.log(token);
        config.headers["Authorization"] = `Bearer ${token}`;
        // config.headers["access"] = `${token}`;
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

export const getUser = (data) => {
    return instance.get("/", {});
};

export const register = (data) => {
    const { password, username, org } = data;
    return instance.post("/join", {
        username: username,
        password: password,
        org: org,
    });
};

export const login = (data) => {
    const { username, password } = data;
    return instance.post("/login", {
        username: username,
        password: password,
    });
};
