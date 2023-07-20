import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import CardBox from "../cardBox/CardBox";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>English Card - InfoMuen</title>
        <meta
          name="description"
          content="Enhance your English skills with the English Card, a powerful learning tool designed to make learning English fun and engaging. Learn English easily through interactive lessons, quizzes, and vocabulary games. Start your language journey today!"
        />
        <meta
          name="keywords"
          content="English Card, learn English, English skills, interactive lessons, quizzes, vocabulary games, language learning, fun, engaging, language journey"
        />
      </Helmet>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <CardBox />
      </div>
    </div>
  );
};

export default Home;
