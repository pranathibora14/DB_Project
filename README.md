# Semantic Analysis of Spark SQL Statements

This project aims to create a holistic platform for semantic analysis of Spark SQL statements by providing a clean and effective web interface that enables users to analyze all the required parameters in one place, in just one click. The problem statement given to us was semantically analyzing spark sql statements for improving runtime performance. This analysis involves a lot of parameters, from different platforms like Hadoop and Spark which are to be considered in conjunction with each other in order to make an effective and correct analysis. Therefore, this project serves as a one stop platform to execute and analyze spark sql statements while also provding some optimization tips. 

## Technology Stack
Here is a list of the technologies used and their respective roles.
1. **Spark v2.4.5** - A distributed real-time processing framework which handles queries on Big Data in an optimized manner.
2. **Hadoop v2.7.1** - Open-source software framework for distributed storage and processing of Big Data. We set up the Spark engine to work in conjunction with Hadoop and query the files stored on Hadoop DFS.
3. **SpringBoot v2.3** - We used SpringBoot, an open-source Java-based framework to create the Spark-Java backend of the application.
4. **JavaScript + HTML** - We used JS and HTML to build the frontend.
5. **Bootstrap v3.4.1** - We used Bootstrap, an open-source CSS framework for front-end design templates of UI components.
6. **Scala v2.11.12** - We created a few .scala scripts present in the *Scripts* and *Performance Tuning* folders to aid in the demonstration of Spark internal working and optimization.
7. **sbt v1.3.10** - We used sbt, an open-source build tool to create exportable jars for the execution of .scala scripts.
8. **JUnit v5** - We used Junit to run some basic assertion tests for our project. 

## Layout
Th main directory of the project called *DBProject-master* should contain 5 files: Codebase, Data, Output files, Performance Tuning and Scripts. The overall project can be divided into two parts.
### 1. Semantic Analysis UI 
The first part of the project is the Web UI created for semantic analysis of Spark SQL statements. The **Codebase** contains the java and html code for the application. The **Data** folder contains three datasets namely *major.csv*, *school_data.csv* and *student_data.csv*. The UI allows queries including joins on any of these datasets. The **Output files** folder contains the console output from SpringBoot stored in file *output.txt*. The four execution plans created by Spark are segregated into separate files *f1, f2, f3, f4.txt* along with the query output which is stored in *f5.txt*. 

### 2. Scripts and Observations
The **Scripts** folder contains three scripts along with their jars that can be used to gain a basic understanding of how spark queries are executed. A thorough guide on how to run them can be found in the ***Usage*** section. The **Performance Tuning** folder contains scripts that show a considerable runtime improvement for two scripts present in the **Scripts** folder. These improvements have been made using the knowledge gained from understanding Spark internals. More information on these improvements along with screenshots and DAGs can be found in the .pdf files present in the folder.

## Installation
Compatible versions of Hadoop and Spark need to be installed and configured on the local machine along with a stable version of Java like Java v8. An IDE like IntelliJ or Eclipse is required to run the application and set the output log path. 

## Usage
- ### Semantic Analysis UI
To run the Semantic Analysis UI, import the demo project from **Codebase** folder into an IDE like IntelliJ or Eclipse. Ensure that the Hadoop FS is up and running and put the database files on the hdfs. Set the output console log path to the *output.txt* file present in the **Output files** folder. All the maven dependencies have already been added. Ensure that the database file paths correspond to the paths on your local hdfs. Run the application. Visit **localhost:8000** on your browser to access the Semantic Analysis Web UI. On entering the query, the UI shows the query output, all 4 Spark plans, possible optimizations for the entered query, approximate runtime and a link to visit the Spark UI and Hadoop NameNode and Application UIs. More information on these parameters can be found in the User guide on the Homepage.

- ### Scripts
The .scala scripts present in the ***Scripts*** and ***Performance Tuning*** folders can be run using their corresponding jars. Ensure that Java and Spark are properly installed. In the project folder, navigate to the script you want to execute and open command prompt. The class name is the same as the name of the script. The command to be entered for Script1 is as follows:
```
spark-submit --class Script1 script1.jar
```
Similarly, the other scripts can also be executed. Visit your local Spark UI to view the spark execution stages and statistics for the spark job. You can check the URL and port no on the cmd when the script starts execution as well. We have also added the important DAGs obtained from the scripts in the **Performance Tuning** folder for a quick analysis and understanding in case you don't want to execute the entire script.

## Testing
Software Testing is an important phase of Software Development. In order to get an idea of testing, we have used JUnit to assert some basic unit tests on our scripts. You can find more information and screenshots of the tests in *Script 2.pdf* in the **Performance Tuning** folder. 

## Performance Tuning
The problem statement as mentioned is the semantic analysis of Spark SQL statements for a better run time performance. Over the course of the project, we have compiled a list of optimization strategies that can imporove performance of expensive operations like *Joins, GroupBy, OrderBy* as well as some general optimization tips. These strategies have been included in the Web UI and will be visible when the user enters a related query. For example, if a user enters a query to perform a join, the optimizations tab in the UI provides a list of strategies for joins. Spark deals with a huge volume of data because of which even seemingly simple operations like groupbys can take a significant amount of time. Therefore, optimizations become an important part in cutting down the time required. We have also documented this in Script1 where a job that takes over 6 minutes can be cut down to less than 2 minutes using performance tuning strategies.  
## Authors
- [Shivani Patil](https://www.linkedin.com/in/shivani-patil209/)
- [Shivani Mundle](https://www.linkedin.com/in/shivani-m-89275b190/)
- [Pranathi Bora](https://www.linkedin.com/in/pranathi-bora/)
