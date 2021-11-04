import Navigation from "../components/Navigation";
import { useRouter } from 'next/router';
import React from "react";

export default function Home(){
  const router = useRouter()
  console.log(router)
  // test connection
  return (<div className="app_container home_page">
    <Navigation />
  </div>)
}

export async function getServerSideProps(context) {

}