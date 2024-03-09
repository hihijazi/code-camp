
# Code Camp

## Description
Code Camp is an online institution for students pursuing a career change.  Students can view the upcoming courses and schedules.   Instructors can view the course schedule and the students enrolled in each course they are teaching. 



## Key Features

1. **Browse and Discover:**
   Browse different programming courses you are interested in mastering.  We have it all.  Our goal is to create the best possible coding institute to anyone who wants to become a software developer.  We gaurantee that with our easy to learn courses and our experienced instructors you will succeed in becoming a software developer. 

2. **Enroll in courses and Register:**
   Easily enroll in our courses by creating an account.  You are one step closer to achieving your goals and dreams. Enroll in the course of your choice and pay as you go.  

3. **Secure Checkout:**
   With a secure and intuitive checkout process, Code Camp ensures that your transactions are not only smooth but also protected. Enroll confidently and safely. 

4. **ChatBot**
   Built using Chatscope/Chat UI, this customized ChatBot provides personalized information in real-time. Have a question about a course or how to enroll, ChatBot can handle that!

## Project Details

<h3><b>Client</b></h3>

Contains the following components: App, 

Contains the following pages: Home, About, Courses, Success Stories, Chat, Instructo Login, Student Login. 

<h3><p>Server</p></h3>

Contains the following models: Course, Instructor, Student, Lesson, LessonDetails.

## Using this Program

To begin this program, you'll use the following commands:

<ul>
<li>pipenv install && pipenv shell</li>
<li>cd server</li>
<li>flask db init</li>
<li>flask db migrate -m "implement relationships"</li>
<li>flask db upgrade head</li>
<li>python seed.py</li>
<li>python app.py</li>
</ul>

Open up an additional terminal and use the following commands:

<ul>
<li>cd client</li>
<li>npm start</li>
</ul>

<h3><p>Home</p></h3>

Takes the user to the homepage.

<h3><p>About</p></h3>

Contains information about the Code Camp Institute.

<h3><p>Explore</p></h3>

Allows the user to explore available courses and enroll in courses.

<h3><p>Success Stories</p></h3>

Contains success stories of previous students who have benefited from the courses. 

<h3><p>Transaction</p></h3>

Contains all of the courses the student enrolled in. Courses can be added to the transaction without having to log in.

In order to purchase the courses, the user will need to log in with an existing account or create a new account.

Once logged in, the user can enter in their billing details to complete the transaction. 

<h3><p>Profile</p></h3>

Contains the user's profile information, which can be edited and will persist in the database. This page will also contain all previous orders the user has made.

<h3><p>Logout</p></h3>

Logs the user out of their session and takes them back to the homepage.

<h3><p>Chat</p></h3>

Opens a chat window for the user to submit questions to the ChatBot. This ChatBot is customized for this project and provides information about "orders" and social media.