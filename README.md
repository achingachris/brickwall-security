# Django Tutorial

start new project:
```shell
django-admin startproject mysite
```

This will create the following directories:

```mysite/
    manage.py
    poll/
        __init__.py
        settings.py
        urls.py
        asgi.py
        wsgi.py
```

Each file has its function:

1. The outer mysite/ root directory is a container for your project. Its name doesn’t matter to Django; you can rename it to anything you like.

2. ```manage.py```: A command-line utility that lets you interact with this Django project in various ways. You can read all the details about ```manage.py``` in django-admin and ```manage.py```.

3. The inner ```poll/``` directory is the actual Python package for your project.

4. ```poll/__init__.py```: An empty file that tells Python that this directory should be considered a Python package.

5. ```poll/settings.py```: Settings/configuration for this Django project. Django settings will tell you all about how settings work.

6. ```poll/urls.py```: The URL declarations for this Django project; a “table of contents” of your Django-powered site. You can read more about URLs in URL dispatcher.

7. ```poll/asgi.py```: An entry-point for ASGI-compatible web servers to serve your project. See How to deploy with ASGI for more details.

8. ```poll/wsgi.py```: An entry-point for WSGI-compatible web servers to serve your project. See How to deploy with WSGI for more details.

## Running Server
```python3 manage.py runserver```  or alternatively ```./manage.py runserver```
The server will run on port 8000

Changing the port is easier:
```python3 manage.py runserver 8080```

## Creating a Polls app
``` python3 manage.py startapp polls```

a new directory called "polls" will be created:
```
polls/
    migrations/
        __init__.py
    __init__.py
    admin.py
    apps.py
    models.py
    tests.py
    views.py
```

This is where we write the code for the poll app.

## Writing a View
Open the file ```polls/views.py``` and put the following Python code in it:

```python
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
```

To view this on a browser, we'll need to create a url configuration.
In the ```polls/``` folder, create a ```urls.py``` file, and write:

```python
from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
]
```

next we need to register this file with the root url file ```poll/urls.py```

```python
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('polls/', include('polls.urls')),
    path('admin/', admin.site.urls),
]
```

start your server and got to  ```http://localhost:8000/polls/```

## DataBase setup

By default, Django uses SQLite.
When starting your first real project, however, you may want to use a more scalable database like PostgreSQL, to avoid database-switching headaches down the road.

Go to ```polls/settings.py```. It’s a normal Python module with module-level variables representing Django settings.

While you’re editing ```polls/settings.py```, set TIME_ZONE to your time zone.

Also, note the INSTALLED_APPS setting at the top of the file. That holds the names of all Django applications that are activated in this Django instance. Apps can be used in multiple projects, and you can package and distribute them for use by others in their projects.

By default, INSTALLED_APPS contains the following apps, all of which come with Django:

1. django.contrib.admin – The admin site. You’ll use it shortly.
2. django.contrib.auth – An authentication system.
3. django.contrib.contenttypes – A framework for content types.
4. django.contrib.sessions – A session framework.
5. django.contrib.messages – A messaging framework.
6. django.contrib.staticfiles – A framework for managing static files.

These applications are included by default as a convenience for the common case.

Some of these applications make use of at least one database table, though, so we need to create the tables in the database before we can use them. To do that, run the following command:

```python3 manage.py migrate```

## Creating Models
Models are the basic database layouts in Django.

In our poll app, we’ll create two models: Question and Choice. A Question has a question and a publication date. A Choice has two fields: the text of the choice and a vote tally. Each Choice is associated with a Question.

These concepts are represented by Python classes. Edit the ```polls/models.py``` file so it looks like this:

```python
from django.db import models


class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
```

### Registering and activating your models:
To include the app in our project, we need to add a reference to its configuration class in the INSTALLED_APPS setting. The PollsConfig class is in the polls/apps.py file, so its dotted path is 'polls.apps.PollsConfig'. Edit the poll/settings.py file and add that dotted path to the INSTALLED_APPS setting. It’ll look like this:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # my apps
    'polls.apps.PollsConfig',
]
```

Now we need to activate the models:
```$ python3 manage.py makemigrations polls```

Now, run migrate again to create those model tables in your database:
```$ python3 manage.py migrate```

### Summary
1. Change your models (in models.py).
2. Run ```$ python3 manage.py makemigrations``` create migrations for those changes
3. Run ```$ python3 manage.py migrate``` to apply those changes to the database.

## Using the Database API
To open the python interactive shell:

```python3 manage.py shell```

```shell
>>> from polls.models import Choice, Question # Import the model classes we just wrote 

