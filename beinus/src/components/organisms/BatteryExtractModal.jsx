import styled from "styled-components";
import InputGroup from "../molecules/InputGroup";
import Topic from "../atoms/Topic";
import Subtitle from "../atoms/Subtitle";
import Button from "../atoms/Button";
import { useCaution } from "../../hooks/useCaution";
import { useState } from "react";
import useInput from "../../hooks/useInput";
import ExtractMaterialOption from "./ExtractMaterialOption";
import { extractMaterials } from "../../services/additional_api";

const StyledBatteryExtractContainer = styled.div`
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

const tempMaterial = {
    type: "nickel",
    // status: "new",
    amount: "0",
};

const BatteryExtractModal = ({
    className = "",
    battery_id,
    handle_close,
    ...props
}) => {
    const { showCaution } = useCaution();

    const [value, handleOnChange] = useInput({
        nickel: "0",
        cobalt: "0",
        manganese: "0",
        lithium: "0",
    });

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
        const { name, targetValue } = e.target;

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

    const handleExtract = async function () {
        // if (!checkValue()) {
        //     showCaution("모든 값을 입력해주세요.");
        //     return;
        // }
        console.log(battery_id);

        await extractMaterials({
            batteryID: battery_id,
            nickel: value.nickel,
            cobalt: value.cobalt,
            lithium: value.lithium,
            manganese: value.manganese,
        })
            .then((response) => {
                showCaution(
                    `원자재 추출에 성공했습니다. \n 
                        리튬 ID: ${response.data.exxtractedMaterials.Lithium.materialID} \n
                        코발트 ID: ${response.data.exxtractedMaterials.Cobalt.materialID} \n
                        망간 ID: ${response.data.exxtractedMaterials.Manganese.materialID} \n
                        니켈 ID: ${response.data.exxtractedMaterials.Nickel.materialID} \n`,
                    handle_close
                );
            })
            .catch((error) => {
                showCaution(`${error.message}`);
            });
    };

    return (
        <StyledBatteryExtractContainer
            className={`battery-extract-modal ${className}`}
            {...props}
        >
            <StyledTopic>원자재 추출</StyledTopic>
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
                    id="lithium"
                    name="lithium"
                    value={value.lithium ? value.lithium : ""}
                    onChange={handleOnChange}
                    title="리튬"
                />
            </StyledInputGroupContainer>

            <StyledInputGroupContainer>
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
                    id="manganese"
                    name="manganese"
                    value={value.manganese ? value.manganese : ""}
                    onChange={handleOnChange}
                    title="망간"
                />
            </StyledInputGroupContainer>
            {/* {value.materialList
                ? value.materialList.map((element, idx) => {
                      return (
                          <ExtractMaterialOption
                              key={idx}
                              type_value={element.type || ""}
                              //   statusValue={element.status || ""}
                              amount_value={element.amount || ""}
                              onChange={(e) => handleOnChangeMaterial(e, idx)}
                          />
                      );
                  })
                : ""}
            <StyledAddButton onClick={addMaterial}>+</StyledAddButton> */}

            <StyledButtonContainer>
                <Button onClick={handleExtract}>확인</Button>
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

export default BatteryExtractModal;
