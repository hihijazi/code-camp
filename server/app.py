from flask import Flask, jsonify, request, make_response, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, Course, Lesson, Student, Instructor, Enrollment
import os
import requests
from flask_cors import CORS

import click
from flask.cli import with_appcontext

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)

app.secret_key = 'tesgsgjsjsbdhj'

app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False


cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

migrate = Migrate(app, db)

api = Api(app)

db.init_app(app)

@app.route('/')
def index():
    return 'Welcome to Code Camp API!'


class Courses(Resource):
    def get(self):
        courses = [course.to_dict() for course in Course.query.all()]
        return make_response(courses, 200)

    def post(self):
        data = request.get_json()
        try:
            new_course = Course(
                name=data['name'],
                price=data['price']
            )
            db.session.add(new_course)
            db.session.commit()
            
            return make_response(new_course.to_dict(rules=('-lessons',)), 201)
        except ValueError:
            return make_response({
                'error': 'Validation Error'
            })

api.add_resource(Courses, '/courses')


class CoursesById(Resource):
    def get(self, id):
        course = Course.query.filter(Course.id == id).first()
        if course:
            return make_response(course.to_dict(), 200)
        else:
            return make_response({
                'error': 'No course found'
            }, 404)

    def patch(self, id):
        course = Course.query.filter(Course.id == id).first()
        if course:
            try:
                data = request.get_json()
                for attr in data:
                    setattr(course, attr, data[attr])
                    db.session.commit()
                    return make_response(course.to_dict(), 202)
            except ValueError:
                return make_response({
                    'error': 'Validation error'
                }, 404)

    def delete(self, id):
        course = Course.query.filter(Course.id == id).first()
        if course:
            db.session.delete(course)
            db.session.commit()
            return make_response({}, 204)
        return make_response({
            'error': 'No course found'
        }, 404)

api.add_resource(CoursesById, '/courses/<int:id>')


class Lessons(Resource):
    def get(self):
        lesson = [lesson.to_dict() for lesson in Lesson.query.all()]
        return make_response(lesson, 200)

    def post(self):
        data = request.get_json()
        try:
            new_lesson = Lesson(
                name=data['name']
            )
            db.session.add(new_lesson)
            db.session.commit()
            return make_response(new_lesson.to_dict(rules=('-courses',)), 201)
        except ValueError:
            return make_response({
                'error': 'Validation Error'
            })

api.add_resource(Lessons, '/lessons')


class LessonsById(Resource):
    def get(self, id):
        lesson = Lesson.query.filter(Lesson.id == id).first()
        if lesson:
            return make_response(lesson.to_dict(), 200)
        else:
            return make_response({
                'error': 'No lesson found'
            }, 404)

    def patch(self, id):
        lesson = Lesson.query.filter(Lesson.id == id).first()
        if lesson:
            try:
                data = request.get_json()
                for attr in data:
                    setattr(lesson, attr, data[attr])
                    db.session.commit()
                    return make_response(lesson.to_dict(), 202)
            except ValueError:
                return make_response({
                    'error': 'Validation error'
                }, 404)

    def delete(self, id):
        lesson = Lesson.query.filter(Lesson.id == id).first()
        if lesson:
            db.session.delete(lesson)
            db.session.commit()
            return make_response({}, 204)
        return make_response({
            'error': 'No lesson found'
        }, 404)

api.add_resource(LessonsById, '/lessons/<int:id>')


class Students(Resource):
    def get(self):
        students = [student.to_dict() for student in Student.query.all()]
        return make_response(students, 200)

    def post(self):
        try:
            data = request.get_json()
            print("data =================", data)
            user = Student(
                name=data['name'],
                username=data['username']
            )
            user.password_hash = data['password']  ######################3
            db.session.add(user)
            db.session.commit()
            return make_response(user.to_dict(only=('id', 'name', 'username')), 201)
        except ValueError:
            return make_response({'error': 'Failed to add new user, try again!'}, 400)


api.add_resource(Students, '/students')


