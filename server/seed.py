
from app import app
from models import db, User, Plant, Group, Plant_Family, Article, user_plants, user_liked_articles, user_disliked_articles

if __name__ == '__main__':
    with app.app_context():
        print("Removing contents...")
        db.session.query(user_plants).delete()
        db.session.query(user_liked_articles).delete()
        db.session.query(user_disliked_articles).delete()
        db.session.commit()
        User.query.delete()
        Plant.query.delete()
        Group.query.delete()
        Plant_Family.query.delete()
        Article.query.delete()

        print("Starting seed...")
        monica = User(name="Monica", climate="Temperate Rainforest", experience_level="beginner", password_hash="monica")
        thorton = User(name="Thorton", climate="Metropolis", experience_level="novice", password_hash="thorton")
        angelica = User(name="Angelica", climate="Varied", experience_level="amateur", password_hash="angelica")

        users = [monica, thorton, angelica]

        pnw_superstars = Group(name="PNW Superstars", description="Representing Top-Left USA", users=[monica, thorton], group_creator=monica.name)
        van_dwellers = Group(name="The Caravan", description="Green-thumb Nomads", users=[angelica], group_creator=angelica.name)
        the_swamp = Group(name="The Swamp", description="Born in the Muck", group_creator=thorton.name)

        groups = [pnw_superstars, van_dwellers, the_swamp]

        fiddle = Plant(name="Fiddle-Leaf Fig", description="Tricky Green", image="https://www.afw.com/images/thumbs/0116275_fiddle-leaf-fig-tree.jpeg", users=[monica, angelica])
        aloe = Plant(name="Aloe Vera", description="Universal Salve", image="https://abanahomes.com/wp-content/uploads/2022/07/indoor-plant-aloe-vera-1024x683.jpg", users=[thorton, monica, angelica])
        money = Plant(name="Money Tree", description="Cha-Ching", image="https://www.realsimple.com/thmb/Wfcx19y6fCJbGuQoXzoJB3gAecI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1345463551-4ab50ed56e9c433c9d6571d7e51707cf.jpg", users=[monica, thorton, angelica])
        rubber = Plant(name="Rubber Plant", description="Bouncy", image="https://cdn.apartmenttherapy.info/image/upload/v1665497422/gen-workflow/product-database/bloomscape_burgundy-rubber-tree_lg_stone.jpg")


        plants = [fiddle, aloe, money, rubber]

        large = Plant_Family(name="Large", description="Expansive", image="https://en-gb.bakker.com/cdn/shop/articles/unnamed_05eb7209-c23e-42c3-a1d3-93feec6c7804.jpg?v=1651487894&width=1100", plants=[fiddle])
        leafy = Plant_Family(name="Leafy", description="Broad and Beautiful", image="https://gardenerspath.com/wp-content/uploads/2019/12/Calathea.jpg", plants=[money, rubber])
        succulent = Plant_Family(name="Succulent", description="Sturdy", image="https://wingardsmarket.com/wp-content/uploads/2021/07/image001.png", plants=[aloe])
        
        plant_families = [large, leafy, succulent]

        a1 = Article(user=monica, plant=fiddle, success_rating=2, likes=10, dislikes=5, body="I made the mistake of moving it during a prolonged overcast period.  Even after I returned it to its initial location, it never regained it's vibrance, slowly drooping and yellowing.  Now only a few leaves remain.")
        a2 = Article(user=monica, plant=money, success_rating=5, likes=8, dislikes=2, body="By repurposing an old Lazy-Susan, I just walk in and do a quarter rotation every morning for my eight sweet Money babies.  A sprinkle of water every Tuesday and they're golden!")
        a3 = Article(user=thorton, plant=aloe, success_rating=1, likes=3, dislikes=1, body="Didja know you could drown a plant that's 95% water?  Guess some of us gotta learn the hard way, boy howdy.")
        a4 = Article(user=angelica, plant=fiddle, success_rating=3, likes=12, dislikes=10, body="Bout fifty-fifty with these suckers.  Everytime I hit the road, it's a coin flip whether or not these crybabies are gonna throw in the towel.  Still gonna keep tryin.  Old girl like me don't mind the setbacks.")

        articles = [a1, a2, a3, a4]

        thorton.liked_articles.append(a1)
        thorton.disliked_articles.append(a2)
        monica.liked_articles.append(a3)
        monica.disliked_articles.append(a4)
        angelica.liked_articles.append(a1)
        angelica.liked_articles.append(a3)
        angelica.disliked_articles.append(a2)

        db.session.add_all(users)
        db.session.add_all(groups)
        db.session.add_all(plants)
        db.session.add_all(plant_families)
        db.session.add_all(articles)

        db.session.commit()
        print("Seeding Complete.")