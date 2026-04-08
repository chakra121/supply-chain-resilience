// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApzBL5AoAemf-i7QfQHmAetXSGQH0G-e8",
  authDomain: "supply-chain-resilience-c3142.firebaseapp.com",
  projectId: "supply-chain-resilience-c3142",
  storageBucket: "supply-chain-resilience-c3142.firebasestorage.app",
  messagingSenderId: "39448804054",
  appId: "1:39448804054:web:d5ca13aa2a1de8ba236777",
  measurementId: "G-X0ZYLG14X2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);