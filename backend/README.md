# eBeauty Backend Documentation

To run project by starting both frontend and backend concurrently, use: `npm run dev`.

To run server, use : `npm run server`, under backend folder.

To run client, use : `npm start`, under frontend folder.

Note: you have to do `npm install --legacy-peer-deps` if it's first time running the project. Also, have your `.env` file created under backend folder. 

why `--legacy-peer-deps`? there's issue between dependencies of:
    "multer": "^1.4.5-lts.1",

    "multer-gridfs-storage": "^5.0.2",

there's a issue page and PR to solve it, but currently issue is there: 

github link: https://github.com/devconcept/multer-gridfs-storage/issues/490

## .env file

In order to store sensitive informations, we've decided to not upload this file to github, you have to create one file named ".env" under backend folder, and paste the content inside discord resources channel to it. 

`MONGO_URI` is used to connect to database, and `JWT_SECRET_KEY` is used to salted hash the password. The client id is used for Paypal payment.

## MongoDB Database

If you want to see data in mongodb, we are using MongoCompass that can be downloaded to desktop. Use this url to paste into it once downloaded and opened:
(whole correct url is inside resources channel inside discord, replace it with that)
`mongodb+srv://(username):(password)@amor.f6fwapf.mongodb.net/Amor`

Amor is the default database we are going to use for this project.

## Seeder

Use seeder to import and destroy data to the database

- Create the yourdata.js file under data folder in the backend
- Import yourdata.js file and related yourdataModel.js file in the seeder.js
- Under importData() add:
    - await yourdataModel.deleteMany(); // clear all data first before import
    - await yourdataModel.insertMany();
    - you can write more code for maping the data and adding a ref to them, just like I did,
    - you can also choose not await yourdataModel.deleteMany() if your want to always keep it, but if run destroy, those will be deleted 
- Under destroyData() add:
    - await yourdataModel.deleteMany(); // clear all data
- In the terminal:
    - node seeder -i // importData
    - node seeder -d // destroyData  

<!---
## Testing Backend API Endpoints

An easy way to test the api is just to go to url: i.e. `localhost:5000/api/posts/`

However, there is a better way to do it using postman. Select GET method, and go to url: `localhost:5000/api/posts/`. or select POST method, and go to url: `localhost:5000/api/providers`

Since test results depend on the .env file, make sure your env file contains the correct database url, and the correct token.
-->

# APIS

All the endpoints can be tested using Postman in the form such that `http://localhost:PORT_NUM(/api/customers/END_POINTS)`(our backend port num is 3001)

