# FeedHenry Hello World MBaaS Server

<<<<<<< HEAD
This is a blank 'hello world' FeedHenry MBaaS. Use it as a starting point for building your APIs. 

# Group Hello World API

# hello [/hello]

'Hello world' endpoint.

## hello [POST] 

'Hello world' endpoint.

+ Request (application/json)
    + Body
            {
              "hello": "world"
            }

+ Response 200 (application/json)
    + Body
            {
              "msg": "Hello world"
            }
=======
This is a blank 'push hello world' FeedHenry MBaaS. Use it as a starting point for building your APIs.
It supports CRUD operations on Categories that are used in the console and the mobile app as publish/subscribe
for the push notifications of interest.  For more details on using the Push Hello World Template, please consult the [Hello World Push Template](http://docs.feedhenry.com/v3/guides/app_development_push.html) guide.

# Group Push Hello World API

# category [/category]

'api' endpoint.

## category [GET]

'Category' endpoint.

+ Request (application/json)

+ Response 200 (application/json)
    + Body
            {
              "status": "ok"
              "data": ["category1", "category2"]
            }

## category [POST]

+ Request (application/json)
    + Body
        {
            "name": "new category name"
        }
        
+ Response 200 (application/json)
    + Body
            {
                "status": "ok"
                "message": <entity>
            }
            
## category/:name [DELETE]

>>>>>>> branch 'master' of git://github.com/feedhenry-templates/helloworld-cloud.git
