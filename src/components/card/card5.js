import './style.css'

const Card5 = ({image}) => {
    return (
      <a href="" className="card">
        <img src={image} className="card__image" alt="" />
        <div className="card__overlay">
          <div className="card__header">
            <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
              <path />
            </svg>
            <img
              className="card__thumb"
              src="https://i.imgur.com/7D7I6dI.png"
              alt=""
            />
            <div className="card__header-text">
              <h3 className="">Jessica Parker</h3>
              <p className="text-red-600 text-sm">05:19:04</p>
            </div>
          </div>
          <div className="w-full mb-2 text-center">
            <a
              href="#_"
              class="relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-medium transition-all bg-blue-600 rounded-full hover:bg-white group"
            >
              <span class="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
              <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-blue-600">
                Bid Now
              </span>
            </a>
          </div>
        </div>
      </a>
    );
}

export default Card5;