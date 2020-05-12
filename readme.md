# Online Tutoring App

**Considerations :** An admin login detail :
        ```{
            "email" : "omilosamuel@gmail.com",
            "password" : "wonderful"
        }```

Trying to access a route without proper authentication would give a 403 status

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
            
* **All users can sign in**
    student login:
    `POST` /student/login

     > Note : no authentication is needed for this route
     
    **URL parameters**
    `NONE`
    
    **Request Body parameters**  
    
     name |type   | description
    --------|--------|---------
    email |String | ***Required** : The email of the user 
    passoword| String|***Required** : Users password
    
    Example request body : 
            ```{
                    "email" : "omilosamuel@gmail.com",
                    "password" : "wonderful"
                }```
            
    **Responses :**
* Success Response :
    status : 200 Ok
     content : 
            ```{
                "message" : "login successful",
                "success" : true,
                "name" : {student full name}
                "id" : student id
            }
            ```
     > A cookie containing auth token with key 'token' is sent and a header 'x-auth' also with value of auth token token is set
* Error Response
    status: 400 
    This would be a response if the required parameter 'email','password' is not provided in request body
    
    content : 
            ```{
               message : "email and password is required",
                success : false,
                status : 400
            }```
            
    it could also occur if the password provided is less than 6 characters 
        content :
             ```{
               message : "password must be at least 6 characters",
                success : false,
                status : 400
            }```
    it could also be a response when an invalid email is used
        content :
             ```{
               message : "Oops. Invalid email address",
                success : false,
                status : 400
            }```
        status : 401
            This status code is typical when a wrong password is used
        content :
             ```{
               message : "wrong password",
                success : false,
                status : 401
            }```
        
    tutor login:
    `POST` /tutor/login

     > Note : no authentication is needed for this route
     
    **URL parameters**
    `NONE`
    
    **Request Body parameters**  
    
     name |type   | description
    --------|--------|---------
    email |String | ***Required** : The email of the user 
    passoword| String|***Required** : Users password
    
     Example request body : 
            ```{
                    "email" : "omilosamuel@gmail.com",
                    "password" : "wonderful"
                }```
                
     **Responses :**
    * Success Response :
    status : 200 Ok
     content : 
            ```{
                "message" : "login successful",
                "success" : true,
                "name" : {Tutor full name}
                "id" : student id
            }
            ```
        > A cookie containing auth token with key 'token' is sent and a header 'x-auth' also with value of auth token token is set
        
    * Error Response
    status: 400 
    This would be a response if the required parameter 'email','password' is not provided in request body
    content : 
            ```{
               message : "email and password is required",
                success : false,
                status : 400
            }```
        it could also occur if the password provided is less than 6 characters 
        content :
             ```{
               message : "password must be at least 6 characters",
                success : false,
                status : 400
            }```
        it could also be a response when an invalid email is used
        content :
             ```{
               message : "Oops. Invalid email address",
                success : false,
                status : 400
            }```
            
        status : 401
        This status code is typical when a wrong password is used
        content :
             ```{
               message : "wrong password",
                success : false,
                status : 401
            }```


            ## Tutor Routes 
* **Tutors can register to take a course in a category :**
`POST` /tutor/subject/register 

	  > Note : Tutor authentication is needed for this route. Tutor has to be signed in
     
    **URL parameters**
    `NONE`
    
	**Request Body parameters**  
    
     name |type   | description
    --------|--------|---------
    subject |String | ***Required** : The subject to be registered
    category| String|***Required** : The name of the category of the subject
    
    The category 'sss','jss' and 'primary' have  been created for testing purposes. 
	
	 Example request body : 
	     ```{
                    "subject" : "mathematics",
                    "category" : "sss"
                }```
         
    **Responses :**
	* Success Response :
    status : 200 Ok
     content : 
            ```{
                message :  `${tutor.first_name} successfully registered ${subject.name}`,
success :  true
            }
            ```
     * Error Response
    status: 400 
    This would be a response if the required parameter 'subject','category' is not provided in request body
		content : 
            ```{
             message :"subject and category is required to complete request" ,
status :  400,
success :  false
     }```
	   status: 404
    This would be a response if the required parameter 'subject' is not found in database 
		content : 
            ```{
             message :"subject is not found.Try mathematics" ,
status :  404,
success :  false
     }```
			
		  This could also be a response if the required parameter 'category' is not found in database 
		content : 
            ```{
             message :"category is not found.Try 'sss','primary' or 'jss" ,
status :  404,
success :  false
     }```
				
