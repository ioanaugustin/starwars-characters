# starwars-characters
This project is a Star Wars character viewer featuring pagination and persistent client-side caching, ensuring efficient data retrieval even after page reloads. Additionally, it includes a character detail page with editable fields, outputting form data to the console upon submission.

This application implements a Star Wars character viewer with the following features:

Display Star Wars Characters Table: Create a table that displays a list of Star Wars characters fetched from the /people endpoint of the Star Wars API.
Pagination: Implement pagination to allow users to navigate through different pages of the character list.
Client-side Caching: Store the character list data on the client side. When a user navigates through pages that have been loaded previously, the data will be retrieved from the cache instead of making additional API requests. The cache will persist even after the page is refreshed.
Character Detail and Edit: When a user clicks on a character's name, open a detailed page in edit mode. Upon submitting the form, the form data will be output to the console.
