import { Link, useLocation } from "react-router-dom"
import { routeList } from "../helpers/routeList"
import { useEffect } from "react";
import { rustikApi } from "../services/rustikApi";
import { rustikEndpoints } from "../services/rustkEndPoints";


const ResetPasswordPage = () => {
  
    const location = useLocation(); 
    const searchParams = new URLSearchParams(location.search); 
    const keyParam = searchParams.get('key');
    
    useEffect(() => {
        
        const validateToken = async () => {
            try {
                const { data } = await rustikApi.get(rustikEndpoints.validateToken);
                
                
            } catch (error) {
               console.log('Verificando cuenta...');
            }
        };

      if (keyParam){
        const token = keyParam.slice(5,);
        localStorage.setItem("token", token);
        validateToken();

      }
      
    }, [])
    

    return (
    <section className="animate-fadeIn flex flex-col md:flex-row md:flex-row min-h-calc-100vh-minus-245 items-center md:gap-14 font-semibold my-6 mx-3" >
        <div className="flex-1 justify-center">
          <article className="text-2xl w-full flex flex-col items-center justify-center">
            <Link to={routeList.HOME}> 
              <img src="/Icons/logoSvg.svg" className="mb-4 w-60 mx-auto md:mx-0" alt="Logo"  />
            </Link>
            <p>Estamos verificando tus credenciales...</p>
          </article>
        </div>
      </section>
  )
}

export default ResetPasswordPage