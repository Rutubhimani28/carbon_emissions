export const handleLogoClick = async () => {
  try {
    // API call to increment impression count
    const response = await fetch('http://127.0.0.1:8000/api/impressions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response, 'response');
    // return response;
  } catch (error) {
    console.error('Error incrementing impressions:', error);
  }
};
