#!/usr/bin/env python3

from server.app import app
from server.models import db, Courses, Instructors, Students, Lessons

if __name__ == '__main__':
    with app.app_context():
        import ipdb; ipdb.set_trace()