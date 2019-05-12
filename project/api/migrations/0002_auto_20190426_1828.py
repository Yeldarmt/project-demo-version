# Generated by Django 2.2 on 2019-04-26 12:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='client',
            name='client_of',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Gym'),
        ),
        migrations.AddField(
            model_name='coach',
            name='coach_of',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Gym'),
        ),
        migrations.AddField(
            model_name='feedback',
            name='feedback_of',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Gym'),
        ),
        migrations.AddField(
            model_name='subscription',
            name='client',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Client'),
        ),
        migrations.AddField(
            model_name='subscription',
            name='subscription_of',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Gym'),
        ),
        migrations.AlterField(
            model_name='client',
            name='coach',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Coach'),
        ),
        migrations.AlterField(
            model_name='client',
            name='test',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Test'),
        ),
    ]