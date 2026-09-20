import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* 404 Content */}
      <section className="py-32 md:py-40">
        <div className="container mx-auto px-4 text-center">
          {/* Large 404 Text */}
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-8">
            <span className="text-[120px] md:text-[180px] lg:text-[220px] font-bold text-primary leading-none">
              4
            </span>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 28"
                fill="none"
                className="w-[80px] h-[100px] md:w-[120px] md:h-[150px] lg:w-[150px] lg:h-[180px]"
              >
                <path
                  d="M8.554 27.5782C2.7085 25.956 -0.939754 20.0348 0.212042 14.1568C0.787039 11.2133 2.39487 8.95301 4.52001 6.95764C4.97063 6.53586 5.19955 6.4926 5.64837 6.95764C8.10698 9.45771 10.6034 11.9253 13.0801 14.42C14.2193 15.5646 14.3148 17.021 13.3324 18.0033C12.3501 18.9857 10.8936 18.8902 9.75086 17.751C8.33049 16.3324 6.91913 14.9049 5.43748 13.425C3.19878 17.6537 6.41804 23.0305 11.2163 23.2937C12.6181 23.3839 14.0143 23.047 15.2207 22.3274C16.4271 21.6079 17.387 20.5395 17.9739 19.2633C18.58 17.9778 18.7726 16.536 18.525 15.1366C18.2774 13.7371 17.6018 12.4489 16.5913 11.4495C14.0222 8.83464 11.4338 6.24205 8.82618 3.67169C8.45126 3.30218 8.36474 3.08407 8.79734 2.68752C9.6373 1.91786 10.4376 1.10313 11.2163 0.270374C11.5768 -0.111755 11.7877 -0.0721004 12.1392 0.282992C14.7546 2.92906 17.4529 5.49582 20.0053 8.19956C23.3038 11.6946 24.1618 15.8187 22.5973 20.3574C20.6506 26.0209 14.3887 29.2005 8.554 27.5782Z"
                  fill="#A3F000"
                />
              </svg>
            </div>
            <span className="text-[120px] md:text-[180px] lg:text-[220px] font-bold text-primary leading-none">
              4
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto mb-10">
            Looks like we are missing some page, or you typed something wrong in the URL, here's a way to get back
          </p>

          {/* Button */}
          <Link
            to="/"
            className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            Go To Homepage
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NotFound;
