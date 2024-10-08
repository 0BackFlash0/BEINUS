import styled from "styled-components";
import InputGroup from "../molecules/InputGroup";
import Topic from "../atoms/Topic";
import Subtitle from "../atoms/Subtitle";
import Button from "../atoms/Button";
import useInput from "../../hooks/useInput";
import OptionGroup from "../molecules/OptionGroup";
import { setRecycleAvailability } from "../../services/additional_api";
import { useCaution } from "../../hooks/useCaution";

const StyledBatteryRegisterContainer = styled.div`
    position: relative;
    width: 480px;
    height: 360px;
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
        key: "true",
        name: "재활용 가능",
    },
    {
        key: "false",
        name: "재활용 불가능",
    },
];

const BatteryAnalysisModal = ({
    className = "",
    battery_id,
    handle_close,
    ...props
}) => {
    const { showCaution } = useCaution();

    const [value, handleOnChange] = useInput({
        recycleAvailability: "true",
    });

    const handleAnalysis = async function () {
        await setRecycleAvailability({
            batteryID: battery_id,
            recycleAvailability: value.recycleAvailability,
        })
            .then((response) => {
                showCaution(
                    `재활용 가능성 평가를 완료했습니다. \n ID: ${response.data.batteryID} \n 가능여부: ${response.data.result}`,
                    handle_close
                );
            })
            .catch((error) => {
                showCaution(`${error.message}`);
            });
    };

    return (
        <StyledBatteryRegisterContainer
            className={`battery-register-modal ${className}`}
            {...props}
        >
            <StyledTopic>재활용 여부 분석</StyledTopic>
            <StyledOptionGroup
                options={resultOptions}
                id="recycleAvailability"
                name="recycleAvailability"
                value={
                    value.recycleAvailability ? value.recycleAvailability : ""
                }
                onChange={handleOnChange}
                title="분석결과"
            />
            <StyledButtonContainer>
                <Button onClick={handleAnalysis}>확인</Button>
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

export default BatteryAnalysisModal;
