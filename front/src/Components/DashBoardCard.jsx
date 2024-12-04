

const DashBoardCard = ({children, ...attributes}) => {
    const { className, ...otherAttributes } = attributes
    
    const classString = `bg-[#1C1F37] rounded-xl text-light-text p-6 hover:scale-105 transition-all ${className}`
    return (
    <div className={classString} {...otherAttributes} >
        {children}
    </div>
  )
}

export default DashBoardCard