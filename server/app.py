from flask import Flask, jsonify, request, make_response, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, Course, Lesson, Student, Instructor, Enrollment
from flask_jwt_extended import create_access_token
import os
import requests
from flask_cors import CORS

import click
from flask.cli import with_appcontext
from flask_jwt_extended import jwt_required, get_jwt_identity


BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)

app.secret_key = 'tesgsgjsjsbdhj'

app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

from flask_jwt_extended import JWTManager

app.config['JWT_SECRET_KEY'] = 'tesgsgjsjsbdhj'
jwt = JWTManager(app)


cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

app.api_key = "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"
app.api_url = "https://api.openai.com/v1/chat/completions"

migrate = Migrate(app, db)

api = Api(app)

db.init_app(app)

@app.route('/')
def index():
    return 'Welcome to Code Camp API!'



@app.route("/api/chat-completions", methods=["POST"])
def chat_completions():
    data = request.get_json()
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {app.api_key}",
    }
    response = requests.post(app.api_url, json=data, headers=headers)
    return jsonify(response.json())


class Courses(Resource):
    def get(self):
        print("Course.query.all()", Course.get_all_courses())
        print("Course.query.all()", Course.get_courses_by_instructor_id(1))
        print("Course.query.all()",  Course.get_courses_by_student_id(1))
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

api.add_resource(Courses, '/api/courses')


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
            'error': 'Course not deleted'
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



class Enrollments(Resource):
    def get(self):
        enrollments = [enrollment.to_dict() for enrollment in Enrollment.query.all()]
        return make_response(enrollments, 200)



############### Instructor #################

class AssignInstructor(Resource):
    @jwt_required()
    def get(self):
        logged_in_user_id = get_jwt_identity()
        courses = []
        for course in Course.get_courses_by_instructor_id(logged_in_user_id):
            course_dict = course.to_dict()
            course_dict['enrollments'] = list()
            student_names = set()
            for enrollment in Enrollment.query.filter(Enrollment.course_id==course.id).all():
                student_names.add((enrollment.student.id, enrollment.student.name, enrollment.student.username))
            course_dict['enrollments'].append(list(student_names))
            courses.append(course_dict)
        if courses:
            return make_response({"data":courses}, 200)
        else:
            return make_response({'error': 'No course found'}, 404)

    def patch(self):
        data = request.get_json()
        instructor_id = data.get('instructor_id')
        course_id = data.get('course_id')
        instructor = Instructor.query.filter(Instructor.id == instructor_id).first() 
        course = Course.query.filter(Course.id == course_id).first()
        if not (course and instructor):
            return make_response({'error': 'Invalid course and instructor id'}, 404)
        else:
            try:
                setattr(course, 'instructor_id', instructor_id)
                db.session.commit()
                return make_response(course.to_dict(), 200)
            except ValueError as e:
                return make_response({'error': str(e)}, 404)
            

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
        except ValueError as e:
            return make_response({'error': str(e)}, 400)


class InstructorLogin(Resource):
    def post(self):
        try:
            username = request.get_json()['username']
            password = request.get_json()['password']
            instructor = Instructor.query.filter(Instructor.username == username).first()
            if instructor:
                if instructor.authenticate(password):
                    data = instructor.to_dict(only=('id', 'name', 'username'))
                    data['access_token'] = create_access_token(identity=instructor.id)
                    data['is_student'] = False
                    session['user_id'] = instructor.id
                    return data, 200
            return {'error': 'Invalid username or password'}, 401

        except ValueError:
            return make_response({'error': 'Login failed'}, 400)


class InstructorLogout(Resource):
    def delete(self):
        session.pop("user_id", None)
        return {'message': '204: No Content'}, 204


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
    

class InstructorCheckSession(Resource):
    def get(self):
        instructor = Instructor.query.filter(Instructor.id == session.get('user_id')).first()
        if instructor:
            return instructor.to_dict(only=('id', 'name', 'username'))
        else:
            return {'message': '401: Not Authorized'}, 401


class MarkAttendance(Resource):
    def get(self, id):
        user = Instructor.query.filter(Instructor.id == id).first()
        if user:
            return make_response(user.to_dict(only=('name', 'username')), 200)
        return make_response({'error': 'user not found'}, 404)

    def patch(self):
        user = Instructor.query.filter(Instructor.id == id).first()
        if user:
            try:
                data = request.get_json()
                for attr in data:
                    setattr(user, attr, data[attr])
                db.session.commit()
                return make_response(user.to_dict(only=('name', 'username')), 202)
            except ValueError:
                return make_response({'error': 'Failed to edit user'}, 400)



