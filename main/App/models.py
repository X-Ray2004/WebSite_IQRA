from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

# Create your models here.


class myUser(AbstractUser):
    is_admin = models.BooleanField(default=False)
    # Email = models.EmailField()
    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_set',  # Custom related name to avoid clashes
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_set',  # Custom related name to avoid clashes
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    def borrow_book(self, book):
        book.borrowed_by = self
        book.save()

    def return_book(self, book):
        book.borrowed_by = None
        book.save()


class Book(models.Model):
    name = models.CharField(max_length=255)
    url = models.ImageField(upload_to="photos")
    author_name = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=255)
    borrowed_by = models.ForeignKey(myUser, related_name='borrowed_books', on_delete=models.SET_NULL, null=True,
                                    blank=True)

    @property
    def available(self):
        return self.borrowed_by is None

    def __str__(self):
        return self.name