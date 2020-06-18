import org.apache.spark.SparkContext
import org.apache.spark.SparkConf
import org.apache.spark.sql.{SQLContext, SparkSession}
import org.spark_project.jetty.util.ReadLineInputStream
object Script1{
  def main(args: Array[String]): Unit = {

    val SparkConf=new SparkConf().setAppName("app").setMaster("local[*]")
    val sc=new SparkContext(SparkConf)
    val sqlContext=new SQLContext(sc)
    val df=sqlContext.read.option("header", true).csv("C:\\Users\\Administrator\\Desktop\\Project\\DBProject-master\\Data\\student_data.csv")
    val df2=sqlContext.read.option("header", true).csv("C:\\Users\\Administrator\\Desktop\\Project\\DBProject-master\\Data\\school_data.csv")
    val outer_df = df.join(df2, Seq("school_id"), "full_outer").distinct()
    println("Total number of distinct schools are: "+ outer_df.count())
    println("Successful Execution")
    val name=readLine("Please enter a key to stop spark job: ")
  }
}
