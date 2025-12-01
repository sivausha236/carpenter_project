from django.db import models

class Booking(models.Model):
    STATUS_PENDING = "Pending"
    STATUS_ASSIGNED = "Assigned"
    STATUS_INPROGRESS = "In Progress"
    STATUS_COMPLETED = "Completed"
    STATUS_CANCELLED = "Cancelled"

    STATUS_CHOICES = [
        (STATUS_PENDING, "Pending"),
        (STATUS_ASSIGNED, "Assigned"),
        (STATUS_INPROGRESS, "In Progress"),
        (STATUS_COMPLETED, "Completed"),
        (STATUS_CANCELLED, "Cancelled"),
    ]

    name = models.CharField(max_length=100, verbose_name="பெயர் (Name)")
    phone = models.CharField(max_length=15, verbose_name="தொலைபேசி எண் (Phone)")
    address = models.TextField(verbose_name="முகவரி (Address)")
    problem = models.TextField(verbose_name="என்ன வேலை? (Work Needed)")
    date = models.DateField(verbose_name="தேதி (Date)")
    time = models.TimeField(verbose_name="நேரம் (Time)")

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default=STATUS_PENDING,
        verbose_name="நிலை / Status",
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.status}"

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name