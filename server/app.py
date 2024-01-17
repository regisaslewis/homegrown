#!/usr/bin/env python3
from flask import Flask, request, make_response, jsonify, session
from flask_restful import Resource
import copy

from config import app, db
from models import User, Plant, Group, Plant_Family, Article


@app.route('/')
def index():
    return '<h1>HomeGrown Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

