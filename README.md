# liri-node-app

Language Interpretation and Recognition Interface Bot! LIRI is a CLI app for node that takes in user input and gives back data. The follow commands can be used to pull different data: 
1. concert-this
2. spotify-this-song
3. movie-this
4. do-what-it-says

--- How to use this LIRI Bot ---

node liri.js concert this 'band/artist name' 
-This will pull information about upcoming concerts for the band or artist listed.
-If no band or artist is entered it will default to Kiss.

node liri.js spotify-this-song 'song name'
-This will pull information from Spotify about the listed song.
-If no song is entered it will default to "Aces High" by Iron Maiden.

node liri.js movie-this 'movie name'
-This will pull movie information about the listed movie.
-If no movie is entered it will default to Mr. Nobody.

node liri.js do-what-it-says
-This will read the random.txt file and do what is on that file. So in this case it will spotify-this-song for "I Want It That Way".