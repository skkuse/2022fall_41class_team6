# Generated by Django 4.1.2 on 2022-10-17 14:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Lecture',
            fields=[
                ('lectureId', models.IntegerField(primary_key=True, serialize=False)),
                ('lectureName', models.TextField(default='')),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('questionId', models.IntegerField(primary_key=True, serialize=False)),
                ('lectureId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mainApp.lecture')),
            ],
        ),
        migrations.CreateModel(
            name='Testcase',
            fields=[
                ('testcasId', models.IntegerField(primary_key=True, serialize=False)),
                ('questionId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mainApp.question')),
            ],
        ),
        migrations.CreateModel(
            name='Code_Submitted',
            fields=[
                ('code_submittedId', models.IntegerField(primary_key=True, serialize=False)),
                ('questionId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mainApp.question')),
            ],
        ),
        migrations.CreateModel(
            name='Code_Saved',
            fields=[
                ('code_savedId', models.IntegerField(primary_key=True, serialize=False)),
                ('questionId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mainApp.question')),
            ],
        ),
    ]
