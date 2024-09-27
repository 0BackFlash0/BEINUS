import styled from "styled-components";
import InputGroup from "../molecules/InputGroup";
import OptionGroup from "../molecules/OptionGroup";
import Topic from "../atoms/Topic";
import Subtitle from "../atoms/Subtitle";
import Button from "../atoms/Button";
import useInput from "../../hooks/useInput";
import { registerBattery } from "../../services/additional_api";

const StyledBatteryRegisterContainer = styled.div`
    position: relative;
    width: 480px;
    height: 640px;
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

const StyledOptionGroup = styled(OptionGroup)`
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

const StyledButtonContainer = styled.div`
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: space-around;
    right: 0;
    bottom: 30px;
`;

const StyledSubtitle = styled(Subtitle)`
    margin-bottom: 10px;
`;

const BatteryOptions = [
    {
        key: "electric_car",
        name: "전기차",
    },
    {
        key: "normal",
        name: "일반",
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

const BatteryRegisterModal = ({
    className = "",
    onSuccess,
    onClose,
    ...props
}) => {
    const [value, handleOnChange] = useInput({
        model: "",
        category: "",
        nickel: "0",
        cobalt: "0",
        lithium: "0",
        lead: "0",
        status: "",
    });

    const handleRegister = async function () {
        const registerReq = await registerBattery({
            model: value.model,
            category: value.category,
            nickel: value.nickel,
            cobalt: value.cobalt,
            lithium: value.lithium,
            lead: value.lead,
            status: value.status,
        })
            .then((response) => {
                return response.data;
            })
            .catch((response) => response.data);
        if (registerReq.success) {
            console.log("success");
            onClose();
        }
    };

    return (
        <StyledBatteryRegisterContainer
            className={`battery-register-modal ${className}`}
            {...props}
        >
            <StyledTopic>배터리 제조</StyledTopic>
            <StyledInputGroupContainer>
                <StyledInputGroup
                    type="text"
                    id="model"
                    name="model"
                    value={value.model ? value.model : ""}
                    onChange={handleOnChange}
                    title="모델"
                />
                <StyledOptionGroup
                    options={BatteryOptions}
                    id="category"
                    name="category"
                    value={value.category ? value.category : ""}
                    onChange={handleOnChange}
                    title="카테고리"
                />
            </StyledInputGroupContainer>
            <StyledSubtitle>원자재 함량 </StyledSubtitle>
            <StyledInputGroupContainer>
                <StyledInputGroup
                    type="number"
                    id="nickel"
                    name="nickel"
                    value={value.nickel ? value.nickel : ""}
                    onChange={handleOnChange}
                    title="니켈"
                />
                <StyledInputGroup
                    type="number"
                    id="cobalt"
                    name="cobalt"
                    value={value.cobalt ? value.cobalt : ""}
                    onChange={handleOnChange}
                    title="코발트"
                />
                <StyledInputGroup
                    type="number"
                    id="lithium"
                    name="lithium"
                    value={value.lithium ? value.lithium : ""}
                    onChange={handleOnChange}
                    title="리튬"
                />
                <StyledInputGroup
                    type="number"
                    id="lead"
                    name="lead"
                    value={value.lead ? value.lead : ""}
                    onChange={handleOnChange}
                    title="납"
                />
            </StyledInputGroupContainer>
            <StyledOptionGroup
                options={StatusOptions}
                id="status"
                name="status"
                value={value.status ? value.status : ""}
                onChange={handleOnChange}
                title="상태"
            />
            <StyledButtonContainer>
                <Button onClick={handleRegister}>확인</Button>
                <Button onClick={onClose} color={"red"} hover_color={"#c50000"}>
                    취소
                </Button>
            </StyledButtonContainer>
        </StyledBatteryRegisterContainer>
    );
};

export default BatteryRegisterModal;
