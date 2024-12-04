import Avatar from "./Avatar";
import { getRatingDescription } from "../helpers/getRatingDescription";

function Reviews({ review }) {
  return (
    <div className="animate-fadeIn  ">
      <div className="flex flex-col py-4 ">
        <div
          key={review.id}
          className="flex items-start space-x-4 py-4 border-b border-secondary-color font-montserrat text-sm w-[99%]"
        >
          {/* Avatar */}
          <div className="min-w-[1rem] flex-shrink-0">
            <Avatar name={review.userFullName} size="small" />
          </div>
          <div>
            <p className="text-lg font-bold text-primary-color font-montserrat text-sm">
              {review.score} {getRatingDescription(review.score)} |{" "}
              <span className="text-light-text font-bold">
                {review.userFullName}
              </span>
            </p>
             <span className="text-primary-color ">
                {new Date(review.createdAt).toLocaleDateString('es-CO',{weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',})}
              </span>
            <p className="text-light-text font-montserrat text-sm">
              {review.review}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
