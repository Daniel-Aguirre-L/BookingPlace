import { useState } from "react";
import LikeButton from "./LikeButton";
import { useUser } from "../hooks/useUser";

const ShareFavButtons = ({ cabin, isFavorite,  refreshFavoritos = () => {}, url = "http://localhost:5173/catalogo/1" }) => {

    const { isLoggedIn } = useUser();

    const [shareOptionsOpen, setShareOptionsOpen] = useState(false);
    const compartirEnFacebook = () => {
        closeShareOptions();
        const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(facebookURL, '_blank');
    };

    const compartirEnInstagram = () => {
        closeShareOptions();
        const instagramURL = `https://www.instagram.com/direct/inbox/`;
        window.open(instagramURL, '_blank');
    };

    const compartirEnTwitter = () => {
        closeShareOptions();
        const twitterURL = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent('Echa un vistazo a esto:')}`;
        window.open(twitterURL, '_blank');
    };

    const compartirEnMovil = async () => {
        closeShareOptions();
        if (navigator.share) {
            try {
                await navigator.share({ title: cabin.title, url })
            } catch (error) {
                console.error('Error al compartir:', error);
            }
        }else{
            try {
                await navigator.clipboard.writeText(url);
            } catch (error) {
                console.error('Error al compartir:', error);
            }
        }
    };

    const toggleShareOptions = () => {
        setShareOptionsOpen((prev) => !prev);
    };

    const closeShareOptions = () => {
        setShareOptionsOpen(false);
    };

    const MenuOption = ({ imgUrl, children, onClick }) => (
        <div
            className="relative flex items-center gap-3 cursor-pointer hover:backdrop-brightness-75 p-2 rounded"
            onClick={onClick}
        >
            <img src={imgUrl} alt="Icon" className="w-6 h-6" />
            <span className="text-lg">{children}</span>
            <img
                src="/Icons/arrowright.svg"
                alt="Icon"
                className="w-3 h-3 absolute right-0"
            />
        </div>
    );

    return (
        <div className="relative flex gap-5">
            <img
                src="/Icons/share.svg"
                alt="share"
                className="hover:brightness-[75%] cursor-pointer"
                onClick={toggleShareOptions}
            />

            {
                isLoggedIn && <div className="text-3xl" >
                    <LikeButton id={cabin.id} isFavorite={isFavorite} onLike={refreshFavoritos} onUnlike={refreshFavoritos} />
                </div>
            }

            {shareOptionsOpen && (
                <section
                    className={`absolute flex flex-col rounded-[0.75rem] bg-primary-color p-8 w-[23rem] top-[4.5rem] right-0 md:top-[2.5rem] md:right-14 transition-all duration-300 ease-in-out z-10 ${shareOptionsOpen
                        ? "opacity-100 translate-y-0 visible"
                        : "opacity-0 -translate-y-5 invisible"
                        }`}
                    onMouseLeave={closeShareOptions}
                >
                    <MenuOption
                        imgUrl="/Icons/facebook.svg"
                        onClick={compartirEnFacebook}
                    >
                        Facebook
                    </MenuOption>
                    <MenuOption
                        imgUrl="/Icons/instagram.svg"
                        onClick={compartirEnInstagram}
                    >
                        Instagram
                    </MenuOption>
                    <MenuOption
                        imgUrl="/Icons/x.svg"
                        onClick={compartirEnTwitter}
                    >
                        Twitter
                    </MenuOption>
                    {
                        navigator.share ? (
                            <MenuOption imgUrl="/Icons/embed.svg" onClick={compartirEnMovil}>
                                Elegir Otra App
                            </MenuOption>
                        ) : (
                            <MenuOption imgUrl="/Icons/embed.svg" onClick={""}>
                                Copiar Enlace
                            </MenuOption>
                        )
                    }
                </section>
            )}
        </div>
    )
}

export default ShareFavButtons
