import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactGA from 'react-ga4';


const TweetMetrics = ({ tweetId }) => {
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(null);

  // const [tweetStats, setTweetStats] = useState({});
  const tweetContent = 'Check out this amazing React app!';
  const tweetUrl = 'https://yourwebsite.com'; // Replace with your actual URL

  const fetchRecentTweets = async (userId) => {
    console.log('userId', userId);
    try {
      const response = await axios.get(`https://api.twitter.com/2/users/${userId}/tweets`, {
        headers: {
          Authorization: `Bearer YOUR_BEARER_TOKEN`,
        },
      });
      console.log(response.data); // This will show recent tweets along with their IDs
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTweetMetrics = async (id) => {
    console.log(id, 'PPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');
    try {
      const response = await axios.get(`https://api.twitter.com/2/tweets?ids=${id}&tweet.fields=public_metrics`, {
        headers: {
          Authorization: `Bearer AAAAAAAAAAAAAAAAAAAAAFNYzQEAAAAAjnchyPep4Tmngj9%2FPcV0lBjr1VE%3D14GTOoVdjvgpl8uIIYnOUvz2mpU2tFgLh8XjQzyoEAVikuEDOQ`, // Replace with your Bearer Token
        },
      });
      console.log(response.data.data[0].public_metrics, 'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
      setMetrics(response.data.data[0].public_metrics);
    } catch (err) {
      setError('Error fetching tweet metrics.');
    }
  };

  // const tweetIds = '1891457655572738048'
  // useEffect(async (id) => {
  //   fetchRecentTweets('1891457655572738048');
  //   console.log(id, 'PPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');
  //   try {
  //     const response = await axios.get(`https://api.twitter.com/2/tweets?ids=${id}&tweet.fields=public_metrics`, {
  //       headers: {
  //         Authorization: `Bearer AAAAAAAAAAAAAAAAAAAAAFNYzQEAAAAAjnchyPep4Tmngj9%2FPcV0lBjr1VE%3D14GTOoVdjvgpl8uIIYnOUvz2mpU2tFgLh8XjQzyoEAVikuEDOQ`, // Replace with your Bearer Token
  //       },
  //     });
  //     console.log(response.data.data[0].public_metrics, 'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
  //     setMetrics(response.data.data[0].public_metrics);
  //   } catch (err) {
  //     setError('Error fetching tweet metrics.');
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchRecentTweets('1891457655572738048');
  //   if (tweetId) {
  //     fetchTweetMetrics(tweetId);
  //   }
  // }, [tweetId]);




  if (error) {
    return <p>{error}</p>;
  }

  if (!metrics) {
    return <p>Loading metrics...</p>;
  }

  return (
    <div>
      <h2>Tweet Metrics</h2>
      <p>Likes: {metrics.like_count}</p>
      <p>Retweets: {metrics.retweet_count}</p>
      <p>Replies: {metrics.reply_count}</p>
      <p>Quotes: {metrics.quote_count}</p>
    </div>

    // <div>
    //   <a
    //     href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetContent)}&url=${encodeURIComponent(tweetUrl)}`}
    //     className="twitter-share-button"
    //     target="_blank"
    //     rel="noopener noreferrer"
    //     onClick={() => {
    //       ReactGA.event({
    //         category: 'Twitter Engagement',
    //         action: 'Tweet Shared',
    //         label: `Tweet ID: ${tweetId}`,
    //       });
    //     }}
    //   >
    //     Tweet
    //   </a>

    //   {/* Display tweet engagement counts */}
    //   {/* <p>Likes: {tweetStats.likes}</p>
    //   <p>Retweets: {tweetStats.retweets}</p>
    //   <p>Comments: {tweetStats.comments}</p> */}
    // </div>
  );
};

export default TweetMetrics;
