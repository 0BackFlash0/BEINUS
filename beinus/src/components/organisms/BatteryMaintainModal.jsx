import styled from "styled-components";
import InputGroup from "../molecules/InputGroup";
import Topic from "../atoms/Topic";
import Subtitle from "../atoms/Subtitle";
import Button from "../atoms/Button";
import OptionGroup from "../molecules/OptionGroup";
import useInput from "../../hooks/useInput";
import { maintainBattery } from "../../services/api";

const StyledBatteryExtractContainer = styled.div`
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
    onSuccess,
    onClose,
    ...props
}) => {
    const [value, handleOnChange] = useInput({
        name: "",
        date: "",
        result: "",
        others: ""
    });

    const handleMaintain = async function () {
        const maintainReq = await maintainBattery({
            name: value.name,
            date: value.date,
            result: value.result,
            others: value.others,
        })
            .then((response) => {
                return response.data;
            })
            .catch((response) => response.data);
        if (maintainReq.success) {
            console.log("success")
            onClose()
        } 
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
                    value={value.maintainer ? value.maintainer : ""}
                    onChange={handleOnChange}
                    title="정비자" />
                <StyledInputGroup 
                    type="date"
                    id="date"
                    name="date"
                    value={value.date ? value.date : ""}
                    onChange={handleOnChange}
                    title="정비일자" />
            </StyledInputGroupContainer>
            <StyledOptionGroup 
                options={resultOptions}
                id="result"
                name="result"
                value={value.result ? value.result : ""}
                onChange={handleOnChange}
                title="정비결과" />
            <StyledInputGroup 
                type="text" 
                id="others"
                name="others"
                value={value.others ? value.others : ""}
                onChange={handleOnChange}
                title="특이사항" />
            <StyledButtonContainer>
                <Button onClick={handleMaintain}>확인</Button>
                <Button onClick={onClose} color={"red"} hover_color={"#c50000"}>
                    취소
                </Button>
            </StyledButtonContainer>
        </StyledBatteryExtractContainer>
    );
};

export default BatteryMaintainModal;
