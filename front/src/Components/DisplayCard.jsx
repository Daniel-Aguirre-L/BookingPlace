import React from "react";

function DisplayCard() {
  return (
    <section className="pageMargin grid grid-cols-2 h-[25rem] gap-6 mb-10">
      <div className="relative bg-primary-color rounded-[1.2rem] p-8 flex flex-col">
        <h2 className="text-[2.2rem] mb-6">Snow Cottage</h2>
        <p>
          Traveling is a unique experience as it's the best way to unplug from
          the pushes and pulls of daily life. It helps us to forget about our
          problems, frustrations, and fears at home. During our journey, we
          experience life in different ways. We explore new places, cultures,
          cuisines, traditions, and ways of living.
        </p>
        <span className="flex flex-col w-fit absolute top-0 right-0">
          <p className="w-fit">From</p>
          <h2 className="text-[1.8rem] bottom-1 right-0 font-semibold w-fit">
            $ 700
          </h2>
        </span>
        <button className=" text-[1.2rem] bg-secondary-color text-background-dark h-12 rounded-[0.6rem] font-semibold">
          Reserva
        </button>
      </div>
      <aside className="rounded-[1.2rem] grid grid-cols-2 gap-y-6 gap-x-5">
        <img className="bg-slate-500 rounded-[1.2rem]" src="" alt="" />
        <img className="bg-slate-500 rounded-[1.2rem]" src="" alt="" />
        <img className="bg-slate-500 rounded-[1.2rem]" src="" alt="" />
        <img className="bg-slate-500 rounded-[1.2rem]" src="" alt="" />
      </aside>
    </section>
  );
}

export default DisplayCard;
