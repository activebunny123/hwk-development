# Development

### Link to Deployed Website: https://activebunny123.github.io/hwk-development/

### Goal and Value of the Application
This application is designed to be a menu page for a dim sum restaurant. 
The goal of the application is to provide customers a clear display of available items, allowing customers to filter for desirable items, and utilize the cart feature to calculate their purchase.
In particular, the application allows the customers to filter items by cooking method, taste, and sort by name and price. This helps the customers with their decision-making process and making the ordering more efficient. Additionally, the cart has the feature where, for each item in the cart, the customer can add and remove instances, and even delete all the instances. This allows the customers to make immediate adjustments to their cart without having to do redundant tasks.

### Usability Principles Considered
#### Learnability
The application is beginner-friendly in that every filter and sort functionalities are clearly named and labeled. Also, any buttons such as "add to cart" or "remove from cart", or simply "+" and "-", have very clear label on them. In addition, the cart is designed to be similar to the existing convention so that the first-time customers can easily apply their experiences from elsewhere.
Moreover, the design of the application emphasizes logical layout and hierarchy. The name of the restaurant is at the top, followed by filtering & sorting, and then it's divided into menu and shopping cart, where the menu takes up more space than the cart. Also, the application has a clear hierarchy where the size of texts indicate their order in the hierarchy. Each item in the shopping cart is followed by a gray line separating two items, enhancing readability. 
#### Memorability
The returning customers should find the application easy to use because every component is clearly labeled and follow the conventional organization and functionality.
#### Usability
The application is highly usable in that it helps customers to achieve their goals easily. The filtering and sorting functionalities easily stack up, and there is a message displayed in case a specific combination of filters yield no items. Also, the customers can easily add or remove from carts without redundant maneuvers, and the total price is clearly displayed.

### Organization of Components
There are three major applications of the components: filtering & sorting functionalities, menu items, cart items.
#### Filtering & Sorting
At the top of the page, there are 4 filtering & sorting functionalities, and each of the individual filter / sort is a component from Material UI. The "select cooking method", "select taste", and "sort by" are radio select components. I chose radio select because it enforces selecting one property at a time, which corresponds to the design of items. The "select price range" is a filter based on price, and it is a slider component. I chose slider because it allows relatively easy adjustment of discrete min & max without having to type in numbers.
#### Menu Items
Each menu item is a component that contains the item image, name, price, and filtering categories.
#### Cart Items
Each cart item is a component that contains the item name. 

### How Data is Passed Down Through Components
data is passed into components via props.
For filtering, I have created arrays containing the filter categories, and each category is the prop that passed into the component.
For menu and cart, I have created two states called displaydata and cartstate. Displaydata is a mutable copy of the original data stream that contains 12 instances of dimsum items, and each instance in the displaydata is the prop that passed into the component dimsumItem. The cartstate has a key called cartitems, which is an array that contains instances of items that should be stored in cart, and each instance of this arrary is the prop that passed into the component cartItem.

### How the User Triggers State Changes
The user trigger state changes by using interactive components on the application. 
Each filter & sort correspond to a state that stores which filter/price range the user selected. The user changes that state by selecting different filter options and changing the range of the price slider.
The menu display corresponds to the displaydata state, and this state is changed when the user hit the "apply filter" button at the bottom of the filter section, when all the filter & sort would be applied to the existing state, and set it to a new, modified state that reflects the changes.
The cart corresponds to the cartState state, which is changed when the user add/remove item(s) from the cart, whether by using the "add to cart" button under each menu item, or by directly operating in the cart section.
