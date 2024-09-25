import styled from "styled-components";
import GNB from "../components/organisms/GNB";
import PageTemplate from "../components/templates/PageTemplate";
import Photo from "../components/atoms/Photo";
import SearchingBar from "../components/molecules/SearchingBar";
import IntroductionList from "../components/organisms/IntroductionList";
import { useNavigate } from "react-router-dom";

const introductions = [
    {
        image: "./assets/test.png",
        title: "Battery Ecosystem IN US",
        content: `미래의 에너지 관리, 이제 BE IN US에서 시작하세요.
        배터리의 수명과 이력을 안전하고 투명하게 관리하여 지속 가능한 에너지 생태계를 구축합니다.`,
    },
    {
        image: "./assets/test.png",
        title: "Better Enrichment IN US",
        content: `더 나은 내일을 위한 한 걸음, BE IN US와 함께하세요.
        배터리 정보를 블록체인 기술을 통해 강화하고, 효율성을 극대화하여 환경 보호와 경제적 이익을 동시에 추구합니다.`,
    },
    {
        image: "./assets/test.png",
        title: "Blockchain Efficient IN US",
        content: `혁신적인 블록체인 기술로 배터리 여권을 안전하게 조회하세요.
        BE IN US는 투명한 정보 제공과 효율적인 관리로 배터리 생태계의 새로운 표준을 제시합니다.`,
    },
];

const StyledPageTemplate = styled(PageTemplate)`
    padding-top: 150px;
`;

const MaterialDetailPage = () => {
    const navigate = useNavigate();
    // const bottomObserver = useRef(null);
    // const { data } = useInfiniteScroll(
    //     "product",
    //     fetchProducts,
    //     bottomObserver
    // );
    return (
        <div>
            <GNB></GNB>
            <StyledPageTemplate>
                <Photo
                    src="/assets/logo.png"
                    alt="로고"
                    objectfit="cover"
                    width="600px"
                />
                <SearchingBar onSearch={() => navigate("/search")} />
                <IntroductionList introductions={introductions} />
            </StyledPageTemplate>
        </div>
    );
};

export default MaterialDetailPage;
