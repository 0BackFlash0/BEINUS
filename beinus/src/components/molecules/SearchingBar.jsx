import styled from "styled-components";
import TextInput from "../atoms/TextInput";
import Icon from "../atoms/Icon";

const StyledSearchingContainer = styled.div`
    position: relative;
    width: 70%;
    min-width: 720px;
    margin: 50px 0 80px 0;
`;

const StyledSearchingBar = styled(TextInput)`
    width: 100%;
    font-size: 22px;
    border-radius: 30px;
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

const SearchingBar = ({ className = "", onSearch }) => {
    return (
        <StyledSearchingContainer
            className={`searching-container ${className}`}
        >
            <StyledSearchingBar
                className={`searching-input ${className}`}
                name="battery search"
                placeholder="배터리 ID를 입력해주세요"
            ></StyledSearchingBar>
            <SearchIcon icon="search" onClick={(e) => onSearch(e)} />
        </StyledSearchingContainer>
    );
};

export default SearchingBar;
