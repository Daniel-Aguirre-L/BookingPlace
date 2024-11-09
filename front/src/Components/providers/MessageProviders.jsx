import { useEffect } from "react";
import useNotificationStore from "../../store/useNotificationStore";
import Notification from "../Notification";
import useLoaderModalStore from "../../store/useLoaderModalStore";
import LoaderModal from "../loaders/LoaderModal";


const MessageProviders = ({children}) => {
    
    const { notification, resetNotification } = useNotificationStore();
    const { loaderVisibility } = useLoaderModalStore();
    
    useEffect(() => {
        if (notification.visibility) {
          const timer = setTimeout(() => {
            resetNotification();
          }, 4000);
    
          return () => clearTimeout(timer);
        }
      }, [notification.visibility, resetNotification]);
  
  
  
    return (
    <>
    {children}
    
    { loaderVisibility && <LoaderModal /> }
    { notification.visibility && <Notification type={notification.type}>{notification.text}</Notification> }

    </>
  )
}

export default MessageProviders