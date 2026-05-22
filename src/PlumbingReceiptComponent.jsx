import { useState, useRef } from "react";
import { FaFaucetDrip, FaPhone, FaMagnifyingGlass, FaFilePdf, FaDroplet, FaWrench } from "react-icons/fa6";
import jsPDF from "jspdf";

// Total items: 184
const materialsData = [

  // ───────── PVC PIPE ─────────
  { id: 1, name: "पीवीसी पाइप 1/2 इंच", pdfName: "PVC Pipe 1/2 Inch", desc: "स्टैंडर्ड पाइप", category: "PVC Pipe", keywords: ["pvc", "pipe", "पीवीसी", "पाइप", "1/2", "half", "aadha"] },
  { id: 2, name: "पीवीसी पाइप 3/4 इंच", pdfName: "PVC Pipe 3/4 Inch", desc: "स्टैंडर्ड पाइप", category: "PVC Pipe", keywords: ["pvc", "pipe", "पीवीसी", "पाइप", "3/4", "three fourth"] },
  { id: 3, name: "पीवीसी पाइप 1 इंच", pdfName: "PVC Pipe 1 Inch", desc: "स्टैंडर्ड पाइप", category: "PVC Pipe", keywords: ["pvc", "pipe", "पीवीसी", "पाइप", "1 inch", "ek inch", "1inch"] },
  { id: 4, name: "पीवीसी पाइप 1.5 इंच", pdfName: "PVC Pipe 1.5 Inch", desc: "स्टैंडर्ड पाइप", category: "PVC Pipe", keywords: ["pvc", "pipe", "पीवीसी", "पाइप", "1.5", "1.5 inch", "dedh"] },
  { id: 5, name: "पीवीसी पाइप 2 इंच", pdfName: "PVC Pipe 2 Inch", desc: "ड्रेनेज पाइप", category: "PVC Pipe", keywords: ["pvc", "pipe", "पीवीसी", "पाइप", "2 inch", "do inch", "2inch"] },
  { id: 6, name: "पीवीसी पाइप 2.5 इंच", pdfName: "PVC Pipe 2.5 Inch", desc: "ड्रेनेज पाइप", category: "PVC Pipe", keywords: ["pvc", "pipe", "पीवीसी", "पाइप", "2.5", "2.5 inch", "dhai"] },
  { id: 7, name: "पीवीसी पाइप 3 इंच", pdfName: "PVC Pipe 3 Inch", desc: "ड्रेनेज पाइप", category: "PVC Pipe", keywords: ["pvc", "pipe", "पीवीसी", "पाइप", "3 inch", "teen inch", "3inch"] },
  { id: 8, name: "पीवीसी पाइप 4 इंच", pdfName: "PVC Pipe 4 Inch", desc: "ड्रेनेज पाइप", category: "PVC Pipe", keywords: ["pvc", "pipe", "पीवीसी", "पाइप", "4 inch", "char inch", "4inch"] },

  // ───────── CPVC PIPE ─────────
  { id: 9, name: "सीपीवीसी पाइप 1/2 इंच", pdfName: "CPVC Pipe 1/2 Inch", desc: "गर्म पानी पाइप", category: "CPVC Pipe", keywords: ["cpvc", "pipe", "सीपीवीसी", "गर्म पानी", "1/2", "half", "aadha"] },
  { id: 10, name: "सीपीवीसी पाइप 3/4 इंच", pdfName: "CPVC Pipe 3/4 Inch", desc: "गर्म पानी पाइप", category: "CPVC Pipe", keywords: ["cpvc", "pipe", "सीपीवीसी", "गर्म पानी", "3/4", "three fourth"] },
  { id: 11, name: "सीपीवीसी पाइप 1 इंच", pdfName: "CPVC Pipe 1 Inch", desc: "गर्म पानी पाइप", category: "CPVC Pipe", keywords: ["cpvc", "pipe", "सीपीवीसी", "गर्म पानी", "1 inch", "ek inch", "1inch"] },
  { id: 12, name: "सीपीवीसी पाइप 1.5 इंच", pdfName: "CPVC Pipe 1.5 Inch", desc: "गर्म पानी पाइप", category: "CPVC Pipe", keywords: ["cpvc", "pipe", "सीपीवीसी", "गर्म पानी", "1.5", "1.5 inch", "dedh"] },
  { id: 13, name: "सीपीवीसी पाइप 2 इंच", pdfName: "CPVC Pipe 2 Inch", desc: "गर्म पानी पाइप", category: "CPVC Pipe", keywords: ["cpvc", "pipe", "सीपीवीसी", "गर्म पानी", "2 inch", "do inch", "2inch"] },
  { id: 14, name: "सीपीवीसी पाइप 2.5 इंच", pdfName: "CPVC Pipe 2.5 Inch", desc: "गर्म पानी पाइप", category: "CPVC Pipe", keywords: ["cpvc", "pipe", "सीपीवीसी", "गर्म पानी", "2.5", "2.5 inch", "dhai"] },
  { id: 15, name: "सीपीवीसी पाइप 3 इंच", pdfName: "CPVC Pipe 3 Inch", desc: "गर्म पानी पाइप", category: "CPVC Pipe", keywords: ["cpvc", "pipe", "सीपीवीसी", "गर्म पानी", "3 inch", "teen inch", "3inch"] },
  { id: 16, name: "सीपीवीसी पाइप 4 इंच", pdfName: "CPVC Pipe 4 Inch", desc: "गर्म पानी पाइप", category: "CPVC Pipe", keywords: ["cpvc", "pipe", "सीपीवीसी", "गर्म पानी", "4 inch", "char inch", "4inch"] },

  // ───────── FITTINGS ─────────
  { id: 17, name: "एल्बो 1/2 इंच", pdfName: "Elbow 1/2 Inch", desc: "90 डिग्री जॉइंट", category: "Fittings", keywords: ["elbow", "एल्बो", "joint", "1/2", "half", "aadha"] },
  { id: 18, name: "एल्बो 3/4 इंच", pdfName: "Elbow 3/4 Inch", desc: "90 डिग्री जॉइंट", category: "Fittings", keywords: ["elbow", "एल्बो", "joint", "3/4", "three fourth"] },
  { id: 19, name: "एल्बो 1 इंच", pdfName: "Elbow 1 Inch", desc: "90 डिग्री जॉइंट", category: "Fittings", keywords: ["elbow", "एल्बो", "joint", "1 inch", "ek inch", "1inch"] },
  { id: 20, name: "एल्बो 1.5 इंच", pdfName: "Elbow 1.5 Inch", desc: "90 डिग्री जॉइंट", category: "Fittings", keywords: ["elbow", "एल्बो", "joint", "1.5", "1.5 inch", "dedh"] },
  { id: 21, name: "एल्बो 2 इंच", pdfName: "Elbow 2 Inch", desc: "90 डिग्री जॉइंट", category: "Fittings", keywords: ["elbow", "एल्बो", "joint", "2 inch", "do inch", "2inch"] },
  { id: 22, name: "एल्बो 2.5 इंच", pdfName: "Elbow 2.5 Inch", desc: "90 डिग्री जॉइंट", category: "Fittings", keywords: ["elbow", "एल्बो", "joint", "2.5", "2.5 inch", "dhai"] },
  { id: 23, name: "एल्बो 3 इंच", pdfName: "Elbow 3 Inch", desc: "90 डिग्री जॉइंट", category: "Fittings", keywords: ["elbow", "एल्बो", "joint", "3 inch", "teen inch", "3inch"] },
  { id: 24, name: "एल्बो 4 इंच", pdfName: "Elbow 4 Inch", desc: "90 डिग्री जॉइंट", category: "Fittings", keywords: ["elbow", "एल्बो", "joint", "4 inch", "char inch", "4inch"] },
  { id: 25, name: "45 डिग्री एल्बो 1/2 इंच", pdfName: "45 Degree Elbow 1/2 Inch", desc: "45° Joint", category: "Fittings", keywords: ["45 elbow", "45 degree", "एल्बो", "1/2", "half", "aadha"] },
  { id: 26, name: "45 डिग्री एल्बो 3/4 इंच", pdfName: "45 Degree Elbow 3/4 Inch", desc: "45° Joint", category: "Fittings", keywords: ["45 elbow", "45 degree", "एल्बो", "3/4", "three fourth"] },
  { id: 27, name: "45 डिग्री एल्बो 1 इंच", pdfName: "45 Degree Elbow 1 Inch", desc: "45° Joint", category: "Fittings", keywords: ["45 elbow", "45 degree", "एल्बो", "1 inch", "ek inch", "1inch"] },
  { id: 28, name: "45 डिग्री एल्बो 1.5 इंच", pdfName: "45 Degree Elbow 1.5 Inch", desc: "45° Joint", category: "Fittings", keywords: ["45 elbow", "45 degree", "एल्बो", "1.5", "1.5 inch", "dedh"] },
  { id: 29, name: "45 डिग्री एल्बो 2 इंच", pdfName: "45 Degree Elbow 2 Inch", desc: "45° Joint", category: "Fittings", keywords: ["45 elbow", "45 degree", "एल्बो", "2 inch", "do inch", "2inch"] },
  { id: 30, name: "45 डिग्री एल्बो 2.5 इंच", pdfName: "45 Degree Elbow 2.5 Inch", desc: "45° Joint", category: "Fittings", keywords: ["45 elbow", "45 degree", "एल्बो", "2.5", "2.5 inch", "dhai"] },
  { id: 31, name: "45 डिग्री एल्बो 3 इंच", pdfName: "45 Degree Elbow 3 Inch", desc: "45° Joint", category: "Fittings", keywords: ["45 elbow", "45 degree", "एल्बो", "3 inch", "teen inch", "3inch"] },
  { id: 32, name: "45 डिग्री एल्बो 4 इंच", pdfName: "45 Degree Elbow 4 Inch", desc: "45° Joint", category: "Fittings", keywords: ["45 elbow", "45 degree", "एल्बो", "4 inch", "char inch", "4inch"] },
  { id: 33, name: "टी 1/2 इंच", pdfName: "Tee 1/2 Inch", desc: "3-वे जॉइंट", category: "Fittings", keywords: ["tee", "टी", "t", "1/2", "half", "aadha"] },
  { id: 34, name: "टी 3/4 इंच", pdfName: "Tee 3/4 Inch", desc: "3-वे जॉइंट", category: "Fittings", keywords: ["tee", "टी", "t", "3/4", "three fourth"] },
  { id: 35, name: "टी 1 इंच", pdfName: "Tee 1 Inch", desc: "3-वे जॉइंट", category: "Fittings", keywords: ["tee", "टी", "t", "1 inch", "ek inch", "1inch"] },
  { id: 36, name: "टी 1.5 इंच", pdfName: "Tee 1.5 Inch", desc: "3-वे जॉइंट", category: "Fittings", keywords: ["tee", "टी", "t", "1.5", "1.5 inch", "dedh"] },
  { id: 37, name: "टी 2 इंच", pdfName: "Tee 2 Inch", desc: "3-वे जॉइंट", category: "Fittings", keywords: ["tee", "टी", "t", "2 inch", "do inch", "2inch"] },
  { id: 38, name: "टी 2.5 इंच", pdfName: "Tee 2.5 Inch", desc: "3-वे जॉइंट", category: "Fittings", keywords: ["tee", "टी", "t", "2.5", "2.5 inch", "dhai"] },
  { id: 39, name: "टी 3 इंच", pdfName: "Tee 3 Inch", desc: "3-वे जॉइंट", category: "Fittings", keywords: ["tee", "टी", "t", "3 inch", "teen inch", "3inch"] },
  { id: 40, name: "टी 4 इंच", pdfName: "Tee 4 Inch", desc: "3-वे जॉइंट", category: "Fittings", keywords: ["tee", "टी", "t", "4 inch", "char inch", "4inch"] },
  { id: 41, name: "आर टी 1/2 इंच", pdfName: "Reducer Tee 1/2 Inch", desc: "Reducer Tee Joint", category: "Fittings", keywords: ["r tee", "reducer tee", "आर टी", "1/2", "half", "aadha"] },
  { id: 42, name: "आर टी 3/4 इंच", pdfName: "Reducer Tee 3/4 Inch", desc: "Reducer Tee Joint", category: "Fittings", keywords: ["r tee", "reducer tee", "आर टी", "3/4", "three fourth"] },
  { id: 43, name: "आर टी 1 इंच", pdfName: "Reducer Tee 1 Inch", desc: "Reducer Tee Joint", category: "Fittings", keywords: ["r tee", "reducer tee", "आर टी", "1 inch", "ek inch", "1inch"] },
  { id: 44, name: "आर टी 1.5 इंच", pdfName: "Reducer Tee 1.5 Inch", desc: "Reducer Tee Joint", category: "Fittings", keywords: ["r tee", "reducer tee", "आर टी", "1.5", "1.5 inch", "dedh"] },
  { id: 45, name: "आर टी 2 इंच", pdfName: "Reducer Tee 2 Inch", desc: "Reducer Tee Joint", category: "Fittings", keywords: ["r tee", "reducer tee", "आर टी", "2 inch", "do inch", "2inch"] },
  { id: 46, name: "आर टी 2.5 इंच", pdfName: "Reducer Tee 2.5 Inch", desc: "Reducer Tee Joint", category: "Fittings", keywords: ["r tee", "reducer tee", "आर टी", "2.5", "2.5 inch", "dhai"] },
  { id: 47, name: "आर टी 3 इंच", pdfName: "Reducer Tee 3 Inch", desc: "Reducer Tee Joint", category: "Fittings", keywords: ["r tee", "reducer tee", "आर टी", "3 inch", "teen inch", "3inch"] },
  { id: 48, name: "आर टी 4 इंच", pdfName: "Reducer Tee 4 Inch", desc: "Reducer Tee Joint", category: "Fittings", keywords: ["r tee", "reducer tee", "आर टी", "4 inch", "char inch", "4inch"] },
  { id: 49, name: "क्रॉस टी 1/2 इंच", pdfName: "Cross Tee 1/2 Inch", desc: "4-वे जॉइंट", category: "Fittings", keywords: ["cross tee", "क्रॉस टी", "1/2", "half", "aadha"] },
  { id: 50, name: "क्रॉस टी 3/4 इंच", pdfName: "Cross Tee 3/4 Inch", desc: "4-वे जॉइंट", category: "Fittings", keywords: ["cross tee", "क्रॉस टी", "3/4", "three fourth"] },
  { id: 51, name: "क्रॉस टी 1 इंच", pdfName: "Cross Tee 1 Inch", desc: "4-वे जॉइंट", category: "Fittings", keywords: ["cross tee", "क्रॉस टी", "1 inch", "ek inch", "1inch"] },
  { id: 52, name: "क्रॉस टी 1.5 इंच", pdfName: "Cross Tee 1.5 Inch", desc: "4-वे जॉइंट", category: "Fittings", keywords: ["cross tee", "क्रॉस टी", "1.5", "1.5 inch", "dedh"] },
  { id: 53, name: "क्रॉस टी 2 इंच", pdfName: "Cross Tee 2 Inch", desc: "4-वे जॉइंट", category: "Fittings", keywords: ["cross tee", "क्रॉस टी", "2 inch", "do inch", "2inch"] },
  { id: 54, name: "क्रॉस टी 2.5 इंच", pdfName: "Cross Tee 2.5 Inch", desc: "4-वे जॉइंट", category: "Fittings", keywords: ["cross tee", "क्रॉस टी", "2.5", "2.5 inch", "dhai"] },
  { id: 55, name: "क्रॉस टी 3 इंच", pdfName: "Cross Tee 3 Inch", desc: "4-वे जॉइंट", category: "Fittings", keywords: ["cross tee", "क्रॉस टी", "3 inch", "teen inch", "3inch"] },
  { id: 56, name: "क्रॉस टी 4 इंच", pdfName: "Cross Tee 4 Inch", desc: "4-वे जॉइंट", category: "Fittings", keywords: ["cross tee", "क्रॉस टी", "4 inch", "char inch", "4inch"] },
  { id: 57, name: "कपलर 1/2 इंच", pdfName: "Coupler 1/2 Inch", desc: "पाइप जोड़ने वाला", category: "Fittings", keywords: ["coupler", "socket", "कपलर", "1/2", "half", "aadha"] },
  { id: 58, name: "कपलर 3/4 इंच", pdfName: "Coupler 3/4 Inch", desc: "पाइप जोड़ने वाला", category: "Fittings", keywords: ["coupler", "socket", "कपलर", "3/4", "three fourth"] },
  { id: 59, name: "कपलर 1 इंच", pdfName: "Coupler 1 Inch", desc: "पाइप जोड़ने वाला", category: "Fittings", keywords: ["coupler", "socket", "कपलर", "1 inch", "ek inch", "1inch"] },
  { id: 60, name: "कपलर 1.5 इंच", pdfName: "Coupler 1.5 Inch", desc: "पाइप जोड़ने वाला", category: "Fittings", keywords: ["coupler", "socket", "कपलर", "1.5", "1.5 inch", "dedh"] },
  { id: 61, name: "कपलर 2 इंच", pdfName: "Coupler 2 Inch", desc: "पाइप जोड़ने वाला", category: "Fittings", keywords: ["coupler", "socket", "कपलर", "2 inch", "do inch", "2inch"] },
  { id: 62, name: "कपलर 2.5 इंच", pdfName: "Coupler 2.5 Inch", desc: "पाइप जोड़ने वाला", category: "Fittings", keywords: ["coupler", "socket", "कपलर", "2.5", "2.5 inch", "dhai"] },
  { id: 63, name: "कपलर 3 इंच", pdfName: "Coupler 3 Inch", desc: "पाइप जोड़ने वाला", category: "Fittings", keywords: ["coupler", "socket", "कपलर", "3 inch", "teen inch", "3inch"] },
  { id: 64, name: "कपलर 4 इंच", pdfName: "Coupler 4 Inch", desc: "पाइप जोड़ने वाला", category: "Fittings", keywords: ["coupler", "socket", "कपलर", "4 inch", "char inch", "4inch"] },
  { id: 65, name: "रिड्यूसर 1/2 इंच", pdfName: "Reducer 1/2 Inch", desc: "साइज कम करने वाला", category: "Fittings", keywords: ["reducer", "रिड्यूसर", "1/2", "half", "aadha"] },
  { id: 66, name: "रिड्यूसर 3/4 इंच", pdfName: "Reducer 3/4 Inch", desc: "साइज कम करने वाला", category: "Fittings", keywords: ["reducer", "रिड्यूसर", "3/4", "three fourth"] },
  { id: 67, name: "रिड्यूसर 1 इंच", pdfName: "Reducer 1 Inch", desc: "साइज कम करने वाला", category: "Fittings", keywords: ["reducer", "रिड्यूसर", "1 inch", "ek inch", "1inch"] },
  { id: 68, name: "रिड्यूसर 1.5 इंच", pdfName: "Reducer 1.5 Inch", desc: "साइज कम करने वाला", category: "Fittings", keywords: ["reducer", "रिड्यूसर", "1.5", "1.5 inch", "dedh"] },
  { id: 69, name: "रिड्यूसर 2 इंच", pdfName: "Reducer 2 Inch", desc: "साइज कम करने वाला", category: "Fittings", keywords: ["reducer", "रिड्यूसर", "2 inch", "do inch", "2inch"] },
  { id: 70, name: "रिड्यूसर 2.5 इंच", pdfName: "Reducer 2.5 Inch", desc: "साइज कम करने वाला", category: "Fittings", keywords: ["reducer", "रिड्यूसर", "2.5", "2.5 inch", "dhai"] },
  { id: 71, name: "रिड्यूसर 3 इंच", pdfName: "Reducer 3 Inch", desc: "साइज कम करने वाला", category: "Fittings", keywords: ["reducer", "रिड्यूसर", "3 inch", "teen inch", "3inch"] },
  { id: 72, name: "रिड्यूसर 4 इंच", pdfName: "Reducer 4 Inch", desc: "साइज कम करने वाला", category: "Fittings", keywords: ["reducer", "रिड्यूसर", "4 inch", "char inch", "4inch"] },
  { id: 73, name: "रिड्यूसर कपलर 1/2 इंच", pdfName: "Reducer Coupler 1/2 Inch", desc: "Reducer Connector", category: "Fittings", keywords: ["reducer coupler", "रिड्यूसर कपलर", "1/2", "half", "aadha"] },
  { id: 74, name: "रिड्यूसर कपलर 3/4 इंच", pdfName: "Reducer Coupler 3/4 Inch", desc: "Reducer Connector", category: "Fittings", keywords: ["reducer coupler", "रिड्यूसर कपलर", "3/4", "three fourth"] },
  { id: 75, name: "रिड्यूसर कपलर 1 इंच", pdfName: "Reducer Coupler 1 Inch", desc: "Reducer Connector", category: "Fittings", keywords: ["reducer coupler", "रिड्यूसर कपलर", "1 inch", "ek inch", "1inch"] },
  { id: 76, name: "रिड्यूसर कपलर 1.5 इंच", pdfName: "Reducer Coupler 1.5 Inch", desc: "Reducer Connector", category: "Fittings", keywords: ["reducer coupler", "रिड्यूसर कपलर", "1.5", "1.5 inch", "dedh"] },
  { id: 77, name: "रिड्यूसर कपलर 2 इंच", pdfName: "Reducer Coupler 2 Inch", desc: "Reducer Connector", category: "Fittings", keywords: ["reducer coupler", "रिड्यूसर कपलर", "2 inch", "do inch", "2inch"] },
  { id: 78, name: "रिड्यूसर कपलर 2.5 इंच", pdfName: "Reducer Coupler 2.5 Inch", desc: "Reducer Connector", category: "Fittings", keywords: ["reducer coupler", "रिड्यूसर कपलर", "2.5", "2.5 inch", "dhai"] },
  { id: 79, name: "रिड्यूसर कपलर 3 इंच", pdfName: "Reducer Coupler 3 Inch", desc: "Reducer Connector", category: "Fittings", keywords: ["reducer coupler", "रिड्यूसर कपलर", "3 inch", "teen inch", "3inch"] },
  { id: 80, name: "रिड्यूसर कपलर 4 इंच", pdfName: "Reducer Coupler 4 Inch", desc: "Reducer Connector", category: "Fittings", keywords: ["reducer coupler", "रिड्यूसर कपलर", "4 inch", "char inch", "4inch"] },
  { id: 81, name: "रिड्यूसर बुश 1/2 इंच", pdfName: "Reducer Bush 1/2 Inch", desc: "Reducer Bush", category: "Fittings", keywords: ["reducer bush", "बुश", "1/2", "half", "aadha"] },
  { id: 82, name: "रिड्यूसर बुश 3/4 इंच", pdfName: "Reducer Bush 3/4 Inch", desc: "Reducer Bush", category: "Fittings", keywords: ["reducer bush", "बुश", "3/4", "three fourth"] },
  { id: 83, name: "रिड्यूसर बुश 1 इंच", pdfName: "Reducer Bush 1 Inch", desc: "Reducer Bush", category: "Fittings", keywords: ["reducer bush", "बुश", "1 inch", "ek inch", "1inch"] },
  { id: 84, name: "रिड्यूसर बुश 1.5 इंच", pdfName: "Reducer Bush 1.5 Inch", desc: "Reducer Bush", category: "Fittings", keywords: ["reducer bush", "बुश", "1.5", "1.5 inch", "dedh"] },
  { id: 85, name: "रिड्यूसर बुश 2 इंच", pdfName: "Reducer Bush 2 Inch", desc: "Reducer Bush", category: "Fittings", keywords: ["reducer bush", "बुश", "2 inch", "do inch", "2inch"] },
  { id: 86, name: "रिड्यूसर बुश 2.5 इंच", pdfName: "Reducer Bush 2.5 Inch", desc: "Reducer Bush", category: "Fittings", keywords: ["reducer bush", "बुश", "2.5", "2.5 inch", "dhai"] },
  { id: 87, name: "रिड्यूसर बुश 3 इंच", pdfName: "Reducer Bush 3 Inch", desc: "Reducer Bush", category: "Fittings", keywords: ["reducer bush", "बुश", "3 inch", "teen inch", "3inch"] },
  { id: 88, name: "रिड्यूसर बुश 4 इंच", pdfName: "Reducer Bush 4 Inch", desc: "Reducer Bush", category: "Fittings", keywords: ["reducer bush", "बुश", "4 inch", "char inch", "4inch"] },
  { id: 89, name: "बेंड 1/2 इंच", pdfName: "Bend 1/2 Inch", desc: "मुड़ा हुआ पाइप", category: "Fittings", keywords: ["bend", "बेंड", "1/2", "half", "aadha"] },
  { id: 90, name: "बेंड 3/4 इंच", pdfName: "Bend 3/4 Inch", desc: "मुड़ा हुआ पाइप", category: "Fittings", keywords: ["bend", "बेंड", "3/4", "three fourth"] },
  { id: 91, name: "बेंड 1 इंच", pdfName: "Bend 1 Inch", desc: "मुड़ा हुआ पाइप", category: "Fittings", keywords: ["bend", "बेंड", "1 inch", "ek inch", "1inch"] },
  { id: 92, name: "बेंड 1.5 इंच", pdfName: "Bend 1.5 Inch", desc: "मुड़ा हुआ पाइप", category: "Fittings", keywords: ["bend", "बेंड", "1.5", "1.5 inch", "dedh"] },
  { id: 93, name: "बेंड 2 इंच", pdfName: "Bend 2 Inch", desc: "मुड़ा हुआ पाइप", category: "Fittings", keywords: ["bend", "बेंड", "2 inch", "do inch", "2inch"] },
  { id: 94, name: "बेंड 2.5 इंच", pdfName: "Bend 2.5 Inch", desc: "मुड़ा हुआ पाइप", category: "Fittings", keywords: ["bend", "बेंड", "2.5", "2.5 inch", "dhai"] },
  { id: 95, name: "बेंड 3 इंच", pdfName: "Bend 3 Inch", desc: "मुड़ा हुआ पाइप", category: "Fittings", keywords: ["bend", "बेंड", "3 inch", "teen inch", "3inch"] },
  { id: 96, name: "बेंड 4 इंच", pdfName: "Bend 4 Inch", desc: "मुड़ा हुआ पाइप", category: "Fittings", keywords: ["bend", "बेंड", "4 inch", "char inch", "4inch"] },
  { id: 97, name: "सॉकेट 1/2 इंच", pdfName: "Socket 1/2 Inch", desc: "पाइप कनेक्टर", category: "Fittings", keywords: ["socket", "connector", "सॉकेट", "1/2", "half", "aadha"] },
  { id: 98, name: "सॉकेट 3/4 इंच", pdfName: "Socket 3/4 Inch", desc: "पाइप कनेक्टर", category: "Fittings", keywords: ["socket", "connector", "सॉकेट", "3/4", "three fourth"] },
  { id: 99, name: "सॉकेट 1 इंच", pdfName: "Socket 1 Inch", desc: "पाइप कनेक्टर", category: "Fittings", keywords: ["socket", "connector", "सॉकेट", "1 inch", "ek inch", "1inch"] },
  { id: 100, name: "सॉकेट 1.5 इंच", pdfName: "Socket 1.5 Inch", desc: "पाइप कनेक्टर", category: "Fittings", keywords: ["socket", "connector", "सॉकेट", "1.5", "1.5 inch", "dedh"] },
  { id: 101, name: "सॉकेट 2 इंच", pdfName: "Socket 2 Inch", desc: "पाइप कनेक्टर", category: "Fittings", keywords: ["socket", "connector", "सॉकेट", "2 inch", "do inch", "2inch"] },
  { id: 102, name: "सॉकेट 2.5 इंच", pdfName: "Socket 2.5 Inch", desc: "पाइप कनेक्टर", category: "Fittings", keywords: ["socket", "connector", "सॉकेट", "2.5", "2.5 inch", "dhai"] },
  { id: 103, name: "सॉकेट 3 इंच", pdfName: "Socket 3 Inch", desc: "पाइप कनेक्टर", category: "Fittings", keywords: ["socket", "connector", "सॉकेट", "3 inch", "teen inch", "3inch"] },
  { id: 104, name: "सॉकेट 4 इंच", pdfName: "Socket 4 Inch", desc: "पाइप कनेक्टर", category: "Fittings", keywords: ["socket", "connector", "सॉकेट", "4 inch", "char inch", "4inch"] },

  // ───────── THREADED ─────────
  { id: 105, name: "मेल थ्रेडेड टी 1/2 इंच", pdfName: "Male Threaded Tee 1/2 Inch", desc: "मेल थ्रेड जॉइंट", category: "Threaded", keywords: ["male threaded tee", "मेल टी", "1/2", "half", "aadha"] },
  { id: 106, name: "मेल थ्रेडेड टी 3/4 इंच", pdfName: "Male Threaded Tee 3/4 Inch", desc: "मेल थ्रेड जॉइंट", category: "Threaded", keywords: ["male threaded tee", "मेल टी", "3/4", "three fourth"] },
  { id: 107, name: "मेल थ्रेडेड टी 1 इंच", pdfName: "Male Threaded Tee 1 Inch", desc: "मेल थ्रेड जॉइंट", category: "Threaded", keywords: ["male threaded tee", "मेल टी", "1 inch", "ek inch", "1inch"] },
  { id: 108, name: "मेल थ्रेडेड टी 1.5 इंच", pdfName: "Male Threaded Tee 1.5 Inch", desc: "मेल थ्रेड जॉइंट", category: "Threaded", keywords: ["male threaded tee", "मेल टी", "1.5", "1.5 inch", "dedh"] },
  { id: 109, name: "मेल थ्रेडेड टी 2 इंच", pdfName: "Male Threaded Tee 2 Inch", desc: "मेल थ्रेड जॉइंट", category: "Threaded", keywords: ["male threaded tee", "मेल टी", "2 inch", "do inch", "2inch"] },
  { id: 110, name: "फीमेल थ्रेडेड टी 1/2 इंच", pdfName: "Female Threaded Tee 1/2 Inch", desc: "फीमेल थ्रेड जॉइंट", category: "Threaded", keywords: ["female threaded tee", "फीमेल टी", "1/2", "half", "aadha"] },
  { id: 111, name: "फीमेल थ्रेडेड टी 3/4 इंच", pdfName: "Female Threaded Tee 3/4 Inch", desc: "फीमेल थ्रेड जॉइंट", category: "Threaded", keywords: ["female threaded tee", "फीमेल टी", "3/4", "three fourth"] },
  { id: 112, name: "फीमेल थ्रेडेड टी 1 इंच", pdfName: "Female Threaded Tee 1 Inch", desc: "फीमेल थ्रेड जॉइंट", category: "Threaded", keywords: ["female threaded tee", "फीमेल टी", "1 inch", "ek inch", "1inch"] },
  { id: 113, name: "फीमेल थ्रेडेड टी 1.5 इंच", pdfName: "Female Threaded Tee 1.5 Inch", desc: "फीमेल थ्रेड जॉइंट", category: "Threaded", keywords: ["female threaded tee", "फीमेल टी", "1.5", "1.5 inch", "dedh"] },
  { id: 114, name: "फीमेल थ्रेडेड टी 2 इंच", pdfName: "Female Threaded Tee 2 Inch", desc: "फीमेल थ्रेड जॉइंट", category: "Threaded", keywords: ["female threaded tee", "फीमेल टी", "2 inch", "do inch", "2inch"] },
  { id: 115, name: "एफटीए 1/2 इंच", pdfName: "FTA 1/2 Inch", desc: "Female Adapter", category: "Threaded", keywords: ["fta", "female threaded adapter", "1/2", "half", "aadha"] },
  { id: 116, name: "एफटीए 3/4 इंच", pdfName: "FTA 3/4 Inch", desc: "Female Adapter", category: "Threaded", keywords: ["fta", "female threaded adapter", "3/4", "three fourth"] },
  { id: 117, name: "एफटीए 1 इंच", pdfName: "FTA 1 Inch", desc: "Female Adapter", category: "Threaded", keywords: ["fta", "female threaded adapter", "1 inch", "ek inch", "1inch"] },
  { id: 118, name: "एफटीए 1.5 इंच", pdfName: "FTA 1.5 Inch", desc: "Female Adapter", category: "Threaded", keywords: ["fta", "female threaded adapter", "1.5", "1.5 inch", "dedh"] },
  { id: 119, name: "एफटीए 2 इंच", pdfName: "FTA 2 Inch", desc: "Female Adapter", category: "Threaded", keywords: ["fta", "female threaded adapter", "2 inch", "do inch", "2inch"] },
  { id: 120, name: "एमटीए 1/2 इंच", pdfName: "MTA 1/2 Inch", desc: "Male Adapter", category: "Threaded", keywords: ["mta", "male threaded adapter", "1/2", "half", "aadha"] },
  { id: 121, name: "एमटीए 3/4 इंच", pdfName: "MTA 3/4 Inch", desc: "Male Adapter", category: "Threaded", keywords: ["mta", "male threaded adapter", "3/4", "three fourth"] },
  { id: 122, name: "एमटीए 1 इंच", pdfName: "MTA 1 Inch", desc: "Male Adapter", category: "Threaded", keywords: ["mta", "male threaded adapter", "1 inch", "ek inch", "1inch"] },
  { id: 123, name: "एमटीए 1.5 इंच", pdfName: "MTA 1.5 Inch", desc: "Male Adapter", category: "Threaded", keywords: ["mta", "male threaded adapter", "1.5", "1.5 inch", "dedh"] },
  { id: 124, name: "एमटीए 2 इंच", pdfName: "MTA 2 Inch", desc: "Male Adapter", category: "Threaded", keywords: ["mta", "male threaded adapter", "2 inch", "do inch", "2inch"] },
  { id: 125, name: "हेक्सागोन फीमेल 1/2 इंच", pdfName: "Hexagon Female 1/2 Inch", desc: "Female Connector", category: "Threaded", keywords: ["hexagon female", "female", "1/2", "half", "aadha"] },
  { id: 126, name: "हेक्सागोन फीमेल 3/4 इंच", pdfName: "Hexagon Female 3/4 Inch", desc: "Female Connector", category: "Threaded", keywords: ["hexagon female", "female", "3/4", "three fourth"] },
  { id: 127, name: "हेक्सागोन फीमेल 1 इंच", pdfName: "Hexagon Female 1 Inch", desc: "Female Connector", category: "Threaded", keywords: ["hexagon female", "female", "1 inch", "ek inch", "1inch"] },
  { id: 128, name: "हेक्सागोन फीमेल 1.5 इंच", pdfName: "Hexagon Female 1.5 Inch", desc: "Female Connector", category: "Threaded", keywords: ["hexagon female", "female", "1.5", "1.5 inch", "dedh"] },
  { id: 129, name: "हेक्सागोन फीमेल 2 इंच", pdfName: "Hexagon Female 2 Inch", desc: "Female Connector", category: "Threaded", keywords: ["hexagon female", "female", "2 inch", "do inch", "2inch"] },
  { id: 130, name: "हेक्सागोन मेल 1/2 इंच", pdfName: "Hexagon Male 1/2 Inch", desc: "Male Connector", category: "Threaded", keywords: ["hexagon male", "male", "1/2", "half", "aadha"] },
  { id: 131, name: "हेक्सागोन मेल 3/4 इंच", pdfName: "Hexagon Male 3/4 Inch", desc: "Male Connector", category: "Threaded", keywords: ["hexagon male", "male", "3/4", "three fourth"] },
  { id: 132, name: "हेक्सागोन मेल 1 इंच", pdfName: "Hexagon Male 1 Inch", desc: "Male Connector", category: "Threaded", keywords: ["hexagon male", "male", "1 inch", "ek inch", "1inch"] },
  { id: 133, name: "हेक्सागोन मेल 1.5 इंच", pdfName: "Hexagon Male 1.5 Inch", desc: "Male Connector", category: "Threaded", keywords: ["hexagon male", "male", "1.5", "1.5 inch", "dedh"] },
  { id: 134, name: "हेक्सागोन मेल 2 इंच", pdfName: "Hexagon Male 2 Inch", desc: "Male Connector", category: "Threaded", keywords: ["hexagon male", "male", "2 inch", "do inch", "2inch"] },

  // ───────── VALVES ─────────
  { id: 135, name: "बॉल वाल्व 1/2 इंच", pdfName: "Ball Valve 1/2 Inch", desc: "पानी कंट्रोल वाल्व", category: "Valves", keywords: ["ball valve", "वाल्व", "1/2", "half", "aadha"] },
  { id: 136, name: "बॉल वाल्व 3/4 इंच", pdfName: "Ball Valve 3/4 Inch", desc: "पानी कंट्रोल वाल्व", category: "Valves", keywords: ["ball valve", "वाल्व", "3/4", "three fourth"] },
  { id: 137, name: "बॉल वाल्व 1 इंच", pdfName: "Ball Valve 1 Inch", desc: "पानी कंट्रोल वाल्व", category: "Valves", keywords: ["ball valve", "वाल्व", "1 inch", "ek inch", "1inch"] },
  { id: 138, name: "बॉल वाल्व 1.5 इंच", pdfName: "Ball Valve 1.5 Inch", desc: "पानी कंट्रोल वाल्व", category: "Valves", keywords: ["ball valve", "वाल्व", "1.5", "1.5 inch", "dedh"] },
  { id: 139, name: "बॉल वाल्व 2 इंच", pdfName: "Ball Valve 2 Inch", desc: "पानी कंट्रोल वाल्व", category: "Valves", keywords: ["ball valve", "वाल्व", "2 inch", "do inch", "2inch"] },
  { id: 140, name: "बॉल वाल्व 3 इंच", pdfName: "Ball Valve 3 Inch", desc: "पानी कंट्रोल वाल्व", category: "Valves", keywords: ["ball valve", "वाल्व", "3 inch", "teen inch", "3inch"] },
  { id: 141, name: "यूनियन बॉल वाल्व 1/2 इंच", pdfName: "Union Ball Valve 1/2 Inch", desc: "Union Type Valve", category: "Valves", keywords: ["union ball valve", "यूनियन वाल्व", "1/2", "half", "aadha"] },
  { id: 142, name: "यूनियन बॉल वाल्व 3/4 इंच", pdfName: "Union Ball Valve 3/4 Inch", desc: "Union Type Valve", category: "Valves", keywords: ["union ball valve", "यूनियन वाल्व", "3/4", "three fourth"] },
  { id: 143, name: "यूनियन बॉल वाल्व 1 इंच", pdfName: "Union Ball Valve 1 Inch", desc: "Union Type Valve", category: "Valves", keywords: ["union ball valve", "यूनियन वाल्व", "1 inch", "ek inch", "1inch"] },
  { id: 144, name: "यूनियन बॉल वाल्व 1.5 इंच", pdfName: "Union Ball Valve 1.5 Inch", desc: "Union Type Valve", category: "Valves", keywords: ["union ball valve", "यूनियन वाल्व", "1.5", "1.5 inch", "dedh"] },
  { id: 145, name: "यूनियन बॉल वाल्व 2 इंच", pdfName: "Union Ball Valve 2 Inch", desc: "Union Type Valve", category: "Valves", keywords: ["union ball valve", "यूनियन वाल्व", "2 inch", "do inch", "2inch"] },
  { id: 146, name: "यूनियन बॉल वाल्व 3 इंच", pdfName: "Union Ball Valve 3 Inch", desc: "Union Type Valve", category: "Valves", keywords: ["union ball valve", "यूनियन वाल्व", "3 inch", "teen inch", "3inch"] },
  { id: 147, name: "डबल यूनियन बॉल वाल्व 1/2 इंच", pdfName: "Double Union Ball Valve 1/2 Inch", desc: "Double Union Valve", category: "Valves", keywords: ["double union valve", "डबल यूनियन", "1/2", "half", "aadha"] },
  { id: 148, name: "डबल यूनियन बॉल वाल्व 3/4 इंच", pdfName: "Double Union Ball Valve 3/4 Inch", desc: "Double Union Valve", category: "Valves", keywords: ["double union valve", "डबल यूनियन", "3/4", "three fourth"] },
  { id: 149, name: "डबल यूनियन बॉल वाल्व 1 इंच", pdfName: "Double Union Ball Valve 1 Inch", desc: "Double Union Valve", category: "Valves", keywords: ["double union valve", "डबल यूनियन", "1 inch", "ek inch", "1inch"] },
  { id: 150, name: "डबल यूनियन बॉल वाल्व 1.5 इंच", pdfName: "Double Union Ball Valve 1.5 Inch", desc: "Double Union Valve", category: "Valves", keywords: ["double union valve", "डबल यूनियन", "1.5", "1.5 inch", "dedh"] },
  { id: 151, name: "डबल यूनियन बॉल वाल्व 2 इंच", pdfName: "Double Union Ball Valve 2 Inch", desc: "Double Union Valve", category: "Valves", keywords: ["double union valve", "डबल यूनियन", "2 inch", "do inch", "2inch"] },
  { id: 152, name: "डबल यूनियन बॉल वाल्व 3 इंच", pdfName: "Double Union Ball Valve 3 Inch", desc: "Double Union Valve", category: "Valves", keywords: ["double union valve", "डबल यूनियन", "3 inch", "teen inch", "3inch"] },
  { id: 153, name: "ब्रास बॉल वाल्व 1/2 इंच", pdfName: "Brass Ball Valve 1/2 Inch", desc: "Brass Valve", category: "Valves", keywords: ["brass ball valve", "ब्रास वाल्व", "1/2", "half", "aadha"] },
  { id: 154, name: "ब्रास बॉल वाल्व 3/4 इंच", pdfName: "Brass Ball Valve 3/4 Inch", desc: "Brass Valve", category: "Valves", keywords: ["brass ball valve", "ब्रास वाल्व", "3/4", "three fourth"] },
  { id: 155, name: "ब्रास बॉल वाल्व 1 इंच", pdfName: "Brass Ball Valve 1 Inch", desc: "Brass Valve", category: "Valves", keywords: ["brass ball valve", "ब्रास वाल्व", "1 inch", "ek inch", "1inch"] },
  { id: 156, name: "ब्रास बॉल वाल्व 1.5 इंच", pdfName: "Brass Ball Valve 1.5 Inch", desc: "Brass Valve", category: "Valves", keywords: ["brass ball valve", "ब्रास वाल्व", "1.5", "1.5 inch", "dedh"] },
  { id: 157, name: "ब्रास बॉल वाल्व 2 इंच", pdfName: "Brass Ball Valve 2 Inch", desc: "Brass Valve", category: "Valves", keywords: ["brass ball valve", "ब्रास वाल्व", "2 inch", "do inch", "2inch"] },
  { id: 158, name: "ब्रास बॉल वाल्व 3 इंच", pdfName: "Brass Ball Valve 3 Inch", desc: "Brass Valve", category: "Valves", keywords: ["brass ball valve", "ब्रास वाल्व", "3 inch", "teen inch", "3inch"] },
  { id: 159, name: "वाल्व 1/2 इंच", pdfName: "Valve 1/2 Inch", desc: "Water Valve", category: "Valves", keywords: ["valve", "वाल्व", "1/2", "half", "aadha"] },
  { id: 160, name: "वाल्व 3/4 इंच", pdfName: "Valve 3/4 Inch", desc: "Water Valve", category: "Valves", keywords: ["valve", "वाल्व", "3/4", "three fourth"] },
  { id: 161, name: "वाल्व 1 इंच", pdfName: "Valve 1 Inch", desc: "Water Valve", category: "Valves", keywords: ["valve", "वाल्व", "1 inch", "ek inch", "1inch"] },
  { id: 162, name: "वाल्व 1.5 इंच", pdfName: "Valve 1.5 Inch", desc: "Water Valve", category: "Valves", keywords: ["valve", "वाल्व", "1.5", "1.5 inch", "dedh"] },
  { id: 163, name: "वाल्व 2 इंच", pdfName: "Valve 2 Inch", desc: "Water Valve", category: "Valves", keywords: ["valve", "वाल्व", "2 inch", "do inch", "2inch"] },
  { id: 164, name: "वाल्व 3 इंच", pdfName: "Valve 3 Inch", desc: "Water Valve", category: "Valves", keywords: ["valve", "वाल्व", "3 inch", "teen inch", "3inch"] },
  { id: 165, name: "कन्सील्ड वाल्व 1/2 इंच", pdfName: "Concealed Valve 1/2 Inch", desc: "Hidden Valve", category: "Valves", keywords: ["concealed valve", "कन्सील्ड", "1/2", "half", "aadha"] },
  { id: 166, name: "कन्सील्ड वाल्व 3/4 इंच", pdfName: "Concealed Valve 3/4 Inch", desc: "Hidden Valve", category: "Valves", keywords: ["concealed valve", "कन्सील्ड", "3/4", "three fourth"] },
  { id: 167, name: "कन्सील्ड वाल्व 1 इंच", pdfName: "Concealed Valve 1 Inch", desc: "Hidden Valve", category: "Valves", keywords: ["concealed valve", "कन्सील्ड", "1 inch", "ek inch", "1inch"] },
  { id: 168, name: "कन्सील्ड वाल्व 1.5 इंच", pdfName: "Concealed Valve 1.5 Inch", desc: "Hidden Valve", category: "Valves", keywords: ["concealed valve", "कन्सील्ड", "1.5", "1.5 inch", "dedh"] },
  { id: 169, name: "कन्सील्ड वाल्व 2 इंच", pdfName: "Concealed Valve 2 Inch", desc: "Hidden Valve", category: "Valves", keywords: ["concealed valve", "कन्सील्ड", "2 inch", "do inch", "2inch"] },
  { id: 170, name: "कन्सील्ड वाल्व 3 इंच", pdfName: "Concealed Valve 3 Inch", desc: "Hidden Valve", category: "Valves", keywords: ["concealed valve", "कन्सील्ड", "3 inch", "teen inch", "3inch"] },

  // ───────── ACCESSORIES ─────────
  { id: 171, name: "टेफ्लॉन टेप", pdfName: "Teflon Tape", desc: "लीकेज प्रोटेक्शन", category: "Accessories", keywords: ["teflon", "tape", "टेफ्लॉन"] },
  { id: 172, name: "सॉल्वेंट", pdfName: "CPVC Solvent", desc: "पाइप गोंद", category: "Accessories", keywords: ["solvent", "glue", "solution"] },
  { id: 173, name: "क्लैम्प", pdfName: "Pipe Clamp", desc: "पाइप होल्डर", category: "Accessories", keywords: ["clamp", "holder", "क्लैम्प"] },
  { id: 174, name: "कनेक्शन पाइप", pdfName: "Connection Pipe", desc: "Flexible Pipe", category: "Accessories", keywords: ["connection pipe", "pipe"] },
  { id: 175, name: "फ्लैंज", pdfName: "Flange", desc: "पाइप फ्लैंज", category: "Accessories", keywords: ["flange", "फ्लैंज"] },
  { id: 176, name: "रबर वॉशर", pdfName: "Rubber Washer", desc: "लीक सील", category: "Accessories", keywords: ["washer", "rubber"] },

  // ───────── SPECIAL ─────────
  { id: 177, name: "मिक्सर अडैप्टर", pdfName: "Mixer Adaptor", desc: "मिक्सर कनेक्टर", category: "Special", keywords: ["mixer adaptor", "मिक्सर"] },
  { id: 178, name: "प्लग", pdfName: "Plug", desc: "Pipe Plug", category: "Special", keywords: ["plug", "प्लग"] },
  { id: 179, name: "एंड कैप", pdfName: "End Cap", desc: "Pipe End Cover", category: "Special", keywords: ["end cap", "कैप"] },
  { id: 180, name: "टैंक अडैप्टर", pdfName: "Tank Adaptor", desc: "Tank Connector", category: "Special", keywords: ["tank adaptor", "टैंक"] },
  { id: 181, name: "ब्रास टी", pdfName: "Brass Tee", desc: "Brass Fitting", category: "Special", keywords: ["brass tee", "ब्रास टी"] },
  { id: 182, name: "ब्रास एनआरवी", pdfName: "Brass NRV", desc: "Non Return Valve", category: "Special", keywords: ["brass nrv", "nrv"] },
  { id: 183, name: "वॉल मिक्सचर", pdfName: "Wall Mixture", desc: "Wall Mixer Connector", category: "Special", keywords: ["wall mixture", "मिक्सचर"] },
  { id: 184, name: "ट्रांजेक्शन बुश", pdfName: "Transaction Bush", desc: "Bush Connector", category: "Special", keywords: ["transaction bush", "bush"] }
];
const categoryColors = {
  "PVC Pipe": "#3b82f6",
  "CPVC Pipe": "#f59e0b",
  "Fittings": "#8b5cf6",
  "Taps & Valves": "#10b981",
  "Drainage": "#ef4444",
  "Accessories": "#6366f1",
};

