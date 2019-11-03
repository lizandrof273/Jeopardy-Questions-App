# Jeopardy-Questions-App

# Project - Capital one Jeopardy Generator

Jeopardy Generator is a web app that is both friendky to large screens and mobile devices. It allows a user to search the large catelog of Jeopardy questions with some ways to filter through the questions. These filters include difficulty, time frame, and category.

Link to Website ().

The app utilizes [jservice REST API](http://jservice.io).

## User Stories


* [x]	User can **search by difficulty**
* [x]	User can **search by category**
* [x]	User can **search before a date**
* [x]	User can **search after a date**
* [x]	User can **search by a specific date**
* [x]	User can **search by all above together**
* [x]	User can search for random questions when they do not input anything.
* [x] User is displayed question and answer
* [x] User is displayed lists to select prefrences
* [x] User can switch between two different layouts depending on the size
* [x] User can switch between tabs in both layouts
* [x] User can learn about Jeopardy and the Generator

Possible duture features:

* [ ] Look like a game board
* [ ] Make playable game
* [ ] Keep users favoritaes on a tab
* [ ] Expand the categories


## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='https://github.com/lizandrof273/Jepordy-Questions-App/blob/master/jeopardyGen.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with [LiceCap](http://www.cockos.com/licecap/).

## Notes

This web application was fun to build and a great expirnece. I learned a lot becuase I had not done both the front end and backend on a web application like this. I enjoyed building how it would look and how it changes forms from large to small. At first this web application was a little tricky to understand but was not to hard to understand. I faced many bugs but I have refined the application and now there are not any large bugs. There are to many bugs to discuess but one of them was when the user selects the airdate and unslects it would still add itself to it's search results. I was making sure there were no typos in my unordered list and where it was being called. However everything seemed to be fine because it was zero, meaning that it should have no prefrence. It turns out becuase I set the before and after dates to the single day. So when it would search with other results the before and after were not what the user wanted. I kept extra var with what they were before changing them and after getting the url I changed them back. This was overal a fun project to work on.

## License

    Copyright [2019] [Lizandro Franco]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
