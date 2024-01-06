# Recommendation System for Courses

## Overview

This code implements a recommendation system for courses based on a user's viewing history and category scores. The goal is to provide personalized course recommendations to users by analyzing their past emotional interactions with courses.

## Functionality

The `recommendCourses` function takes a user ID as input and returns a promise that resolves to an array of recommended courses. The recommendation process involves several steps, including fetching the user's viewed courses, calculating category scores, and determining the top courses based on these scores.

## Key Components

### 1. Fetching Viewed Courses

-   The code uses the `UserCourseInteraction` model to fetch all courses that the user has viewed, identified by their user ID.

### 2. Initializing Data Structures

-   Course categories are predefined in the `categories` array.
-   A matrix, `userCoursesMatrix`, is initialized to store user scores for each category.
-   The `notViewedCourses` array is populated with courses that the user has not viewed.

### 3. Calculating Category Scores

-   The code fills the `userCoursesMatrix` by assigning scores to categories based on the user's viewing history.

### 4. Calculating Average Scores

-   Column sums are computed to calculate the average score for each category, stored in `categoryAverageScores`.

### 5. Calculating Course Scores

-   Scores are assigned to not viewed courses based on category average scores, resulting in the `coursesScores` array.

### 6. Determining Top Courses

-   The top 5 courses with the highest scores, without repetition, are identified and stored in the `topCourses` array.

### 7. Removing Duplicates

-   Duplicate courses are removed from the `topCourses` array to ensure unique recommendations.

### 8. Output

-   The final set of recommended courses, `uniqueCourses`, is returned by the function.

## Error Handling

-   The code includes error handling to catch and log any errors that occur during the recommendation process. If an error occurs, an exception is thrown.

## Usage

-   Developers can use this recommendation system by importing the `recommendCourses` function and passing a user ID as an argument.

## Dependencies

-   The code assumes the existence of relevant data models (e.g., `UserCourseInteraction` and `Course`) and requires proper database connectivity.

### Flowchart Core:

<p align="center">
  <img alt="Auth class diagram" src="/docs/core/flow-chart_core.png" />
</p>

### Sequence Diagram Core:

<p align="center">
  <img alt="Auth class diagram" src="/docs/core/sequence_core.png" />
</p>
