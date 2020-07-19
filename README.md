
# Pomoplan

Pomoplan is a [Next.js](https://nextjs.org/docs/getting-started) app built with
productive and healthy task management in mind. The goal of Pomoplan is to help
you stay healthy and work smart by taking breaks to reset your mind and staying
focused during interval-based work sessions.

[Pomoplan Live](https://pomoplan.vercel.app/)

## Inspiration

The application was inspired by wanting to experiment with
[React-DnD](https://react-dnd.github.io/react-dnd/about) and my personal goal to
work on self-care by adding structured breaks into my task-based work schedule.
The balance between the break timer and work session timer is based on the
[Pomodoro technique](https://en.wikipedia.org/wiki/Pomodoro_Technique).

## Features

Each work session (known as a _pomodoro_) can be between 20-30 minutes. The
break following each pomodoro will be either 5 or 10 minutes. The first three
pomodoros are followed by a 5 minute break, while the fourth pomodoro is
followed by a 15-30 minute break. You can choose the length of your pomodoros
(20-30 minutes) and the length of your fourth break (15-30 minutes).

## Installation

1. Clone this repository to your local machine.
2. Install the project dependencies.
  ```sh
  $ npm install
  ```
3. Run the application in development mode.
  ```sh
  $ yarn run dev
  ```
