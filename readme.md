### API DOCUMENTATION

# Online Tutoring App

### info : 
    title : Online tutoring app
    description : The online tutoring app API is built for the task 4 of the node js track of start.ng 2020.
    All requests and responses with this API use the JSON format.
    Authentication is with JWT tokens which are persisted as cookies to ensure good user experience. 
    
`base path`  : 
#### Endpoints :
* **All users can retrieve a subject in a category by id**
    `GET` /category/:category/subject/:id
    > Note : no authentication is needed for this route
    
    To allow for testing purposes the category 'sss' has been created 

    **URL parameters**
    name |type   | description
    --------|--------|---------
    category |String | ***Required** : This parameter  describes the name of the category of subjects to be retrieved
    id | ObjectId | ***Required** : This parameter describes the objectId of the subject 

    **Request Body parameters**  
    `NONE`
    
    **Responses**
    * Success Response :
    status : 200 Ok
    content : 
            ```{
                "message" : "success",
                "success" : true,
                "subject" : {
                    subject details
                }
            }
            ```
            
    * Error Response
    status: 400 
    This would be a response if the required parameter ID is not a valid ID 
    content : 
            ```{
               message : "This url requires a valid Id for the subject",
                success : false,
                status : 400
            }
            ```
             **OR**
            
        status: 404
    This would be a response if the category provided as parameter does not exist or the subject with Id is not found
    content : 
            ```{
               message : "Subject not found,Try a valid Id ",
               or "message" : "category not found.Try a 'sss','jss' or primary"
                success : false,
                status : 404
            }
            ```
* **All users can retrieve the subjects in a category**
    `GET` /category/:category/subjects
    > Note : no authentication is needed for this route
    
    To allow for testing purposes the category 'sss' has been created 
            
    **URL parameters**
    name |type   | description
    --------|--------|---------
    category |String | ***Required** : This parameter  describes the name of the category of subjects to be retrieved
    
    **Request Body parameters**  
    `NONE`
    
    **Responses**
    * Success Response :
    status : 200 Ok
    content : 
            ```{
                "message" : "subjects found",
                "success" : true,
                "subjects" : {
                    subjects in category 
                }
            }
            ```
            
    * Error Response: 
    status: 404
    This would be a response if the category provided as parameter does not exist 
    content : 
            ```{
                "message" : "category not found.Try a 'sss','jss' or primary"
                success : false,
                status : 404
            }
            ```
    
* **All users can retrieve the categoies available**
    `GET` /categories/
    > Note : no authentication is needed for this route
    
    **URL parameters**
    `NONE`
    
    **Request Body parameters**  
    `NONE`
    
    **Responses :**
    * Success Response :
    status : 200 Ok
    content : 
            ```{
                "message" : "categories found",
                "success" : true,
                "categories" : [
                    categories  available 
                ]
            }
            ```
            
    * Error response
    we do not expect anything to go wrong here but if there is an error its most likely from us so a 500 status code is expected
    status : 500
    content : 
            ```{
                "message" : the error message,
                statusCode : the status code
            }
            ```
            
* **All users can search for a subject by name**
    `GET` /subjects?name=[name]
    > Note : no authentication is needed for this route
    
    The returned subjects are arranged in ascending order
    **URL parameters**
    `NONE`
    
    **Request Body parameters**  
    `NONE`
    
    **query parameters :**
    name |type   | description
    --------|--------|---------
    name |String | ***Required** : This parameter  describes the name of the subject to be searched
  
     **Responses :**
    * Success Response :
    status : 200 Ok
    content : 
            ```{
                "message" : "success",
                "success" : true,
                "subject" : {
                    subject details
                }
            }
            ```
  * Error Response
    status: 400 
    This would be a response if the required parameter 'name' is provided in query or if empty string is provided
    > Note that if the query parameter is omitted,another route is visited
    
    content : 
            ```{
               message : "url requires a query parameter 'name' of subject",
                success : false,
                status : 400
            }
            ```
             **OR**
             
    status: 404
    This would be a response if the subject with provided name is not found
    content : 
            ```{
               message : `Subject with name ${name} not found`,
                    success : false,
                    status : 404
            }
            ```
            
* **All users can search for a subject by name**
    `GET` /tutors?first_name=[first_name]
    > Note : no authentication is needed for this route
    
    The returned tutors are arranged in ascending order
    **URL parameters**
    `NONE`
    
    **Request Body parameters**  
    `NONE`
    
     **query parameters :**
    name |type   | description
    --------|--------|---------
    name |String | ***Required** : This parameter  describes the name of the tutor to be searched
  
     **Responses :**
    * Success Response :
    status : 200 Ok
     content : 
            ```{
                "message" : "success",
                "success" : true,
                "subject" : {
                    tutors details
                }
            }
            ```
            
    * Error Response
        status: 400 
    This would be a response if the required parameter 'first_name' is not provided in query or if empty string is provided
    > Note that if the query parameter is omitted,another route may be visited
    
    content : 
            ```{
               message : "url requires a query parameter 'first_name' of tutor",
                success : false,
                status : 400
            }```
                        **OR**
    status: 404
    This would be a response if the tutor with provided first_name is not found
    content : 
            ```{
               message : `Tutor with first_name ${name} not found`,
                    success : false,
                    status : 404
            }
            ```
            
            