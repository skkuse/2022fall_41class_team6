# Generated by Django 4.1.2 on 2022-11-10 18:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0002_code_saved_code_code_submitted_code_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='question',
            old_name='problemExplain',
            new_name='explanation',
        ),
        migrations.RenameField(
            model_name='testcase',
            old_name='testcasId',
            new_name='testcaseId',
        ),
    ]
