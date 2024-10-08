import styled from "styled-components";
import TextInput from "../atoms/TextInput";
import Icon from "../atoms/Icon";
import useInput from "../../hooks/useInput";

const StyledSearchingContainer = styled.div`
    position: relative;
    width: 100%;
    /* min-width: 720px; */
`;

const StyledSearchingBar = styled(TextInput)`
    width: 100%;
    font-size: 12px;
    border-radius: 10px;
    padding: 10px 20px;
`;

const SearchIcon = styled(Icon)`
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    cursor: pointer;
    color: #3498db;
`;

const SearchingBar = ({
    id = "",
    name = "",
    className = "",
    value = "",
    onChange,
    onSearch,
}) => {
    return (
        <StyledSearchingContainer
            className={`searching-container ${className}`}
        >
            <StyledSearchingBar
                className={`searching-input ${className}`}
                id={id}
                name={name}
                placeholder="배터리 ID로 찾기"
                value={value}
                onChange={onChange}
            ></StyledSearchingBar>
            <SearchIcon icon="search" onClick={(e) => onSearch(e)} />
        </StyledSearchingContainer>
    );
};

export default SearchingBar;
