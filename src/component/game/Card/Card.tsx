import React from "react";
import "./Card.css";

interface CardProps {
  index: number;
  heading: string;
  text: string;
}

const Card: React.FC<CardProps> = ({ index, heading, text }) => (
  <div className="card">
    <div className="box">
      <div className="content">
        <span className="heading">{String(index).padStart(2, "0")}</span>
        <span className="title">{heading}</span>
        <p>{text}</p>
        <a href="#">Read More</a>
      </div>
    </div>
  </div>
);

export default Card;
