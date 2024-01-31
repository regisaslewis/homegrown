#!/usr/bin/env python3
from flask import Flask, request, make_response, jsonify, session

from config import app, db
from models import User, Plant, Group, Plant_Family, Article


@app.route('/')
def index():
    return '<h1>HomeGrown Server</h1>'
    
@app.route("/check_session", methods=["GET"])
def check_session():
    if request.method == "GET":
        user = User.query.filter(User.id == session.get("user_id")).first()
        if user:
            return user.to_dict()
        else:
            return {"message": "401: Not Logged in"}, 401

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        name = request.get_json()["name"]
        password_hash = request.get_json()["password"]

        if name and password_hash:
            user = User.query.filter_by(name=name).first()
            if user is None:
                return jsonify({"Error": "Not a valid user."}), 401
            if user.authenticate(password_hash):
                session["user_id"] = user.id
                return jsonify(user.to_dict())
            else:
                return jsonify({"Error": "Invalid Password"}), 401

@app.route("/logout", methods=["DELETE"])
def logout():
    if request.method == "DELETE":
        session["user_id"] = None
        return {"message": "Not Logged In"}

@app.route("/users", methods=["GET", "POST"])
def users():
    users = User.query.all()
    if request.method == "GET":
        return make_response(jsonify([n.to_dict() for n in users]), 200)
    elif request.method == "POST":
        new_user = User(
            name = request.get_json()["name"],
            climate = request.get_json()["climate"],
            experience_level = request.get_json()["experience_level"],
            password_hash = request.get_json()["password"]
        )
        db.session.add(new_user)
        db.session.commit()
        return make_response(jsonify(new_user.to_dict(), 201))
    return make_response(jsonify({"text": "Method not allowed"}), 405)

@app.route("/users/<int:id>", methods=["GET", "POST", "PATCH", "DELETE"])
def show_user(id):
    user = User.query.filter(User.id == id).first()
    if user:
        if request.method == "GET":
            return make_response(jsonify(user.to_dict()), 200)
        elif request.method == "POST":
            user.group = request.get_data(["group"])
            db.session.add(user)
            db.session.commit()
            return make_response(jsonify(user.to_dict()), 200)
        elif request.method == "PATCH":
            for attr in request.get_data():
                setattr(user, attr, request.get_data([attr]))
            db.session.add(user)
            db.session.commit()
            return make_response(jsonify(user.to_dict()), 200)
        elif request.method == "DELETE":
            db.session.delete(user)
            db.session.commit()
            return make_response({"message": f"User No.{id} deleted."})
    return make_response(jsonify({"Error": f"User No. {id} not found."}), 404)

@app.route("/users/<int:id>/liked_article/<int:article_id>", methods=["GET", "POST", "DELETE"])
def show_liked_article(id, article_id):
    user = User.query.filter(User.id == id).first()
    article = Article.query.filter(Article.id == article_id).first()
    if user:
        if article:
            if request.method == "GET":
                if article in user.liked_articles:
                    return make_response(jsonify(article.to_dict()), 200)
                else:
                    return make_response({"error": f"{user.name} has not liked this article."}, 401)
            if request.method == "POST":
                if article not in user.liked_articles:
                    user.liked_articles.append(article)
                    db.session.add(user)
                    db.session.commit()
                    return make_response(jsonify(article.to_dict()), 201)
                else:
                    return make_response({"error" : f"{user.name} has already liked this article."}, 403)
            if request.method == "DELETE":
                if article in user.liked_articles:
                    user.liked_articles.remove(article)
                    db.session.commit()
                    return make_response(jsonify(article.to_dict()), 201)
                else:
                    return make_response({"message": "Cannot remove articles not liked."})
        return make_response({"Error": f"Article #{article_id} not found"}, 404)
    return make_response({"Error": f"User #{id} not found"}, 404)

@app.route("/users/<int:id>/disliked_article/<int:article_id>", methods=["GET", "POST", "DELETE"])
def show_disliked_article(id, article_id):
    user = User.query.filter(User.id == id).first()
    article = Article.query.filter(Article.id == article_id).first()
    if user:
        if article:
            if request.method == "GET":
                if article in user.disliked_articles:
                    return make_response(jsonify(article.to_dict()), 200)
                else:
                    return make_response({"error": f"{user.name} has not disliked this article."}, 401)
            if request.method == "POST":
                if article not in user.disliked_articles:
                    user.disliked_articles.append(article)
                    db.session.add(user)
                    db.session.commit()
                    return make_response(jsonify(article.to_dict()), 201)
                else:
                    return make_response({"error" : f"{user.name} has already disliked this article."}, 403)
            if request.method == "DELETE":
                if article in user.disliked_articles:
                    user.disliked_articles.remove(article)
                    db.session.commit()
                    return make_response(jsonify(article.to_dict()), 201)
                else:
                    return make_response({"message": "Cannot remove articles not disliked."})
        return make_response({"Error": f"Article #{article_id} not found"}, 404)
    return make_response({"Error": f"User #{id} not found"}, 404)

