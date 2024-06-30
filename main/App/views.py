from django.shortcuts import render, redirect, get_object_or_404
from django.db.models import Q
from django.http import JsonResponse
from django.conf import settings
from .forms import *
from django.db import IntegrityError
from django.contrib import messages
from django.contrib.auth.hashers import check_password
# Create your views here.
currentUserID = 0
currentUser = 0


def home(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        search_text = request.GET.get('search', '').lower()
        category_filter = request.GET.get('category', 'All Categories')
        author_filter = request.GET.get('author', 'All Authors')
        availability_filter = request.GET.get('availability', 'All Books')

        books = Book.objects.all()

        if search_text:
            books = books.filter(
                Q(name__icontains=search_text) |
                Q(description__icontains=search_text) |
                Q(author_name__icontains=search_text)
            )

        if category_filter != 'All Categories':
            books = books.filter(category=category_filter)

        if author_filter != 'All Authors':
            books = books.filter(author_name=author_filter)

        if availability_filter != 'All Books':
            if availability_filter == 'available':
                books = books.filter(borrowed_by__isnull=True)
            elif availability_filter == 'unavailable':
                books = books.filter(borrowed_by__isnull=False)

        books_data = list(books.values('id', 'name', 'author_name', 'url', 'borrowed_by'))
        for book in books_data:
            if not book['url'].startswith('http'):
                book['url'] = settings.MEDIA_URL + book['url']

        return JsonResponse({'books': books_data, })

    context = {
        'sid': currentUserID,
        'books': Book.objects.all(),
        'categories': Book.objects.values_list('category', flat=True).distinct(),
        'authors': Book.objects.values_list('author_name', flat=True).distinct(),
        'currentUser': currentUser
    }
    return render(request, 'pages/home.html', context)

def signIn(request):
    if request.method == "POST":
        form = Signform(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']
            email = form.cleaned_data['email']
            user_type = form.cleaned_data['userType']
            try:
                # Create a new user object
                user = myUser.objects.create_user(username=username, password=password,
                                                  email=email)
                # Set user type based on the form input
                user.is_admin = (user_type == 'admin')
                user.save()

                return redirect('login')
            except IntegrityError:
                # Handle case where username already exists
                form.add_error('username', 'Username already exists. Please choose a different one.')
        context = {'signupform': form}
    else:
        form = Signform()
        context = {'signupform': form}

    return render(request, 'pages/signin.html', context)


def log_in(request):
    global currentUser
    global currentUserID

    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        checkUser = get_object_or_404(myUser, username=username)
        if checkUser:
            if check_password(password, checkUser.password) :
                currentUser = checkUser
                currentUserID = currentUser.id
                return redirect('Main Page')
        else:
            messages.success(request, "there is an Error loggin maybe the password or username is not correct")

    return render(request, 'pages/login.html', {'currentUser': currentUser})


def logout_view(request):
    global currentUser
    global currentUserID
    currentUserID = 0
    currentUser = 0
    return redirect('login')


def mybook(request):
    global currentUser
    global currentUserID
    borrowed_books = Book.objects.filter(borrowed_by=currentUser)
    context = {
        'borrowed_books': borrowed_books,
        'currentUser': currentUser
    }

    return render(request, 'pages/mybook.html', context)


def aboutUs(request):
    global currentUserID
    return render(request, 'pages/aboutus.html', {'currentUser': currentUser})


def complain(request):
    if request.method == 'POST':
        form = ComplaintForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            age = form.cleaned_data['age']
            subject = form.cleaned_data['subject']
            message = form.cleaned_data['message']
            full_message = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"

            send_mail(
                subject,
                full_message,
                'your_email@gmail.com',  # From email
                ['reemmoslem34@gmail.com'],  # To email
                fail_silently=False, )
            
            messages.success(request, 'Your complaint has been successfully sent.')
    else:
        initial_data = {}
        if request.user.is_authenticated:
            initial_data = {
                'name': request.user.get_full_name(),  # Assuming the user's full name is stored in the User model
                'email': request.user.email,
            }
        form = ComplaintForm(initial=initial_data)


    return render(request, 'pages/complain.html', {'form': ComplaintForm })


def ditials(request, id):
    global currentUser
    book = get_object_or_404(Book, id=id)

    # if currentUserID:
    #     currentUser = get_object_or_404(myUser, id=currentUserID)

    return render(request, 'pages/ditials.html', {'book': book, 'currentUser': currentUser})


def add(request):
    global currentUser
    if request.method == "POST":
        form = AddBookForm(request.POST, request.FILES)
        if form.is_valid():
            try:
                form.save()
                return redirect('Main Page')
            except IntegrityError:
                form.add_error(None, "An error occurred while saving the book.")
    else:
        form = AddBookForm()

    return render(request, 'pages/add.html', {'currentUser': currentUser, 'form': form})


def borrow(request, id):
    global currentUser
    book = get_object_or_404(Book, id=id)
    if request.method == "POST" and currentUser:
        currentUser.borrow_book(book)
        return redirect('Main Page')
    return render(request, 'pages/borrow.html', {'currentUser': currentUser,'book':book})


def edit_delete(request, id):
    book = get_object_or_404(Book, id=id)
    global currentUser
    error = 0
    if request.method == 'POST':
        book_edite = EditeBookForm(request.POST,request.FILES,instance=book)
        if book_edite.is_valid():
            book_edite.save()
            return redirect('Main Page')
        else:
            error='Error'
    else:
        book_edite = EditeBookForm(instance=book)
    context = {
        'book': book,
        'currentUser': currentUser,
        'form': book_edite,
        'massage' : error
    }
    return render(request, 'pages/edit_delete.html', context)


def Delete(request,id):
    book = get_object_or_404(Book, id=id)
    if request.method == "POST":
        book.delete()
        return redirect('Main Page')

    return render(request, 'pages/confirm_delete.html', {'book': book})

def Return (request,id):
    book = get_object_or_404(Book, id=id)
    currentUser.return_book(book)
    return redirect('Main Page')