# Generated by Django 4.0.5 on 2022-09-13 13:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='employee',
            fields=[
                ('EmployeeId', models.AutoField(primary_key=True, serialize=False)),
                ('EmployeeFirstName', models.CharField(max_length=100)),
                ('EmployeeLastNAme', models.CharField(max_length=100)),
                ('EmployeeEmail', models.EmailField(max_length=254)),
                ('EmployeeContact', models.IntegerField()),
            ],
        ),
    ]
