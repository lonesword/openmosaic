###Openmosaic Readme

Openmosaic is an experimental framework that allows you to run processing sketches across multiple screens. Openmosaic makes use of the fantastic [p5js](p5js.org) library and nodejs to make this happen.

####What is openmosaic, again?

Imagine that you are playing the classic game of [pong](http://cssdeck.com/labs/ping-pong-game-tutorial-with-html5-canvas-and-sounds), with your friend and on a phone screen. Imagine that your paddle is on your screen, and your friend's paddle is on his/her phone screen. The game begins. The puck hits your paddle, rebounds, and travels ACROSS the screen to your friends side.

Ok, that's what they call multiplayer. But openmosaic does it differently. The pong game that you just ran was not meant/expected to work on 2 screens. Instead of just you and your friend's phone, if you decided to hook up 4 ipads and run the pong game, the entire display of the game would scale up to fill the 4 ipad screens.

Openmosaic scales up a processing sketch to look good (and work) over many screens.

Disclaimer: All of the functionalities have not been implemented. See a demo of openmosaic [here](https://www.youtube.com/watch?v=uevvrnCXDJk). The interesting stuff starts at 2:26 (towards the end of the video)


####License

copyright © Kevin Martin Jose

This file is part of openmosaic.

openmosaic is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

openmosaic is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with openmosaic.  If not, see <http://www.gnu.org/licenses/>.

####Requirements :

1) Nodejs

2) socket.io node module [use 'npm install socket.io']

2) A modern web browser that supports html5 (chrome, chromium or firefox or IE 10)

####How to :

1) I haven't tested this on windows. Should work fine.

2) First install [nodejs](http://nodejs.org/). And install socket.io for node. `npm install socket.io` should do it.

3) Install git on your machine and clone this repository.

4) Follow this instructions in the *precise* order given below: 

a) Use terminal to `cd` to the directory where you downloaded openmosaic to and do `node server.js examples/<sketchname>`. For example, `node server.js example/sketch.js`. This should start the server. For the time being, all your sketches should be in the examples folder.

b) Open your browser and go to `http://localhost:8000/tools/packer_view.html`. That should open a blank screen

c) Open a new window and go to `http://localhost:8000/slave1`. That should open a blank page too. 

d) Switch the window to packer_view.html and now you should see a green box.

e) Open another new window and go to `http://localhost:8000/slave2`. This should open up another new blank page. The number next to `slave` doesn't really matter. The server will open a blank page as long as the URL starts with `slave` and ends with a number

f) The browser windows `slave1` and `slave2` that you have opened are basically 2 clients connected to our server. Think of them as two individual screens. Look at packer_view.html now and you should see TWO green boxes. The blue number on the middle of the box represents how the client screens should be arranged physically to make sense of the collective picture. Make sure you resize and arrange slave1 and slave2 as shown in packer_view.html.

g) Now press the `start` button and look at the slaves. Both the slaves together display the sketch now. What happened was that the 2 canvases were clubbed together to form a larger display. 

You can, of course, open the 2 slaves on two phone screens if you know the ip address of your system.
Inorder to run your sketch with openmosaic, paste it in the /examples folder and repeat step 4.

####That did not work

If you followed the above instructions and you still could not get openmosaic to work, please open a new issue in github. Better yet, fix the problem and make a pull request :)

####Directory structure

1) server.js - Facilitates message passing between the differenc clients, and the backbone of the framework.

2) tools/packer_view.html - Sort of like a control panel. You see the orientation of the total screen on this page and also initiate the sketch by pressing the buttons in here.

3) client_template.html - This page is loaded when you navigate to localhost:8000/slave<insert_a_number_here>. Also contains some framework specific initializations

4) js : contains the various libraries and source files needed and also some demo sketches. I will reorganize the folder into something that makes more sense, but later.

####How it works

The node server calls js/packer.js every time a client connects to it. Packer.js gets the dimensions of the client screen and decides how the screen(s) should be arranged. When another client connects, packer.js is called again. The arrangement of screens can be viewed by navigating to packer_view.html

When you open a slave, the browser windows is automatically passed a copy of the sketch you gave as a command line parameter when you started the server. When you press the start button, the origin of each of these canvases is translated as determined by the methods in packer.js. It contains a rectangle packing algorithm and I got it from Matt Perdeck's [article](http://www.codeproject.com/Articles/210979/Fast-optimizing-rectangle-packing-algorithm-for-bu).

Each client communicates with the server before drawing each frame and the server makes sure that all the clients are synchronized in time.