# view questions
>>> Question.objects.all()

# Create a new Question.
# Support for time zones is enabled in the default settings file, so
# Django expects a datetime with tzinfo for pub_date. Use timezone.now()
# instead of datetime.datetime.now() and it will do the right thing.
>>> from django.utils import timezone
>>> q = Question(question_text="What's new?", pub_date=timezone.now())

# Save the object into the database. You have to call save() explicitly.
>>> q.save()

# Now it has an ID.
>>> q.id
1

# Access model field values via Python attributes.
>>> q.question_text
"What's new?"
>>> q.pub_date
datetime.datetime(2020, 4, 28, 14, 30, 15, 167063, tzinfo=<UTC>)

# Change values by changing the attributes, then calling save().
>>> q.question_text = "What's up?"
>>> q.save()

# objects.all() displays all the questions in the database.
>>> Question.objects.all()
<QuerySet [<Question: Question object (1)>]>

```

To get a helpful and readable presentations of objects in the shell, update models.py:

```python
from django.db import models

class Question(models.Model):
    # ...
    def __str__(self):
        return self.question_text

    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=1)

class Choice(models.Model):
    # ...
    def __str__(self):
        return self.choice_text
```

Save the changes and start the shell again

```python3 manage.py shell```

```shell
# Make sure our __str__() addition worked.
>>> Question.objects.all()
<QuerySet [<Question: What's up?>]>

# Django provides a rich database lookup API that's entirely driven by
# keyword arguments.
>>> Question.objects.filter(id=1)
<QuerySet [<Question: What's up?>]>
>>> Question.objects.filter(question_text__startswith='What')
<QuerySet [<Question: What's up?>]>

# Get the question that was published this year.
>>> from django.utils import timezone
>>> current_year = timezone.now().year
>>> Question.objects.get(pub_date__year=current_year)
<Question: What's up?>

# Get the question that was published this year.
>>> from django.utils import timezone
>>> current_year = timezone.now().year
>>> Question.objects.get(pub_date__year=current_year)
<Question: What's up?>

# Request an ID that doesn't exist, this will raise an exception.
>>> Question.objects.get(id=2)
Traceback (most recent call last):
    ...
DoesNotExist: Question matching query does not exist.


# Give the Question a couple of Choices. The create call constructs a new
# Choice object, does the INSERT statement, adds the choice to the set
# of available choices and returns the new Choice object. Django creates
# a set to hold the "other side" of a ForeignKey relation
# (e.g. a question's choice) which can be accessed via the API.
>>> q = Question.objects.get(pk=1)

# Display any choices from the related object set -- none so far.
>>> q.choice_set.all()
<QuerySet []>

# Create three choices.
>>> q.choice_set.create(choice_text='Not much', votes=0)
<Choice: Not much>
>>> q.choice_set.create(choice_text='The sky', votes=0)
<Choice: The sky>
>>> c = q.choice_set.create(choice_text='Just hacking again', votes=0)

# Choice objects have API access to their related Question objects.
>>> c.question
<Question: What's up?>

# And vice versa: Question objects get access to Choice objects.
>>> q.choice_set.all()
<QuerySet [<Choice: Not much>, <Choice: The sky>, <Choice: Just hacking again>]>
>>> q.choice_set.count()
3

# The API automatically follows relationships as far as you need.
# Use double underscores to separate relationships.
# This works as many levels deep as you want; there's no limit.
# Find all Choices for any question whose pub_date is in this year
# (reusing the 'current_year' variable we created above).
>>> Choice.objects.filter(question__pub_date__year=current_year)
<QuerySet [<Choice: Not much>, <Choice: The sky>, <Choice: Just hacking again>]>

# Let's delete one of the choices. Use delete() for that.
>>> c = q.choice_set.filter(choice_text__startswith='Just hacking')
>>> c.delete()
```

## Django Admin

create a user who can login to the admin site. Run the following command:
```$ python manage.py createsuperuser```

Enter a username and password of choice

Ensure your server is running, got to http://127.0.0.1:8000/admin/ 

For the poll app to be visible on the panel,open the polls/admin.py file, and edit it to look like this:
```python
from django.contrib import admin

from .models import Question

admin.site.register(Question)
```

## More Views
In our poll application, we’ll have the following four views:

1. Question “index” page – displays the latest few questions.
2. Question “detail” page – displays a question text, with no results but with a form to vote.
3. Question “results” page – displays results for a particular question.
4. Vote action – handles voting for a particular choice in a particular question.
