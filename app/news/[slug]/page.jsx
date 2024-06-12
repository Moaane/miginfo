"use client";
import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const data = {
  imgUrl: "img_holder.png",
  title:
    "Sosialisasi Kekayaan Intelektual dan Peluncuran Sistem Keterunutan Indikasi Geografis",
  category: "News",
  content:
    "Kementerian Koordinator Bidang Kemaritiman dan Investasi (Kemenko Marves) terus mendukung upaya pengembangan dan penguatan perlindungan kekayaan intelektual. Pada 22-25 Maret 2021, perwakilan Kemenko Marves hadir dalam kegiatan Sosialisasi Kekayaan Intelektual dan Peluncuran Sistem Keterunutan Indikasi Geografis (IG) yang dilaksanakan oleh Kementerian Pariwisata dan Ekonomi Kreatif (Kemenparekraf) di Niagara, Sumatera Utara.\n" +
    "\n" +
    "Kegiatan yang difasilitasi oleh Direktorat Fasilitasi Kekayaan Intelektual Kemenparekraf ini memperkenalkan Aplikasi Sistem Keterunutan Indikasi Geografis (SISKIG). “Sistem ini berfungsi  menelusuri pencatatan IG secara runut serta mendeteksi adanya produk IG yang tidak otentik atau palsu,” ujar Direktur Fasilitasi kekayaan intelektual Kemenparekraf Robinson Sinaga .\n" +
    "\n" +
    "Turut hadir dalam acara ini adalah perwakilan dari Kementerian Hukum dan HAM dan Pemerintah Daerah Kabupaten Simalungun. Kepala seksi Administrasi Permohonan dan Klasifikasi DJKI Kemenkumham Erik CF Siagian  mengatakan bahwa semua produk yg di hasilkan seyogjanya didaftarkan mereknya lalu nanti dimasukkan dalam aplikasi SisKIG sehingga lebih mengamankan produk yang dihasilkan.\n" +
    "\n" +
    "“Aplikasi ini disambut gembira oleh seluruh anggota MPIG untuk melindungi keaslian produk IG. Kami harap aplikasi tersebut akan mengurangi pemalsuan produk,”  tutur Robinson Sinaga saat membuka acara.\n" +
    "\n" +
    "Kepala Bidang Penyelesaian Sengketa Kekayaan Intelektual Pariwisata dan Ekonomi Kreatif Kemenko Marves Ervan Susilowati (Susi) yang hadir dalam acara ini menjelaskan bahwa sosialisasi tersebut dapat dilakukan secara berkelanjutan sebagai salah satu bentuk peningkatan kapasitas, khususnya terkait pentingnya kekayaan intelektual.\n" +
    "\n" +
    "Menurut Kabid Susi, ini adalah salah satu bentuk penguatan pelindungan kekayaan intelektual sehingga diharapkan pada masa mendatang semakin banyak masyarakat yang sadar akan pentingnya melindungi produk buatan masyarakat sesuai dengan kearifan lokal. “Kita berharap bahwa upaya ini dapat membawa nilai lebih bagi masyarakat, baik dalam bentuk jaminan hukum, peningkatan merek, maupun identitas yang meningkatkan nilai jual ekonomi,” ujarnya.\n" +
    "\n" +
    "Kabid Susi menjelaskan ada begitu banyak potensi bagi sektor pariwisata dan ekonomi kreatif nasional melalui pengembangan IG. Salah satunya menjadi cikal bakal tren wisata agrobisnis yang memungkinkan pemerintah daerah dapat menciptakan paket wisata berbasis kekayaan intelektual. Paket pariwisata tersebut dapat mencakup sajian kearifan lokal yang telah tercatat kekayaan intelektualnya, baik dalam bentuk produk makanan dan minuman hingga tarian dan musik khas.\n" +
    "\n" +
    "Untuk menjamin agar ini dapat terimplementasi, diperlukan dukungan dan komitmen dari seluruh pemangku kepentingan baik pemerintah pusat, pemerintah daerah, penegak hukum, komunitas dan masyarakat. “Kita mendorong agar aktor IG dapat  terus menghasilkan produknya yang sama dari segi kualitas, kuantitas dan kontinuitas,” pungkas Kabid Susi.\n" +
    "\n" +
    "Lebih jauh, dia mengatakan bahwa  peran kepolisian sebagai penegak hukum juga diperlukan untuk memberantas pembajakan maupun penjiplakan terhadap produk-produk kekayaan intelektual, dan menyelesaikan sengketa KI.\n" +
    "\n" +
    "Biro Komunikasi\n" +
    "Kementerian Koordinator Bidang Kemaritiman dan Investasi",
  slug: "news-berita",
  author: "admin",
  createdAt: "2022-05-06",
};

export default function page({ params }) {
  const news = data;
  const contentLines = data.content.split("\n");
  return (
    <div className="w-full flex justify-center mt-32 lg:mt-16 px-4 lg:px-8 xl:px-16 pb-4 lg:pb-0">
      <div className="min-w-full max-w-[1440px]">
        <Image
          src={`/${news.imgUrl}`}
          width={512}
          height={512}
          className="w-full max-h-[600px] object-cover"
        />
        <div className="py-6 space-y-6">
          <Badge>{news.category}</Badge>
          <h1 className="text-xl font-semibold">{news.title}</h1>
          <div className="textarea-sm space-y-6">
            {contentLines.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          <div className="space-y-4">
            <h3>Published by {news.author}</h3>
            <h3>{news.createdAt}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
