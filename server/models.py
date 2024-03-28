from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey, Table, Column, Integer, String, Float
from sqlalchemy.orm import validates, relationship, backref
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt
import re

# Models
class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String)
    
    # Add relationship
    enrollments = relationship('Enrollment', back_populates='student')
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


# class Course(db.Model, SerializerMixin):
#     __tablename__ = 'courses'

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String)
#     price = db.Column(db.Integer)
#     description = db.Column(db.String)
#     image = db.Column(db.String)
#     instructor_id = db.Column(db.Integer, ForeignKey('instructors.id'))

#     # Add relationship 

#     instructor = relationship("Instructor", back_populates="courses")
#     enrollments = relationship('Enrollment', back_populates='course')
    
#     # Add serialization rules
#     serialize_rules = ('-students', '-instructor')

#     @staticmethod
#     def get_all_courses():
#         return Course.query.all()

#     @staticmethod
#     def get_courses_by_instructor_id(instructor_id):
#         return Course.query.filter_by(instructor_id=instructor_id).all()

#     @staticmethod
#     def get_courses_by_student_id(student_id):
#         return Course.query.join(Enrollment).filter(Enrollment.student_id == student_id).all()

#     # Add validations

#     def __repr__(self):
#         return f'<Course {self.id}: {self.name}: {self.price}>'


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


class Course(db.Model, SerializerMixin):
    __tablename__ = 'courses'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    price = db.Column(db.Integer)
    description = db.Column(db.String)
    image = db.Column(db.String)
    instructor_id = db.Column(db.Integer, ForeignKey('instructors.id'))

    # Add relationship 
    instructor = relationship("Instructor", back_populates="courses")

    # Add serialization rules
    serialize_rules = ('id', 'name', 'price', 'description', 'image')

    @staticmethod
    def get_all_courses():
        return Course.query.all()

    @staticmethod
    def get_courses_by_instructor_id(instructor_id):
        return Course.query.filter_by(instructor_id=instructor_id).all()

    @staticmethod
    def get_courses_by_student_id(student_id):
        return Course.query.join(Enrollment).filter(Enrollment.student_id == student_id).all()

    # Add validations

    def __repr__(self):
        return f'<Course {self.id}: {self.name}: {self.price}>'

class Enrollment(db.Model, SerializerMixin):
    __tablename__ = 'enrollments'

    id = db.Column(db.Integer, primary_key=True) 
    name = db.Column(db.String)
    description = db.Column(db.String)  
    course_id = db.Column(db.Integer, ForeignKey('courses.id'))
    student_id = db.Column(db.Integer, ForeignKey('students.id'))

    # Define relationship with Course
    student = relationship("Student", back_populates="enrollments")
    # Don't include course relationship to avoid circular reference

    # Add serialization rules
    serialize_rules = ('id', 'name', 'description', 'course_id', 'student_id')

    # def __repr__(self):
    #     return f'<Enrollment {self.id}: Student {self.student_id} enrolled in Course {self.course_id}>'

    def to_dict(self):
        # Serialize course information manually
        course_info = {
            'id': self.course_id
        }
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'course': course_info,
            'student_id': self.student_id,
        }


class Attendance(db.Model, SerializerMixin):
    __tablename__ = 'attendance'

    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, ForeignKey('courses.id'), nullable=False)
    student_id = db.Column(db.Integer, ForeignKey('students.id'))
    is_present = db.Column(db.Boolean)  # Corrected attribute name

    def __repr__(self):
        return f'<Attendance course_id={self.course_id}, student_id={self.student_id}, is_present={self.is_present}>'