export default function PlumbingReceiptComponent() {
  const [search, setSearch] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showPreview, setShowPreview] = useState(false);
  const [quantities, setQuantities] = useState(
    Object.fromEntries(materialsData.map((m) => [m.id, 0]))
  );
  const [pdfSuccess, setPdfSuccess] = useState(false);

  const categories = ["All", ...new Set(materialsData.map((m) => m.category))];

  const increaseQty = (id) =>
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));

  const decreaseQty = (id) =>
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, prev[id] - 1) }));

  const removeItem = (id) => {
  setQuantities((prev) => ({
    ...prev,
    [id]: 0,
  }));
};

  const filteredMaterials = materialsData.filter((item) => {
    const s = search.toLowerCase();
    const matchSearch =
      item.name.toLowerCase().includes(s) ||
      item.desc.toLowerCase().includes(s) ||
      item.keywords.some((k) => k.toLowerCase().includes(s));
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    return matchSearch && matchCat;
  });

  const totalMaterials = Object.values(quantities).reduce((a, b) => a + b, 0);
  const selectedItems = materialsData.filter((item) => quantities[item.id] > 0);
  const receiptNo = `SKP-${Date.now().toString().slice(-6)}`;

  // ─── DRAW WATER DROP LOGO (vector-style with jsPDF primitives) ───────────────
  function drawLogo(doc, cx, cy, size) {
    // Drop body
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(255, 255, 255);
    // Circle base
    doc.circle(cx, cy + size * 0.15, size * 0.55, "F");
    // Triangle top (approximated with an ellipse tilt)
    doc.setFillColor(255, 255, 255);
    doc.ellipse(cx, cy - size * 0.18, size * 0.35, size * 0.6, "F");

    // Inner highlight
    doc.setFillColor(255, 255, 255, 0.4);
    doc.setDrawColor(200, 220, 255);
    doc.setLineWidth(0);
    doc.ellipse(cx - size * 0.15, cy - size * 0.1, size * 0.1, size * 0.2, "F");
  }

  function drawWrenchIcon(doc, x, y, size, color) {
    doc.setDrawColor(...color);
    doc.setLineWidth(1.5);
    // Simplified wrench: a rectangle handle + circle head
    doc.roundedRect(x, y + size * 0.4, size * 0.28, size * 0.6, 2, 2);
    doc.circle(x + size * 0.14, y + size * 0.3, size * 0.28);
    doc.circle(x + size * 0.14, y + size * 0.3, size * 0.14);
  }

  // ─── GENERATE PDF ────────────────────────────────────────────────────────────
  const generatePDF = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210, H = 297;

    // ── BACKGROUND ──
    doc.setFillColor(245, 247, 250);
    doc.rect(0, 0, W, H, "F");

    // ── DECORATIVE TOP WAVE / SHAPE ──
    // Deep navy header band
    doc.setFillColor(10, 25, 60);
    doc.rect(0, 0, W, 58, "F");

    // Blue accent strip
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 52, W, 8, "F");

    // Diagonal accent (right side of header)
    doc.setFillColor(29, 78, 216);
    doc.triangle(120, 0, W, 0, W, 58, "F");

    // Watermark circle BG (decorative)
    doc.setFillColor(255, 255, 255, 0.03);
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.3);
    doc.circle(170, 10, 38);
    doc.circle(170, 10, 28);

    // ── LOGO CIRCLE ──
    doc.setFillColor(37, 99, 235);
    doc.circle(26, 26, 16, "F");

    // Water drop shape inside logo
    doc.setFillColor(255, 255, 255);
    doc.ellipse(26, 23, 5, 8, "F");   // drop body
    doc.circle(26, 30, 5, "F");        // drop base
    // Inner shine
    doc.setFillColor(37, 99, 235);
    doc.circle(26, 29.5, 3.5, "F");
    doc.setFillColor(255, 255, 255);
    doc.circle(23.5, 26, 1.2, "F");   // shine dot

    // ── COMPANY NAME ──
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("SANDEEP KAHAR", 46, 22);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(147, 197, 253);
    doc.text("Professional Plumbing Services", 46, 30);

    // ── CONTACT DETAILS (header right) ──
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("+91 7869403607", 155, 18, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setTextColor(147, 197, 253);
    doc.setFontSize(8);
    doc.text("Hatod Indore, 453111", 155, 25, { align: "center" });
    doc.text("Available 24/7", 155, 31, { align: "center" });

    // ── DECORATIVE LINE PATTERN ──
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.3);
    for (let i = 0; i < 6; i++) {
      doc.line(0, 44 + i * 1.2, W, 44 + i * 1.2);
    }

    // ── RECEIPT TITLE BAND ──
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 52, W, 9, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("MATERIAL RECEIPT", 20, 58.5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`Receipt No: ${receiptNo}`, 190, 58.5, { align: "right" });

    // ── RECEIPT META INFO BOX ──
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(14, 66, W - 28, 32, 3, 3, "F");
    doc.setDrawColor(220, 230, 245);
    doc.setLineWidth(0.5);
    doc.roundedRect(14, 66, W - 28, 32, 3, 3, "S");

    // Left column
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("CUSTOMER NAME", 20, 74);
    doc.text("ADDRESS", 20, 85);

    // toSafe: jsPDF helvetica only renders ASCII — Hindi chars would garble.
    // Keep English input as-is; replace non-ASCII with "?" as fallback.
    const toSafe = (s) => s ? s.replace(/[^\x00-\x7F]/g, "?") : "-";
    doc.setFont("helvetica", "normal");
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(10);
    doc.text(toSafe(customerName) || "-", 20, 80);
    doc.text(toSafe(address) || "-", 20, 91);

    // Right column
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("DATE", 130, 74);
    doc.text("PHONE", 130, 85);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(10);
    doc.text(new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }), 130, 80);
    doc.text(phone || "-", 130, 91);

    // Vertical divider
    doc.setDrawColor(220, 230, 245);
    doc.setLineWidth(0.5);
    doc.line(120, 69, 120, 95);

    // ── TABLE HEADER ──
    const tableTop = 105;
    doc.setFillColor(10, 25, 60);
    doc.roundedRect(14, tableTop, W - 28, 10, 2, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("#", 19, tableTop + 6.5);
    doc.text("MATERIAL NAME", 28, tableTop + 6.5);
    doc.text("CATEGORY", 115, tableTop + 6.5);
    doc.text("QTY", 183, tableTop + 6.5, { align: "right" });

    // ── TABLE ROWS ──
    let y = tableTop + 15;

    if (selectedItems.length === 0) {
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(14, y - 5, W - 28, 18, 2, 2, "F");
      doc.setTextColor(148, 163, 184);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(11);
      doc.text("No materials selected.", W / 2, y + 5, { align: "center" });
    } else {
      selectedItems.forEach((item, index) => {
        const rowH = 11;
        // Alternating background
        if (index % 2 === 0) {
          doc.setFillColor(248, 250, 255);
        } else {
          doc.setFillColor(255, 255, 255);
        }
        doc.rect(14, y - 7, W - 28, rowH, "F");

        // Index
        doc.setTextColor(148, 163, 184);
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.text(String(index + 1).padStart(2, "0"), 19, y);

        // Material Name (use pdfName - English only, Hindi breaks jsPDF)
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(9.5);
        doc.setFont("helvetica", "bold");
        doc.text(item.pdfName, 28, y);

        // Category badge
        const catColor = categoryColors[item.category] || "#6366f1";
        const hexToRgb = (hex) => {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return [r, g, b];
        };
        const [cr, cg, cb] = hexToRgb(catColor);
        doc.setFillColor(cr, cg, cb, 0.15);
        doc.roundedRect(110, y - 5.5, 38, 7, 2, 2, "F");
        doc.setTextColor(cr, cg, cb);
        doc.setFontSize(7.5);
        doc.setFont("helvetica", "bold");
        doc.text(item.category, 129, y - 0.5, { align: "center" });

        // Quantity badge
        doc.setFillColor(37, 99, 235);
        doc.circle(183, y - 2, 5, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.text(String(quantities[item.id]), 183, y + 0.5, { align: "center" });

        // Bottom border line
        doc.setDrawColor(235, 240, 250);
        doc.setLineWidth(0.3);
        doc.line(14, y + 4, W - 14, y + 4);

        y += rowH + 1;
      });
    }

    // ── TOTAL BOX ──
    y += 8;
    doc.setFillColor(10, 25, 60);
    doc.roundedRect(14, y, W - 28, 18, 3, 3, "F");

    // Left side
    doc.setTextColor(147, 197, 253);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("TOTAL ITEMS SELECTED", 20, y + 7.5);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text(`${selectedItems.length} material type(s)`, 20, y + 14);

    // Right side: quantity
    doc.setFillColor(37, 99, 235);
    doc.roundedRect(140, y + 2, 56, 14, 3, 3, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("TOTAL QTY:", 145, y + 10);
    doc.setFontSize(16);
    doc.text(String(totalMaterials), 190, y + 11.5, { align: "right" });

    // ── TERMS / NOTES ──
    y += 28;
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(14, y, W - 28, 22, 3, 3, "F");
    doc.setDrawColor(220, 230, 245);
    doc.setLineWidth(0.4);
    doc.roundedRect(14, y, W - 28, 22, 3, 3, "S");

    doc.setTextColor(37, 99, 235);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text("TERMS & CONDITIONS", 20, y + 7);

    doc.setTextColor(100, 116, 139);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text("1. All materials are subject to availability.", 20, y + 13);
    doc.text("2. This receipt is valid for reference purposes only.", 20, y + 18);

    // ── FOOTER BAND ──
    doc.setFillColor(10, 25, 60);
    doc.rect(0, H - 22, W, 22, "F");
    doc.setFillColor(37, 99, 235);
    doc.rect(0, H - 22, W, 2, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("SANDEEP KAHAR - Professional Plumbing Services", W / 2, H - 13, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setTextColor(147, 197, 253);
    doc.setFontSize(7.5);
    doc.text("+91 7869403607  |  Hatod Indore, 453111  |  Available 24/7", W / 2, H - 7, { align: "center" });

    doc.save(`Receipt-${receiptNo}.pdf`);
    setPdfSuccess(true);
    setTimeout(() => setPdfSuccess(false), 3000);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif" }} className="w-full min-h-screen bg-slate-100 overflow-x-hidden">
      <div className="w-full max-w-[430px] mx-auto min-h-screen bg-slate-100 relative pb-32">

        {/* ── HEADER ── */}
        <header className="sticky top-0 z-50 shadow-xl" style={{ background: "linear-gradient(135deg, #0a1940 0%, #1e3a8a 60%, #2563eb 100%)" }}>
          <div className="px-4 pt-4 pb-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Logo */}
                <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}>
                  <FaDroplet className="text-white text-2xl drop-shadow" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-white" />
                </div>
                <div>
                  <h1 className="text-[17px] font-bold text-white tracking-wide">SANDEEP KAHAR</h1>
                  <p className="text-[10px] text-blue-300 tracking-widest uppercase">Professional Plumbing</p>
                </div>
              </div>
              <a href="tel:+8435916598" className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold text-white border border-blue-400 bg-blue-800/50 backdrop-blur">
                <FaPhone className="text-green-400 text-[10px]" />
                <span>Call</span>
              </a>
            </div>

            {/* Stats bar */}
            <div className="mt-3 flex gap-2">
              <div className="flex-1 bg-white/10 rounded-xl px-3 py-2 text-center">
                <div className="text-white font-bold text-lg">{selectedItems.length}</div>
                <div className="text-blue-300 text-[9px] uppercase tracking-wide">Items</div>
              </div>
              <div className="flex-1 bg-white/10 rounded-xl px-3 py-2 text-center">
                <div className="text-white font-bold text-lg">{totalMaterials}</div>
                <div className="text-blue-300 text-[9px] uppercase tracking-wide">Total Qty</div>
              </div>
              <div className="flex-1 bg-green-500/20 rounded-xl px-3 py-2 text-center border border-green-500/30">
                <div className="text-green-400 font-bold text-lg">{Object.values(quantities).filter(q => q > 0).length}</div>
                <div className="text-green-300 text-[9px] uppercase tracking-wide">Added</div>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 pt-4 space-y-4">

          {/* ── CUSTOMER DETAILS ── */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center">
                <FaWrench className="text-white text-[10px]" />
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Customer Details</span>
            </div>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Customer Name *"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50 text-slate-800 placeholder-slate-400"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 h-11 px-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50 text-slate-800 placeholder-slate-400"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="flex-1 h-11 px-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50 text-slate-800 placeholder-slate-400"
                />
              </div>
            </div>
          </div>

          {/* ── SEARCH ── */}
          <div className="relative">
            <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              placeholder="Search material in Hindi or English..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200 bg-white shadow-sm outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* ── CATEGORY PILLS ── */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: activeCategory === cat
                    ? (categoryColors[cat] || "#2563eb")
                    : "#fff",
                  color: activeCategory === cat ? "#fff" : "#64748b",
                  border: `1.5px solid ${activeCategory === cat ? (categoryColors[cat] || "#2563eb") : "#e2e8f0"}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ── MATERIAL LIST ── */}
          <div className="space-y-2">
            {filteredMaterials.length === 0 && (
              <div className="text-center py-10 text-slate-400 text-sm">
                कोई material नहीं मिला
              </div>
            )}
            {filteredMaterials.map((item) => {
              const qty = quantities[item.id];
              const catColor = categoryColors[item.category] || "#6366f1";
              return (
                <div
                  key={item.id}
                  className="bg-white border rounded-2xl p-3.5 shadow-sm transition-all"
                  style={{ borderColor: qty > 0 ? catColor : "#e2e8f0", borderWidth: qty > 0 ? "1.5px" : "1px" }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {/* Category color dot */}
                      <div className="w-2 h-8 rounded-full shrink-0" style={{ background: catColor }} />
                      <div className="min-w-0">
                        <h2 className="text-[14px] font-bold text-slate-800 truncate">{item.name}</h2>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-slate-400">{item.desc}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold" style={{ background: catColor + "20", color: catColor }}>{item.category}</span>
                        </div>
                      </div>
                    </div>

                    {/* Counter */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="w-8 h-8 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-bold text-lg leading-none flex items-center justify-center hover:bg-slate-100 active:scale-95 transition-all"
                      >
                        −
                      </button>
                      <span
                        className="w-8 text-center text-sm font-bold rounded-lg py-1"
                        style={{ background: qty > 0 ? catColor + "15" : "transparent", color: qty > 0 ? catColor : "#94a3b8" }}
                      >
                        {qty}
                      </span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="w-8 h-8 rounded-xl text-white font-bold text-lg leading-none flex items-center justify-center active:scale-95 transition-all"
                        style={{ background: catColor }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        {/* ── PREVIEW MODAL ── */}
{showPreview && (
  <div className="fixed inset-0 bg-black/50 z-[100] flex items-end justify-center">
    <div className="bg-white w-full max-w-[430px] rounded-t-3xl p-4 max-h-[85vh] overflow-y-auto animate-slideUp">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-800">
          Receipt Preview
        </h2>

        <button
          onClick={() => setShowPreview(false)}
          className="w-8 h-8 rounded-full bg-slate-100 text-slate-600"
        >
          ✕
        </button>
      </div>

      {/* CUSTOMER INFO */}
      <div className="bg-slate-50 rounded-2xl p-3 mb-4">
        <p className="text-sm font-semibold text-slate-700">
          Customer: {customerName || "-"}
        </p>

        <p className="text-xs text-slate-500 mt-1">
          Phone: {phone || "-"}
        </p>

        <p className="text-xs text-slate-500">
          Address: {address || "-"}
        </p>
      </div>

      {/* MATERIAL LIST */}
      <div className="space-y-2">

        {selectedItems.length === 0 && (
          <div className="text-center py-10 text-slate-400">
            No Material Added
          </div>
        )}

        {selectedItems.map((item) => {
          const catColor =
            categoryColors[item.category] || "#2563eb";

          return (
            <div
              key={item.id}
              className="border rounded-2xl p-3 flex items-center justify-between"
            >
              <div className="flex-1">
                <h3 className="font-bold text-sm text-slate-800">
                  {item.name}
                </h3>

                <p className="text-xs text-slate-400 mt-1">
                  Qty : {quantities[item.id]}
                </p>
              </div>

              <div className="flex items-center gap-2">

                {/* QTY */}
                <div
                  className="px-3 py-1 rounded-xl text-white text-sm font-bold"
                  style={{ background: catColor }}
                >
                  {quantities[item.id]}
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="px-3 py-1 rounded-xl bg-red-500 text-white text-xs font-bold"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* TOTAL */}
      <div className="mt-5 bg-blue-50 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-700">
            Total Quantity
          </span>

          <span className="text-2xl font-bold text-blue-700">
            {totalMaterials}
          </span>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-2 mt-5">

        {/* BACK */}
        <button
          onClick={() => setShowPreview(false)}
          className="flex-1 h-12 rounded-2xl border border-slate-300 font-bold text-slate-700"
        >
          Edit
        </button>

        {/* FINAL PDF */}
        <button
          onClick={() => {
            generatePDF();
            setShowPreview(false);
          }}
          className="flex-1 h-12 rounded-2xl bg-green-600 text-white font-bold"
        >
          Final Generate PDF
        </button>
      </div>
    </div>
  </div>
)}

        {/* ── BOTTOM BAR ── */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4">
          <div className="max-w-[430px] mx-auto space-y-2">
            {/* Selected preview */}
            {selectedItems.length > 0 && (
              <div className="flex gap-1 flex-wrap">
                {selectedItems.slice(0, 3).map(item => (
                  <span key={item.id} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold">
                    {item.name.split(" ").slice(0, 3).join(" ")} ×{quantities[item.id]}
                  </span>
                ))}
                {selectedItems.length > 3 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-semibold">
                    +{selectedItems.length - 3} more
                  </span>
                )}
              </div>
            )}
           <button
  onClick={() => setShowPreview(true)}
  className="w-full h-14 rounded-2xl text-white font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98]"
  style={{
    background: pdfSuccess
      ? "linear-gradient(135deg,#10b981,#059669)"
      : "linear-gradient(135deg,#0a1940,#2563eb)",
  }}
>
  <FaFilePdf className="text-lg" />

  <span className="text-sm">
    Preview Receipt
  </span>
</button>
          </div>
        </div>
      </div>
    </div>
  );
}