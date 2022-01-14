attdf= df[df['entityName']=='AT&T INC.']
attRev=attdf[attdf['attribute_name']=='Revenues']
count_row = attRev.shape[0]  # Gives number of rows
count_col = attRev.shape[1]  # Gives number of columns
print(count_row)
print(count_col)

# Splitting the data into training, validation, and testing set, then turn them into csv files. 
attRev["filing_date"] = pd.to_datetime(attRev["filing_date"]).dt.strftime("%Y%m%d")
X1 = attRev.drop(["accn","attribute_name","entityName","cik"],axis=1)
train_data, validation_data, test_data = np.split(X1.sample(frac=1,random_state=123),[int(.7* len(X1)), int(.9*len(X1))])

pd.concat([train_data],axis=1).to_csv('trainAttRev.csv',index=False,header=False)
pd.concat([validation_data],axis=1).to_csv('validationAttRev.csv',index=False,header=False)
test_data.drop(["value"],axis=1).to_csv('testAttRev.csv',index=False,header=False)


s3.meta.client.upload_file('trainAttRev.csv', 'training-data-sagemaker','trainAttRev.csv')
s3.meta.client.upload_file('validationAttRev.csv', 'training-data-sagemaker','validationAttRev.csv')
s3.meta.client.upload_file('testAttRev.csv', 'training-data-sagemaker','testAttRev.csv')

s3_input_train=sagemaker.session.s3_input(s3_data='s3://training-data-sagemaker/trainAttRev.csv', content_type='text/csv')
s3_input_validation=sagemaker.session.s3_input(s3_data='s3://training-data-sagemaker/validationAttRev.csv', content_type='text/csv')
s3_data= {'train':s3_input_train, 'validation':s3_input_validation}


ll_model_attRev=sagemaker.estimator.Estimator(
    image_uri=container,
    sagemaker_session=sess,
    role=role,
    instance_count=1,
    instance_type="ml.c4.xlarge",
    output_path='s3://training-data-sagemaker/outputAttRev'
    )
ll_model_attRev.set_hyperparameters(feature_dim=1, predictor_type="regressor", mini_batch_size=25)
ll_model_attRev.fit(s3_data)


linear_predictor_Cbre_Rev = ll_model_cbreRev.deploy(initial_instance_count=1, instance_type="ml.m4.xlarge")

linear_predictor_Cbre_Rev.serializer = CSVSerializer()
linear_predictor_Cbre_Rev.deserializer = JSONDeserializer()

result= linear_predictor_Cbre_Rev.predict('20221021')
print(result)
