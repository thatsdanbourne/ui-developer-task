# RMP Enteprise UI Developer Task

*A task that devs can complete to show us their skills when it comes to javascript, UI development and a Javascript framework.*

## Overview

In this repo you will find a rough wireframe of a search results page similar to 
the [search on RateMyPlacement](https://www.ratemyplacement.co.uk/search?show=jobs).

The mission, if you choose to accept it, is to fill in the missing parts and finish the application to 
the best of your ability.
    
How you do this is completely down to you and we have only provided the bare bones.

There is no right or wrong approach, however we don't want you to rely too heavily on third party 
libraries for the notifications or side panel.

Although this is a relatively small task we believe there is enough here for you to be able to demonstrate your
ability to follow good coding practices, show your understanding of state management and a Javascript framework.

Ideally we would want the task completed with Vue.js and vuex as we use those technologies in our stack, 
but we are open to the tasks being completed in React or Angular. Feel free to choose the stack that you are most comfortable with.

Oh and there may be some *deliberate* errors in the code... Enjoy

## Getting Started

This repo is based on [vue-webpack-template](https://github.com/vuejs-templates/webpack).

- run `npm install` in the project root
- run `npm run dev`, this boots the webpack dev server that handles serving the vue templates and hot reloading
- run `npm run server` in a separate terminal window, this boots a fake express based api used to populate the search results
- visit [http://localhost:8080](http://localhost:8080)
- see ./src folder for base components we have provided

In you want to use a React or Angular template/boilerplate feel free.

## What we expect

- Use of ES6 
- A focus on the javascript and interactions rather than styling and presentation
- A focus on how you manage state and pass it around the system

## What we would like to see
- [ESLint AirBnB](https://github.com/airbnb/javascript) compilant code 
- CSS written in [SUIT style](https://github.com/suitcss/suit) or similar

## Scenarios to address

We've provided some scenarios detailing how the current shortlisting of jobs and following of companies 
works on RateMyPlacement. For each scenario we've provided a short video of how the feature currently works.
If you want to solve the same scenarios in a different way we'd love to see your take on what would make 
a great user experience for our users.

The below scenarios assume:

- You are already logged in
- You haven't shortlisted or followed anything yet

1. Clicking the shortlist button (heart icon) should notify the user that the item has been successfully shortlisted.
    - https://www.useloom.com/share/b89e071562f54bf5852abd42bfe011d9
    - consider what happens when you quickly click multiple hearts in a short period of time
    - consider how you would show these notification on mobile
2. Clicking an already shortlisted button should notify the user that the item has been removed from their shortlists
    - https://www.useloom.com/share/dda00c18b47b4b59b7280512ae704ea8
3. Job shortlisting notifications should show a button that allows a user to follow a company associated with that job
    - clicking the follow button adds the company to the users saved followed companies
    - https://www.useloom.com/share/33fb5dda6de245cea4e17745426201f2
4. When shortlisting a job or following a company the count in the header updates
    - https://www.useloom.com/share/8239e135637c454d8ab5a978ea9d404a
5. Click the count in the header opens a side panel detailing the items the user has already shortlisted.
    - consider how this side panel would function on mobile
    - https://www.useloom.com/share/81585c1711ea409590cb7f13655c0914
6. Removing items from the side panel
    -  Each item should be removable from the side panel
    - https://www.useloom.com/share/eb93e888fdd8488ea071494b945f4909
7. Filtering items in the side panel
    - you should be able to filter the items in the side panel by all, jobs or companies.
    - https://www.useloom.com/share/5d8f3c3af6bb4dbbad68c67396683122    
        

**Well that was easy...**

If time allows and you want to really impress us consider adding the following additional functionality.

- Persist the shortlisted items locally so the shortlisted items are available when you refresh the page
- Use a state management library to centralise the shortlisted items
- Additional styling and animations to bring the UI interactions to life
- Mobile interactions and adaptations
- Browser support down to IE10