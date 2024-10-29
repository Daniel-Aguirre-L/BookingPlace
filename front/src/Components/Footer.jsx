const Footer = () => {
    return (
     <div className="bg-[#088395] text-center flex justify-center flex-col gap-7 px-2.5 py-5 text-[#EEEEEEEE]">
        <img src="/Icons/Group 46.svg" alt="logo footer" className="mx-auto my-0"/>
        <div className="flex justify-center gap-5">
            <img src="/Icons/Vector.svg" alt="instagram" />
            <img src="/Icons/Vector(1).svg" alt="facebook" />
            <img src="/Icons/Vector(2).svg" alt="x" />
        </div>
        <div className="flex justify-center gap-12">
            <span>About us</span>
            <span>Contact</span>
        </div>
        <p>Copyright @2024 digitalhouse proyecto integrador</p>
     </div>
    ) 
}

export default Footer;