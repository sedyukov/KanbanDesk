from django.urls import path
from django.conf.urls import include
from . import views

urlpatterns = [
    path('', views.index),
    path('resp', views.AjaxHandlerView.as_view()),
    path("note/", views.NoteListView.as_view(), name="api-note-list"),
    path("todo/", views.TodoListView.as_view(), name="api-note-list"),
    path("todo/<int:pk>/", views.TodoView.as_view(), name="api-note"),
    path("legend/", views.LegendListView.as_view(), name="api-note-list"),
    path("legend/<int:pk>/", views.LegendView.as_view(), name="api-note"),
    path("main/", views.notes_app),
]