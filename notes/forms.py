from .models import Note
from django import forms
from django.forms import ModelForm, TextInput, Textarea


class NoteForm(ModelForm):
    class Meta:
        model: Note
        fields = ['name', 'category', 'text']

        widgets = {
            'name': TextInput(attrs={
                'class': 'creating_name',
                'placeholder': 'Note name'
            }),
            'category': TextInput(attrs={
                'class': 'creating_category',
                'placeholder': 'Category name'
            }),
            'text': Textarea(attrs={
                'class': 'creating_content',
                'placeholder': 'Note content'
            }),
        }

