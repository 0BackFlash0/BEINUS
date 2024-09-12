import React from "react";
import styled from "styled-components";
import InputGroup from "../molecules/InputGroup";
import Button from "../atoms/Button";
import useInput from "../../hooks/useInput";
import useStates from "../../hooks/useStates";
import { useNavigate } from "react-router-dom";
// import { emailValid, register } from "../../services/api";

const StyledRegisterContainer = styled.div`
    width: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* border: 1px solid #e0e0e0; */
    padding: 50px;
    margin: 50px auto 0 auto;
`;

const StyledIDCheckContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const StyledInputGroup = styled(InputGroup)`
    width: 100%;
`;

const StyledCheckButton = styled(Button)`
    flex-shrink: 0;
    flex-grow: 0;
    padding: 12px 24px;
    margin: 0 20px 0 10px;
`;

const RegisterForm = ({
    className, // class
}) => {
    const [value, handleOnChange] = useInput({
        username: null,
        email: null,
        password: null,
        passwordConfirm: null,
    });

    const [description, setDescription] = useStates({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const [valid, setValid] = useStates({
        username: false,
        email: false,
        password: false,
        passwordConfirm: false,
    });
    const navigate = useNavigate();

    // Validation
    React.useEffect(() => {
        const text = value.username;
        if (text != null) {
            if (text.length < 1) {
                setValid({ ["username"]: false });
                setDescription({ ["username"]: "필수 항목 입니다." });
            } else {
                setValid({ ["username"]: true });
                setDescription({ ["username"]: "사용 가능합니다." });
            }
        }
    }, [value.username]);

    React.useEffect(() => {
        const text = value.email;
        if (text != null) {
            if (text.length < 1) {
                setValid({ ["email"]: false });
                setDescription({ ["email"]: "필수 항목 입니다." });
            } else {
                setValid({ ["email"]: false });
                setDescription({ ["email"]: "" });
            }
        }
    }, [value.email]);

    React.useEffect(() => {
        const text = value.password;
        const re = new RegExp(
            "^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$"
        );
        if (text != null) {
            if (text.length < 1) {
                setValid({ ["password"]: false });
                setDescription({ ["password"]: "필수 항목 입니다." });
            } else if (re.test(text)) {
                setValid({ ["password"]: true });
                setDescription({ ["password"]: "사용 가능합니다." });
            } else {
                setValid({ ["password"]: false });
                setDescription({
                    ["password"]:
                        "영어, 숫자, 특수기호를 포함한 8~20자여야 합니다.",
                });
            }
        }
    }, [value.password]);

    React.useEffect(() => {
        const text = value.passwordConfirm;
        if (text != null) {
            if (text.length < 1) {
                setValid({ ["passwordConfirm"]: false });
                setDescription({ ["passwordConfirm"]: "필수 항목 입니다." });
            } else if (text === value.password) {
                setValid({ ["passwordConfirm"]: true });
                setDescription({ ["passwordConfirm"]: "일치 합니다." });
            } else {
                setValid({ ["passwordConfirm"]: false });
                setDescription({ ["passwordConfirm"]: "일치하지 않습니다." });
            }
        }
    }, [value.passwordConfirm, value.password]);

    return (
        <StyledRegisterContainer className={`${className}`}>
            <StyledIDCheckContainer>
                <StyledInputGroup
                    id="email"
                    name="email"
                    type="email"
                    title="이메일"
                    valid={valid.email}
                    value={value.email ? value.email : ""}
                    description={description.email}
                    placeholder="이메일을 입력해주세요."
                    className={``}
                    onChange={handleOnChange}
                />
                <StyledCheckButton
                    className="check-button"
                    onClick={async function () {
                        // const emailCheck = await emailValid({
                        //     email: value.email,
                        // })
                        //     .then((response) => response.data)
                        //     .catch((response) => response.data);
                        // console.log(emailCheck);
                        // if (emailCheck?.success === true) {
                        //     setValid({ ["email"]: true });
                        //     setDescription({ ["email"]: "사용 가능합니다." });
                        // } else {
                        //     setValid({ ["email"]: false });
                        //     setDescription({
                        //         ["email"]: emailCheck?.error.message,
                        //     });
                        // }
                    }}
                >
                    검사
                </StyledCheckButton>
            </StyledIDCheckContainer>
            <StyledInputGroup
                id="username"
                name="username"
                type="text"
                title="이름"
                valid={valid.username}
                value={value.username ? value.username : ""}
                description={description.username}
                placeholder="이름을 입력해주세요."
                className="w-100"
                onChange={(e) => {
                    handleOnChange(e);
                }}
            />
            <StyledInputGroup
                id="password"
                name="password"
                type="password"
                title="비밀번호"
                valid={valid.password}
                value={value.password ? value.password : ""}
                description={description.password}
                placeholder="비밀번호를 입력해주세요. (영어, 숫자, 특수기호를 포함한 8~20자)"
                className="w-100"
                onChange={handleOnChange}
            />
            <StyledInputGroup
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                title="비밀번호 확인"
                valid={valid.passwordConfirm}
                value={value.passwordConfirm ? value.passwordConfirm : ""}
                description={description.passwordConfirm}
                placeholder="비밀번호를 재입력해주세요."
                className="w-100"
                onChange={handleOnChange}
            />
            <Button
                className={"w-100 mt-2 py-2 border-0 bg-kakao"}
                onClick={async function () {
                    // if (
                    //     valid.username &&
                    //     valid.email &&
                    //     valid.password &&
                    //     valid.passwordConfirm
                    // ) {
                    //     const registerCheck = await register({
                    //         email: value.email,
                    //         password: value.password,
                    //         username: value.username,
                    //     }).then((response) => response.data);
                    //     if (registerCheck.success) navigate("/");
                    //     else {
                    //     }
                    // } else {
                    //     let newDescriptions = {};
                    //     for (let k in valid) {
                    //         if (!valid[k]) {
                    //             Object.assign(newDescriptions, {
                    //                 [k]: "사용 불가능합니다.",
                    //             });
                    //         }
                    //     }
                    //     setDescription(newDescriptions);
                    // }
                }}
            >
                회원가입
            </Button>
        </StyledRegisterContainer>
    );
};

export default RegisterForm;