* **Tutors can see all the subjects they registered :**
`GET` /tutor/subjects

	  > Note : Tutor authentication is needed for this route. Tutor has to be signed in
     
    **URL parameters**
    `NONE`
    
    **Request body parameters**
    `NONE`
	
	 **Responses :**
	* Success Response :
    status : 200 Ok
     content : 
            ```{
              success :  true,
subjects :  {tutor registered subjects details}
            }
            ```
	
	 * Error Response
    status: 404 
    This would be a response if the tutor  is not found in database {highly unlikely}
		content : 
            ```{
             message :"Tutor,Subjects not found" ,
status :  404,
success :  false
     }```
	
* **Tutors can update a subject they registered :**
`PUT` /tutor/subject/:subject/category/:category

	  > Note : Tutor authentication is needed for this route. Tutor has to be signed in
     
	 **URL parameters**
	 
    name |type   | description
    --------|--------|---------
    subject |String | ***Required** : The subject to be updated
    category| String|***Required** : The name of the category of the subject to be updated
    
	**Request Body parameters**  
    
     name |type   | description
    --------|--------|---------
    name |String | ***Required** : The new name of the subject
    category| String|***Required** : The new name of the category of the subject
    
    The category 'sss','jss' and 'primary' have  been created for testing purposes. 
	
	 Example request body : 
	     ```{
                    "name" : "mathematics",
                    "category" : "sss"
                }```
         
         > Tutors can only make changes to subject they have registered
         
         
    **Responses :**
	* Success Response :
    status : 200 Ok
     content : 
            ```{
                message :  `subject updated`,
success :  true
            }
            ```
     * Error Response
    status: 400 
    This would be a response if the required parameter 'name','category' is not provided in request body
		content : 
            ```{
             message :"subject and category is required to complete request" ,
status :  400,
success :  false
     }```
	   status: 404
    This would be a response if the required parameter 'subject' is not found in database 
		content : 
            ```{
             message :"subject is not found.Try mathematics" ,
status :  404,
success :  false
     }```
			
		  This could also be a response if the required parameter 'category' in url or body is not found in database 
		content : 
            ```{
             message :"category is not found.Try 'sss','primary' or 'jss" ,
status :  404,
success :  false
     }```
	
	Status : 403 
	This could be a response if the tutor did not resgister the course 
	content : 
            ```{
             message :Oops. Not allowed ,
status :  403,
success :  false
     }```
	
* **Tutors can delete a subject they registered :**
`DELETE` /tutor/subject/:id

	  > Note : Tutor authentication is needed for this route. Tutor has to be signed in
     
	 **URL parameters**
     name |type   | description
    --------|--------|---------
    id |ObjectId  | ***Required** : The id of the subject to be unregistered by tutor
    
    **Request body parameters**
    `NONE`
   **Responses :**
	* Success Response :
    status : 200 Ok
     content : 
            ```{
                message :  `subject deleted`,
success :  true
            }
            ```
	* Error Response
    status: 400 
    This would be a response if the required parameter Id is not provided as a url parameter or the id is not valid 
		content : 
            ```{
             message :  "This route requires an Id,try a good one",
success :  false,
status :  400    }```
	   status: 404
    This would be a response if the required parameter 'subject' is not found in database 
		content : 
            ```{
             message :"subject is not found.Try mathematics" ,
status :  404,
success :  false
     }```
	
		Status : 403 
	This could be a response if the tutor did not register the course 
	content : 
            ```{
             message :Oops. Not allowed ,
status :  403,
success :  false
     }```
	
