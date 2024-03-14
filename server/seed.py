# Standard library imports
from random import randint

# Remote library imports
from app import app, db
from config import bcrypt
from models import Course, Lesson, Student, Instructor

# Local imports
# from app import get_or_create_category

courses_data = [
    {
        "name": "Python",
        "image_url": "",
        "imageAlt": "",
        "description": "Python is a versatile and beginner-friendly programming language renowned for its simplicity and readability, and our course offers comprehensive instruction to harness its power for diverse applications in web development, data science, and beyond.",
        "price": "$500.00",
    },
    {
        "name": "React.js",
        "image_url": "",
        "imageAlt": "",
        "description": "React.js revolutionizes front-end development with its component-based architecture, and our course guides you through mastering this popular library, empowering you to build dynamic and interactive user interfaces for web applications with ease.",
        "price": "$700.00",
    },
    {
        "name": "Flask",
        "image_url": "",
        "imageAlt": "",
        "description": "Flask is a lightweight and flexible web framework for Python, and our course provides hands-on instruction to leverage its simplicity and extensibility in developing web applications, APIs, and more. ",
        "price": "$200.00",
    },
    {
        "name": "JavaScript",
        "image_url": "",
        "imageAlt": "",
        "description": "JavaScript is the backbone of modern web development, and our course immerses you in its language constructs, libraries, and frameworks, enabling you to create dynamic and interactive websites and applications with ease.",
        "price": "$500.00",
    },
    {
        "name": "HTML",
        "image_url": "",
        "imageAlt": "",
        "description": "HTML is the language of the web where you'll learn to create and structure content for websites using tags, attributes, and elements.",
        "price": "$300.00",
    },
    {
        "name": "CSS",
        "image_url": "",
        "imageAlt": "",
        "description": "CSS is the cornerstone of web design, and our course delves deep into its intricacies, teaching you how to style and layout web pages effectively for a visually stunning user experience.",
        "price": "$300.00",
    },
    {
        "name": "Typescript",
        "image_url": "",
        "imageAlt": "",
        "description": "TypeScript is a powerful superset of JavaScript, and in our course, you'll master its syntax and features to build robust and scalable web applications with strong typing and enhanced productivity.",
        "price": "$300.00",
    },
    {
        "name": "Java",
        "image_url": "",
        "imageAlt": "",
        "description": "Java is a versatile programming language used in a myriad of applications, and in our course, you'll gain expertise in its syntax, concepts, and best practices to develop efficient and reliable software solutions.",
        "price": "$500.00",
    },
    {
        "name": "Wordpress",
        "image_url": "",
        "imageAlt": "",
        "description": "WordPress is the leading content management system empowering millions of websites worldwide, and our course equips you with the skills to create, customize, and manage professional-looking websites without any prior coding knowledge.",
        "price": "$500.00",
    },
    {
        "name": "C++",
        "image_url": "",
        "imageAlt": "",
        "description": "C++ is a powerful and versatile programming language renowned for its performance and flexibility, and our course provides comprehensive instruction on its syntax, features, and object-oriented programming principles to empower you in building efficient and scalable software applications.",
        "price": "$600.00",
    }
]

lessons_data = [
    {
        "title": "Introduction to Python",
        "content": "This lesson covers the basics of Python programming language.",
        "course_name": "Python",
        "course_id": 1,
    },
    {
        "title": "React Basics",
        "content": "Learn the fundamentals of React framework in this lesson.",
        "course_name": "React.js",
        "course_id": 2,
    },
    {
        "title": "Introduction to Flask",
        "content": "Learn the fundamentals of Flask framework in this lesson.",
        "course_name": "Flask",
        "course_id": 3,
    },
    {
        "title": "Introduction to JavaScript",
        "content": "Learn the fundamentals of JavaScript in this lesson.",
        "course_name": "JavaScript",
        "course_id": 4,
    }
]

students_data = [
    {"name": "John Doe", "username": "johndoe", "_password_hash": bcrypt.generate_password_hash("_password_hash").decode('utf-8')},
    {"name": "Jane Smith", "username": "janesmith", "_password_hash": bcrypt.generate_password_hash("_password_hash").decode('utf-8')},
    {"name": "Omar Ali", "username": "omarali", "_password_hash": bcrypt.generate_password_hash("_password_hash").decode('utf-8')},
    {"name": "Alia Hakim", "username": "aliahakim", "_password_hash": bcrypt.generate_password_hash("_password_hash").decode('utf-8')},
    {"name": "Sami Qaisi", "username": "samiqaisi", "_password_hash": bcrypt.generate_password_hash("_password_hash").decode('utf-8')},
    {"name": "Jennifer Fraser", "username": "jenniferfraser", "_password_hash": bcrypt.generate_password_hash("_password_hash").decode('utf-8')},
    {"name": "Kelly Davis", "username": "KellyDavis", "_password_hash": bcrypt.generate_password_hash("_password_hash").decode('utf-8')},
    {"name": "Sarah Qasim", "username": "sarahqasim", "_password_hash": bcrypt.generate_password_hash("_password_hash").decode('utf-8')},
    {"name": "Jasmine Alam", "username": "jasminealam", "_password_hash": bcrypt.generate_password_hash("_password_hash").decode('utf-8')},
    {"name": "Elma Zafar", "username": "elmazafar", "_password_hash": bcrypt.generate_password_hash("_password_hash").decode('utf-8')},
]

instructors_data = [
    {"name": "Maria Hernandez", "username": "mariahernandez", "_password_hash": bcrypt.generate_password_hash("_password_hash").decode('utf-8')},
    {"name": "Kim Lee ", "username": "kimlee", "_password_hash": bcrypt.generate_password_hash("_password_hash").decode('utf-8')},
    {"name": "Eric Bond ", "username": "ericbond", "_password_hash": bcrypt.generate_password_hash("_password_hash").decode('utf-8')},
    {"name": "Linda Baker ", "username": "lindabaker", "_password_hash": bcrypt.generate_password_hash("_password_hash").decode('utf-8')},
    {"name": "Alex Spencer ", "username": "alexspencer", "_password_hash": bcrypt.generate_password_hash("_password_hash").decode('utf-8')}
]

if __name__ == "__main__":
    with app.app_context():
        Course.query.delete()
        Lesson.query.delete()
        Student.query.delete()
        Instructor.query.delete()

        # Add courses
        for course_data in courses_data:
            course = Course(**course_data)
            db.session.add(course)

        # Add lessons
        for lesson_data in lessons_data:
            course_name = lesson_data.pop("course_name")
            course = Course.query.filter_by(name=course_name).first()
            lesson_data["course_id"] = course.id
            lesson = Lesson(**lesson_data)
            db.session.add(lesson)

        # Add students
        for student_data in students_data:
            student = Student(**student_data)
            db.session.add(student)

        # Add instructors
        for instructor_data in instructors_data:
            instructor = Instructor(**instructor_data)
            db.session.add(instructor)

        db.session.commit()
        print("Database seeded successfully!")
