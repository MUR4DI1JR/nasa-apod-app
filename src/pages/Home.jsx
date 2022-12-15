import React, {useState} from 'react';
import LoginForm from '../components/LoginFrom';
import Loader from "../components/Loader";
import logo from '../assets/image/nasa-logo.svg';

const Home = () => {
    const [name, setName] = useState("");
    const [date, setDate] = useState();
    const [res, setRes] = useState();


    return (
        <div className="w-[80%] mx-auto">
            <LoginForm
                userName={name}
                userDate={date}
                changeName={(name) => setName(name)}
                changeDate={(date) => setDate(date)}
                changeRes={(data) => setRes(data)}
            />
            <header>
                <div className="flex items-center">
                    <div>
                        <img src={logo} alt="logoNasa"/>
                    </div>
                    <h1>APOD v2</h1>
                </div>
            </header>

            <div className="w-full text-center">
                {
                    res ?
                        <div className="w-full flex justify-center items-center">
                            <img src={res?.url} alt=""/>
                        </div>
                        :
                        <div className="w-full flex justify-center items-center">
                            <Loader/>
                        </div>
                }
                <div className="my-[20px]">
                    <h1 className="my-[10px]"><b>{res?.title}</b></h1>
                    <p>{res?.explanation}</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
//
// copyright
//     :
//     "Tomas Slovinsky"
// date
//     :
//     "2022-12-15"
// explanation
//     :
//     "On December 8 a full Moon and a full Mars were close, both bright and opposite the Sun in planet Earth's sky. In fact Mars was occulted, passing behind the Moon when viewed from some locations across Europe and North America.  Seen from the city of Kosice in eastern Slovakia, the lunar occultation of Mars happened just before sunrise. The tantalizing spectacle was recorded in this telescopic timelapse sequence of exposures. It took about an hour for the Red Planet to disappear behind the lunar disk and then reappear as a warm-hued full Moon, the last full Moon of 2022, sank toward the western horizon. The next lunar occultation of bright planet Mars will be in the new year on January 3, when the Moon is in a waxing gibbous phase. Lunar occultations are only ever visible from a fraction of the Earth's surface, though. The January 3 occultation of Mars will be visible from parts of the South Atlantic, southern Africa, and the Indian Ocean."
// hdurl
//     :
//     "https://apod.nasa.gov/apod/image/2212/MarsTrailsSMALL.jpg"
// media_type
//     :
//     "image"
// service_version
//     :
//     "v1"
// title
//     :
//     "Full Moon, Full Mars"
// url
//     :
//     "https://apod.nasa.gov/apod/image/2212/MarsTrailsSMALL1024.jpg"