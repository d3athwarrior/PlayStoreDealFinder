# PlayStoreDealFinder

A simple application built using TypeScript on NodeJS that will fetch the sitemap using the robots.txt from Google PlayStore and then one by one scrape the URL of the applications and then store the price information on them

## TODO

1. Parse the xml files one by one using worker threads. Maybe have a pool of threads based on the number of cores available on the system.

2. Filter out the urls containing the application URLs

3. Using the URLs scrape the site to find the interesting data like the application package name, price a few more details perhaps?

4. Store the above parsed details one by one into a DB so that the next time when we scrape the store, we can simply use the package name and then fetch the price of the app instead of manually scrapping the URL every time to find the price etc


## References

1. <https://github.com/manojps/google-play-apps-crawler-scrapy>
2. <https://github.com/facundoolano/google-play-api>
3. <https://github.com/facundoolano/google-play-scraper>
4. <https://github.com/JoMingyu/google-play-scraper>
5. <https://pypi.org/project/google-play-scraper/>
