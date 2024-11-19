import React from "react";
import ImageCard1 from "../../../assets_2/image/unsplash_iZVrfElG1t0.png";
import ImageCard2 from "../../../assets_2/image/unsplash_FO7JIlwjOtU.svg";
import ImageCard3 from "../../../assets_2/image/unsplash_6MNmDi1hc_Y.png";
import UseCircle from "../../../assets_2/icons/Regular/UserCircle.svg";
import CalendarBank from "../../../assets_2/icons/Regular/CalendarBlank.svg";
import ChatCircle from "../../../assets_2/icons/Regular/ChatCircleDots.svg";
import ArrowRight from "../../../assets_2/icons/Regular/Regular/Regular/ArrowRight.svg";
import "./LatestNews.css"; 

interface NewsItem {
  id: number;
  image: string;
  author: string;
  date: string;
  comments: number;
  title: string;
  description: string;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    image: ImageCard1, 
    author: "Kristin",
    date: "19 Dec, 2013",
    comments: 453,
    title: "Cras nisl dolor, accumsan et metus sit amet.",
    description:
      "Maecenas scelerisque, arcu quis tempus egestas, ligula diam molestie lectus, tincidunt malesuada arcu metus posuere metus.",
  },
  {
    id: 2,
    image: ImageCard2,
    author: "Robert",
    date: "28 Nov, 2015",
    comments: 738,
    title: "Curabitur pulvinar aliquam lectus, non blandit erat.",
    description:
      "Mauris scelerisque odio id rutrum volutpat. Pellentesque urna odio, vulputate at tortor vitae, hendrerit blandit lorem.",
  },
  {
    id: 3,
    image: ImageCard3,
    author: "Arlene",
    date: "9 May, 2014",
    comments: 826,
    title: "Curabitur massa orci, consectetur et blandit ac.",
    description:
      "Pellentesque vestibulum lorem vel gravida aliquam. Morbi porta, odio id suscipit mattis, risus augue condimentum purus.",
  },
];

const LatestNews: React.FC = () => {
  return (
    <section className="latest-news">
      <span className="latest-news-title">Latest News</span>
      <div className="latest-news-container">
        {newsData.map((news) => (
          <div key={news.id} className="news-card">
            <img src={news.image} alt={news.title} className="news-image" />
            <div className="news-details">
              <div className="news-meta">
                <span className="news-author">
                  <img src={UseCircle} alt='' />
                  {news.author}</span>
                <span className="news-date">
                  <img src={CalendarBank} alt='' />
                  {news.date}</span>
                <span className="news-comments">
                <img src={ChatCircle} alt='' />
                  {news.comments}</span>
              </div>
              <span className="news-title">{news.title}</span>
              <span className="news-description">{news.description}</span>
            </div>  
              <button className="read-more-button">Read More <img src={ArrowRight} alt='' /></button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestNews;
