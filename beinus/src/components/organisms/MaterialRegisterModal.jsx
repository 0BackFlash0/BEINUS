import styled from "styled-components";
import InputGroup from "../molecules/InputGroup";
import Topic from "../atoms/Topic";
import Subtitle from "../atoms/Subtitle";
import Button from "../atoms/Button";
import OptionGroup from "../molecules/OptionGroup";
import useInput from "../../hooks/useInput";
import { registerMaterial } from "../../services/api";

const StyledBatteryRegisterContainer = styled.div`
    position: relative;
    width: 480px;
    height: 600px;
    padding: 60px 40px 0 40px;
    display: flex;
    flex-direction: column;
    align-items: start;
`;

const StyledInputGroup = styled(InputGroup)`
    width: 100%;
    padding: 0 10px 0 0;
    flex-grow: 1 0;
`;

const StyledTopic = styled(Topic)`
    margin-bottom: 60px;
`;

const StyledInputGroupContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const StyledOptionGroup = styled(OptionGroup)`
    width: 100%;
    padding: 0 10px 0 0;
    flex-grow: 1 0;
`;

const StyledButtonContainer = styled.div`
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: space-around;
    right: 0;
    bottom: 30px;
`;

const MaterialOptions = [
    {
        key: "nickel",
        name: "니켈",
    },
    {
        key: "cobalt",
        name: "코발트",
    },
    {
        key: "lithium",
        name: "리튬",
    },
    {
        key: "lead",
        name: "납",
    },
];

const StatusOptions = [
    {
        key: "new",
        name: "NEW",
    },
    {
        key: "recycled",
        name: "RECYCLED",
    },
];

const MaterialRegisterModal = ({
    className = "",
    onSuccess,
    onClose,
    ...props
}) => {

    const [value, handleOnChange] = useInput({
        type: "",
        amount: "0",
        vendor: "",
        status: ""
    });

    const handleRegister = async function () {
        const registerReq = await registerMaterial({
            type: value.type,
            amount: value.amount,
            vendor: value.vendor,
            status: value.status,
        })
            .then((response) => {
                return response.data;
            })
            .catch((response) => response.data);
        if (registerReq.success) {
            console.log("success")
            onClose()
        } 
    };

    return (
        <StyledBatteryRegisterContainer
            className={`battery-register-modal ${className}`}
            {...props}
        >
            <StyledTopic>원자재 등록</StyledTopic>
            <StyledInputGroupContainer>
                <StyledOptionGroup 
                    options={MaterialOptions}
                    id="type"
                    name="type"
                    value={value.type ? value.type : ""}
                    onChange={handleOnChange}
                    title="종류" />
                <StyledInputGroup 
                    type="number"
                    id="amount"
                    name="amount"
                    value={value.amount ? value.amount : ""}
                    onChange={handleOnChange}
                    title="수량"/>
            </StyledInputGroupContainer>
            <StyledInputGroup 
                type="text"
                id="vendor"
                name="vendor"
                value={value.vendor ? value.vendor : ""}
                onChange={handleOnChange} 
                title="공급업체" />
            <StyledOptionGroup 
                options={StatusOptions}
                id="status"
                name="status"
                value={value.status ? value.status : ""}
                onChange={handleOnChange}
                title="상태" />
            <StyledButtonContainer>
                <Button onClick={handleRegister}>확인</Button>
                <Button onClick={onClose} color={"red"} hover_color={"#c50000"}>
                    취소
                </Button>
            </StyledButtonContainer>
        </StyledBatteryRegisterContainer>
    );
};

export default MaterialRegisterModal;
