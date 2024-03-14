from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey, Table, Column, Integer, String, Float
from sqlalchemy.orm import validates, relationship, backref
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt
import re
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


# Define the many-to-many relationship table
enrollments = Table('enrollments', db.Model.metadata,
    Column('student_id', Integer, ForeignKey('students.id')),
    Column('course_id', Integer, ForeignKey('courses.id')),
    extend_existing=True
)
db.Model.metadata.clear()

# Models
class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String)
    
    # Add relationship
    courses = relationship('Course', secondary=enrollments, backref='enrolled_students')

    # Add foreign key


    # Add serialization rules
    serialize_rules = ('-courses',)

    # Add validation
    @validates('name', 'username', 'password_hash')
    def validate_user(self, key, value):
        if value is None or (not value.strip()):
            raise ValueError('Name, username, and password must exist!')
        if key == 'password_hash':
            if (len(value) < 5 or len(value) > 11) or (not re.search("[a-z]", value)) or (not any(char.isdigit() for char in value)):
                raise ValueError("Invalid password. Must be 6 to 12 characters, contain lowercase and numbers")

        return value

    @hybrid_property
    def password_hash(self):    
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        self.validate_user('password_hash', password)  # Validate the password

        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    def __repr__(self):
        return f'<Student {self.id}: {self.name} >'


class Course(db.Model, SerializerMixin):
    __tablename__ = 'courses'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    price = db.Column(db.Integer)
    description = db.Column(db.String)
    imageAlt = db.Column(db.String)
    image_url = db.Column(String)

    # Add relationship 
    #lessons = relationship('Lesson', backref='course', lazy=True)
    students = relationship('Student', secondary=enrollments, backref='enrolled_courses')
    instructor_id = Column(Integer, ForeignKey('instructors.id'))
    instructor = db.relationship("Instructor", back_populates="courses")
    # Add serialization rules
    serialize_rules = ('-students')

    # Add validations

    def __repr__(self):
        return f'<Course {self.id}: {self.name}: {self.price}>'


class Instructor(db.Model, SerializerMixin):
    __tablename__ = 'instructors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String)
    
    # Add relationship
    courses = db.relationship("Course", back_populates="instructor")

    # Add foreign key


    # Add serialization rules
    serialize_rules = ('-courses',)

    # Add validation
    @validates('name', 'username', 'password_hash')
    def validate_user(self, key, value):
        if value is None or (not value.strip()):
            raise ValueError('Name, username, and password must exist!')
        if key == 'password_hash':
            if (len(value) < 5 or len(value) > 11) or (not re.search("[a-z]", value)) or (not any(char.isdigit() for char in value)):
                raise ValueError("Invalid password. Must be 6 to 12 characters, contain lowercase and numbers")

        return value

    @hybrid_property
    def password_hash(self):    
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        self.validate_user('password_hash', password)  # Validate the password

        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    def __repr__(self):
        return f'<Student {self.id}: {self.name} >'
    

class Lesson(db.Model, SerializerMixin):
    __tablename__ = "lessons"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String) 
    content = db.Column(db.String)
    course_id = db.Column(db.Integer, ForeignKey('courses.id'), nullable=False)
    course_name = db.Column(db.String)

    # Add relationship 

    # Add serialization rules
    serialize_rules = ('-course',)

    # Add validation
    @validates('title')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Must have a title.')
        return name
        
    def __repr__(self):
        return f'<Lesson {self.id}:  {self.title}>'
    

class Enrollment(db.Model):
    __tablename__ = 'enrollments'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, ForeignKey('students.id'))
    course_id = db.Column(db.Integer, ForeignKey('courses.id'))

    # Define relationship with Course
    course = relationship("Course", backref="enrollments")
    student = relationship("Student", backref="enrollments")

    def __repr__(self):
        return f'<Enrollment {self.id}: Student {self.student_id} enrolled in Course {self.course_id}>'
        