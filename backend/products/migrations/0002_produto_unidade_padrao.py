from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='produto',
            name='unidade_padrao',
            field=models.CharField(
                choices=[
                    ('un', 'Unidade'),
                    ('cx', 'Caixa'),
                    ('kg', 'Quilograma'),
                    ('g', 'Grama'),
                    ('L', 'Litro'),
                    ('mL', 'Mililitro'),
                ],
                default='un',
                max_length=10,
            ),
        ),
    ]