@app.route("/plants", methods=["GET", "POST"])
def plants():
    plants = Plant.query.all()
    if request.method == "GET":
        return make_response(jsonify([n.to_dict() for n in plants]), 200)
    elif request.method == "POST":
        new_plant = Plant(
            name = request.get_json()["name"],
            description = request.get_json()["description"],
            image = request.get_json()["image"],
            family_id = request.get_json()["family_id"]
        )
        db.session.add(new_plant)
        db.session.commit()
        return make_response(jsonify(new_plant.to_dict(), 201))
    return make_response(jsonify({"text": "Method not allowed"}), 405)

@app.route("/plants/<int:id>", methods=["GET", "POST", "PATCH", "DELETE"])
def show_plant(id):
    plant = Plant.query.filter(Plant.id == id).first()
    if plant:
        if request.method == "GET":
            return make_response(jsonify(plant.to_dict()), 200)
        elif request.method == "POST":
            user = User.query.filter(User.id == session["user_id"]).first()
            plant.users.append(user)
            db.session.add(plant)
            db.session.commit()
            return make_response(jsonify(plant.to_dict(), 201))
        elif request.method == "PATCH":
            for attr in request.get_json():
                setattr(plant, attr, request.get_json().get(attr))
            db.session.add(plant)
            db.session.commit()
            return make_response(plant.to_dict(), 200)
        elif request.method == "DELETE":
            db.session.delete(plant)
            db.session.commit()
            return make_response({"message": f"Plant No.{id} deleted."})
    return make_response(jsonify({"Error": f"Plant No. {id} not found."}), 404)

@app.route("/groups", methods=["GET", "POST"])
def groups():
    groups = Group.query.all()
    if request.method == "GET":
        return make_response(jsonify([n.to_dict() for n in groups]), 200)
    elif request.method == "POST":
        new_group = Group(
            name = request.get_json()["name"],
            description = request.get_json()["description"],
            group_creator = request.get_json()["group_creator"],
        )
        db.session.add(new_group)
        db.session.commit()
        return make_response(jsonify(new_group.to_dict(), 201))
    return make_response(jsonify({"text": "Method not allowed"}), 405)

@app.route("/groups/<int:id>", methods=["GET", "POST"])
def show_group(id):
    group = Group.query.filter(Group.id == id).first()
    user = User.query.filter(User.id == session["user_id"]).first()
    if group:
        if request.method == "GET":
            return make_response(jsonify(group.to_dict()), 200)
        if request.method == "POST":
            group.users.append(user)
            db.session.add(group)
            db.session.commit()
            return make_response(jsonify(group.to_dict(), 201))
    return make_response(jsonify({"Error": f"Group No. {id} not found."}), 404)

@app.route("/plant_families", methods=["GET", "POST"])
def plant_families():
    plant_families = Plant_Family.query.all()
    if request.method == "GET":
        return make_response(jsonify([n.to_dict() for n in plant_families]), 200)
    elif request.method == "POST":
        new_plant_family = Plant_Family(
            name = request.get_json()["name"],
            description = request.get_json()["description"],
            image = request.get_json()["image"]
        )
        db.session.add(new_plant_family)
        db.session.commit()
        return make_response(jsonify(new_plant_family.to_dict(), 201))
    return make_response(jsonify({"text": "Method not allowed"}), 405)

@app.route("/plant_families/<int:id>", methods=["GET"])
def show_plant_family(id):
    plant_family = Plant_Family.query.filter(Plant_Family.id == id).first()
    if plant_family:
        if request.method == "GET":
            return make_response(jsonify(plant_family.to_dict()), 200)
    return make_response(jsonify({"Error": f"Plant Family No. {id} not found."}), 404)

@app.route("/articles", methods=["GET", "POST"])
def articles():
    articles = Article.query.all()
    if request.method == "GET":
        return make_response(jsonify([n.to_dict() for n in articles]), 200)
    elif request.method == "POST":
        new_article = Article(
            success_rating = request.get_json()["success_rating"],
            body = request.get_json()["body"],
            likes = 0,
            dislikes = 0,
            user_id = session["user_id"],
            plant_id = (request.get_json()["plant_id"])
        )
        db.session.add(new_article)
        db.session.commit()
        return make_response(new_article.to_dict(), 201)
    return make_response(jsonify({"text": "Method not allowed"}, 405))

@app.route("/articles/<int:id>", methods=["GET", "PATCH", "DELETE"])
def show_article(id):
    article = Article.query.filter(Article.id == id).first()
    if article:
        if request.method == "GET":
            return make_response(jsonify(article.to_dict()), 200)
        elif request.method == "PATCH":
            for attr in request.get_json():
                setattr(article, attr, request.get_json().get(attr))
            db.session.add(article)
            db.session.commit()
            return make_response(article.to_dict(), 200)
        elif request.method == "DELETE":
            db.session.delete(article)
            db.session.commit()
            return make_response({"message": f"Article No. {id} has been deleted."})
    else:
        return make_response(jsonify({"Error": f"Article No. {id} not found."}))

if __name__ == '__main__':
    app.run(port=5555, debug=True)

