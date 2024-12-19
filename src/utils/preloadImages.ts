export const preloadImages = (urls: string[]) => {
  const getImageUrl = (url: string) => {
    try {
      const baseUrl = url.split('?')[0];
      return `${baseUrl}?auto=compress&cs=tinysrgb&w=1920&h=1080`;
    } catch {
      return url;
    }
  };

  urls.forEach(url => {
    const img = new Image();
    img.src = getImageUrl(url);
  });
}; 