class StudentsById(Resource):
    def get(self, id):
        user = Student.query.filter(Student.id == id).first()
        if user:
            return make_response(user.to_dict(only=('name', 'username')), 200)
        return make_response({'error': 'user not found'}, 404)

    def patch(self, id):
        user = Student.query.filter(Student.id == id).first()
        if user:
            try:
                data = request.get_json()
                if 'password' in data:
                    user.password_hash = data['password']
                    del data['password']
                for attr in data:
                    setattr(user, attr, data[attr])
                db.session.commit()
                return make_response(user.to_dict(only=('name', 'username')), 202)
            except ValueError:
                return make_response({'error': 'Failed to edit user'}, 400)

    def delete(self, id):
        user = Student.query.filter(Student.id == id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return make_response({}, 204)
        return make_response({'error': 'User not found'}, 404)


api.add_resource(StudentsById, '/students/<int:id>')


class Enrollments(Resource):
    def get(self):
        enrollments = [enrollment.to_dict() for enrollment in Enrollment.query.all()]
        return make_response(enrollments, 200)

# authentification
class StudentCheckSession(Resource):
    def get(self):
        student = Student.query.filter(Student.id == session.get('user_id')).first()
        if student:
            return student.to_dict(only=('id', 'name', 'username'))
        else:
            return {'message': '401: Not Authorized'}, 401


class StudentLogin(Resource):
    def post(self):
        try:
            username = request.get_json()['username']
            password = request.get_json()['password']
            print("username =========", username)
            print("password =========", password)


            student = Student.query.filter(Student.username == request.get_json()['username']).first()
            if student:
                if student.authenticate(password):
                    session['user_id'] = student.id
                    return student.to_dict(only=('id', 'name', 'username')), 200
            return {'error': 'Invalid username or password'}, 401

        except ValueError:
            return make_response({'error': 'Login failed'}, 400)


class StudentLogout(Resource):
    def delete(self):
        session.pop("user_id", None)
        return {'message': '204: No Content'}, 204


api.add_resource(StudentCheckSession, '/student_check_session')
api.add_resource(StudentLogin, '/studentlogin', endpoint='studentlogin')
api.add_resource(StudentLogout, '/studentlogout', endpoint='studentlogout')

class Instructors(Resource):
    def get(self):
        instructors = [instructor.to_dict() for instructor in Instructor.query.all()]
        return make_response(instructors, 200)

    def post(self):
        try:
            data = request.get_json()
            user = Instructor(
                name=data['name'],
                username=data['username']
            )
            user.password_hash = data['password']  ######################3
            db.session.add(user)
            db.session.commit()
            return make_response(user.to_dict(only=('id', 'name', 'username')), 201)
        except ValueError:
            return make_response({'error': 'Failed to add new user, try again!'}, 400)


api.add_resource(Instructors, '/instructors')


class InstructorsById(Resource):
    def get(self, id):
        user = Instructor.query.filter(Instructor.id == id).first()
        if user:
            return make_response(user.to_dict(only=('name', 'username')), 200)
        return make_response({'error': 'user not found'}, 404)

    def patch(self, id):
        user = Instructor.query.filter(Instructor.id == id).first()
        if user:
            try:
                data = request.get_json()
                if 'password' in data:
                    user.password_hash = data['password']
                    del data['password']
                for attr in data:
                    setattr(user, attr, data[attr])
                db.session.commit()
                return make_response(user.to_dict(only=('name', 'username')), 202)
            except ValueError:
                return make_response({'error': 'Failed to edit user'}, 400)

    def delete(self, id):
        user = Instructor.query.filter(Instructor.id == id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return make_response({}, 204)
        return make_response({'error': 'User not found'}, 404)


api.add_resource(InstructorsById, '/instructors/<int:id>')


# authentification
class InstructorCheckSession(Resource):
    def get(self):
        instructor = Instructor.query.filter(Instructor.id == session.get('user_id')).first()
        if instructor:
            return instructor.to_dict(only=('id', 'name', 'username'))
        else:
            return {'message': '401: Not Authorized'}, 401


class InstructorLogin(Resource):
    def post(self):
        try:
            username = request.get_json()['username']
            password = request.get_json()['password']

            instructor = Instructor.query.filter(Instructor.username == request.get_json()['username']).first()
            if instructor:
                if instructor.authenticate(password):
                    session['user_id'] = instructor.id
                    return instructor.to_dict(only=('id', 'name', 'username')), 200
            return {'error': 'Invalid username or password'}, 401

        except ValueError:
            return make_response({'error': 'Login failed'}, 400)


class InstructorLogout(Resource):
    def delete(self):
        session.pop("user_id", None)
        return {'message': '204: No Content'}, 204


api.add_resource(InstructorCheckSession, '/instructor_check_session')
api.add_resource(InstructorLogin, '/instructorlogin', endpoint='instructorlogin')
api.add_resource(InstructorLogout, '/instructorlogout', endpoint='instructorlogout')

if __name__ == "__main__":
    app.run(port=5555, debug=True)