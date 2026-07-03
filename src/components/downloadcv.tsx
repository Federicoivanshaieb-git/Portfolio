"use client";


import { useLanguage } from "@/context/lenguageContext";

export default function DownloadCV() {
    const { language } = useLanguage();

    const cvFile = language === 'en'
        ? '/CV_Federico_Ivan_Shaieb_English.pdf'
        : '/CV_Federico_Shaieb_ES.pdf';

    const buttonText = language === 'en' ? 'Download CV' : 'Descargar CV';

    return (
        <a
            href={cvFile}
            download={cvFile.split('/').pop()}
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-2xl hover:bg-indigo-700 transition"
        >
            {buttonText}
        </a>
    );
}