# Tecky App

## Overview

Tecky is a full CRUD app designed for developers and engineers offering them tools such as canvas to help them with the wireframing, journal to add what skills they learned, and the ability to create events as well as attend events created by other users.

## [Tecky App Live Site](https://techjournalclient.herokuapp.com/dashboard)

## Technologies Used

- Node.js, Mongoose, Express, React, HTML5, and CSS
- Visual Studio Code, MongoDB, Heroku, and Trello.
- Google Maps API

## Features

- Authorization (user dashboard, user journal entries, user events, will attend events)
- Google Maps to show events nearby a user in the dashboard
- 4 different models where we use one to one relation to reference the models to the user model
- Canvas to allow users to wireframe

## User Stories

# Journal Entries

As a user I can:

1. create a new journal
2. edit/update a journal
3. delete a journal
4. view all created journals by the user

# Events

As a user I can:

1. create a new event
2. delete an event
3. view all events I created
4. view all events created by other users
5. participate in an event created by other users
6. see a google map for nearby events

# Canvas

As a user, I can

1. draw on the canvas

# Skills

As a user, I can

1. see the skills I added through entries
2. add skills as I write in my journal entry
3. delete a skill if I needed to

## Future Development

- Allow users to save their wireframes to the database and make it accessible to see on the dashboard
- Allow users to edit/update events they created
