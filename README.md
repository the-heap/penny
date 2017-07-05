# penny
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
[![first-timers-only Friendly](https://img.shields.io/badge/first--timers--only-friendly-blue.svg)](http://www.firsttimersonly.com/)
[![Twitter](https://img.shields.io/twitter/follow/theheap_.svg?style=social&label=Follow)](https://twitter.com/intent/follow?screen_name=theheap_)
[![](https://slackin-onxcmypksl.now.sh/badge.svg)](https://slackin-onxcmypksl.now.sh/)

> Slackbot to encourage drawing

Welcome to one of THE HEAP's open source projects! For the month of July we're building _Penny_, a Slack chatbot to encourage people to draw more.

This project aims to be as accessible as possible to people who want to contribute to open source code! We've got a few things to go over, so if you're new to Github, or contributing to open source software, take a breather and then read on! You got this. 👌 If you ever feel lost, I recommend you read our [Resources page](https://theheap.us/page/resources).


# Project Description
_Penny_'s goal to is to be a slackbot that can encourage people to draw more. Penny could have several different functions and abilities (outlined in our [roadmap](https://github.com/the-heap/penny/issues/1)). Let's discuss a scenario where Penny could exist and some of it's possible functionality.

## Scenario 1 (aka, MVP 0.1)

- You have a team on slack. You decide you want to spice up your slack-lives by having a new bot. This bot (Penny) will provide *drawing prompts* to you and your team mates. (A drawing prompt is a word or set of words that are, at the most basic level, a suggestion for something to draw.).
- Perhaps, every day, Penny will announce on a slack channel (let's called it `#daily-drawings`) that there is a new prompt for today:
  - Today's prompt is: `a sad unicycle`


## Scenario 1 (aka, MVP 0.2)

- Somehow Penny has to come up with these suggestions, so why don't we help? We'll try and build Penny so that _we can give it prompts_. This way, your entire team can add a prompt to the _prompt database_; and Penny can draw from the database whenever it wants. This way the drawings can be more relevant to your team -- either in a serious or silly way.
- So there you have it! Penny will dispense ideas to draw and your team can also help provide those ideas.

## Scenario 2 (aka, MVP 0.3)

What about the actual drawings your team will do? Is there a way we can share them, or make it so that Penny can display them for us when they are done? Perhaps! (I don't actually know if this is possible yet with the slack api, so that's why it's in our MVP 0.2!). Here's how that might work!

- Your team gets a prompt for today from `#daily-drawing` - it says:
  - Today's prompt is: `Two birds with hats on`
- Everybody goes about drawing their image.
- When done, each team mate will take a photo of their drawing and send it to Penny.
- At the end of the day Penny will post a gallery of everyone's drawing to the `#daily-drawing` channel.


# Getting Started

To contribute successfully to this project it might take a bit of time to setup and become aquainted with both the project itself and how you can best add your contributions. The following steps will inform the code you write and help you make good pull requests.

1. Understanding the [project / product](https://github.com/the-heap/penny/issues/1) and what we're trying to build.
2. Understanding how to [contribute](./CONTRIBUTING.md).
3. When you contribute, you can submit yourself as a contributor to the project so that your work is recognized in the project. See "All Contributors" below for more information.
3. Read Project Components below, for getting setup.

# Project Setup

1. You'll need to [join our slack channel](https://slackin-onxcmypksl.now.sh/) where we'll be building Penny and talking / planning development.
2. Clone this repo!

```
git clone git@github.com:the-heap/penny.git
```

3. Install dependencies

```sh
# change directories to Penny
cd penny

# install libraries and dependencies
npm install

# Boot the project
npm run start

# You will need a special password to run the project! It's called an `environment variable`
# To get this password, join our slack group and ask for it specifically!
# this password let's us boot Penny so that it can connect to slack!
```

# Terminology
The following terminology might help to clarify some aspects of the project.

* *Prompt* A suggestion of something to draw.
* *Prompt Database* A place that stores many prompts.

# Other
* Thanks for being you
* Follow The Heap on [twitter](https://twitter.com/theheap_) and subscribe to our [youtube channel](https://www.youtube.com/channel/UCIaeBxFZOzLA20sSAUENXRg)


## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars3.githubusercontent.com/u/12987958?v=3" width="75px;"/><br /><sub>Tyler</sub>](http://tylersloane.com)<br />[💬](#question-teesloane "Answering Questions") [💻](https://github.com/teesloane/Penny/commits?author=teesloane "Code") [📖](https://github.com/teesloane/Penny/commits?author=teesloane "Documentation") [🚇](#infra-teesloane "Infrastructure (Hosting, Build-Tools, etc)") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
