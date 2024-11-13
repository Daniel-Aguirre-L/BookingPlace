
const CloseButton = ({onClick}) => {
  return (
    <button 
                type="button" 
                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full  border-2 border-[#FBFFBD] bg-[#088395] text-gray-800" 
                aria-label="Close" 
                onClick={onClick}
              >
                <span className="sr-only">Close</span>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" color="#FBFFBD" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
                </svg>
              </button>
  )
}

export default CloseButton