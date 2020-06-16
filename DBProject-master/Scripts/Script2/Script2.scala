import org.apache.spark.{SparkConf, SparkContext, sql}
import org.apache.spark.sql.{SQLContext, SparkSession}
import org.spark_project.jetty.util.ReadLineInputStream
object Script2 {
  def main(args: Array[String]): Unit = {
    val spark=new sql.SparkSession.Builder()
    val SparkConf = new SparkConf().setAppName("app").setMaster("local[3]")
    val sc = new SparkContext(SparkConf)
    val sqlContext = new SQLContext(sc)
    val df = sqlContext.read.option("header", true).csv("C:\\Users\\Administrator\\Downloads\\student.csv")
    //val df2 = sqlContext.read.option("header", true).csv("C:\\Users\\Administrator\\Downloads\\school.csv")
    val df1=df.repartition(df.col("school_id"))
    val df2=df1.select("school_id", "first_name", "last_name").groupBy(df1.col("school_id")).count().sort(df1.col("school_id"))
    df2.show()
    println("Successful Execution")
    val name=readLine("Please enter a key to stop spark job: ")
  }
}
