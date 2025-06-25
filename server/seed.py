from server.models import db, Book
from server.app import app

with app.app_context():
    db.drop_all()
    db.create_all()

    book1 = Book(
        title="The Alchemist",
        author="Paulo Coelho",
        description="A journey of self-discovery",
        publish_year=1988
    )

    book2 = Book(
        title="Things Fall Apart",
        author="Chinua Achebe",
        description="A classic of African literature",
        publish_year=1958
    )

    db.session.add_all([book1, book2])
    db.session.commit()
