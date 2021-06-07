from django.contrib import admin
from .models import Note, Todos
from .models import Category
from .models import Legends
from .models import Todo

# Register your models here.


admin.site.register(Category)
admin.site.register(Note)
admin.site.register(Todos)
admin.site.register(Legends)
admin.site.register(Todo)

