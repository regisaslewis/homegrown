from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, metadata, bcrypt

user_plants = db.Table(
    "users_plants",
    metadata,
    db.Column("user_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("plant_id", db.Integer, db.ForeignKey("plants.id"))
)

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_rules = ("",)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    climate = db.Column(db.String)
    experience_level = db.Column(db.String)
    group_id = db.Column(db.Integer, db.ForeignKey("groups.id"))
    _password_hash = db.column(db.String)

    group = db.relationship("Group", back_populates="users")
    plants = db.relationship("Plant", secondary=user_plants, back_populates="users")
    articles = db.relationship("Article", back_populates="user", cascade="all, delete-orphan")

    def __repr__(self):
        return f"User# {self.id}: {self.name}"
    
    @hybrid_property
    def password_hash(self):
        return Exception("Can't view password hashes.")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode("utf-8")
        )
    
class Plant(db.Model, SerializerMixin):
    __tablename__ = "plants"

    serialize_rules = ("",)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)
    description = db.Column(db.String)
    image = db.Column(db.String)
    family_id = db.Column(db.Integer, db.ForeignKey("plant_families.id"))

    family = db.relationship("Plant_Family", back_populates="plants")
    users = db.relationship("User", secondary=user_plants, back_populates="plants")
    articles = db.relationship("Article", back_populates="plant", cascade="all, delete-orphan")

    def __repr__(self):
        return f"Plant# {self.id}: {self.name}"

class Group(db.Model, SerializerMixin):
    __tablename__ = "groups"

    serialize_rules = ("",)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    group_creator = db.Column(db.String)

    users = db.relationship("User", back_populates="group", cascade="all, delete-orphan")

    def __repr__(self):
        return f"Group #{self.id}: {self.name}: Users: {[n.name for n in self.users] if self.users else 'None'}"

class Plant_Family(db.Model, SerializerMixin):
    __tablename__ = "plant_families"

    serialize_rules = ("",)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    image = db.Column(db.String)

    plants = db.relationship("Plant", back_populates="family", cascade="all, delete-orphan")

    def __repr__(self):
        return f"Plant Family #{self.id}: {self.name} | Plants: {[n.name for n in self.plants] if self.plants else 'None'}"
    
class Article(db.Model, SerializerMixin):
    __tablename__ = "articles"

    serialize_rules = ("",)

    id = db.Column(db.Integer, primary_key=True)
    success_rating = db.Column(db.Integer)
    body = db.Column(db.String)
    likes = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    plant_id = db.Column(db.Integer, db.ForeignKey("plants.id"))

    user = db.relationship("User", back_populates="articles")
    plant = db.relationship("Plant", back_populates="articles")

    def __repr__(self):
        return f"{self.plant.name} Guide by {self.user.name}: Success Rating: {self.success_rating} / 5 || {self.body}"