import styled from "styled-components";
import InputGroup from "../molecules/InputGroup";
import Topic from "../atoms/Topic";
import Subtitle from "../atoms/Subtitle";
import Button from "../atoms/Button";
import OptionGroup from "../molecules/OptionGroup";
import useInput from "../../hooks/useInput";
import { addMaintenanceLog } from "../../services/additional_api";
import { useCaution } from "../../hooks/useCaution";

const StyledBatteryExtractContainer = styled.div`
    position: relative;
    width: 480px;
    height: 560px;
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

const resultOptions = [
    {
        key: "success",
        name: "이상 없음",
    },
    {
        key: "fail",
        name: "이상 있음",
    },
    {
        key: "hold",
        name: "보류",
    },
];

const BatteryMaintainModal = ({
    className = "",
    battery_id,
    handle_close,
    ...props
}) => {
    const { showCaution } = useCaution();

    const [value, handleOnChange] = useInput({
        name: "정비회사",
        date: new Date().toISOString().substring(0, 10),
        info: "",
        soc: "0",
        soh: "0",
    });

    const handleMaintain = async function () {
        await addMaintenanceLog({
            batteryID: battery_id,
            name: value.name,
            date: value.date,
            info: value.info,
            soc: value.soc,
            soh: value.soh,
        })
            .then((response) => {
                showCaution(`배터리 정비 로그를 입력했습니다.`, handle_close);
            })
            .catch((error) => {
                showCaution(`${error.message}`);
            });
    };

    return (
        <StyledBatteryExtractContainer
            className={`battery-register-modal ${className}`}
            {...props}
        >
            <StyledTopic>배터리 정비</StyledTopic>
            <StyledInputGroupContainer>
                <StyledInputGroup
                    type="text"
                    id="name"
                    name="name"
                    value={value.name ? value.name : ""}
                    onChange={handleOnChange}
                    title="정비업체"
                />
                <StyledInputGroup
                    type="date"
                    id="date"
                    name="date"
                    value={value.date ? value.date : ""}
                    onChange={handleOnChange}
                    title="정비일자"
                />
            </StyledInputGroupContainer>
            <StyledInputGroupContainer>
                <StyledInputGroup
                    type="number"
                    id="soc"
                    name="soc"
                    value={value.soc ? value.soc : ""}
                    onChange={handleOnChange}
                    title="SoC"
                />
                <StyledInputGroup
                    type="number"
                    id="soh"
                    name="soh"
                    value={value.soh ? value.soh : ""}
                    onChange={handleOnChange}
                    title="SoH"
                />
            </StyledInputGroupContainer>
            <StyledInputGroup
                type="text"
                id="others"
                name="others"
                value={value.info ? value.info : ""}
                onChange={handleOnChange}
                title="정비 내용"
            />
            <StyledButtonContainer>
                <Button onClick={handleMaintain}>확인</Button>
                <Button
                    onClick={handle_close}
                    color={"red"}
                    hover_color={"#c50000"}
                >
                    취소
                </Button>
            </StyledButtonContainer>
        </StyledBatteryExtractContainer>
    );
};

export default BatteryMaintainModal;
