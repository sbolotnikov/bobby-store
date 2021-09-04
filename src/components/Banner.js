import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css";
function Banner() {
    return (
        <div className="relative">
        <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20"/>
            <Carousel
                autoPlay
                infiniteLoop
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                interval={5000}
            >
                <div>
                    <img loading="lazy" src="/images/eyeLashesB.jpg" alt="EyeLashes Image" />
                </div>
                <div>
                    <img loading="lazy" src="/images/tan2.jpeg" alt="Tan Image" />
                </div>
                <div>
                    <img loading="lazy" src="/images/studs.jpg" alt="Studs Image " />
                </div>

            </Carousel>
        </div>
    )
}

export default Banner
