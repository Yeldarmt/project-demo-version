# Generated by Django 2.2.1 on 2019-05-12 18:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_about'),
    ]

    operations = [
        migrations.AddField(
            model_name='coach',
            name='achievement',
            field=models.TextField(default=None, null=True),
        ),
        migrations.AddField(
            model_name='coach',
            name='activity',
            field=models.TextField(default=None, null=True),
        ),
        migrations.AddField(
            model_name='coach',
            name='education',
            field=models.TextField(default=None, null=True),
        ),
        migrations.AddField(
            model_name='coach',
            name='hobby',
            field=models.TextField(default=None, null=True),
        ),
    ]
