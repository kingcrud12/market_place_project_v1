import React from "react";
import "./LatestNews.css"; // Assurez-vous de créer ce fichier CSS

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
    image: "path/to/image1.jpg", // Remplacez avec les chemins réels
    author: "Kristin",
    date: "19 Dec, 2013",
    comments: 453,
    title: "Cras nisl dolor, accumsan et metus sit amet.",
    description:
      "Maecenas scelerisque, arcu quis tempus egestas, ligula diam molestie lectus, tincidunt malesuada arcu metus posuere metus.",
  },
  {
    id: 2,
    image: "path/to/image2.jpg",
    author: "Robert",
    date: "28 Nov, 2015",
    comments: 738,
    title: "Curabitur pulvinar aliquam lectus, non blandit erat.",
    description:
      "Mauris scelerisque odio id rutrum volutpat. Pellentesque urna odio, vulputate at tortor vitae, hendrerit blandit lorem.",
  },
  {
    id: 3,
    image: "path/to/image3.jpg",
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
      <h2 className="latest-news-title">Latest News</h2>
      <div className="latest-news-container">
        {newsData.map((news) => (
          <div key={news.id} className="news-card">
            <img src={news.image} alt={news.title} className="news-image" />
            <div className="news-details">
              <div className="news-meta">
                <span className="news-author">{news.author}</span>
                <span className="news-date">{news.date}</span>
                <span className="news-comments">{news.comments} comments</span>
              </div>
              <h3 className="news-title">{news.title}</h3>
              <p className="news-description">{news.description}</p>
              <button className="read-more-button">Read More →</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestNews;
