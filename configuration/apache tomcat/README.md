# Healthoway

## How to setup the Apache tomcat for deploying servlets
- Download Apache tomcat https://dlcdn.apache.org/tomcat/tomcat-8/v8.5.83/bin/apache-tomcat-8.5.83-windows-x64.zip
- Copy Healthoway Configuration folder to webapps folder in tomcat.
- Copy class file to webapps\healthoway\WEB-INF\classes\<Folder_name>\<Class_file_name> and delete ReadMe file from the folder
- Add JAR dependencies in webapps\healthoway\WEB-INF\lib

## Current JAR dependencies for Apache tomcat
- json-20220924.jar
- mysql-connector-java-8.0.11.jar
