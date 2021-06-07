from django.shortcuts import render
from django.views.generic import View
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404
from rest_framework.generics import GenericAPIView
import rest_framework.mixins as mx
from django.views.decorators.csrf import csrf_exempt


from .models import Note, Category
from .serializers import *


class AjaxHandlerView(View):

    def get(self, request):
        # n1 = Note(name='A', category='asdas', text='C')
        # n1.save()
        # c1 = Category(name='asdas', link='csac')
        # c1.save()

        text = request.GET.get('button_text')
        print()
        print(text)
        print()
        if request.is_ajax():
            t = "ssss"
            return JsonResponse({'info': t}, status=200)

        return render(request, 'main/index.html')


@csrf_exempt
def index(request):
    return render(request, 'main/index.html')


def notes_app(request):
    return render(request, 'main/main_app.html')


# class NoteView(ListCreateAPIView):
#     queryset = Note.objects.all()
#     serializer_class = NoteSerializer
#
#     # def perform_create(self, serializer):
#     #     note = get_object_or_404(Note, id=self.request.data.get('author_id'))
#     #     return serializer.save(author=author)
#
#     def list(self, request):
#         # Note the use of `get_queryset()` instead of `self.queryset`
#         queryset = self.get_queryset()
#         serializer = NoteSerializer(queryset, many=True)
#         return Response(serializer.data)

class NoteListView(mx.ListModelMixin,
                  mx.CreateModelMixin,
                  GenericAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class NoteView(mx.RetrieveModelMixin,
                    mx.UpdateModelMixin,
                    mx.DestroyModelMixin,
                    GenericAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class LegendListView(mx.ListModelMixin,
                  mx.CreateModelMixin,
                  GenericAPIView):
    queryset = Legends.objects.all()
    serializer_class = LegendSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class TodoListView(mx.ListModelMixin,
                  mx.CreateModelMixin,
                  GenericAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class TodoView(mx.RetrieveModelMixin,
                    mx.UpdateModelMixin,
                    mx.DestroyModelMixin,
                    GenericAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class LegendView(mx.RetrieveModelMixin,
                    mx.UpdateModelMixin,
                    mx.DestroyModelMixin,
                    GenericAPIView):
    queryset = Legends.objects.all()
    serializer_class = LegendSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