## Student Routes 
* **Students can sign up :**
`POST` /student/signup

	  > Note : No authentication is needed for this route. 
     
    **URL parameters**
    `NONE`
    
     **Request body parameters**
     name |type   | description
    --------|--------|---------
    first_name|String  | ***Required** : The first name of user
    last_name|String|  : The first name of user
    email|String  | ***Required** : The email address  of user
    username|String  | ***Required** : The username of user
    password|String  | ***Required** : The first name of user

	 **Responses :**
	* Success Response :
    status : 201 
     content : 
            ```{
message :  "user(student) successfully created",
success :  true,
name :  student.fullname,
id :  student._id           }
            ```
	> A cookie containing auth token with key 'token' is sent and a header 'x-auth' also with value of auth token token is set
	
	* Error Response
    status: 400 
    This would be a response if the password provided is less than 6 characters 
		content : 
            ```{
            message :  "password must be at least six characters",
success :  false,
status :  400  }```
	   status: 400
    This would be a response if the email or username is already in use or last name not provided 
		content : 
            ```{
          message :  "email or username already exists",
success :  false,
status :  400
     }```
        status: 400
    This would be a response if one of the required parameters is missing
		content : 
            ```{
          message :  "Oops.seems like you missed someting required",
success :  false,
status :  400
     }```

* **Students can book lesson :**
`POST` /student/lesson/book

	  > Note : Student authentication is needed for this route. Student has to be signed in
     
    **URL parameters**
    `NONE`

	**Request body parameters**
     name |type   | description
    --------|--------|---------
    tutor|String  | ***Required** : The username of the tutor to take the lesson
    Date |String| ***Required** : the date of the lesson. format is ISO formtat,"YYYY-MM-DD"
    time|String  | ***Required** : The time of the lesson. Format is "HH:SS"

 **Responses :**
* Success Response :
    status : 200 
     content : 
            ```{
message :  'Lesson booked',
success :  true       }
            ```

* Error Response
 status: 400
    This would be a response if the date or time is not provided
		content : 
            ```{
            message :  "date and time is required",
success :  false,
status :  400 }```



    status: 404 
    This would be a response if the Tutor is not found
		content : 
            ```{
            message :  "Tutor not found",
success :  false,
status :  404 }```

**Students can get all tutors taking a course in a category :**

`GET` /category/:category/subject/:subject/tutors

 > Note : Tutor authentication is needed for this route. Tutor has to be signed in
     
 **URL parameters**
name|type | description
 --------|--------|---------
subject |String | ***Required** : The subject
 category| String|***Required** : The category
	    
**Request body parameters**
`NONE`


 **Responses :**
* Success Response :
    status : 200 
     content : 
            ```{
tutors      }
            ```
	
	* Error Response
 status: 404
    This would be a response if the subject provided is not found
		content : 
            ```{
            message :  "subject not found. Try 'mathematics'",
success :  false,
status :  404 }```
status: 404
    This would be a response if the category or subject provided is not found
		content : 
            ```{
          message :  "category not found. Try 'sss','jss' or 'primary'",
success :  false,
status :  404}```


## Admin Routes :

*  **Admin can create subjects under categories 'sss',primary' and 'jss'**

`POST` /subject/create

> Note : Admin authentication is needed for this route

**URL parameters**

`NONE`

**Request Body parameters**

name|type | description
--------|--------|---------
name|String | ***Required** : The subject name
category| String|***Required** : The category name

**Responses :**
* Success Response :
status : 201
content :
```{
message : "subject successfully created",
success : false }
```

* Error Response
status : 400
this could be a response  if there is no name or category provided.
content :
```{
message : "subject successfully created",
success : false }
```
status : 400
this could be a response  if the category provided is not available 
content :
```{
message : "subject successfully created",
success : false, subject
}
```

