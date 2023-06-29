const fetchNews = async () => {
  const url = 'https://newsapi.org/v2/everything?q=apple&from=2023-06-27&to=2023-06-27&sortBy=popularity&apiKey=f52be2bac47d4461b3f2a3ec993f97e1';
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    // Xử lý dữ liệu tin tức ở đây
    
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

fetchNews();