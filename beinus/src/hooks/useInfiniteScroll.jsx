import { useInfiniteQuery } from "react-query";
import { useRef, useEffect } from "react";

const useInfiniteScroll = (key, fetchFunction, bottomObserver) => {
    const observerRef = useRef();

    const { fetchNextPage, hasNextPage, isFetching, data } = useInfiniteQuery({
        queryKey: [key],
        queryFn: fetchFunction,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.data.response.length == 0) {
                return undefined;
            }
            return lastPage.page + 1;
        },
        keepPreviousData: true,
    });

    const io = (entires, observer) => {
        entires.forEach((entry) => {
            if (
                !isFetching &&
                entry.isIntersecting &&
                bottomObserver.current &&
                hasNextPage
            ) {
                console.log(data);
                observer.unobserve(entry.target);
                fetchNextPage();
            }
        });
    };

    useEffect(() => {
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver(io);
        bottomObserver && observerRef.current.observe(bottomObserver.current);
    }, [isFetching]);

    return { data };
};

export default useInfiniteScroll;
