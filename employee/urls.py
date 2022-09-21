from django.urls import include, re_path

from employee import views

urlpatterns = [
    re_path('employee', views.employee_list),
    re_path('api/employee/(?P<pk>[0-9]+)$', views.employee_detail)
]