api.add_resource(MarkAttendance, '/api/mark-attendence')
api.add_resource(AssignInstructor, '/api/assign-instructor/')
api.add_resource(Instructors, '/instructors')
api.add_resource(InstructorsById, '/instructors/<int:id>')
api.add_resource(InstructorCheckSession, '/instructor_check_session')
api.add_resource(InstructorLogin, '/instructorlogin', endpoint='instructorlogin')
api.add_resource(InstructorLogout, '/instructorlogout', endpoint='instructorlogout')



################### Studen dashboard ###################


class Students(Resource):
    # view all students
    def get(self):
        students = [student.to_dict() for student in Student.query.all()]
        return make_response(students, 200)

    # student signup view
    def post(self):
        try:
            data = request.get_json()
            user = Student(
                name=data['name'],
                username=data['username']
            )
            user.password_hash = data['password']
            db.session.add(user)
            db.session.commit()
            return make_response(user.to_dict(only=('id', 'name', 'username')), 201)
        except ValueError as e:
            return make_response({'error': str(e)}, 400)


class StudentLogin(Resource):
    # student login view
    def post(self):
        try:
            username = request.get_json()['username']
            password = request.get_json()['password']
            student = Student.query.filter(Student.username == username).first()
            if student:
                if student.authenticate(password):
                    session['user_id'] = student.id
                    access_token = create_access_token(identity=student.id)
                    data = student.to_dict(only=('id', 'name', 'username'))
                    data['access_token'] = access_token
                    data['is_student'] = True 
                    return data, 200
            return {'error': 'Invalid username or password'}, 401
        except ValueError:
            return make_response({'error': 'Login failed'}, 400)
        

class StudentsById(Resource):
    # get student details
    @jwt_required()
    def get(self, id):
        logged_in_user_id = get_jwt_identity()
        print("logged_in_user_id ===========", logged_in_user_id)
        if logged_in_user_id != id:
            return make_response({'error': 'Unauthorized access'}, 401)
        user = Student.query.filter(Student.id == id).first()
        if user:
            return make_response(user.to_dict(only=('name', 'username')), 200)
        return make_response({'error': 'user not found'}, 404)

    # update student details
    @jwt_required()
    def patch(self, id):
        # logged_in_user_id = session.get('user_id')
        logged_in_user_id = get_jwt_identity()
        print("logged_in_user_id ===========", logged_in_user_id)
        if logged_in_user_id != id:
            return make_response({'error': 'Unauthorized access'}, 401)
        user = Student.query.filter(Student.id == id).first()
        if user:
            try:
                data = request.get_json()
                print("data ============", data)
                if 'password' in data:
                    user.password_hash = data['password']
                    del data['password']
                for attr in data:
                    setattr(user, attr, data[attr])
                db.session.commit()
                return make_response(user.to_dict(only=('name', 'username')), 202)
            except Exception as e:
                print("e==================", e)
                return make_response({'error': 'Failed to edit user'}, 400)

    # delete student view
    def delete(self, id):
        user = Student.query.filter(Student.id == id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return make_response({}, 204)
        return make_response({'error': 'User not found'}, 404)
        

class StudentCheckSession(Resource):
    def get(self):
        student = Student.query.filter(Student.id == session.get('user_id')).first()
        if student:
            return student.to_dict(only=('id', 'name', 'username'))
        else:
            return {'message': '401: Not Authorized'}, 401


class StudentLogout(Resource):
    def delete(self):
        session.pop("user_id", None)
        return {'message': '204: No Content'}, 204
    

class StudentCourses(Resource):
    @jwt_required()
    def get(self):
        student_id = get_jwt_identity()
        print("total ====", Course.get_courses_by_student_id(student_id))
        courses = [course.to_dict() for course in Course.get_courses_by_student_id(student_id)]
        return make_response(courses, 200)
    
    @jwt_required()
    def post(self):
        student_id = get_jwt_identity()
        name = request.get_json().get('name')
        description = request.get_json().get('description')
        course_id = request.get_json().get('course_id')
        enrolment = Enrollment(
            name=name, description=description,
            course_id=course_id, student_id=student_id
        )
        db.session.add(enrolment)
        db.session.commit()
        return make_response(enrolment.to_dict(), 201)


api.add_resource(Students, '/students')
api.add_resource(StudentsById, '/students/<int:id>')
api.add_resource(StudentCheckSession, '/student_check_session')
api.add_resource(StudentLogin, '/studentlogin', endpoint='studentlogin')
api.add_resource(StudentLogout, '/studentlogout', endpoint='studentlogout')
api.add_resource(StudentCourses, '/api/student-courses')


if __name__ == "__main__":
    app.run(port=5555, debug=True)