package com.example.demo;
import java.io.*;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
public class FirstController {
        @GetMapping("/contactUs")
        public String ContactUs(){return "contact_us";}

        @GetMapping("/userGuide")
            public String UserGuide(){return "user_guide";
        }
        @GetMapping("/")
        public String HomePage(){
            return "home_page";
        }
        @GetMapping("/submitQuery")
        public String SubmitQueryForm(Model model) {
            model.addAttribute("query", new Query());
            return "submit_query_page";
        }



        @PostMapping("/semanticAnalysis")
        public String SubmitQuery(@ModelAttribute Query query) {
            System.out.println(query.getQuery_str());
            try {
                submitQuery(query);
            }catch (IOException e) {
                System.out.println("exception occoured" + e);
            }
            return "result_page";
        }



    public String submitQuery(Query query) throws IOException {
       int flag1=0;
        String submitted_query =query.getQuery_str();
        if(submitted_query.contains("insert")||submitted_query.contains("update")||submitted_query.contains("alter")||submitted_query.contains("delete"))
        {
            flag1=2;
        }
        PrintWriter writer = new PrintWriter("C:\\Users\\Administrator\\Desktop\\Project\\DBProject-master\\Output files\\Spark-Execution-Monitor\\output.txt");
        writer.print("");
        SparkSession ss = SparkSession.builder().config("spark.sql.warehouse.dir", "file:///tmp/spark-warehouse").master("local").getOrCreate();
        System.out.println(ss.sparkContext().applicationId());
        System.setProperty("Hadoop.home.dir", "C:/Users/Administrator/Downloads/winutils-master/hadoop-2.7.1");
        Scanner sc = new Scanner(System.in);
        Dataset<Row> lines;
        Dataset<Row> line1;
        Dataset<Row> line2;
        // C:\Users\Administrator\Desktop\Project\DB-Project\DBProject-master\Data\student_details.json
        try {
            lines = ss.read().option("header", true).csv("hdfs://localhost:9000/major.csv");
             line1 = ss.read().option("header", true).csv("hdfs://localhost:9000/student_data.csv");
             line2 = ss.read().option("header", true).csv("hdfs://localhost:9000/school_data.csv");
        }
        catch(Exception e)
        {

            System.out.println("innn");
             lines = ss.read().option("header", true).csv("major.csv");
             line1 = ss.read().option("header", true).csv("student_data.csv");
             line2 = ss.read().option("header",true).csv("school_data.csv");

        }

        lines.createOrReplaceTempView("major");
        line1.createOrReplaceTempView("student");
        line2.createOrReplaceTempView("school");
        Dataset<Row> sqldf = null;
        try {
         //   SparkSqlParser sparksqlparser = new SparkSqlParser(new SQLConf());
        //    sparksqlparser.parseExpression(query);
            if(flag1==0) {
                long startTime = System.nanoTime();
                sqldf = ss.sql(submitted_query);
                long endTime = System.nanoTime();
                long timems = TimeUnit.NANOSECONDS.toMillis(endTime - startTime);
                System.out.println(timems);
                query.setTime(timems);
                sqldf.explain(true);
                sqldf.show();
                }
        } catch (Exception e) {
           flag1=1;
            System.out.println("INVALID QUERY");
        }
        if(submitted_query.contains("join"))
        {
            String t1="Joins\n" +
                    "1. Join is one of the costliest operations in Spark. You can get rid of duplicate keys in order to shrink the data size and make join operations much faster!\n" +
                    "2. If you have a defined subset of keys that you are going to use after joining, it may be a good idea to filter out and reduce the rows avoiding a big shuffle of data. This can save time since you will ultimately throw out the redundant data anyway!\n" +
                    "3. In operations consisting of sensitive data, if you are not sure whether there are matching keys in both tables, it can be safer to use an outer join since no data wil be lost!\n" +
                    "4. BroadcastHashJoin is an effective join strategy when one of the tables is much smaller (<10MB) than the other. You can forcibly induce a BroadcastHashJoin by giving hints or setting the autoBroadcastJoinThreshold to the table size!\n" +
                    "5. You can induce a BroadcastHashJoin by using the broadcast() function!\n" +
                    "6. You can change the threshold value for the table size by setting autoBroadcastJoinThreshold to the desired size. Setting this parameter to -1 will disable BroadcastHashJoin, making SortMergeJoin the default!\n" +
                    "7. SortMergeJoin is an effective join strategy when both tables are of comparable sizes.\n" +
                    "8. You can forcibly induce a SortMergeJoin by setting the autoBroadcastJoinThreshold to -1!\n" +
                    "9. You can disable SortMergeJoins by setting the preferSortMergeJoin parameter to false!\n" +
                    "10. Joining more than two tables in Spark can be tricky. SortMergeJoin seems to give better runtime performance in this case!\n" +
                    "11. Ensuring that the dataframe is distributed uniformly on the data column helps to leverage parallelism as all the rows having the same value for the join key are stored in the same partition. Therefore, the dataframe having an adequate number of unique keys can boost performance! ";
            query.setTips(query.getTips()+t1);
        }
        if(submitted_query.contains("group by")||submitted_query.contains("GROUP BY"))
        {
            String t1="\nGroupBy\n" +
                    "1. GroupBy queries can be improved by tuning the number of partitions. It can lead to a significant performance improvement since it is a costly operation!\n" +
                    "2. The default number of partitions for aggregations is 200 in Spark. Try tuning this value to get an improved performance!\n" +
                    "3. If you have less distinct keys, then you can try repartitioning the data to less than 200 partitions. This can boost performance provided that the data for a key fits in one partition!\n" +
                    "4. You can repartition the data on a column value if you are planning on performing multiple complex aggregation functions and joins on the same column. This leads to lesser shuffles of data as the data is already shuffled on the required key!\n" +
                    "5. You can also use repartition along with an expression to be performed like groupBy. The data gets shuffled accoring to the groupBy expression!\n" +
                    "6. If you don't want to use the repartition function, you can also set the SHUFFLE_PARTITIONS property to the desired number of partitions!\n" +
                    "7. GroupBy with RDDs is not optimized. If you're using groupBy with DataFrames you're pretty much good to go!\n";
            query.setTips(query.getTips()+t1);
        }
        if(submitted_query.contains("order by")||submitted_query.contains("ORDER BY"))
        {
            String t1="\nOrderBy\n" +
                    "1. You can also sort data locally in partitions by using the sortWithinPartitions() method!\n" +
                    "2. With a large enough dataset, we can make sort merge joins faster by repartitioning the data on the join key and then calling sortWithinPartitions on the dataframe!\n";
            query.setTips(query.getTips()+t1);
        }
        if(submitted_query.contains("where")||submitted_query.contains("WHERE"))
        {
            String t1="Filters\n" +
                    "1. Always filter your data before applying any complex operations. This reduces the amount of data to be operated upon!\n" +
                    "2. It is a good practice to write filters first, although the Catalyst optimizer ensures that filters are executed before any operations. These are called pushdown filters!\n" +
                    "3. Always try to club filter functions together instead of writing consecutive filters. This saves a step for the Catalyst optimizer!\n" +
                    "4. Filter pushdown aims at pushing down the filtering to the bare metal, i.e. the data source. This increases the performance of the queries sice the filtering is performed at a very low level rather than dealing with the entire dataset after it has been loaded into Spark's memory which could cause memory issues!\n" +
                    "5. Somtimes filter operation may cut down on a significant amount of data. However, this does not change the number of partitions and it might even result in some empty partitions. You can call repartition or coalesce to spread the data on an appropriate number of memory partitions!\n" +
                    "6. Filtering operation also depends on the underlying datastore. A parquet datastore will only send the required columns to the cluster as a part of column pruning and perform filtering on the cluster. On the other hand, a CSV datastore will send the entire ddataset to the cluster as it is a row based file format and doesn't support column pruning!\n" +
                    "7. If you are transferring data from an external source like cloud into the cluster then you might want to perform filtering on the cloud itself as it will lead to a smaller cluster size requirment which can lead to a significant cost reduction!\n" +
                    "8. If you have a very specific filter operation that results in only a fraction of the data being selected, you might want to repartition the data and write it on the disk. Spark then only takes data from certain partitions and skips all of the irrelevant partitions. These are called ParitionFilters. Data skipping allows for a big performance boost!\n";
            query.setTips(query.getTips()+t1);
        }
        if(submitted_query.contains("select")||submitted_query.contains("SELECT"))
        {
            String t1="General\n" +
                    "1. Making simple changes to the system parameters might also improve the peformance of SparkSQL statements!\n" +
                    "2. You can set sparl.sql.codegen parameter to true as it compiles and creates java bytecode quickly for large queries but it may lag in case of small queries!\n" +
                    "3. If you have small interim tables that are used repeatedly, caching them and the performing more complex opeartions can result in a performance boost!\n" +
                    "4. Caching all the generated tables is not a good idea as cache memory is limited and may lead to the eviction of some blocks that are expensive to compute!";
            query.setTips(query.getTips()+t1);
        }
         //sqldf.write().format("com.databricks.spark.csv").saveAsTable("t1");

         //; save("C:\\Users\\Administrator\\Desktop\\Project\\DB-Project\\DBProject-master\\Output files\\Spark-Execution-Monitor\\f5.txt");
        //sqldf.toString();
        if(flag1==0) {
           String f1 = "C:\\Users\\Administrator\\Desktop\\Project\\DBProject-master\\Output files\\Spark-Execution-Monitor\\f1.txt";
           String f2 = "C:\\Users\\Administrator\\Desktop\\Project\\DBProject-master\\Output files\\Spark-Execution-Monitor\\f2.txt";
           String f3 = "C:\\Users\\Administrator\\Desktop\\Project\\DBProject-master\\Output files\\Spark-Execution-Monitor\\f3.txt";
           String f4 = "C:\\Users\\Administrator\\Desktop\\Project\\DBProject-master\\Output files\\Spark-Execution-Monitor\\f4.txt";
            String f5 ="C:\\Users\\Administrator\\Desktop\\Project\\DBProject-master\\Output files\\Spark-Execution-Monitor\\f5.txt";
            String garbage="C:\\Users\\Administrator\\Desktop\\Project\\DBProject-master\\Output files\\Spark-Execution-Monitor\\garbage.txt";
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
               File myObj = new File("C:\\Users\\Administrator\\Desktop\\Project\\DBProject-master\\Output files\\Spark-Execution-Monitor\\output.txt");
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
                                   query.setF1(query.getF1() +n+ dataa);

                               } else if (ind == 1 && !data.equals("== Analyzed Logical Plan ==")) {
                                   String n="\r\n";
                                   query.setF2(query.getF2() +n+ dataa);
                               } else if (ind == 2 && !data.equals("== Optimized Logical Plan ==")) {
                                   String n ="\r\n";
                                   query.setF3(query.getF3()+n + dataa);
                               } else if (ind == 3 && !data.equals("== Physical Plan ==")) {
                                   String n ="\r\n";
                                   query.setF4(query.getF4()+n+ dataa);
                               }
                               else  if (ind ==4)
                               {
                                   String nl= query.getF5();
                                   String np= " \r\n";
                                   query.setF5(nl+np+dataa);
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
       else if(flag1==1)
       {
           query.setValidation("INVALID:Please enter a VALID QUERY");
       }
       else if(flag1==2)
        {
            query.setValidation("Making changes to the databases is not permitted:Please submit a VALID Query");
        }
           return (submitted_query);

    }


}
