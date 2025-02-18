import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const GoogleAnalytics = () => {
  const location = useLocation();
  const TRACKING_ID = 'G-JBTMN1TKPY'; // Replace with your Measurement ID
  ReactGA.initialize(TRACKING_ID);
  const tweetUrl = 'https://yourwebsite.com';
  const tweetContent = 'Check out this amazing React app!';

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname });
  }, [location]);

  const handleClick = () => {
    ReactGA.event({
      category: 'User',
      action: 'Clicked Custom Button',
      label: 'Button Label',
    });
  };
  const handleSocialClick = (platform) => {
    console.log(platform, 'platform');
    ReactGA.event({
      category: 'Social Media',
      action: `Clicked on ${platform} link`,
    });
    if (platform === 'twitter') {
      window.location.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetContent)}&url=${encodeURIComponent(tweetUrl)}`;
    }
  };

  // return <button onClick={handleClick}>Click Me</bu  tton>;
  return  <button onClick={() => handleSocialClick('twitter')}>Share on twitter</button>;
  // (
  //   <a
  //       href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetContent)}&url=${encodeURIComponent(tweetUrl)}`}
  //       className="twitter-share-button"
  //       target="_blank"
  //       rel="noopener noreferrer"
  //       onClick={() =>handleSocialClick()}
  //     >
  //       Tweet
  //     </a>
  // )
 
};

export default GoogleAnalytics;
