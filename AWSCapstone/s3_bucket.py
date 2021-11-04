import boto3

class Bucket:

    def __init__(self):
        pass

    def upload_object(self, file_location, filename):

        try:
            # Creating S3 Resource From the Session.
            s3 = boto3.resource('s3')

            s3.Bucket('capstoneproject21').upload_file(file_location, filename)

        except Exception as e:
            print ('{0} was not uploaded because {1}'.format(filename, e))