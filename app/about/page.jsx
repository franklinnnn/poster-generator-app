import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">About Swatch Frame</h1>
      <p className="mb-4">
        Swatch Frame is a creative web application that allows users to create
        custom posters featuring color palettes derived from their favorite
        album artworks. By leveraging the Spotify Web API, Swatch Frame provides
        users with easy access to album information, enabling them to design
        visually appealing posters that capture the essence of the music they
        love.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Frequently Asked Questions (FAQ)
      </h2>

      <div className="mb-4">
        <h3 className="font-bold">1. What is Swatch Frame?</h3>
        <p>
          Swatch Frame is your go-to app for turning your beloved albums into
          personalized posters! With just a few clicks, you can create unique
          designs that reflect the music you love.
        </p>
      </div>

      <div className="mb-4">
        <h3 className="font-bold">
          2. How does Swatch Frame use Spotify's Web API?
        </h3>
        <p>
          We harness the power of Spotify's Web API to fetch album info,
          including titles, artists, and stunning cover art. This way, you can
          easily access the albums that inspire you!
        </p>
      </div>

      <div className="mb-4">
        <h3 className="font-bold">
          3. Do I need a Spotify account to use Swatch Frame?
        </h3>
        <p>
          Nope! You can dive right in without a Spotify account. However, having
          one will unlock even more features, allowing you to save and explore
          your favorite albums.
        </p>
      </div>

      <div className="mb-4">
        <h3 className="font-bold">
          4. Can I share my posters created on Swatch Frame?
        </h3>
        <p>
          Absolutely! Share your creations on social media or download them to
          show off to your friends and family. We can't wait to see what you
          make!
        </p>
      </div>

      <div className="mb-4">
        <h3 className="font-bold">5. Is Swatch Frame free to use?</h3>
        <p>
          Yes, indeed! Swatch Frame is completely free. We want everyone to
          enjoy creating beautiful art inspired by their favorite music without
          any barriers.
        </p>
      </div>

      <div className="mb-4">
        <h3 className="font-bold">
          6. How can I provide feedback or report issues?
        </h3>
        <p>
          We love hearing from you! If you have feedback or run into any issues,
          please reach out through our contact page. Your thoughts help us make
          Swatch Frame even better!
        </p>
      </div>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Let’s Get Creative!</h2>
      <p>
        Ready to start creating amazing posters? Jump in and explore your
        favorite albums today with Swatch Frame!
      </p>
    </div>
  );
};

export default AboutPage;