**Admin can update a subject in a category by Id**
`PUT` /category/:category/subject/:id

> Admin authentication is required for this route.

admin routes can be tested with login details : 
	```
	email : "omilosamauel@gmail.com",
	password : "wonderful"}```
**URL parameters**

name |type | description
--------|--------|---------
id|Object| ***Required** : Theid of the subject to be updated
category| String|***Required** : The name of the category of the subject to be updated

**Request Body parameters**

name |type | description
--------|--------|---------
name |String | ***Required** : The new name of the subject
category| String|***Required** : The new name of the category of the subject
The category 'sss','jss' and 'primary' have been created for testing purposes.
Example request body :
	```{
	"name" : "mathematics",
	"category" : "sss"
	}```
> Tutors can only make changes to subject they have registered

**Responses :**
* Success Response :
status : 200 Ok
content :
	```{
	message : `update successful`,
	success : true
	}```

* Error Response
status: 400
This would be a response if the required parameter id is not valid or not provided 
content :
		```{
		message :  "This url requires a valid Id for the subject",
	success :  false,
	status :  400
		}```
status: 404
This would be a response if the required parameter 'id for the subject is not found 
content :
	```{
	message :"subject is not found.Try a valid Id"
	status : 404,
	success : false
	}```
This could also be a response if the required parameter 'category' in url or body is not found in database
content :
	```{
	message :"category is not found.Try 'sss','primary' or 'jss" ,
	status : 404,
	success : false
	}```

**Admin can delete subjects by Id**
`DELETE` category/:category/subject/:id

> Admin auth is needed for this route
> 
**URL parameters**
name |type | description
--------|--------|---------
id |ObjectId | ***Required** : The id of the subject to be unregistered by tutor
category| String|***Required** : The name of the category of the subject

