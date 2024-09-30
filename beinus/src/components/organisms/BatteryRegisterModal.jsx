import styled from "styled-components";
import InputGroup from "../molecules/InputGroup";
import OptionGroup from "../molecules/OptionGroup";
import Topic from "../atoms/Topic";
import Subtitle from "../atoms/Subtitle";
import Button from "../atoms/Button";
import useInput from "../../hooks/useInput";
import { registerBattery } from "../../services/additional_api";
import { useState } from "react";
import RegisterMaterialOption from "./RegisterMaterialOption";
import { useCaution } from "../../hooks/useCaution";

const StyledBatteryRegisterContainer = styled.div`
    position: relative;
    width: 900px;
    height: 720px;
    padding: 60px 40px 0 40px;
    display: flex;
    flex-direction: column;
    align-items: start;
`;

const StyledBatteryInfoContainer = styled.div`
    flex-grow: 3;
    flex-basis: 0;
    /* width: 100%; */
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: start;
    overflow: auto;
`;

const StyledMaterialListContainer = styled.div`
    flex-grow: 4;
    flex-basis: 0;
    /* width: 100%; */
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: start;
    overflow: auto;
`;

const StyledColumnGroupContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
`;

const StyledRowGroupContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
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

const StyledAddButton = styled.button`
    width: 100%;
    border-style: none;
    border-radius: 5px;
    font-size: 16pt;
    font-weight: 900;
    background-color: #ececec;
    color: #6d6d6d;

    &:hover {
        background-color: #d1d1d1;
    }
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

const HarzardousOptions = [
    {
        key: "yes",
        name: "포함",
    },
    {
        key: "no",
        name: "미포함",
    },
];

const tempMaterial = {
    type: "nickel",
    // status: "new",
    materialID: "",
    amount: "0",
};

const BatteryRegisterModal = ({
    className = "",
    on_success,
    on_close,
    ...props
}) => {
    const { showCaution } = useCaution();

    const [value, handleOnChange] = useInput({
        category: "",
        voltage: "",
        weight: "0",
        isHardardous: "yes",
        capacity: "0",
        lifecycle: "0",
        materialList: [tempMaterial],
    });

    // const handleOnChangeList = (e) => {
    // const temp_list = [];
    // const { name, value } = e.target;
    // setInputValue({ ...inputValue, [name]: value });
    // };

    const addMaterial = () => {
        const changeEvent = {
            target: {
                name: "materialList",
                value: [...value.materialList, tempMaterial],
            },
        };
        handleOnChange(changeEvent);
    };

    const handleOnChangeMaterial = (e, index) => {
        const { name, value: targetValue } = e.target;

        const changeEvent = {
            target: {
                name: "materialList",
                value: value.materialList.map((item, idx) =>
                    idx === index ? { ...item, [name]: targetValue } : item
                ),
            },
        };
        handleOnChange(changeEvent);
    };

    const handleRegister = async function () {
        // if (!checkValue()) {
        //     showCaution("모든 값을 입력해주세요.");
        //     return;
        // }

        console.log(value);

        await registerBattery({
            category: value.category,
            voltage: value.voltage,
            weight: value.weight,
            isHardardous: value.isHardardous,
            capacity: value.capacity,
            lifecycle: value.lifecycle,
            materialList: value.materialList,
        })
            .then((response) => {
                // return response.data;
                if (response.status === 200) {
                    showCaution(
                        `배터리 ID가 발급되었습니다. \n ID: ${response.data.batteryID}`,
                        on_close
                    );
                } else {
                    showCaution("알수없는 에러가 발생했습니다.");
                }
            })
            .catch((response) => {
                showCaution(`에러가 발생했습니다. \n ${response.data.error}`);
            });
    };

    return (
        <StyledBatteryRegisterContainer
            className={`battery-register-modal ${className}`}
            {...props}
        >
            <StyledTopic>배터리 제조</StyledTopic>

            <StyledRowGroupContainer>
                <StyledBatteryInfoContainer>
                    <StyledRowGroupContainer>
                        <StyledInputGroup
                            type="text"
                            id="category"
                            name="category"
                            value={value.category ? value.category : ""}
                            onChange={handleOnChange}
                            title="카테고리"
                        />

                        <StyledInputGroup
                            type="text"
                            id="voltage"
                            name="voltage"
                            value={value.voltage ? value.voltage : ""}
                            onChange={handleOnChange}
                            title="전압"
                        />
                    </StyledRowGroupContainer>
                    <StyledRowGroupContainer>
                        <StyledInputGroup
                            type="text"
                            id="weight"
                            name="weight"
                            value={value.weight ? value.weight : ""}
                            onChange={handleOnChange}
                            title="무게(kg)"
                        />
                        <StyledOptionGroup
                            options={HarzardousOptions}
                            id="isHazrardous"
                            name="isHazrardous"
                            value={value.isHazrardous ? value.isHazrardous : ""}
                            onChange={handleOnChange}
                            title="위험물질 여부"
                        />
                    </StyledRowGroupContainer>

                    <StyledRowGroupContainer>
                        <StyledInputGroup
                            type="text"
                            id="capacity"
                            name="capacity"
                            value={value.capacity ? value.capacity : ""}
                            onChange={handleOnChange}
                            title="용량"
                        />
                        <StyledInputGroup
                            type="text"
                            id="lifecycle"
                            name="lifecycle"
                            value={value.lifecycle ? value.lifecycle : ""}
                            onChange={handleOnChange}
                            title="생명주기"
                        />
                    </StyledRowGroupContainer>
                </StyledBatteryInfoContainer>
                <StyledMaterialListContainer>
                    <StyledSubtitle>원자재 목록</StyledSubtitle>

                    {value.materialList
                        ? value.materialList.map((element, idx) => {
                              console.log(element);
                              return (
                                  <RegisterMaterialOption
                                      key={idx}
                                      typeValue={element.type}
                                      //   statusValue={element.status}
                                      materialIDValue={element.materialID}
                                      amountValue={element.amount}
                                      onChange={(e) =>
                                          handleOnChangeMaterial(e, idx)
                                      }
                                  />
                              );
                          })
                        : ""}
                    <StyledAddButton onClick={addMaterial}>+</StyledAddButton>
                </StyledMaterialListContainer>
                <StyledButtonContainer>
                    <Button onClick={handleRegister}>확인</Button>
                    <Button
                        onClick={on_close}
                        color={"red"}
                        hover_color={"#c50000"}
                    >
                        취소
                    </Button>
                </StyledButtonContainer>
            </StyledRowGroupContainer>
        </StyledBatteryRegisterContainer>
    );
};

export default BatteryRegisterModal;
