from celery import Celery

celery = Celery(
    "tasks",
    broker="amqp://guest:guest@rabbitmq:5672//",
    backend="rpc://"
)

@celery.task
def encode_base64(data):
    import base64
    return base64.b64encode(data.encode()).decode()
