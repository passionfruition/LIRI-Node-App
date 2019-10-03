# LIRI-Node-App

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

Possible information returned about:
* Concerts
* Spotify songs
* OMDb movies

# APIs
* [Bands In Town](https://artists.bandsintown.com/support/bandsintown-api)
* [Spotify](https://developer.spotify.com/documentation/web-api/)
* [OMDb](https://www.omdbapi.com/)

# Tools Used
* moment
* axios
* fs

# Instructions
1. Clone/fork the repository to your computer
2. Run npm install
3. **Important: You will need your own .env file containing spotify keys for the app to work properly
4. Open your selected terminal
5. Choose which command you'd like to run in relation to the API (Bands In Town = "concert-this", Spotify = "spotify-this-song", OMDb = "movie-this" or give "do-what-it-says" a try)
6. Run the file with node. (Ex. "node liri.js concert-this Jonas Brothers). 
7. Depending on which command you chose, the console will return the relative information.

# Example
![ezgif com-video-to-gif](https://user-images.githubusercontent.com/26778117/66092895-c5c2f000-e542-11e9-80d8-3bba273fa9f7.gif)

# Authors
[Madeleine Prak](https://github.com/madeleineprak/)