# Semantic Analysis of Spark SQL Statements

This project aims to simplify semantic analysis of Spark SQL statements by creating a clean and effective web interface which provides all the required parameters in one place, in just one click. The problem statement given to us was semantically analyzing spark sql statements for runtime performance improvement. This involves a lot of parameters, from different platforms like Hadoop and Spark which are to be considered in conjunction with each other in order to make an effective and correct analysis. Therefore, this project serves as a one stop platform to execute and analyze spark sql queries running on a hadoop distributed file system.

## Technology Stack
Here is a list of the technologies used and their respective roles.
1. **Spark v2.4.5** - A distributed real-time processing framework which handles queries on Big Data in an optimized manner.
2. **Hadoop v2.7.1** - Open-source software framework for distributed storage and processing of Big Data. We set up the Spark engine to work in conjunction with Hadoop and query the files stored on Hadoop DFS.
3. **SpringBoot v2.3** - We used SpringBoot, an open-source Java-based framework to create the Spark-Java backend of the application.
4. **JavaScript** - We used JS to build the frontend.
5. **Scala v2.11.12** - We created some .scala scripts present in the *Scripts* and *Performance Tuning* folders to aid in the demonstration of Spark internal working and optimization.
6. **sbt v1.3.10** - We used sbt, an open-source build tool to create exportable jars for the execution of .scala scripts.


## Features

## Layout
Th main directory of the project called *DBProject-master* should contain 6 files: Codebase, Data, Output files, Performance Tuning, DAG and Scripts. The overall project can be divided into two parts.
### 1. Semantic Analysis UI 
The first part of the project is the Web UI created for semantic analysis of Spark SQL statements. The **Codebase** contains the java and html code for the application. The **Data** folder contains three datasets namely *major.csv*, *school_data.csv* and *student_data.csv*. The UI allows queries including joins on any of these datasets. The **Output files** folder contains the console output from SpringBoot stored in file *output.txt*, the four execution plans created by Spark are segregated into separate files *f1, f2, f3, f4.txt* along with the query output which is stored in *f5.txt*. 

### 2. Scripts and Observations
The **Scripts** folder contains three scripts along with their jars that can be used to gain a basic understanding of how spark queries are executed on a distributed storage system. A thorough guide on how to run them can be found in the ***Usage*** section. The **Performance Tuning** folder contains scripts that show a considerable runtime improvement made using the knowledge gained from understanding Spark internals. The **DAG** folder contains screenshots of the important DAGs obtained in the execution of these scripts for a quick analysis.

## Installation
Compatible versions of Hadoop and Spark need to be installed and configured on the local machine along with a stable version of Java like Java8. An IDE like IntelliJ or Eclipse is required to run the application and set the output log path. 

## Usage
- ### Semantic Analysis UI
To run the Semantic Analysis UI, import the demo project from **Codebase** folder into an IDE like IntelliJ or Eclipse. Ensure that the Hadoop FS is up and running and put the database files on the hdfs. Set the output console log path to the *output.txt* file present in the **Output files** folder. All the maven dependencies have already been added. Ensure that the database file paths correspond to the paths on your local hdfs. Run the application. Visit **localhost:8080** to use the Web UI.

## Testing

## Performance Tuning

## Authors
- [Shivani Patil](https://github.com/shivanipatil209)
- [Shivani Mundle](https://github.com/Shivani-Mundle)
- [Pranathi Bora](https://github.com/pranathibora14)