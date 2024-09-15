import React, { useEffect, useState } from "react";
import "../App.css";

interface ImagesProps {
  images: any;
}

const Types = {
  VIDEO: "video/mp4",
  NOTVIDEO: "img/gif",
};

const Images: React.FC<ImagesProps> = ({ images }) => {
  const getType = (image: any): string => {
    const img = image.images ? image.images[0] : image;
    // Images and videos need different tags to be viewed
    return img?.type === Types.VIDEO ? Types.VIDEO : Types.NOTVIDEO;
  };

  const combinedClasses: string =
    "rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 cursor-pointer object-contain";

  const [fullScreenSrc, setFullScreenSrc] = useState(null);

  const toggleFullScreen = (src?: any) => {
    if (src) {
      setFullScreenSrc(src);
      document.body.classList.add("overflow-hidden"); //used to hide the scrollbar when in fullscreen
    } else {
      setFullScreenSrc(null);
      document.body.classList.remove("overflow-hidden");
    }
  };

  // To exit full screen when esc is pressed and to prevent scroll on iphones
  useEffect(() => {
    const handleKeyDown = (event: { key: string }) => {
      if (event.key === "Escape") {
        toggleFullScreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    if (fullScreenSrc) {
      document.ontouchmove = function (e) {
        e.preventDefault();
      };
    } else {
      document.ontouchmove = function (_e) {
        return true;
      };
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="image-grid grid grid-cols-2 md:grid-cols-3 gap-4 place-items-center">
      {images.map((image: any) => (
        <div key={image.id} className={`image-card p-3`}>
          {getType(image) == Types.VIDEO ? (
            <video controls className={combinedClasses} title={image.title}>
              <source
                src={image?.images ? image.images[0]?.link : image?.link}
                type="video/mp4"
              />
            </video>
          ) : (
            <img
              src={image?.images ? image.images[0]?.link : image?.link}
              alt={image?.images ? image.images[0]?.title : image.title}
              title={image.title}
              className={`${combinedClasses}`}
              onClick={() =>
                toggleFullScreen(
                  image?.images ? image.images[0]?.link : image?.link
                )
              }
            />
          )}
          {fullScreenSrc && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
              <img
                src={fullScreenSrc}
                alt="full-screen media"
                className="w-auto h-full object-contain"
              />
              <button
                className="absolute top-4 right-4 bg-black p-1"
                onClick={() => toggleFullScreen(null)}
              >
                Close
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Images;
