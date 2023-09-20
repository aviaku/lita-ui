const Card2 = ({name, picture}) => {
    return (
      <div className="w-full md:w-1/3 lg:w-1/5 lg:pl-2 lg:pr-2 p-4">
        <div className="bg-base-100 rounded-lg transform hover:translate-y-2 hover:shadow-xl transition duration-300">
          <div className="m-h-64 relative rounded-t-lg">
            <figure className="">
              <img
                src={picture}
                alt=""
                className="ml-auto mr-auto object-cover rounded-t-lg h-48 w-96"
              />
            </figure>
          </div>
          <div className="p-2 pt-0 flex flex-col rounded-b-lg">
            <div className="mb-3 flex items-center justify-between px-1 md:items-start mt-3">
              <div className="mb-2">
                <p className="text-xl font-semibold text-gray-600">
                  {" "}
                  {name}{" "}
                </p>
                <p>150K Players</p>
              </div>
            </div>
            <a
              href="#_"
              class="relative btn-sm inline-flex items-center justify-center p-4 px-3 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group"
            >
              <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span class="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                View
              </span>
              <span class="relative invisible">Button Text</span>
            </a>
          </div>
        </div>
      </div>
    );
}

export default Card2;