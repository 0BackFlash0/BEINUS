import styled from "styled-components";
import InputGroup from "../molecules/InputGroup";
import Topic from "../atoms/Topic";
import Subtitle from "../atoms/Subtitle";
import Button from "../atoms/Button";
import OptionGroup from "../molecules/OptionGroup";
import useInput from "../../hooks/useInput";
import { registerRawMaterial } from "../../services/additional_api";
import { useCaution } from "../../hooks/useCaution";

const StyledBatteryRegisterContainer = styled.div`
    position: relative;
    width: 480px;
    height: 480px;
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
    width: 100%;
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

const MaterialRegisterModal = ({ className = "", handle_close, ...props }) => {
    const { showCaution } = useCaution();

    const [value, handleOnChange] = useInput({
        type: "nickel",
        amount: "0",
        vendor: "",
    });

    const handleRegister = async function () {
        if (!checkValue()) {
            showCaution("모든 값을 입력해주세요.");
            return;
        }

        await registerRawMaterial({
            type: value.type,
            amount: value.amount,
            vendor: value.vendor,
        })
            .then((response) => {
                showCaution(
                    `원자재 ID가 발급되었습니다. \n ID : ${response.data.materialID}`
                );
                handle_close();
            })
            .catch((error) => {
                showCaution(`${error.message}`);
            });
    };

    const checkValue = () => {
        return value.type && value.amount > 0 && value.vendor;
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
                    title="종류"
                />
                <StyledInputGroup
                    type="number"
                    id="amount"
                    name="amount"
                    value={value.amount ? value.amount : ""}
                    onChange={handleOnChange}
                    title="수량"
                />
            </StyledInputGroupContainer>
            <StyledInputGroup
                type="text"
                id="vendor"
                name="vendor"
                value={value.vendor ? value.vendor : ""}
                onChange={handleOnChange}
                title="공급업체"
            />
            <StyledButtonContainer>
                <Button onClick={handleRegister}>확인</Button>
                <Button
                    onClick={handle_close}
                    color={"red"}
                    hover_color={"#c50000"}
                >
                    취소
                </Button>
            </StyledButtonContainer>
        </StyledBatteryRegisterContainer>
    );
};

export default MaterialRegisterModal;
