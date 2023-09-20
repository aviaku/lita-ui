import {GiBattleAxe} from 'react-icons/gi'

const Skills = () => {
    return (
      <div className="shadow w-full my-4">
        <div className="rounded-lg transform bg-transparent">
          <div className="bg-white m-h-64 rounded-lg">
            {/* <div className="profile_card_header ml-4 pt-4">Skills</div> */}
            <div className="flex justify-centerti items-center">
              <figure className="m-4">
                <img
                  src="https://play-lh.googleusercontent.com/UELcKakJhwKhdDJIwpdvd1RjE3ClRXiG0nhChs69fBv-nn5ZkgSp2EkkRTnJYFtYoZyu"
                  alt=""
                  className="ml-auto mr-auto object-cover rounded-xl h-24 w-24"
                />
              </figure>
              <div className="m-4 ml-0">
                <p className="text-xl font-semibold text-orange-500">
                  Mobile Legends
                </p>
                <div
                  className="tooltip tooltip-bottom"
                  data-tip="Minimum bid price"
                >
                  <p className="bg-gray-100 font-semibold rounded-full px-2.5 py-1 text text-orange-500 text-sm">
                    ₹1000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Skills;