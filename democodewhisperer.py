# 0.) Function to print hello world

def hello_world():
    print("Hello World!")
    return

 
 
 




# 1.) Function to get a file from url
import requests
import pandas as pd
import json
import boto3
from io import StringIO 











# 2.) Function to upload image to S3
import boto3







## IMAGE RECOGNITION

# 1.) Detect labels from image with Rekognition
import boto3
import json
import pandas as pd
from io import StringIO 

def detect_labels(photo, bucket):

    client=boto3.client('rekognition')  
    response = client.detect_labels(Image={'S3Object':{'Bucket':bucket,'Name':photo}},
                                  















# 2.) Save labels to DynamoDB






