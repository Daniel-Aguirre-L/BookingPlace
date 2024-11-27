import { useState } from "react";

export const usePagination = (initialData, dataPerPage = 4) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [commentsPerPage, setCommentsPerPage] = useState(dataPerPage);
    const [currentData, setCurrentData] = useState(
        initialData && initialData.length > 0 ?
        [...initialData.slice(
        (currentPage - 1) * commentsPerPage,
        (currentPage - 1) * commentsPerPage + commentsPerPage
    )]:[]);

    const totalPages = Math.ceil(initialData.length / commentsPerPage);
    // const startIndex = (currentPage - 1) * commentsPerPage;
    // const currentComments = comments.slice(
    //     startIndex,
    //     startIndex + commentsPerPage
    // );

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setCurrentData([...initialData.slice(
                (currentPage - 2) * commentsPerPage,
                (currentPage - 2) * commentsPerPage + commentsPerPage
            )]);
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages){
             setCurrentPage(currentPage + 1);
             setCurrentData([...initialData.slice(
                (currentPage ) * commentsPerPage,
                (currentPage ) * commentsPerPage + commentsPerPage
            )]);
        }
    };

    const PaginationControls = () => {
        return (
            <div className="flex items-center justify-center">
                    <button onClick={prevPage} disabled={currentPage === 1} className="px-5 py-2">
                        &lt;
                    </button>
                    <span className="text-gray-700">{currentPage} of {totalPages}</span>
                    <button onClick={nextPage} disabled={currentPage === totalPages} className="px-5 py-2">
                        &gt;
                    </button>
                </div>
        )

    };


    return {
        currentData,
        totalPages,
        currentPage,

        PaginationControls,
        setCommentsPerPage,
        prevPage,
        nextPage,
    };
};
