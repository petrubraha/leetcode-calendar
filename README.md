# LeetCode-Calendar

Sync LeetCode submissions to Google Calendar for spaced repetition.

## Problem

Spaced repetition of a (Javascript) event. This project can be extended to cover any event type. Example: a LeetCode submission.

The tech industry expects thier engineers to be up to-date with DSA problems. Finding, understanding, and solving them takes time. What is the next step after completing a very hard problem? Never doing it again? Planning to redo, but struggle to keep the pace of all the problems that you solve?

## Solution

Installing this Chrome extension will watch for LeetCode submissions and publish to your selected calendar repetition events. Their goal is to remind you to solve the problem again after a certain amount of time.

The MVP consists on an event listener over LeetCode submissions and a Google Calendar API integration. The events created will contain a url to the problem solved.

### Features

- Google Calendar - spaced repetition event creation

### Setup

1. Connect with LeetCode
2. Connect to Google Calendar
3. Choose calendar
4. Solve a problem

### Intervals

After solving a problem, sequent reviews will be required:

| Review Number | Solution Number | Days After First Solution | Days Increment |
| :-----------: | :-------------: | :-----------------------: | :------------: |
|       1       |    2 (1 + 1)    |             1             |       1        |
|       2       |    3 (2 + 1)    |             3             |       2        |
|       3       |    4 (3 + 1)    |             7             |       4        |
|       4       |    5 (4 + 1)    |            14             |       7        |
|       5       |    6 (5 + 1)    |            28             |       14       |

Totalling 7 solutions for a single problem.

Solving a problem ahead of time.

## Future

- Spaced Repetition Algorithms - 

- yearly repetition?
- random repetition?
- 1, 2, 3, 5, 7 method?
- discover new problems?
- neetcode? hackerrank?
- anki?

### Algorithms

Solving a task should relax the time constraints.

- Leitner system
- Neural network based
- The SM family of algorithms
- The DASH
- SSP MMC
