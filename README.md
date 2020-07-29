# Nixon Reviews Component

* This application is my contribution to the replication of the website www.nixon.com. I have built the review component. You will be able to choose a random item and view the randomly generated reviews for each product. You will be able to view the average rating of the reviews, filter by review rating(s) and even write your own review!

* To start the app, please run the follow commands in three separate terminals:
  1. npm run seed
  2. npm run build
  3. npm run start

* You should then be able to open the webapp on localhost:1738

![Before Adding the ID](/pre-id_image.png)

* From the terminal where you ran 'run run seed', copy a random _id (it will look something similar to _id: 5f20eafd87ebd2245e2e4dcd).

* Then, paste that id on line 38 of client/src/component/App.jsx. This should be where it says: this.productid = **place id here**

* You will now see a product with its given reviews

![After Adding the ID](/post-id_image.png)