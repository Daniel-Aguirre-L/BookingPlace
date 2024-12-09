import { useState } from "react";
import PaginationInitialControl from "../Components/PaginationInitialControl";

export const usePagination = (data, dataPerPage = 4) => {
    
    const [initialData, setInitialData] = useState(data);
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

    const firstPage = () => {
        setCurrentPage(1);
        setCurrentData([...initialData.slice(
            (0) * commentsPerPage,
            (0) * commentsPerPage + commentsPerPage
        )]);
    };

    const lastPage = () => {
        setCurrentPage(totalPages);
        setCurrentData([...initialData.slice(
            (totalPages - 1) * commentsPerPage,
            (totalPages - 1) * commentsPerPage + commentsPerPage
        )]);
    };

    const setPaginationData = (newData, page = currentPage) => {
        setInitialData(newData);
        setCurrentData(
            newData && newData.length > 0 ?
            [...newData.slice(
            (page - 1) * commentsPerPage,
            (page - 1) * commentsPerPage + commentsPerPage
        )]:[])
        

    };

    const setFirstPage = () => {
        setCurrentPage(1);
    };


    const PaginationControls = () => {
        return (
            <PaginationInitialControl currentPage={currentPage} totalPages={totalPages} nextPage={nextPage} prevPage={prevPage} firstPage={firstPage} lastPage={lastPage} />
        )

    };


    return {
        currentData,
        totalPages,
        currentPage,
        
        setPaginationData,
        PaginationControls,
        setCommentsPerPage,
        prevPage,
        nextPage,
        setFirstPage,
    };
};