**Request body parameters**
`NONE`
**Responses :**
* Success Response :
status : 200 Ok
content :
```{
message : `subject found and deleted"
success : true
}
```

* Error Response
status: 400
This would be a response if the required parameter id is not valid or not provided 
content :
		```{
		message :  "This url requires a valid Id for the subject",
	success :  false,
	status :  400
		}```
status: 404
This would be a response if the required parameter 'id for the subject is not found 
content :
	```{
	message :"subject is not found.Try a valid Id"
	status : 404,
	success : false
	}```
This could also be a response if the required parameter 'category' in url or body is not found in database
content :
	```{
	message :"category is not found.Try 'sss','primary' or 'jss" ,
	status : 404,
	success : false
	}```

**Admin can update a category :**
`PUT` /category/:category

> Admin authentication is required for this route.

admin routes can be tested with login details : 
	```
	email : "omilosamauel@gmail.com",
	password : "wonderful"}```

**URL parameters**
name |type | description
--------|--------|---------
category|String| ***Required** : The name of the category to be updated

**Request Body parameters**

name |type | description
--------|--------|---------
name |String | ***Required** : The new name of the category
full_name |String|***Required** : The new full name of the category

**URL parameters**
`NONE`

**Responses :**
* Success Response :
status : 200 Ok
content :
```{
message : `category updated successfully"
success : true
}
```

* Error Response
status: 400
This would be a response if the required parameter name and full name is not provided
content :
		```{
		message :  "name and full_name is required"
	success :  false,
	status :  400
		}```
Status : 404
This could also be a response if the required parameter 'category' in url or body is not found in database
content :
	```{
	message :"category is not found.Try 'sss','primary' or 'jss" ,
	status : 404,
	success : false
	}```

*  **Admin can delete a categoryr:**
`DELETE` /category/:category
> Note : Admin authentication needed for this route    

**URL parameters**
name |type | description
--------|--------|---------
category|String| ***Required** : The name of the category to be deleted

**Request Body parameters**
`NONE`

**Responses :**
* Success Response :
status : 200 Ok
content :
```{
message : `category updated successfully"
success : true
}
```
* Error Response
Status : 404
This could also be a response if the required parameter 'category' in url or body is not found in database
content :
	```{
	message :"category is not found.Try 'sss','primary' or 'jss" ,
	status : 404,
	success : false
	}```


**Admin can retrieve all tutors :**
`GET` admin/tutors

> Note : Admin authentication needed for this route    

**Request Body parameters**
`NONE`

**URL parameters**
`NONE`

**Responses :**
* Success Response :
status : 200 Ok
content :
```{
message :  "Tutors found",
success :  true,
tutors
}
```
* Error Response
we dont expect any errors from this route but if there should be,its probably a server error


**Admin can retrieve tutors by Id**
`GET` admin/tutors/:id

> Note : Admin authentication needed for this route    

**Request Body parameters**
`NONE`

**URL parameters**
name |type | description
--------|--------|---------
id |ObjectId | ***Required** : The id of the tutor

**Responses :**
* Success Response :
status : 200 Ok
content :
```{
message :  'Tutor found',
success :  true,
tutor
}
```
* Error Response
status: 400
This would be a response if the required parameter Id is not provided as a url parameter or the id is not valid
content :
	```{
	message : "This route requires an Id,try a good one",
	success : false,
	status : 400 }```
status: 404
This would be a response if the required  'tutor is not  found in database
content :
	```{
	message :  "Tutor with id not found. Try valid id",
	status :  404,
	success :  false
	}```

** Admin can deactivate tutors by Id**

`PUT` admin/tutors/:id/deactivate

> Note : Admin authentication needed for this route    
> Note : The tutor is only deactivated and not permanently deleted

**Request Body parameters**
`NONE`

**URL parameters**
name |type | description
--------|--------|---------
id |ObjectId | ***Required** : The id of the tutor

**Responses :**
* Success Response :
status : 200 Ok
content :
```{
message :  "Tutor deactivated",
success :  true
}
```
* Error Response
status: 400
This would be a response if the required parameter Id is not provided as a url parameter or the id is not valid
content :
	```{
	message : "This route requires an Id,try a good one",
	success : false,
	status : 400 }```
status: 404
This would be a response if the required  'tutor is not  found in database
content :
	```{
	message :  "Tutor with id not found. Try valid id",
	status :  404,
	success :  false
	}```

*  **Admin  can book lesson :**

`POST` /admin/lesson/book

> Note : Admin authentication needed for this route 

**URL parameters**
`NONE`
**Request body parameters**
name |type | description
--------|--------|---------
tutor|String | ***Required** : The username of the tutor to take the lesson
date |String| ***Required** : the date of the lesson. format is ISO format, "YYYY-MM-DD"
time|String | ***Required** : The time of the lesson. Format is "HH:SS"
student|String|***Required** : The username of the Student to take the lesson

**Responses :**
* Success Response :
status : 200
content :
```{
message : 'Lesson booked',
success : true }
```
* Error Response
status: 400
This would be a response if the date or time is not provided
content :
	```{
	message : "date and time is required",
	success : false,
	status : 400 }```

status: 404
This would be a response if the Tutor is not found
content :
	```{
	message : "Tutor not found",
	success : false,
	status : 404 }```
status: 404
This would be a response if the student is not found
content :
	```{
	message : "student not found",
	success : false,
	status : 404}```


**Admin can retrieve all Lessons**
`GET` admin/lessons

> Note : Admin authentication needed for this route    
**Request Body parameters**
`NONE`

**URL parameters**
`NONE`

**Responses :**
* Success Response :
status : 200 Ok
content :
```{
message :  " Lessons found",
success :  true,
lessons
}
```
* Error Response
we dont expect any errors from this route but if there should be,its probably a server error

**Admin can retrieve lessons by id**
`GET` admin/lessons/:id

> Note : Admin authentication needed for this route    

**Request Body parameters**
`NONE`

**URL parameters**
name |type | description
--------|--------|---------
id |ObjectId | ***Required** : The id of the lesson

**Responses :**
* Success Response :
status : 200 Ok
content :
```{
message :  'Lesson found',
success :  true,
Lesson
}
```
* Error Response
status: 400
This would be a response if the required parameter Id is not provided as a url parameter or the id is not valid
content :
	```{
	message : "This route requires an Id,try a good one",
	success : false,
	status : 400 }```
status: 404
This would be a response if the required  'tutor is not  found in database
content :
	```{
	message :  "Lesson  with id not found. Try valid id",
	status :  404,
	success :  false
	}```


*  **Admin  can update a lesson**

`PUT` /admin/lesson/:id

> Note : Admin authentication needed for this route 

**URL parameters**
name |type | description
--------|--------|---------
id |ObjectId | ***Required** : The id of the lesson to be updated

**Request body parameters**
name |type | description
--------|--------|---------
tutor|String | ***Required** : The username of the tutor to take the lesson
date |String| ***Required** : the date of the lesson. format is "YYYY:MM:DD"
time|String | ***Required** : The time of the lesson. Format is "HH:SS"
student|String|***Required** : The username of the Student to take the lesson

**Responses :**
* Success Response :
status : 200
content :
```{
message : 'Lesson booked',
success : true }
```
* Error Response
status: 400
This would be a response if the date or time is not provided
content :
	```{
	message : "date and time is required",
	success : false,
	status : 400 }```
status: 400
This would be a response if the required parameter Id is not provided as a url parameter or the id is not valid
content :
	```{
	message : "This route requires an Id,try a good one",
	success : false,
	status : 400 }```
status: 404
This would be a response if the Tutor is not found
content :
	```{
	message : "Tutor not found",
	success : false,
	status : 404 }```
status: 404
This would be a response if the student is not found
content :
	```{
	message : "student not found",
	success : false,
	status : 404}```

This would be a response if the lesson with id does not exist
content :
	```{
	message : "Lesson not found",
	success : false,
	status : 404}```

*  **Tutors can sign up :**

`POST` /tutor/signup

> Note : No authentication is needed for this route.
> Note : Admin role can be given to tutors only from the database.

**URL parameters**
`NONE`
**Request body parameters**
name |type | description
--------|--------|---------
first_name|String | ***Required** : The first name of user
last_name|String| : The first name of user
email|String | ***Required** : The email address of user
username|String | ***Required** : The username of user
password|String | ***Required** : The first name of user
**Responses :**
* Success Response :
status : 201
content :
```{
message :  "user(tutor) successfully created",
success :  true,
name :  tutor.fullname,
_id :  tutor._id }
```
> A cookie containing auth token with key 'token' is sent and a header 'x-auth' also with value of auth token token is set
* Error Response
status: 400
This would be a response if the password provided is less than 6 characters
content :
	```{
	message : "password must be at least six characters",
	success : false,
	status : 400 }```
status: 400
This would be a response if the email or username is already in use or last name not provided
content :
	```{
	message : "email or username already exists",
	success : false,
	status : 400
	}```
      status: 400
    This would be a response if one of the required parameters is missing
		content : 
            ```{
          message :  "Oops.seems like you missed someting required",
success :  false,
status :  400
     }```
*  **Admin can delete a lesson**
`DELETE` /admin/lesson/:id
> Note : Tutor authentication is needed for this route. Tutor has to be signed in
> 
**URL parameters**
name |type | description
--------|--------|---------
id |ObjectId | ***Required** : The id of the lesson to be deleted
**Request body parameters**
`NONE`
**Responses :**
* Success Response :
status : 200 Ok
content :
```{
message : `lesson deleted`,
success : true
}
```
* Error Response
status: 400
This would be a response if the required parameter Id is not provided as a url parameter or the id is not valid
content :
	```{
	message : "This route requires an Id,try a good one",
	success : false,
	status : 400 }```
status: 404
This would be a response if the required lesson is not found in the database
content :
```{
message :  "Lesson not found",
success :  false,
status :  404
}```