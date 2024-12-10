import React, { useEffect, useMemo, useState } from "react";
import DashBoardCard from "../Components/DashBoardCard";
import PageTitleAndBack from "../Components/PageTitleAndBack";
import { rustikApi } from "../services/rustikApi";
import { rustikEndpoints } from "../services/rustkEndPoints";
import { Link } from "react-router-dom";
import { routeList } from "../helpers/routeList";

const AdminPanel = () => {

    const [statistics, setStatistics] = useState({
        totalUsers: 0,
        totalCabins: 0,
        totalBookings: 0,
        topFavorites: [],
        topRating:[],
        bookingsByState:[],
    })
    const maxFav = useMemo(() => Math.max(...statistics.topFavorites.map(favorite => favorite.val2)), [statistics.topFavorites]);

    useEffect(() => {
        const getStatistics = async () => {
        try {
            const { data } = await rustikApi.get(`${rustikEndpoints.stats}`);
            setStatistics( (prevData) => ({
                ...prevData,
                totalUsers: data.filter(stat => stat.group ==="totalUser")[0]?.val1 ?? 0,
                totalCabins: data.filter(stat => stat.group ==="totalCabin")[0]?.val1 ?? 0,
                totalBookings: data.filter(stat => stat.group ==="totalActiveBooking")[0]?.val1 ?? 0,
                topFavorites: data.filter(stat => stat.group ==="favoriteRanking") || [],
                topRating: data.filter(stat => stat.group ==="ratingRanking") || [],
                bookingsByState: data.filter(stat => stat.group ==="bookingsByState") || [],
            }));
          } catch (error) {
            console.error("Error al llamar a la api", error);
          }
        };
        getStatistics();
      
    }, []);
    
    const getPercentage = (value, total) => {
        return `${(value / total) * 100}%`;
    }

    const getBookingsByState = (state) => {
        const booking = statistics.bookingsByState.find(booking => booking.description === state);
        return {
            total: booking?.val1 ?? 0,
            percent: ((booking?.val1 / statistics.bookingsByState.reduce((acc, curr) => (acc + curr.val1), 0) ) * 100||0).toFixed(0) ,
        }
    }
    
    const activeBookings = getBookingsByState("0");
    const completedBookings = getBookingsByState("1");
    const cancelledBookings = getBookingsByState("2");

    

    return (
        <div className="animate-fadeIn px-5 py-10 w-full" >
            <section className="flex w-full justify-between items-center mb-6">
                <PageTitleAndBack title={`Dashboard`} />
            </section>
            <section>
                <article className="grid grid-cols-3 gap-7" >
                <DashBoardCard title="Total de usuarios registrados">
                    <h3 className="text-center text-xl" >Total Usuarios</h3>
                    <p className="montserrat text-center text-5xl font-bold mt-5" >{statistics.totalUsers}</p>
                </DashBoardCard>
                <DashBoardCard title="Total de cabañas registradas"> 
                    <h3 className="text-center text-xl" >Total Cabañas</h3>
                    <p className="montserrat text-center text-5xl font-bold mt-5" >{statistics.totalCabins}</p>
                </DashBoardCard>
                <DashBoardCard title="Total de reservas registradas">
                    <h3 className="text-center text-xl" >Total Reservas</h3>
                    <p className="montserrat text-center text-5xl font-bold mt-5" >{statistics.totalBookings}</p>
                </DashBoardCard>
                </article>
                <article className="grid grid-cols-2 gap-7 mt-7" >
                    <DashBoardCard>
                        <h3 className="text-center text-xl" >Top 5 Favoritos</h3>
                        <div className="grid grid-cols-[25%_1fr] gap-5 mt-5 items-center" >
                            {
                                statistics.topFavorites.length > 0 && statistics.topFavorites.map((favorite, index) =>(
                                    <React.Fragment key={favorite.id}>
                                        <Link 
                                            to={`${routeList.CATALOG_DETAIL}/${favorite.itemId}`} 
                                            className="hover:text-secondary-color hover:scale-105"
                                        >
                                            {favorite.description}
                                        </Link>
                                        <div className="w-full overflow-hidden" >
                                            <span 
                                                className={`-translate-x-[100%] animate-growRight h-10 bg-primary-color rounded-r-md montserrat flex justify-center items-center text-xl`} 
                                                style={{ width: getPercentage(favorite.val2, maxFav), backgroundColor:  `rgb(8, 131, 149, ${(1 - index * 0.20)})`, animationDelay: `${(5-index) * 0.1}s` }} 
                                            >
                                                { favorite.val2 }
                                            </span>
                                        </div>
                                    </React.Fragment>

                                ))
                            }
                            
                        </div>
                    </DashBoardCard>
                    <DashBoardCard>
                        <h3 className="text-center text-xl" >Top 5 Ratings</h3>
                        <div className="grid grid-cols-[25%_1fr] gap-5 mt-5 justify-start items-center" >
                            {
                                statistics.topRating.length > 0 && statistics.topRating.map((rating, index) =>(
                                    <React.Fragment key={rating.id}>
                                        <Link 
                                            to={`${routeList.CATALOG_DETAIL}/${rating.itemId}`} 
                                            className="hover:text-secondary-color hover:scale-105"
                                        >
                                            {rating.description}
                                        </Link>
                                        <div className="w-full overflow-hidden" >
                                            <span 
                                                className={`-translate-x-[100%] animate-growRight h-10 bg-primary-color rounded-r-md montserrat flex justify-center items-center text-xl`} 
                                                style={{ width: getPercentage(rating.val1, 5), backgroundColor:  `rgb(8, 131, 149, ${(1 - index * 0.20)})`, animationDelay: `${(5-index) * 0.1}s` }} 
                                            >
                                                { rating.val1.toFixed(2) }
                                            </span>
                                        </div>
                                    </React.Fragment>

                                ))
                            }
                            
                        </div>
                    </DashBoardCard>
                </article>
                <article className="grid grid-cols-3 gap-7 mt-7" >
                <DashBoardCard title="Total de usuarios registrados">
                    <h3 className="text-center text-xl" >Reservas Activas {activeBookings.total}</h3>
                    <div 
                        className="w-48 h-48 p-4 mx-auto mt-5 rounded-full montserrat flex justify-center items-center text-xl font-bold animate-rotateReverse" 
                        style={{ background: `conic-gradient(from 38deg, #fbffbd ${95 - activeBookings.percent}%,  #088395 ${activeBookings.percent}% 98%, #fbffbd )` }} 
                    >                     
                        <div className="w-full h-full rounded-full bg-background-dark flex justify-center items-center flex-col animate-rotate" >
                            <p className="text-5xl font-bold text-center montserrat" >{activeBookings.percent}%</p>
                        </div>
                    </div>
                </DashBoardCard>
                <DashBoardCard title="Total de usuarios registrados">
                    <h3 className="text-center text-xl" >Reservas Completadas {completedBookings.total}</h3>
                    <div 
                        className="w-48 h-48 p-4 mx-auto mt-5 rounded-full montserrat flex justify-center items-center text-xl font-bold animate-rotate " 
                        style={{ background: `conic-gradient(from 38deg, #fbffbd ${95 - completedBookings.percent}%,  #088395 ${completedBookings.percent}% 98%, #fbffbd )` }} 
                    >                     
                        <div className="w-full h-full rounded-full bg-background-dark flex justify-center items-center flex-col animate-rotateReverse" >
                            <p className="text-5xl font-bold text-center montserrat" >{completedBookings.percent}%</p>
                        </div>
                    </div>
                </DashBoardCard>
                <DashBoardCard title="Total de usuarios registrados">
                    <h3 className="text-center text-xl" >Reservas Canceladas {cancelledBookings.total}</h3>
                    <div 
                        className="w-48 h-48 p-4 mx-auto mt-5 rounded-full montserrat flex justify-center items-center text-xl font-bold animate-rotateReverse" 
                        style={{ background: `conic-gradient(from 38deg, #088395 ${95 - cancelledBookings.percent}%,  #fbffbd ${cancelledBookings.percent}% 98%, #088395 )` }} 
                    >                     
                        <div className="w-full h-full rounded-full bg-background-dark flex justify-center items-center flex-col animate-rotate" >
                            <p className="text-5xl font-bold text-center montserrat" >{cancelledBookings.percent}%</p>
                        </div>
                    </div>
                </DashBoardCard>

                </article>
            </section>
            
        </div>


    )
}

export default AdminPanel;