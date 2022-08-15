# scandiwebInterview

This is a website for Scandi Web, made by React JS. I followed the figma design they provided me. and that is the result :smile:

## to run the project
1. Clone the repository to your local machine
2. Oen the repo in your text editor
3. split your terminal to 2 sessions, on in the server folder and the other in the client Folder
4. Type `npm i` in each terminal session 
5. Type `npm start` in each terminal session, it should display the project in Port 3000 and the graphql server in 4000

## Project Features:
- PLP - product listing page, a.k.a. category page
- PDP - product description page, a.k.a. product page
- Cart page + Cart overlay 
- Ability to add/remove products and change their amounts in cart - on the cart page itself, PLP and PDP should be provided.
- For products that have various options (attributes) - the options should be selected.
- The selected options of added to cart products should be visible in cart overlay and in cart page.
- If an attribute is a swatch attribute (type = swatch), a representation of the value should be rendered on PDP and PLP, rather than text description (e.g. the color itself, not "Blue" or "0000FF")
- Filtering products by category name for all of the categories from BE
- The descriptions provided in HTML format should be parsed and presented as HTML, not as plain text
- Ability to change the currency of the store to one of the available currencies

## What I learned:
- How to use GraphQl both in functional and class components.
- How to use Class component, As I haven't used them before.
- Lifecycle methods of react and How to deal with API calls and API changes.
- Promises and how to use them and assign their results to variables.
- The basic Features needed in e-commerece sites.

## What I struggled with:
- The main struggle was to figure how to use lifecycle methods specially componentDidUpdate() :triumph:
- Using the deprecated Query compoenent of the Apollo Client.


### Overall I am very happy of this project which benefited me greatly and I would like to work with Scandi Web
