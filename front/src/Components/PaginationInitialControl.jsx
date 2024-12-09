

const PaginationInitialControl = ({currentPage = 1, totalPages=1, nextPage=()=>{}, prevPage=()=>{}, firstPage=()=>{}, lastPage=()=>{}}) => {
    return (
        <div className="flex items-center justify-center  text-primary-color" >
                {
                    currentPage > 3 && (
                    <button onClick={firstPage} disabled={currentPage === 1} className="px-5 py-0 text-secondary-color ">
                       |&lt;
                    </button>
                )}
                
                <button onClick={prevPage} disabled={currentPage === 1} className="px-5 py-2 text-secondary-color ">
                    &lt;
                </button>
                <span >{currentPage} de {totalPages}</span>
                <button onClick={nextPage} disabled={currentPage === totalPages} className="px-5 py-2 text-secondary-color">
                    &gt;
                </button>
                {
                    currentPage < totalPages - 2 && (
                    <button onClick={lastPage} disabled={currentPage === totalPages} className="px-5 py-2 text-secondary-color">
                        &gt;|
                    </button>
                )}
            </div>
    )
}

export default PaginationInitialControl