import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from '../components/footer/Footer';

const Home = () => {
  const [featuredPodcasts, setFeaturedPodcasts] = useState([]);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    // Simulate API calls to fetch featured podcasts and episodes
    const fetchFeaturedPodcasts = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=3');
      const data = await response.json();
      // Format data for the podcast structure
      const podcasts = data.map(item => ({
        title: `Podcast ${item.id}`,
        description: item.title,
        imageUrl: item.url,
        link: '#',
      }));
      setFeaturedPodcasts(podcasts);
    };

    const fetchEpisodes = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=4');
      const data = await response.json();
      // Format data for the episodes structure
      const episodesData = data.map(item => ({
        title: item.title,
        description: item.body,
        imageUrl: 'https://via.placeholder.com/400x250',
        link: '#',
      }));
      setEpisodes(episodesData);
    };

    fetchFeaturedPodcasts();
    fetchEpisodes();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="bg-zinc-800 min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://wallpapers.com/images/high/dark-nature-1920-x-1080-background-lqtolhf1sfr3ve5s.webp")' }} />
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>
        <div className="relative z-10 text-center p-6">
          <h1 className="text-6xl font-extrabold mb-6 animate__animated animate__fadeIn animate__delay-1s">
            Discover Your Next Favorite Podcast
          </h1>
          <p className="text-2xl mb-8 animate__animated animate__fadeIn animate__delay-2s">
            Explore a vast library of podcasts and follow your favorite shows with ease.
          </p>
          <a
            href="#episodes"
            className="bg-white text-blue-900 px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-gray-200 transition transform hover:scale-105"
          >
            Explore Episodes
          </a>
        </div>
      </section>

      {/* Featured Podcasts Carousel */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">Featured Podcasts</h2>
          <Slider {...settings}>
            {featuredPodcasts.map((podcast, index) => (
              <div key={index} className="p-4">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={podcast.imageUrl}
                    alt={podcast.title}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-semibold mb-2">{podcast.title}</h3>
                    <p className="text-gray-600 mb-4">{podcast.description}</p>
                    <a
                      href={podcast.link}
                      className="bg-blue-900 text-white px-4 py-2 rounded-full hover:bg-blue-800 transition"
                    >
                      Listen Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Recent Episodes Section */}
      <section id="episodes" className="py-16 hidden md:block lg:block">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-white">Recent Episodes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {episodes.map((episode, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition">
                <img
                  src={episode.imageUrl}
                  alt={episode.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{episode.title}</h3>
                  <p className="text-gray-600 mb-4">{episode.description}</p>
                  <a
                    href={episode.link}
                    className="bg-blue-900 text-white px-4 py-2 rounded-full hover:bg-blue-800 transition"
                  >
                    Listen Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
