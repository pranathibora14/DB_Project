import org.apache.spark.SparkContext
import org.apache.spark.SparkConf
import org.apache.spark.sql.{SQLContext, SparkSession}
import org.spark_project.jetty.util.ReadLineInputStream
object HelloWorld{
  def main(args: Array[String]): Unit = {

    val SparkConf=new SparkConf().setAppName("app").setMaster("local[3]")
    val sc=new SparkContext(SparkConf)
    val sqlContext=new SQLContext(sc)
    val df=sqlContext.read.option("header", true).csv("C:\\Users\\Administrator\\Downloads\\student.csv")
    val df2=sqlContext.read.option("header", true).csv("C:\\Users\\Administrator\\Downloads\\school.csv")
    //df.show()
    //df.printSchema()
    //df.na.drop()

    //df2.show()


    df.repartition(df.col("school_id"))
    val outer_df = df.join(df2, Seq("school_id"), "full_outer")
    //outer_df.show()
    val distinct_df=outer_df.distinct()

    distinct_df.show()
    //distinct_df.filter("school_id == '399'")
   // distinct_df.show()
    //al df3=distinct_df.select("school_id", "stud_id").groupBy("school_id").count()
    //df3.show().explain()
    //df.repartition(10)
    //df.write.format("csv").saveAsTable("Example2")
/*    val df1=df.repartitionByRange(10, df.col("school_id"))
    val outer_df = df1.join(df2, Seq("school_id"), "full_outer")
    outer_df.show()
    val distinct_df=outer_df.filter("first_name == 'John'").distinct()
    distinct_df.show()*/
    println("Hello World!")
    val name=readLine("What's your name?")
  }
}
