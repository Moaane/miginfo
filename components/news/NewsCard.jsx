import React from "react";

const news = [
  {
    imgUrl: "img_holder.png",
    title:
      "Sosialisasi Kekayaan Intelektual dan Peluncuran Sistem Keterunutan Indikasi Geografis",
    category: "News",
  },
  {
    imgUrl: "img_holder.png",
    title:
      "Sosialisasi Kekayaan Intelektual dan Peluncuran Sistem Keterunutan Indikasi Geografis",
    category: "News",
  },
  {
    imgUrl: "img_holder.png",
    title:
      "Sosialisasi Kekayaan Intelektual dan Peluncuran Sistem Keterunutan Indikasi Geografis",
    category: "News",
  },
  {
    imgUrl: "img_holder.png",
    title:
      "Sosialisasi Kekayaan Intelektual dan Peluncuran Sistem Keterunutan Indikasi Geografis",
    category: "News",
  },
  {
    imgUrl: "img_holder.png",
    title:
      "Sosialisasi Kekayaan Intelektual dan Peluncuran Sistem Keterunutan Indikasi Geografis",
    category: "News",
  },
  {
    imgUrl: "img_holder.png",
    title:
      "Sosialisasi Kekayaan Intelektual dan Peluncuran Sistem Keterunutan Indikasi Geografis",
    category: "News",
  },
];

export default function NewsCard() {
   
  return (
    <>
      <div className="bg-red-200 flex justify-center xl:px-24 lg:px-16 md:px-8 px-4 pb-4 lg:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 bg-red-300 justify-items-center w-full max-w-[1440px] gap-12 py-12">
          {news.map((news, index) => (
            <div
              key={index}
              className="card n min-w-64 max-w-64 md:w-72 md:min-w-72 xl:min-w-96 2xl:min-w-full bg-base-100 shadow-xl rounded-2xl"
            >
              <figure>
                <img src={`/${news.imgUrl}`} alt="Shoes" />
              </figure>
              <div className="card-body p-4 space-y-4">
                <h2 className="card-title text-base font-medium">
                  {news.title}
                </h2>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">{news.category}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
