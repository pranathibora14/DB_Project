import org.apache.spark.{SparkConf, SparkContext, sql}
import org.apache.spark.sql.{SQLContext, SparkSession}
import org.spark_project.jetty.util.ReadLineInputStream
object Script3 {
  def main(args: Array[String]): Unit = {
    val spark=new sql.SparkSession.Builder()
    val SparkConf = new SparkConf().setAppName("app").setMaster("local[*]")
    val sc = new SparkContext(SparkConf)
    val sqlContext = new SQLContext(sc)
    val df = sqlContext.read.option("header", true).csv("C:\\Users\\Administrator\\Desktop\\Project\\DBProject-master\\Data\\student_data.csv")
    val df1=df.repartition(df.col("school_id"))
    val df2=df1.select(df1.col("school_id"),df1.col( "first_name"), df1.col( "last_name")).groupBy(df1.col("first_name")).count().orderBy("count")
    //This script calculates the number of people with the same name and displays the count in a sorted manner.
    df2.describe()
    println("Successful Execution")
    val name=readLine("Please enter a key to stop spark job: ")
  }
}
