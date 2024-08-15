from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.forms.widgets import PasswordInput, TextInput
from .models import *


class Signform(UserCreationForm):
    email = forms.EmailField(max_length=254, required=True)
    user_type_choices = [
        ('user', 'User'),
        ('admin', 'Admin'),
    ]
    userType = forms.ChoiceField(choices=user_type_choices, required=True)

    class Meta:
        model = myUser
        fields = ['username', 'email', 'password1', 'password2', 'userType']
        error_messages = {
            'password_mismatch': 'The two password fields didn’t match.',
        }

    def _init_(self, *args, **kwargs):
        super()._init_(*args, **kwargs)
        self.fields['password1'].error_messages.update({
            'required': 'This field is required.',
            'password_too_similar': 'Your password can’t be too similar to your other personal information.',
            'password_too_short': 'Your password must contain at least 8 characters.',
            'password_too_common': 'Your password can’t be a commonly used password.',
            'password_entirely_numeric': 'Your password can’t be entirely numeric.',
        })
        self.fields['password2'].error_messages.update({
            'required': 'This field is required.',
        })


class LogForm(AuthenticationForm):
    password = forms.CharField(widget=forms.PasswordInput())
    email = forms.EmailField(widget=forms.EmailInput())

    # def _init_(self, *args, **kwargs):
    #     super()._init_(*args, **kwargs)
    #     # Override the 'username' field to use the 'email' field for authentication
    #     self.fields['username'] = self.fields.pop('email')


class AddBookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ['name', 'url', 'author_name', 'description', 'category']


class EditeBookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ['name', 'author_name', 'description', ]

class ComplaintForm(forms.Form):
    name = forms.CharField(max_length=100)
    email = forms.EmailField()
    age = forms.CharField( max_length=3, required=False)
    subject = forms.CharField(max_length=100)
    message = forms.CharField(widget=forms.Textarea)
