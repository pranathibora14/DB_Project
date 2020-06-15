package com.example.demo;
import org.apache.commons.lang.ObjectUtils;
import org.apache.spark.SparkConf;
import org.apache.spark.SparkEnv;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.*;
import org.apache.spark.sql.execution.SparkSqlParser;
import java.io.*;
import java.util.Arrays;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;
import org.apache.spark.sql.internal.SQLConf;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import java.io.IOException;
import org.apache.spark.sql.execution.metric.SQLMetricInfo;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.net.URI;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
public class FirstController {

        @GetMapping("/greeting")

        public String greetingForm(Model model) {
            model.addAttribute("greeting", new Greeting());
            return "greeting";
        }



        @PostMapping("/greeting")
        public String greetingSubmit(@ModelAttribute Greeting greeting) {
            System.out.println(greeting.getQuery());
            try {
                submitQuery(greeting);
            }catch (IOException e) {
                System.out.println("exception occoured" + e);
            }
            return "result";
        }



    public String submitQuery(Greeting greeting) throws IOException {
       int flag1=0;
        String query =greeting.getQuery();
        PrintWriter writer = new PrintWriter("C:\\Users\\Administrator\\Desktop\\Project\\DB-Project\\DBProject-master\\Output files\\Spark-Execution-Monitor\\output.txt");
        writer.print("");
        SparkSession ss = SparkSession.builder().config("spark.sql.warehouse.dir", "file:///tmp/spark-warehouse").master("local").getOrCreate();
        System.out.println(ss.sparkContext().applicationId());
        System.setProperty("Hadoop.home.dir", "C:/Users/Administrator/Downloads/winutils-master/hadoop-2.7.1");
        Scanner sc = new Scanner(System.in);
        // C:\Users\Administrator\Desktop\Project\DB-Project\DBProject-master\Data\student_details.json
        Dataset<Row> lines = ss.read().option("header", true).csv("hdfs://localhost:9000/major.csv");
        Dataset<Row> line1 = ss.read().option("header", true).csv("hdfs://localhost:9000/student_data.csv");
        Dataset<Row> line2 = ss.read().option("header",true).csv("hdfs://localhost:9000/school_data.csv");

        lines.createOrReplaceTempView("major");
        line1.createOrReplaceTempView("student");
        line2.createOrReplaceTempView("school");
        Dataset<Row> sqldf = null;
        try {
         //   SparkSqlParser sparksqlparser = new SparkSqlParser(new SQLConf());
        //    sparksqlparser.parseExpression(query);
            sqldf = ss.sql(query);

            
            sqldf.explain(true);
            sqldf.show();
        } catch (Exception e) {
           flag1=1;
            System.out.println("INVALID QUERY");
        }

         //sqldf.write().format("com.databricks.spark.csv").saveAsTable("t1");

         //; save("C:\\Users\\Administrator\\Desktop\\Project\\DB-Project\\DBProject-master\\Output files\\Spark-Execution-Monitor\\f5.txt");
        //sqldf.toString();
        if(flag1==0) {
           String f1 = "C:\\Users\\Administrator\\Desktop\\Project\\DB-Project\\DBProject-master\\Output files\\Spark-Execution-Monitor\\f1.txt";
           String f2 = "C:\\Users\\Administrator\\Desktop\\Project\\DB-Project\\DBProject-master\\Output files\\Spark-Execution-Monitor\\f2.txt";
           String f3 = "C:\\Users\\Administrator\\Desktop\\Project\\DB-Project\\DBProject-master\\Output files\\Spark-Execution-Monitor\\f3.txt";
           String f4 = "C:\\Users\\Administrator\\Desktop\\Project\\DB-Project\\DBProject-master\\Output files\\Spark-Execution-Monitor\\f4.txt";
            String f5 ="C:\\Users\\Administrator\\Desktop\\Project\\DB-Project\\DBProject-master\\Output files\\Spark-Execution-Monitor\\f5.txt";
            String garbage="C:\\Users\\Administrator\\Desktop\\Project\\DB-Project\\DBProject-master\\Output files\\Spark-Execution-Monitor\\garbage.txt";
            String[] f = new String[6];
           f[0] = f1;
           f[1] = f2;
           f[2] = f3;
           f[3] = f4;
           f[4]= f5;
           f[5]=garbage;
           for (int i = 0; i <= 5; i++) {
               try {
                   new FileWriter(f[i], false).close();
               } catch (java.io.IOException e) {
                   System.out.println("An error occurred.");
               }
           }
           int ind = -1;
           try {
               File myObj = new File("C:\\Users\\Administrator\\Desktop\\Project\\DB-Project\\DBProject-master\\Output files\\Spark-Execution-Monitor\\output.txt");
               Scanner myReader = new Scanner(myObj);
               int flag = 0;
               while (myReader.hasNextLine()) {
                   String data = myReader.nextLine();
                   if (data.equals("== Parsed Logical Plan ==")) {
                       ind = 0;
                   } else if (data.equals("== Analyzed Logical Plan ==")) {
                       ind = 1;
                   } else if (data.equals("== Optimized Logical Plan ==")) {
                       ind = 2;
                   } else if (data.equals("== Physical Plan ==")) {
                       ind = 3;
                   }
                   else if(data.contains("+---")|| data.contains(" | ") )
                   {

                       ind =4;
                   }
                   else if(data.contains(("INFO")))
                   {
                       ind =5;
                   }
                   String dataa = data + "\n";
                   if (data.trim().length() > 0) {
                       if (ind != -1) {
                           try {
                               BufferedWriter out = new BufferedWriter(
                                       new FileWriter(f[ind], true));
                               out.write(dataa);
                               out.close();
                               if (ind == 0 && !data.equals("== Parsed Logical Plan ==")) {
                                   String n="\r\n";
                                   greeting.setF1(greeting.getF1() +n+ dataa);

                               } else if (ind == 1 && !data.equals("== Analyzed Logical Plan ==")) {
                                   String n="\r\n";
                                   greeting.setF2(greeting.getF2() +n+ dataa);
                               } else if (ind == 2 && !data.equals("== Optimized Logical Plan ==")) {
                                   String n ="\r\n";
                                   greeting.setF3(greeting.getF3()+n + dataa);
                               } else if (ind == 3 && !data.equals("== Physical Plan ==")) {
                                   String n ="\r\n";
                                   greeting.setF4(greeting.getF4()+n+ dataa);
                               }
                               else  if (ind ==4)
                               {
                                   String nl= greeting.getF5();
                                   String np= " \r\n";
                                   greeting.setF5(nl+np+dataa);
                                   //System.out.println(dataa);
                               }

                           } catch (IOException e) {
                               System.out.println("exception occoured" + e);
                           }
                           flag = 1;
                       }
                   }
               }
           } catch (FileNotFoundException e) {
               System.out.println("An error occurred.");
               e.printStackTrace();
           }
       }
       else
       {
           greeting.setValidation("INVALID:Please enter a VALID QUERY");
       }
           return (query);

    }


}
