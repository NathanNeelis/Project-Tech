![logo friendship](https://raw.githubusercontent.com/NathanNeelis/Project-Tech/master/Styleguide/guide/Friendship_logo-full-RGB_2.jpg)

## Description

Friendship is a dating service, not meant for romantic relationships but for friendships. Do you feel alone sometimes and would you like to get in touch with people that have the same interests as you? Then Friendship is here to help! With friendship you’ll create a profile with your interests, for example, going to the gym, playing board games, or videogames, or gardening. After you have created your profile, you’ll be able to search other profiles for specific interests. Let’s say you would like to play a board game, in the filter function you will let our database know to filter out people that are also interested in board games. When you find some suitable matches based on age, location, you can get in contact with other “board gamers” and see if they’re up for a game.

## Job story

**When** I'm bored at home, at the beginning of the evening, watching cooking shows on Netflix, while I'm already done with all my homework  
**I want to** find people that have the same interests as me  
**So I** can ask them if they want to do something fun that is in both our interests.

## The application

![Screenshots of early app version](https://github.com/NathanNeelis/Project-Tech/blob/master/Styleguide/app/app.jpg)

## Status

At this moment this is a work in progress.
My goal is:

- The application is responsive **Must have**; **DONE**
- To create a working filter function **Must have**;
- a register form that creates users in a database **Could have**; **DONE**
- User profiles **Must have**; **DONE**
- To be able to update/change your user profile **Must have**;
- The application should be accessible **Should have**;
- The application is build according to the progressive enhancement theory **Must have**;
- dynamic pages that are rendered by templating and data from the database **Must have**; **DONE**
- It would be cool if user could login **Wont have**;
- Users should be able to send messages to eachother **Wont have**.

for more information about my goals please visit my [wiki's requirement list!](https://github.com/NathanNeelis/Project-Tech/wiki/Requirement-list)

## Getting started

In this project, I used node.js and NPM to install packages.  
To install all the packages registered in the package.json file run the code below after downloading this project.

    npm install

#### This will install the following packages:

**Dependencies**

- [body-parser](https://www.npmjs.com/package/body-parser)
- [camelcase](https://www.npmjs.com/package/camelcase)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [ejs](https://www.npmjs.com/package/ejs)
- [express](https://www.npmjs.com/package/express)
- [mongodb](https://www.npmjs.com/package/mongodb)
- [multer](https://www.npmjs.com/package/multer)
- [slug](https://www.npmjs.com/package/slug)

#### I also used the following packages while coding:

**Dev dependencies**

- [eslint](https://www.npmjs.com/package/eslint)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [prettier](https://www.npmjs.com/package/prettier)

### Templating engine

In my Friendship app, I made a lot of use of the templating engine EJS.  
I choose to use EJS because of its documentation on how to get started.  
I checked out a few others like handlebars and pug but in the end, I felt most comfortable with EJS.  
The way of coding in EJS made a lot of sense to me and actually stood a bit out from the regular coding.  
For example, while using handlebars, you have to use the accolades but I felt that it was to close to my javascript coding.

In the view folder, you will find my main pages like index, profile, register, and search.  
These pages are build out of includes. Smaller bits of code that you will find in the folder **"includes"**.

![EJS](https://i0.wp.com/frontnet.eu/wp-content/uploads/2020/04/Javascript_Embedded.png?w=526&ssl=1)

### Linter

I choose to use ESlint to set up a few rules for coding:

- Always use a semicolon;
- Always use "double quotes";

Thereby I am using prettier to make my code look prettier!

My linter is a work in progress because this is the first time that I am using it.  
Along the way, I might add more rules and update this readme.

![Prettier](https://media1.tenor.com/images/8499d1a678b3ec4ce365044239f7b2bf/tenor.gif)

## Dataflow

## Setup

Just extra, but I thought it would be fun to inform you about my setup.  
I'm using Visual Studio Code as my code editor. I prefer VSC because of the integrated terminal and split-screen options.  
To make my life easier I installed a few extensions, they are listed below:

#### Extensions

- Material theme
- Material Icon theme
- Bracket pair colorizer
- Indent-rainbow
- Auto Rename Tag
- Prettier

#### Screenshot

![image](https://raw.githubusercontent.com/NathanNeelis/Project-Tech/master/Styleguide/editor/editor_nathan.png)

## Wiki

Alot of research has been documented in the wiki of this repository.  
Are you interested in my research, design choices or learning progress?  
[**Check out my wiki here**](https://github.com/NathanNeelis/Project-Tech/wiki)

## License

[MIT](https://github.com/NathanNeelis/Project-Tech/blob/master/LICENSE)

## Resources in readme

Tenor. (n.d.). Prettier [GIF]. Retrieved from https://media1.tenor.com/images/8499d1a678b3ec4ce365044239f7b2bf/tenor.gif  
EJS. (n.d.). Logo EJS [Logo]. Retrieved from https://i0.wp.com/frontnet.eu/wp-content/uploads/2020/04/Javascript_Embedded.png?w=526&ssl=1
