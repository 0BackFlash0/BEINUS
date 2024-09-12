import React from "react";
import Label from "../atoms/Label";
import InputGroup from "../molecules/InputGroup";
import Button from "../atoms/Button";
import Anchor from "../atoms/Anchor";
// import { login } from "../../services/api";
// import useInput from "../../hooks/useInput";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import { useSelector, useDispatch } from "react-redux";
// import { userLogin } from "../../store/userSlice";

const StyledLoginContainer = styled.div`
    width: 580px;
    display: flex;
    flex-direction: column;
    align-items: start;
    border: 1px solid #e0e0e0;
    padding: 50px;
    margin: 50px auto 0 auto;
`;

const StyledInputGroup = styled(InputGroup)`
    width: 100%;
`;

const StyledAnchor = styled(Anchor)`
    margin-top: 15px;
`;

const LoginForm = ({
    className, // class
}) => {
    const LoginError = {
        "이메일 형식으로 작성해주세요:email": "이메일 형식으로 작성해주세요.",
        "영문, 숫자, 특수문자가 포함되어야하고 공백이 포함될 수 없습니다.:password":
            "비밀번호는 영문, 숫자, 특수문자가 포함되어야하고 공백이 포함될 수 없습니다.",
        "8에서 20자 이내여야 합니다.:password":
            "비밀번호는 8에서 20자 이내여야 합니다.",
        "인증되지 않았습니다": "존재하지 않는 아이디/비밀번호 입니다.",
    };

    // const [value, handleOnChange] = useInput({
    //     email: "",
    //     password: "",
    // });
    const value = 0;
    const handleOnChange = () => {};

    const [errorMsg, setErrorMsg] = React.useState("");

    const navigate = useNavigate();
    // const user = useSelector((state) => state.user);
    // const dispatch = useDispatch();

    const handleLogin = async function () {
        // const loginCheck = await login({
        //     email: value.email,
        //     password: value.password,
        // })
        //     .then((response) => {
        //         localStorage.setItem("token", response.headers.authorization);
        //         return response.data;
        //     })
        //     .catch((response) => response.data);
        // if (loginCheck.success) {
        //     navigate("/");
        //     // dispatch(
        //     //     userLogin({
        //     //         email: value.email,
        //     //         time: new Date().toString(),
        //     //     })
        //     // );
        // } else {
        //     setErrorMsg(LoginError[loginCheck.error.message]);
        // }
    };
    return (
        <StyledLoginContainer className={`login-container ${className}`}>
            <StyledInputGroup
                id="email"
                name="email"
                type="email"
                value={value.email ? value.email : ""}
                onChange={handleOnChange}
                placeholder="아이디"
            />
            <StyledInputGroup
                id="password"
                name="password"
                type="password"
                value={value.password ? value.password : ""}
                onChange={handleOnChange}
                placeholder="비밀번호"
            />
            {errorMsg && (
                <div className="w-100 mb-3 p-3 text-danger text-start border-0 bg-body-tertiary">
                    <Label className="fs-6">{errorMsg}</Label>
                </div>
            )}
            <Button
                className={"login-button"}
                onClick={handleLogin}
                width="100%"
                height="60px"
            >
                로그인
            </Button>
            <StyledAnchor to="/register" className={"to-signup"}>
                회원가입
            </StyledAnchor>
        </StyledLoginContainer>
    );
};

export default LoginForm;