+ [Customer](#customers-api-endpoints-apicustomers)
+ [Provider](#providers-api-endpoints-apiproviders)
+ [Post](#post-api-endpoints-apiposts)
+ [Reviews](#reviews-api-endpoints-apireviews)
+ [Order](#order-api-endpoints-apiorders)
+ [Calendar](#calendar-api-endpoints-apicalendars)
+ [Image](#file-image-api-endpoints-file)
+ [Issues](#issue-api-endpoints-apiissues)


## Customers API Endpoints (/api/customers)

### GET /api/customers

We can retrieve all customers registered in this app.

### GET /api/customers/getDefaultAddress

We can retrieve the default address of the customer currently logged in.

### POST /api/customers/register-customer

We can let new customers register into the app with the input data provided by them. 

In postman, send the request to `http://localhost:3001/api/customers/register-customer` with the request body of:

```
{
    firstName: "James",
    lastName: "Jo",
    email: "james@gmail.com",
    password: "123"
}
```

### POST /api/customers/login-customer

We can let existing customers log into the app checking the credentials from DB.

In postman, send the request to `http://localhost:3001/api/customers/login-customer' with the request body of:
```
{
    email: "james@gmail.com",
    password: "123"
}
```

### PATCH /api/customers/:customerId

We can change the data of existing users using customerId.

### PATCH /api/customers/updateDefaultAddress

We can update the default address of the logged in user.

### DELETE /api/customers/:customerId

We can delete the data of a customer using customerId.

## Providers API Endpoints (/api/providers)
### POST /api/providers

purpose: create/signup provider's account

open postman, select POST method, paste url below to postman's url:

localhost:3001/api/providers 

and with raw json body like:
{
    name: '1',
    title: 'Nail Technician',
    address: '2',
    city: '3',
    state: '4',
    country: '5',
    email: '6@gmail.com',
    phone: "7",
    password: "8",
    imageFilename: "9.jpg",
    individual: "no",
    totalRating: 50, 
    ratingPopulation: 10,
    isAdmin: false,
}

### POST /api/providers/login

purpose: sign in provider's account and gain a new token

open postman, select POST method, paste url below to postman's url:

localhost:3001/api/providers/login

and with raw json body like:
{
    email: '6@gmail.com',
    password: "8"
}

### GET /api/providers
get all providers in database

### GET /api/providers/:id
get a provider detail info by providing id in url parameter

## Post API Endpoints (/api/posts)

### POST & GET /api/posts
purpose: post and get posts maded from providers

open postman, paste url below to postman's url:

localhost:3001/api/posts

- POSTING POST: 

for posting post, you need token from service provider. 

It is provided by either create method or you can use the login function mentioned above to get a new one. (if token has not expired, all old and new tokens should work. Right now token is set to be 30 days expiration)

go to Authentication in postman, select Bearer Token, and paste that token inside, select post method and paste content inside raw json body: 

{
"postText": "some content here"
}

and click send, if postman respond with post details then it works.

- GETTING POSTS: 

for getting posts, need nothing for json body, and no need for token, just select GET method and click send, should return all existed posts inside database. 

### UPDATE AND DELETE /api/posts/(post id)

open postman, paste url below to postman's url:

localhost:3001/api/posts/(post id)

- DELETE POST
select delete method, 

go to Authentication in postman, select Bearer Token, and paste provider's token inside. 
paste the post's id to the url (id can be gained by GET method mentioned above, note that if provider is not the one posted, then modification of the post would failed). 

click send, if postman respond with just a line of id:(post id), then it works. 

- UPDATE POST
localhost:3001/api/posts/(post id)

the setup steps are same as delete post, it's just you have to provide the new data you want to update for post inside raw json body: 

{
"postText": "some content here"
}

## Reviews API Endpoints (/api/reviews)

### GET /api/reviews

We can retrieve all exisinting reviews stored in the app.

### GET /api/reviews/:reviewId

We can get a specific review searched by reviewId parameter.

### POST /api/reviews

We can save a newly created review into the DB.

In postman, send the request to `http://localhost:3001/api/reviews/` with the request body of:

```
{
    customerId: _customerId,
    providerId: _providerId,
    content: "This is test review",
    rating: 5
}
```  

### PATCH /api/reviews/:reviewId

We can update the data of review searched by reviewId parameter.

### DELETE /api/reviews/:reviewId

We can delete a specific review searched by reviewId parameter.

## Order API Endpoints (/api/orders)

Order API endpoints manage all API endpoints related to customer orders or appointments booked on the website.

### POST /api/orders

So far, we only manage to save order data from Checkout pages where customers provide their address and credit card information.

In postman, send the request to `http://localhost:3001/api/orders` with the request body of:

```
{
    firstName: "Tim",
    lastName: "Cook",
    address: {
        addressOne: "123 Flower Road",
        addressTwo: "Unit 101",
        city: "Toronto",
        province: "ON",
        postalCode: "M1TA8K",
        country: "Canada"
    },
    payment: {
        nameOnCard: "Tim Cook",
        cardNum: "1239203938310192",
        expiryMonth: "09",
        expiryYear: "24",
        cvv: "393"
   }, 
   calendar_id: "62eb74f2ffacdf80996cd2a1"
}
```        

## Calendar API Endpoints (/api/calendars)

purpose: setup the calendar of provider that both provider and customer can view and do modification on it. 



### GET /api/calendars

get all calendars in DB

### GET /api/calendars/calendar

get all calendars of one provider

### GET /api/calendars/timeslot/:id

get the detail of a timeslot with timeslot's id

### GET /api/calendars/timeslot/:id/:start

gets the timeslot id using the id of the task provider and start time of the timeslot

### PATCH /api/calendars/timeslot/:id

updates the timeslot with a new customer id

### DELETE /api/calendars/timeslot

deletes the timeslot with given timeslot id

### POST /api/calendars

the way we do calendar is we store the used time slot of provider
open postman, select POST method, paste url below to postman's url:

localhost:3001/api/calendars

and with raw json body like:
{ 
    "providerId": "62c4a04b62f327868e4055c3", 
    "startTime": "2021-01-15T06:31:00" , 
    "endTime": "2021-11-15T06:31:00", 
    "title": "some reservation title", 
    "rest": false 
}

Note: there are three feild that are not necessary to input, customerId, title, and rest, and both providerId and customerId are mongoose.Schema.Types.ObjectId

## Image API Endpoints (/file)

this api is used for uploading images to mongodb using GRIDFS, thus we don't really have a schema of it in backend
- POST METHOD

### POST /file/upload

to do post of this inside postman, first have this paste for URL: 

localhost:3001/file/upload

and then select post method, go -> body -> form-data, under key field select file, and upload image inside value field, type "file" under the key field

### GET /file/(filename)

if you just did the post above, there's a URL returned with key named "data", just copy yhe url and paste it in browser, you would be able to view that. 


example: 

http://localhost:3001/file/1657922009407test1.jpg


### DELETE /file/(filename)

It would be combination of two methods above, you select delete method in postman, then send the url with the example a few lines above. 

## Issue API Endpoints (/api/issues)
### POST /api/issues/post-issue

to do post of this inside postman, first have this paste for URL:

localhost:3001/api/issues/post-issue

and with raw json body like:
{ 
    "name": "test", 
    "email": "test@gmail.com" , 
    "issue": "this is a sample issue"
}


### allen's note: 
+ while building this app up, I'm using a new tutorial in youtube that teaches me how to connect to MongoDDB Atlas. so if you have difficulty to understand the structure, you may look at the video to have a clearer idea. 

link: https://www.youtube.com/watch?v=-0exw-9YJBo&list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm&index=1&ab_channel=TraversyMedia


(First 2 videos are pure backend, last 2 are frontend + deploy + some code connect backend to frontend(4th 45:00))


+ For the context that related to user logged in and class gather user's info, I use this tutorial as a lesson to learn how to accomplish that: 

link: https://www.youtube.com/watch?v=oUZjO00NkhY&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd&index=4&ab_channel=DaveGray


+ For database, we're connecting to DB in mongodb cloud storage called Atlas, if anyone want to change it to something else, feel free. 

## not a official github but current structure:
<pre>
NOTE: currently we go 

server.js 
          -> db.js to connect to mongodb

          -> calendarRoute.js -> calendarController.js -> calendarModel.js
          -> customerRoute.js -> customerController.js -> customerModel.js
          -> imageRoute.js
          -> orderRoute.js -> orderController.js -> orderModel.js
          -> postRoute.js -> postController.js -> postModel.js
          -> providerRoute.js -> providerController.js -> providerModel.js
          -> reviewRoute.js -> reviewController.js -> reviewModel.js
          -> issueRoute.js -> issueController.js -> issueModel.js

          -> seeder.js -> data -> (files that are having sample data, insert by using seeder.js)

          -> authMiddleware.js (authenticate provider)
          -> errorMiddleware.js (handle showing error)
          -> upload.js (use for create bucket of gridFS)
</pre>
