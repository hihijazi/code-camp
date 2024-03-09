from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey, Column, Integer, String, Float
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt
import re

# Models

class Course(db.Model, SerializerMixin):
    __tablename__ = 'courses'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    price = db.Column(db.Float)
  
    # Add relationship 
    

    # Add serialization rules
    serialize_rules = ('')

    # Add validations

    @validates('price')
    def validate_price(self, key, value):
        if not 1 <= value <= 1000:
            raise ValueError('Price must be between 1 and 1000')

    def __repr__(self):
        return f'<Course {self.id}: {self.name}: {self.price}>'


class Lesson(db.Model, SerializerMixin):
    __tablename__ = "lessons"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String) 

    # Add relationship 

    # Add serialization rules
    serialize_rules = ('')

    # Add validation
    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Must have a name.')
        return name
        
    def __repr__(self):
        return f'<Lesson {self.id}:  {self.name}>'
    

class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String)
    
    # Add relationship


    # Add foreign key


    # Add serialization rules
    serialize_rules = ('')

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
    

class Instructor(db.Model, SerializerMixin):
    __tablename__ = 'instructors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String)
    
    # Add relationship


    # Add foreign key


    # Add serialization rules
    serialize_rules = ('')

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