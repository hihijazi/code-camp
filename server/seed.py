# Standard library imports
from random import randint

# Remote library imports
from config import app, db, bcrypt
from models import Course, Lesson, Student, Instructor

# Local imports
from app import get_or_create_category

courses_data = [
    {
        "name": "Python",
        "image_url": "",
        "imageAlt": "",
        "description": "Python is a programming language",
        "price": "$500.00",
    },
    {
        "name": "React",
        "image_url": "",
        "imageAlt": "",
        "description": "React is a programming language",
        "price": "$700.00",
    },
    {
        "name": "Flask",
        "image_url": "",
        "imageAlt": "",
        "description": "Flask is a backend ",
        "price": "$200.00",
    },
    {
        "name": "JavaScript",
        "image_url": "",
        "imageAlt": "",
        "description": "JavaScript is a programming language",
        "price": "$500.00",
    }
]

lessons_data = [
    {
        "title": "Introduction to Python",
        "content": "This lesson covers the basics of Python programming language.",
        "course_name": "Python",
    },
    {
        "title": "React Basics",
        "content": "Learn the fundamentals of React framework in this lesson.",
        "course_name": "React",
    },
    {
        "title": "Introduction to Flask",
        "content": "Learn the fundamentals of Flask framework in this lesson.",
        "course_name": "Flask",
    },
    {
        "title": "Introduction to JavaScript",
        "content": "Learn the fundamentals of JavaScript in this lesson.",
        "course_name": "JavaScript",
    }
]

students_data = [
    {"name": "John Doe", "username": "johndoe", "password": bcrypt.generate_password_hash("password").decode('utf-8')},
    {"name": "Jane Smith", "username": "janesmith", "password": bcrypt.generate_password_hash("password").decode('utf-8')}
]

instructors_data = [
    {"name": "Alice Johnson", "username": "alicej", "password": bcrypt.generate_password_hash("password").decode('utf-8')},
    {"name": "Bob Anderson", "username": "boba", "password": bcrypt.generate_password_hash("password").decode('utf-8')}
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
